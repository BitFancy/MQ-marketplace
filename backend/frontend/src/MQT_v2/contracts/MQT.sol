// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MQTOpenCollection is Initializable, ERC721URIStorageUpgradeable, OwnableUpgradeable, ReentrancyGuardUpgradeable {
    uint256 private _tokenIds;
    address payable public mintPaymentReceiver;
    uint256 public mintPrice;

    event TokenCreated(uint256 indexed tokenId, address indexed owner, string tokenURI, uint256 price);
    
    function initialize(uint256 _mintPrice, address payable _mintPaymentReceiver) public initializer {
        __ERC721URIStorage_init();
        __Ownable_init(msg.sender);
        __ReentrancyGuard_init(); 
        __ERC721_init("MetaqeeurToken", "MQT");
        mintPrice = _mintPrice;
        mintPaymentReceiver = _mintPaymentReceiver;    
    }

    function setPaymentReceiver(address payable _receiver) public onlyOwner {
        mintPaymentReceiver = _receiver;
    }

    function setMintPrice(uint256 _price) public onlyOwner {
        require(_price > 0, "mintPrice must be a positive number");
        mintPrice = _price;
    }

    function mintNFT(string memory tokenURI, uint256 price) public payable nonReentrant returns (uint256) {
        require(msg.value >= mintPrice, "Price must be greater than mintPrice");

        _tokenIds++;
        uint256 newTokenId = _tokenIds;
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        // Transfer the minting fee to the mintPaymentReceiver
        mintPaymentReceiver.transfer(msg.value);

        emit TokenCreated(newTokenId, msg.sender, tokenURI, price);
        return newTokenId;
    }

    // Function to withdraw to contract owner's address
    function withdraw() public {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        require(payable(msg.sender) == mintPaymentReceiver, "Not the payment receiver");
        mintPaymentReceiver.transfer(balance);
    }
}
