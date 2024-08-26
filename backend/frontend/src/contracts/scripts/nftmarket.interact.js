require('dotenv').config();

const { ethers } = require("hardhat");

async function main() {
  const NFTMarketplaceAddress = process.env.REACT_APP_CONTRACT_PROXY_ADDRESS; // Address of the deployed contract
  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
  const marketplace = await NFTMarketplace.attach(NFTMarketplaceAddress);

  const ownerMarketItems = await marketplace.getMarketItems("0x0000000000000000000000000000000000000000");

  console.log(ownerMarketItems.length);

  for(let item of ownerMarketItems) {
    console.log("Token ID:", item.tokenId);
    console.log("Collection Address:", item.collectionAddress);
    console.log("Seller:", item.seller);
    console.log("Owner:", item.owner);
    console.log("Price:", item.price.toString());
    console.log("Sold:", item.sold);
    console.log("TokenUri:", item.tokenURI);
    console.log("----------------------------------");
  }

  try {
    const priceInWei = ethers.parseUnits("1000", "wei"); // Convert 1000 wei to ethers
    const createTokenTx = await marketplace.createToken("toneuri", 1000, "0x959FD7Ef9089B7142B6B908Dc3A8af7Aa8ff0FA1");
    const tx = await createTokenTx.wait(); // Wait for transaction to be mined
    console.log("Transaction hash:", tx.transactionHash);
    console.log("Market item created successfully!");
  } catch (error) {
    console.error("Error creating market item:", error);
  }

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
