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

    uint256[] private activeMarketItemIds;
    //address public paymentToken;
    uint256 private maxItemCount;
    uint256 private commissionPercent;

    struct MarketItem {
        bool isValid;
        uint256 itemId;
        address nftContract;
        uint256[] tokenIds;
        string[] tokenURIs;
        address payable seller;
        address payable tempOwner;
        uint256 price;
        string description;
        bool isAuction;
        uint256 startTime;
        uint256 endTime;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemAdded(uint256 indexed itemId, address indexed nftContract, uint256[] indexed tokenIds, address seller, uint256 price, bool isAuction, uint256 startTime, uint256 endTime);
    event MarketItemRemoved(uint256 indexed itemId);
    event MarketItemPurchased(uint256 indexed itemId, address buyer, uint256 price);
    event AuctionCreated(uint256 indexed auctionId, address indexed nftContract, uint256[] indexed tokenIds, uint256 startPrice, uint256 duration);
    event BidPlaced(uint256 indexed auctionId, address indexed bidder, uint256 amount);
    event AuctionEnded(uint256 indexed auctionId, address winner, uint256 amount);
    event ChangeSaleorAuction(uint256 itemId, bool isAuction);

    function initialize(uint256 _commissionPercent) public initializer {
        __Ownable_init(msg.sender);
        __ReentrancyGuard_init();
        //paymentToken = _paymentToken;
        activeMarketItemIds.push(0);
        maxItemCount = 100000;
        commissionPercent = _commissionPercent;  
    }

    modifier onlyItemOwner(uint256 itemId) {
        require(idToMarketItem[itemId].seller == msg.sender, "Only item owner can perform this action");
        _;
    }

    modifier itemExists(uint256 itemId) {
        require(idToMarketItem[itemId].isValid, "Market item does not exist");
        _;
    }

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

    function _compareTokenIds(uint256[] memory tokenIds1, uint256[] memory tokenIds2) internal pure returns (bool) {
        if(tokenIds1.length != tokenIds2.length) return false;
        bool flag = false;
        for(uint256 i = 0; i < tokenIds1.length; i++) {
            flag = false;
            for (uint256 j=0; j < tokenIds2.length;j++){
                if(tokenIds1[i] == tokenIds2[j]) {
                    flag= true;
                    break;
                }    
            }
            if(flag == false){
                return false;
            }
        }
        return true;
    }

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

    function addMarketItem(
        address nftContract,
        uint256[] memory tokenIds,
        uint256 price,
        string memory description,
        bool isAuction,
        uint256 startTime,
        uint256 endTime
    ) external returns (uint256) {
        require(price > 0, "Price must be greater than zero");
        require(_areNftOwners(nftContract, tokenIds, msg.sender), "Caller is not the owner of the NFTs");

        uint256 itemId = getItemId(nftContract, tokenIds);
        if (itemId == 0) {
            itemId = getAvailableItemId();
            require(itemId != 0, "No available item ID");
        }
        string[] memory _tokenURIs = new string[](tokenIds.length);
        for (uint256 i = 0; i< tokenIds.length; i++)
            _tokenURIs[i] = IERC721(nftContract).tokenURI(tokenIds[i]);
        
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

        activeMarketItemIds.push(itemId); 
        emit MarketItemAdded(itemId, nftContract, tokenIds, msg.sender, price, isAuction, startTime, endTime);
        return itemId;
    }
    
    function removeMarketItem(uint256 itemId) external onlyItemOwner(itemId) itemExists(itemId) {
        idToMarketItem[itemId].isValid = false;
        _removeActiveMarketItemId(itemId); 
        emit MarketItemRemoved(itemId);
    }

    function getAllActiveItems() external view returns (MarketItem[] memory) {
        uint256 itemCount = activeMarketItemIds.length - 1; // adjust for initial dummy value
        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint256 i = 1; i <= itemCount; i++) {
            uint256 itemId = activeMarketItemIds[i];
            items[i - 1] = idToMarketItem[itemId];
        }

        return items;
    }

    function getMarketItem(uint256 itemId) external view returns (MarketItem memory) {
        return idToMarketItem[itemId];
    }

    function getMarketItemsBySeller(address seller) public view returns (MarketItem[] memory) {
        uint256 sellerCount = 0;
        for (uint256 i = 1; i < activeMarketItemIds.length; i++){
            if (idToMarketItem[activeMarketItemIds[i]].seller == seller)
                sellerCount += 1; 
        }

        require(sellerCount != 0, "No valid item for seller");

        MarketItem[] memory marketItems = new MarketItem[](sellerCount);
        uint256 index = 0;
        for (uint256 i = 1; i < activeMarketItemIds.length; i++)
            if (idToMarketItem[activeMarketItemIds[i]].seller == seller)
                marketItems[index++] = idToMarketItem[activeMarketItemIds[i]];
        return marketItems;
    }

    function purchaseMarketItem(uint256 itemId) payable external itemExists(itemId) nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        require(!item.isAuction, "Item is for auction");
        require(msg.value >= item.price, "Payment value is smaller than onsale price");
        require(block.timestamp <= item.endTime, "Item sale has ended");
        address payable selleraddress = item.seller;
        selleraddress.transfer((item.price * (100 - commissionPercent)) / 100);
        _transferNFT(item.nftContract, item.tokenIds, item.seller, msg.sender);
        item.isValid = false;
        _removeActiveMarketItemId(itemId); 

        emit MarketItemPurchased(itemId, msg.sender, item.price);
    }

    function swapSaleorAuction(uint256 itemId) external onlyItemOwner(itemId) itemExists(itemId) nonReentrant {
        require(idToMarketItem[itemId].tempOwner == payable(address(0)), "transaction is already pending");        
        bool _isAuction = idToMarketItem[itemId].isAuction;
        idToMarketItem[itemId].isAuction = !_isAuction;
        emit ChangeSaleorAuction(itemId, !_isAuction);
    }

    function bid(uint256 itemId) payable external itemExists(itemId) nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        require(item.isAuction, "Item is not on auction");
        require(block.timestamp <= item.endTime, "Auction has ended");
        require(block.timestamp >= item.startTime, "Auction not started");
        require(msg.value > item.price, "Bid amount must be higher than the current price");
        require(payable(msg.sender) != item.seller, "Seller cannot place a bid");

        if (item.tempOwner != address(0)) {
            item.tempOwner.transfer(item.price);
        }
        
        item.price = msg.value;
        item.tempOwner = payable(msg.sender);

        emit BidPlaced(itemId, msg.sender, msg.value);
    }

    function endAuction(uint256 itemId) external itemExists(itemId) nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        require(item.isAuction, "Item is not for auction");
        require(block.timestamp > item.endTime, "Auction is still ongoing");

        if (item.tempOwner != address(0)) {
            item.seller.transfer((item.price * (100 - commissionPercent)) / 100);
            _transferNFT(item.nftContract, item.tokenIds, item.seller, item.tempOwner);

            emit AuctionEnded(itemId, item.tempOwner, item.price);
        } else {
            emit AuctionEnded(itemId, address(0), 0);
        }

        item.isValid = false;
        _removeActiveMarketItemId(itemId);
    }

    function changeItemPrice(uint256 itemId, uint256 price) external onlyItemOwner(itemId) itemExists(itemId) {
        MarketItem storage item = idToMarketItem[itemId];
        require(!item.isAuction || item.tempOwner == address(0), "Cannot change price during auction with active bids");
        require(price > 0, "Price must be greater than zero");

        item.price = price;
    }

    function _transferNFT(address nftContract, uint256[] memory tokenIds, address from, address to) internal {
        if (IERC165Upgradeable(nftContract).supportsInterface(type(IERC721Upgradeable).interfaceId)) {
            for (uint256 i = 0; i < tokenIds.length; i++) 
                IERC721Upgradeable(nftContract).safeTransferFrom(from, to, tokenIds[i]);
        } else if (IERC165Upgradeable(nftContract).supportsInterface(type(IERC1155Upgradeable).interfaceId)) {
            for (uint256 i = 0; i < tokenIds.length; i++) 
                IERC1155Upgradeable(nftContract).safeTransferFrom(from, to, tokenIds[i], 1, "");
        } else {
            revert("Unsupported NFT standard");
        }
    }

    function _removeActiveMarketItemId(uint256 id) internal {
        uint256 length = activeMarketItemIds.length;
        for (uint256 i = 1; i < length; i++) {
            if (activeMarketItemIds[i] == id) {
                activeMarketItemIds[i] = activeMarketItemIds[length - 1];
                activeMarketItemIds.pop();
                break;
            }
        }
    }

    function _areNftOwners(address nftContract, uint256[] memory tokenIds, address account) internal view returns (bool) {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            if (IERC165Upgradeable(nftContract).supportsInterface(type(IERC721Upgradeable).interfaceId)) {
                if (IERC721Upgradeable(nftContract).ownerOf(tokenIds[i]) != account) return false;
            } else if (IERC165Upgradeable(nftContract).supportsInterface(type(IERC1155Upgradeable).interfaceId)) {
                if (IERC1155Upgradeable(nftContract).balanceOf(account, tokenIds[i]) == 0) return false;
            }
        }
        return true;
    }

    function addSmartContractSlot(
        address smartContract,
        string memory functionName,
        string memory parameters
    ) public onlyOwner {
        require(smartContract != address(0), "Invalid contract address");

        bytes memory payload = abi.encodeWithSignature(functionName, parameters);
        (bool success, ) = smartContract.call(payload);
        require(success, "Failed to call smart contract");    
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");

        payable(owner()).transfer(balance);
    }
}
