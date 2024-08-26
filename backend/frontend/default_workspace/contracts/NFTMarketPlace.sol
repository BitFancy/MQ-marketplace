// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

interface IERC721 {
    function tokenURI(uint256 tokenId) external view returns (string memory);
}

contract Marketplace is Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable {
    uint256[] private activeMarketItemIds;
    address public commissionReceiver; 
    uint256 private commissionPercent;
    uint256 private userIdCnt; 
    uint256 private marketItemCnt;
    uint256[] private act_Histo_List;
    struct MarketItem {
        bool isValid;
        uint256 itemId;
        address nftContract;
        uint256[] tokenIds;
        string[] tokenURIs;
        address seller;
        address tempOwner;
        uint256 price;
        bool isAuction;
        uint256 endTime;
    }

    struct UserData {
        string userName;
        string avatar;
        address[] wallets;
        uint256[] ownMarketItemIds;
        uint256[] activityHistory;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(address => uint256) public userIds; 
    mapping(uint256 => UserData) public userDataMap;

    event SignedUp(address indexed user, string userName, string avatar);
    event ChangedUserData(address indexed user, string userName, string avatar, address newAddress);
    event AddedMarketItem(uint256 indexed itemId);
    event RemovedMarketItem(uint256 indexed itemId);
    event PurchasedMarketItem(uint256 indexed itemId);
    event ChangedMarketItem(uint256 indexed itemId, bool isAuction, uint256 price, uint256 endTime);
    event PlacedBid(uint256 indexed itemId, address indexed bidder, uint256 amount);
    event WithdrawnBid(uint256 indexed itemId, address winner, uint256 amount);

    function initialize(uint256 _commissionPercent, address _commissionReceiver, address _ownerAddress) public initializer {
        __Ownable_init(_ownerAddress);
        __ReentrancyGuard_init();
        transferOwnership(_ownerAddress);
        commissionPercent = _commissionPercent;
        commissionReceiver = _commissionReceiver;  
    }

    modifier onlyItemOwner(uint256 itemId) {
        require(idToMarketItem[itemId].seller == msg.sender, "Only item owner can perform this action");
        _;
    }

    modifier itemExists(uint256 itemId) {
        require(idToMarketItem[itemId].isValid, "Market item is not valid");
        _;
    }

    modifier checkMarketItemAvailability(address nftContract, uint256[] memory tokenIds){
        for (uint256 i = 0; i < activeMarketItemIds.length; i++) {
            MarketItem memory _marketItem = idToMarketItem[activeMarketItemIds[i]];
            if (_marketItem.nftContract == nftContract) {
                for(uint256 j = 0; j < _marketItem.tokenIds.length; j++ ){
                    for(uint256 k = 0; k < tokenIds.length; k++ ){
                        require(_marketItem.tokenIds[j] != tokenIds[k], "marketItem is already on sale/auction");
                    }
                }
            }
        }
        _;
    }

    function signUp(address _userAddress, string memory _userName, string memory _avatar) external {
        require(userDataMap[userIds[_userAddress]].wallets.length == 0 , "Already Signed Up");
        userIds[_userAddress] = userIdCnt;
        UserData storage _userData = userDataMap[userIdCnt];
        _userData.userName = _userName;
        _userData.avatar = _avatar;
        _userData.wallets.push(msg.sender);
        updateActivityHistory(_userAddress, 8);
        emit SignedUp(_userAddress, _userName, _avatar);
        userIdCnt++;
    }
    
    function changeUserData(string memory userName, string memory _avatar, address _newAddress) external {
        UserData storage userData = userDataMap[userIds[msg.sender]];
        for(uint256 i=0; i < userData.wallets.length; i++){
            if(_newAddress==address(0)) break;
            require(_newAddress != userData.wallets[i], "already registered wallet");
        }
        userData.wallets.push(_newAddress);
        userData.userName = userName;
        userIds[_newAddress] = userIds[msg.sender];
        updateActivityHistory(msg.sender, 9);
        emit ChangedUserData(msg.sender, userName, _avatar, _newAddress);
    }

    function updateActivityHistory(address user, uint256 activity) internal {
        UserData storage userData = userDataMap[userIds[user]];
        userData.activityHistory.push(activity);
        act_Histo_List.push(userIds[user]*100000000+activity);
    }
    
    function addNewMarketItem(
        address nftContract,
        uint256[] memory tokenIds,
        uint256 price,
        bool isAuction,
        uint256 endTime
    ) external checkMarketItemAvailability(nftContract, tokenIds) nonReentrant {
        require(price > 0, "Price must be greater than zero");
        require(_areNftOwners(nftContract, tokenIds, msg.sender), "Caller is not the owner of the NFTs");
        require(endTime > block.timestamp, "endTime must be greater than now");
        string[] memory _tokenURIs = new string[](tokenIds.length);
        for (uint256 i = 0; i< tokenIds.length; i++)
            _tokenURIs[i] = IERC721(nftContract).tokenURI(tokenIds[i]);
        
        idToMarketItem[marketItemCnt] = MarketItem({
            isValid: true,
            itemId: marketItemCnt,
            nftContract: nftContract,
            tokenIds: tokenIds,
            tokenURIs: _tokenURIs,
            seller: msg.sender,
            tempOwner: msg.sender,
            price: price,
            isAuction: isAuction,
            endTime: endTime
        });

        updateActivityHistory(msg.sender, marketItemCnt * 10 + (isAuction ? 2 : 1));
        userDataMap[userIds[msg.sender]].ownMarketItemIds.push(marketItemCnt);
        activeMarketItemIds.push(marketItemCnt);
        emit AddedMarketItem(marketItemCnt);
        marketItemCnt++;
    }
    
    function removeMarketItem(uint256 itemId) external onlyItemOwner(itemId) itemExists(itemId) {
        MarketItem storage marketItem = idToMarketItem[itemId];
        require(marketItem.tempOwner == msg.sender, "can not remove items"); 
        marketItem.isValid = false;
        _removeActiveMarketItemId(itemId);
        updateActivityHistory(msg.sender, itemId * 10 + 6);
        emit RemovedMarketItem(itemId);
    }

    function _removeActiveMarketItemId(uint256 id) internal {
        for (uint256 i = 0; i < activeMarketItemIds.length; i++) {
            if (activeMarketItemIds[i] == id) {
                activeMarketItemIds[i] = activeMarketItemIds[activeMarketItemIds.length - 1];
                activeMarketItemIds.pop();
                break;
            }
        }
    }

    function getAllActiveItems() external view returns (MarketItem[] memory) {
        MarketItem[] memory items = new MarketItem[](activeMarketItemIds.length);
        for (uint256 i = 0; i < activeMarketItemIds.length; i++) {
            items[i] = idToMarketItem[activeMarketItemIds[i]];    
        }
        return items;
    }

    function purchaseMarketItem(uint256 itemId) payable external itemExists(itemId) nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        require(!item.isAuction, "Item is for auction");
        require(msg.value >= item.price, "Payment value is smaller than onsale price");
        require(block.timestamp <= item.endTime, "Item sale has ended");
        item.isValid = false;
        payable(item.seller).transfer((item.price * (100 - commissionPercent)) / 100);
        _transferNFT(item.nftContract, item.tokenIds, item.seller, msg.sender);
        item.tempOwner = msg.sender;
        userDataMap[userIds[msg.sender]].ownMarketItemIds.push(itemId);
        _removeItemFromOwnList(itemId);
        item.seller = msg.sender;
        _removeActiveMarketItemId(itemId); 
        updateActivityHistory(msg.sender, itemId * 10 + 3);
        emit PurchasedMarketItem(itemId);
    }
    
    function changeMarketItem(uint256 itemId, bool _isAuction, uint256 _price, uint256 _endTime) external onlyItemOwner(itemId) itemExists(itemId) nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        require(item.tempOwner == item.seller, "Auction or Sale is already pending");        
        require(_price > 0, "Price must be greater than zero"); 
        item.isAuction = _isAuction;
        item.price = _price;
        item.endTime = _endTime;
        updateActivityHistory(msg.sender, itemId * 10 + 5);
        emit ChangedMarketItem(itemId, _isAuction, _price, _endTime);
    }
 
    function bid(uint256 itemId) payable external itemExists(itemId) nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        require(item.isAuction, "Item is not on auction");
        require(block.timestamp <= item.endTime, "Auction has ended");
        require(block.timestamp >= block.timestamp, "Auction not started");
        require(msg.value > item.price, "Bid amount must be higher than the current price");
        require(msg.sender != item.seller, "Seller cannot place a bid");

        if (item.tempOwner != item.seller) 
            payable(item.tempOwner).transfer(item.price);
        
        item.price = msg.value;
        item.tempOwner = msg.sender;
        updateActivityHistory(msg.sender, itemId * 10 + 4);
        emit PlacedBid(itemId, msg.sender, msg.value);
    }

    function withdrawBid(uint256 itemId) external itemExists(itemId) nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        require(item.isAuction, "Item is not for auction");
        require(block.timestamp > item.endTime, "Auction is still ongoing");
        item.isValid = false;
        _removeActiveMarketItemId(itemId);
        _removeItemFromOwnList(itemId);
        updateActivityHistory(item.seller, itemId * 100 + 7);

        if (item.tempOwner != item.seller) {
            payable(item.seller).transfer((item.price * (100 - commissionPercent)) / 100);
            _transferNFT(item.nftContract, item.tokenIds, item.seller, item.tempOwner);
        } 
        emit WithdrawnBid(itemId, item.tempOwner, item.price);
    }

    function _removeItemFromOwnList(uint256 itemId) internal{
        UserData storage sellerData = userDataMap[userIds[idToMarketItem[itemId].seller]];
        uint256 length = sellerData.ownMarketItemIds.length;
        for (uint256 i = 0; i < length; i++) {
            if (sellerData.ownMarketItemIds[i] == itemId) {
                sellerData.ownMarketItemIds[i] = sellerData.ownMarketItemIds[length - 1];
                sellerData.ownMarketItemIds.pop();
                break;
            }    
        }
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

    function withdraw() public {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        payable(commissionReceiver).transfer(balance);
    }
    
    function setCommissionData(uint256 _commissionPercent, address _commissionReceiver) external onlyOwner {
        commissionPercent = _commissionPercent;
        commissionReceiver = _commissionReceiver;
    }

    function getUserData(address user) external view returns (UserData memory){
        return userDataMap[userIds[user]];
    }
}
