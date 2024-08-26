const { ethers, upgrades } = require("hardhat");

async function main() {
  // Get the contract factory for NFTMarketplace
  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");

  // Deploy the NFTMarketplace contract with proxy
  const marketplace = await upgrades.deployProxy(NFTMarketplace, { initializer: 'initialize' });

  console.log("NFTMarketplace deployed to:", marketplace.target);
}

// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
