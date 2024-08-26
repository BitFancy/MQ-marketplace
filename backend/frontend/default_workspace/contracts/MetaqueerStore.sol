// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

interface IERC721 {
    function tokenURI(uint256 tokenId) external view returns (string memory);
}

contract Marketplace is Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable {
    
    uint256[] private activeMarketItemIds; // Array of IDs for active market items
    address public paymentToken = 0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0; // ERC-20 token used for payments
    uint256 private maxItemCount; // Maximum number of active items
    uint256 private commissionPercent; // Commission rate

    struct MarketItem {
        bool isValid;               // Indicates if the item is valid (active)
        uint256 itemId;             // ID of the item
        address nftContract;        // Address of the NFT contract
        uint256[] tokenIds;         // Token IDs
        string[] tokenURIs;         // Token URIs
        address payable seller;     // Address of the seller
        address payable tempOwner;  // Address of the temporary owner (used for auctions)
        uint256 price;              // Price of the NFTs
        string description;         // Description of the item
        bool isAuction;             // true for auction, false for sale
        uint256 startTime;           // Duration for sale or auction
        uint256 endTime;            // End time for sale or auction
    }

    mapping(uint256 => MarketItem) private idToMarketItem; // Mapping from item ID to MarketItem

    // Events to track marketplace activities
    event MarketItemAdded(uint256 indexed itemId, address indexed nftContract, uint256[] indexed tokenIds, address seller, uint256 price, bool isAuction, uint256 startTime, uint256 endTime);
    event MarketItemRemoved(uint256 indexed itemId);
    event MarketItemPurchased(uint256 indexed itemId, address buyer, uint256 price);
    event AuctionCreated(uint256 indexed auctionId, address indexed nftContract, uint256[] indexed tokenIds, uint256 startPrice, uint256 duration);
    event BidPlaced(uint256 indexed auctionId, address indexed bidder, uint256 amount);
    event AuctionEnded(uint256 indexed auctionId, address winner, uint256 amount);
    event ChangeSaleorAuction(uint256 itemId, bool isAuction);
    
    // Initialize the contract with the payment token address
    function initialize(address _paymentToken, uint256 _commissionPercent) public initializer {
        __Ownable_init(msg.sender);
        __ReentrancyGuard_init();
        paymentToken = _paymentToken;
        activeMarketItemIds.push(0);
        maxItemCount = 100000;
        commissionPercent = _commissionPercent;  
    }

    // Modifier to check if the caller is the owner of the item
    modifier onlyItemOwner(uint256 itemId) {
        require(idToMarketItem[itemId].seller == msg.sender, "Only item owner can perform this action");
        _;
    }

    // Modifier to check if the item exists
    modifier itemExists(uint256 itemId) {
        require(idToMarketItem[itemId].isValid, "Market item does not exist");
        _;
    }

    // Function to get itemId from nftContract and tokenIds
    function getItemId(address nftContract, uint256[] memory tokenIds) public view returns (uint256){
        require(tokenIds.length > 0, "no tokenId");
        uint256 maxLength = activeMarketItemIds.length;
        for(uint256 i = 1; i < maxLength ; i++){
            MarketItem memory item = idToMarketItem[activeMarketItemIds[i]];
            if(item.nftContract == nftContract && _compareTokenIds(item.tokenIds, tokenIds)){
                return activeMarketItemIds[i];
            }    
        }
        return 0;
    }

    // Function to compare two arrays of tokenIds
    function _compareTokenIds(uint256[] memory tokenIds1, uint256[] memory tokenIds2) internal pure returns (bool) {
        if(tokenIds1.length != tokenIds2.length) return false;
        for(uint256 i = 0; i < tokenIds1.length; i++) {
            if(tokenIds1[i] != tokenIds2[i]) return false;
        }
        return true;
    }

    // Function to get an available itemId from tokenIds
    function getAvailableItemId() internal view returns (uint256){
        bool[] memory usedIds = new bool[](maxItemCount + 1);
        for (uint256 i = 1; i < activeMarketItemIds.length; i++){
            usedIds[activeMarketItemIds[i]] = true;
        }
        for (uint256 i = 1; i <= maxItemCount; i++){
            if (!usedIds[i]) {
                return i;
            }
        }
        return 0;        
    }

    // Function to add a new item to the marketplace
    function addMarketItem(address nftContract, uint256[] memory tokenIds, uint256 price, string memory description, bool isAuction, uint256 startTime, uint256 endTime) public returns (uint256){
        require(price > 0, "Price must be greater than zero");
        require(_areNftOwners(nftContract, tokenIds, msg.sender), "Caller is not the owner of the NFTs");
        uint256 itemId = getItemId(nftContract, tokenIds);
        // If the NFTs are already listed, update the existing item; otherwise, create a new item ID
        if (itemId == 0) {
            itemId = getAvailableItemId();
            require(itemId != 0, "No available item ID");
        }
        
        string[] memory _tokenURIs = new string[](tokenIds.length);
        
        for(uint256 i = 0; i< tokenIds.length; i++){
            IERC721 nft = IERC721(nftContract);
            _tokenURIs[i] = nft.tokenURI(tokenIds[i]);
        }
        // Create or update the market item
        idToMarketItem[itemId] = MarketItem({
            isValid: true,
            itemId: itemId,
            nftContract: nftContract,
            tokenIds: tokenIds,
            tokenURIs: _tokenURIs,
            seller: payable(msg.sender),
            tempOwner: payable(address(0)),
            price: price,
            description: description,
            isAuction: isAuction,
            startTime: startTime,
            endTime: endTime
        });
        activeMarketItemIds.push(itemId);  // Add item ID to the active list
        emit MarketItemAdded(itemId, nftContract, tokenIds, msg.sender, price, isAuction, startTime, endTime);
        return itemId;
    }
    
    // Function to delete an item from the marketplace
    function removeMarketItem(uint256 itemId) external onlyItemOwner(itemId) itemExists(itemId) {
        idToMarketItem[itemId].isValid = false; // Mark item as invalid
        _removeActiveMarketItemId(itemId); // Remove item ID from the active list
        emit MarketItemRemoved(itemId);
    }

    // Function to get all active items in the marketplace
    function getAllActiveItems() external view returns (MarketItem[] memory) {
        uint256 itemCount = activeMarketItemIds.length;
        MarketItem[] memory items = new MarketItem[](itemCount);

        // Loop through active items and populate the array
        for (uint256 i = 1; i < itemCount; i++) {
            uint256 itemId = activeMarketItemIds[i];
            items[i - 1] = idToMarketItem[itemId];
        }

        return items;
    }

    // Function to get active items with given id from the marketItems array
    function getMarketItem(uint256 itemId) external view returns (MarketItem memory){
        return idToMarketItem[itemId];
    }

    // Function to get active items by seller
    function getMarketItemsBySeller(address seller) public view returns (MarketItem[] memory) {
        uint256 sellerCount = 0;
        for (uint256 i = 1; i < activeMarketItemIds.length; i++){
            if (idToMarketItem[activeMarketItemIds[i]].seller == seller){
                sellerCount += 1;
            }
        }
        require(sellerCount != 0, "No valid item for seller");
        MarketItem[] memory marketItems = new MarketItem[](sellerCount);
        uint256 index = 0;
        for (uint256 i = 1; i < activeMarketItemIds.length; i++){
            if (idToMarketItem[activeMarketItemIds[i]].seller == seller){
                marketItems[index] = idToMarketItem[activeMarketItemIds[i]];
                index++;
            }
        }
        return marketItems;
    }

    // Function to handle the purchase of an item
    function purchaseMarketItem(uint256 itemId) payable external itemExists(itemId) nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        require(!item.isAuction, "Item is for auction");
        require(msg.value>=item.price, "Payment value is smaller than onsale price");
        require(block.timestamp <= item.endTime, "Item sale has ended");
        //require(IERC20Upgradeable(paymentToken).transferFrom(msg.sender, item.seller, item.price), "Payment failed");
        address payable selleraddress = item.seller;
        selleraddress.transfer(item.price*(100-commissionPercent)/100); 
        _transferNFT(item.nftContract, item.tokenIds, item.seller, msg.sender);
        item.isValid = false; // Mark item as invalid
        _removeActiveMarketItemId(itemId); // Remove item ID from the active list
        emit MarketItemPurchased(itemId, msg.sender, item.price);
    }


    function swapSaleorAuction(uint256 itemId) external itemExists(itemId){
        require(idToMarketItem[itemId].tempOwner == payable(address(0)), "transaction is already pending");
        bool _isAuction = idToMarketItem[itemId].isAuction;
        idToMarketItem[itemId].isAuction=!_isAuction;
        emit ChangeSaleorAuction(itemId, !_isAuction);
    }

    // Function to place a bid on an auction item by ERC-20 token
    // function bid(uint256 id, address _paymentToken, uint256 bidAmount) external itemExists(id) nonReentrant {
    //     MarketItem storage item = idToMarketItem[id];
    //     require(item.isAuction, "Item is not on auction");
    //     require(block.timestamp <= item.endTime, "Auction has ended");
    //     require(block.timestamp >= item.startTime, "Auction not started");
    //     require(bidAmount > item.price, "Bid amount must be higher than the current price");

    //     // Handle ERC20 token payments
    //     require(IERC20Upgradeable(_paymentToken).transferFrom(msg.sender, address(this), bidAmount), "Transfer failed");
        
    //     // Refund the previous highest bidder
    //     if (item.tempOwner != address(0)) {
    //         require(IERC20Upgradeable(_paymentToken).transfer(item.tempOwner, item.price), "Refund failed");
    //     }

    //     item.tempOwner = payable(msg.sender);
    //     item.price = bidAmount;
    //     emit BidPlaced(id, msg.sender, bidAmount);
    // }

    function bid(uint256 itemId) payable external itemExists(itemId) nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        require(item.isAuction, "Item is not on auction");
        require(block.timestamp <= item.endTime, "Auction has ended");
        require(block.timestamp >= item.startTime, "Auction not started");
        require(msg.value > item.price, "Bid amount must be higher than the current price");
        require(payable(msg.sender) != item.seller, "seller can not be a bidder");
        // Refund the previous highest bidder
        if (item.tempOwner != address(0)) {
            item.tempOwner.transfer(item.price);
        }
        idToMarketItem[itemId].price = msg.value;
        item.tempOwner = payable(msg.sender);
        emit BidPlaced(itemId, msg.sender, msg.value);
    }

    // Function to end an auction
    // function endAuction(uint256 id) external itemExists(id) nonReentrant {
    //     MarketItem storage item = idToMarketItem[id];
    //     require(item.isAuction, "Item is not for auction");
    //     require(block.timestamp > item.endTime, "Auction is still ongoing");

    //     if (item.tempOwner != address(0)) {
    //         // Transfer the NFT to the highest bidder and funds to the seller
    //         require(IERC20Upgradeable(paymentToken).transfer(item.seller, item.price), "Payment to seller failed");
    //         _transferNFT(item.nftContract, item.tokenIds, item.seller, item.tempOwner);
    //         emit AuctionEnded(id, item.tempOwner, item.price);
    //     } else {
    //         // No bids were placed, NFT remains with the seller
    //         emit AuctionEnded(id, address(0), 0);
    //     }

    //     item.isValid = false; // Mark item as invalid
    //     _removeActiveMarketItemId(id); // Remove item ID from the active list
    // }

    function endAuction(uint256 itemId) external itemExists(itemId) nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        require(item.isAuction, "Item is not for auction");
        require(block.timestamp > item.endTime, "Auction is still ongoing");

        if (item.tempOwner == address(0)) {
            // No bids were placed, NFT remains with the seller
            emit AuctionEnded(itemId, address(0), 0);
        } else {
            // Transfer the NFT to the highest bidder and funds to the seller
            item.seller.transfer(item.price*(100-commissionPercent)/100); 
            _transferNFT(item.nftContract, item.tokenIds, item.seller, item.tempOwner);
            emit AuctionEnded(itemId, item.tempOwner, item.price);
        }
        idToMarketItem[itemId].isValid = false; // Mark item as invalid
        _removeActiveMarketItemId(itemId); // Remove item ID from the active list
    }

    // Functon to change the price of items in the active list
    function chagneItemPrice(uint256 itemId, uint256 price) itemExists(itemId) onlyItemOwner(itemId) external {
        require(idToMarketItem[itemId].isAuction && idToMarketItem[itemId].tempOwner == payable(address(0)), "item is already on the auction");
        require(price > 0, "price must be greater than zero");
        idToMarketItem[itemId].price = price;
    }

    // Function to transfer NFT from seller to buyer
    function _transferNFT(address nftContract, uint256[] memory tokenIds, address from, address to) internal {
        if (IERC165Upgradeable(nftContract).supportsInterface(type(IERC721Upgradeable).interfaceId)) {
            for (uint256 i = 0; i < tokenIds.length; i++) {
                IERC721Upgradeable(nftContract).safeTransferFrom(from, to, tokenIds[i]);
            }
        } else if (IERC165Upgradeable(nftContract).supportsInterface(type(IERC1155Upgradeable).interfaceId)) {
            for (uint256 i = 0; i < tokenIds.length; i++) {
                IERC1155Upgradeable(nftContract).safeTransferFrom(from, to, tokenIds[i], 1, "");
            }
        } else {
            revert("Unsupported NFT standard");
        }
    }

    // Function to remove an active market item ID from the list
    function _removeActiveMarketItemId(uint256 id) internal {
        for (uint256 i = 1; i < activeMarketItemIds.length; i++) {
            if (activeMarketItemIds[i] == id) {
                activeMarketItemIds[i] = activeMarketItemIds[activeMarketItemIds.length - 1];
                activeMarketItemIds.pop();
                break;
            }
        }
    }
    
    // Internal function to check if the caller is the owner of the NFTs
    function _areNftOwners(address nftContract, uint256[] memory tokenIds, address account) internal view returns (bool) {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            if (IERC721Upgradeable(nftContract).supportsInterface(type(IERC721Upgradeable).interfaceId)) {
                if (IERC721Upgradeable(nftContract).ownerOf(tokenIds[i]) != account) return false;
            } else if (IERC1155Upgradeable(nftContract).supportsInterface(type(IERC1155Upgradeable).interfaceId)) {
                if (IERC1155Upgradeable(nftContract).balanceOf(account, tokenIds[i]) == 0) return false;
            }
        }
        return true;
    }

    // Function to add a new NFT contract slot
    function addSmartContractSlot(address smartContract, string memory functionName, string memory parameters) public onlyOwner {
        require(smartContract != address(0), "Invalid contract address");
        // Additional logic to interact with the smart contract can be added here
        // For now, just an example to call a function from the smart contract
        // Example: Assuming the smart contract has a function called `initialize`
        bytes memory payload = abi.encodeWithSignature(string(abi.encodePacked(functionName, parameters)));
        (bool success, ) = smartContract.call(payload); // no return data expected
        require(success, "Failed to call smart contract");    
    }

    // Function to withDraw to contract owner's address
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        payable(owner()).transfer(balance);
    }
}

