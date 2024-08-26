// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

contract MQNFT is ERC721URIStorage, Ownable,ReentrancyGuardUpgradeable {
    uint256 public _tokenIdCounter;
    uint256 public _mintPrice;
    address public _masterAddress;
    address public _marketPlaceAddress;

    event TokenCreated(uint256 indexed tokenId, address indexed owner, string tokenURI);

    constructor(uint256 mintPrice) ERC721("MQNFT", "MQT") Ownable(msg.sender) {
        require(mintPrice > 0, "mintPrice is greater than zero");
        _tokenIdCounter = 0;
        _mintPrice = mintPrice;
        _masterAddress = msg.sender;
    }

    function setMarketPlaceAddress(address marketPlaceAddress)  public onlyOwner{
        _marketPlaceAddress = marketPlaceAddress;
        for (uint256 i=0; i<_tokenIdCounter; i++){
            approve(_marketPlaceAddress, i);
        }
    }

    function setMintPrice(uint256 mintPrice) public onlyOwner {
        _mintPrice = mintPrice;
    }

    function setMasterAddress(address masterAddress) public onlyOwner {
        _masterAddress = masterAddress;
    }

    function mintNFT(string memory tokenURI) public payable nonReentrant returns (uint256){
        uint256 tokenId = _tokenIdCounter;
        require(msg.value >= _mintPrice, "Not enough ETH");
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        approve(_marketPlaceAddress, tokenId);
        emit TokenCreated(tokenId, msg.sender, tokenURI);
        _tokenIdCounter++;
        return tokenId;
    }

    function withDraw() external {
        require(msg.sender == _masterAddress, "Not master address");
        // Transfer the entire balance of this contract to the master address
        (bool success, ) = _masterAddress.call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }
}
