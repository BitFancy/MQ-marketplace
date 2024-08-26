require('dotenv').config();

const{ ethers, upgrades } = require("hardhat");
const config = require("../../../hardhat.config.js");

const proxyAddress = process.env.REACT_APP_CONTRACT_PROXY_ADDRESS;
const network = process.env.HARDHAT_NETWORK;

async function main() 
{
  console.log(proxyAddress," original NFTMarketplace(proxy) address");
  const NFTMarketplaceV2 = await ethers.getContractFactory("NFTMarketplaceV2");
  console.log("upgrade to NFTMarketplaceV2...");
  const nftmarketplaceV2 = await upgrades.upgradeProxy(proxyAddress, NFTMarketplaceV2);
  console.log(nftmarketplaceV2.target,"NFTMarketplaceV2 address(should be the same)");
  if (network != undefined && config.networks[network].init != null)
  {
    const commissionReceiver = config.networks[network].commissionReceiver; 
    const commissionPercentage = config.networks[network].commissionPercentage; 
    if (config.networks[network].init == true)
    {
      console.log("Initializing NFTMarketplaceV2...");
      await nftmarketplaceV2.initializeV2(commissionReceiver, commissionPercentage);
    }
    else if (config.networks[network].init == false)
    {
      await nftmarketplaceV2.setCommissionReceiver(commissionReceiver);
      await nftmarketplaceV2.setCommissionPercentage(commissionPercentage);
    }
  }
}

// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
