require('dotenv').config();

require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');

module.exports = 
{
  //defaultNetwork: "ganache",
  networks: 
  {
    //"hardhat": {
    //  allowUnlimitedContractSize: true
    //},
    "dev": 
    {
      chainId: parseInt(process.env.REACT_APP_CHAIN_ID_DEV),
      url: process.env.REACT_APP_CHAIN_ADDRESS_DEV.
                          replace('ws://', 'http://').
                          replace('wss://', 'https://'),
      //accounts: [process.env.REACT_APP_CHAIN_ACCOUNT_TESTING],
      commissionReceiver: "0x4F64fB255bbcb5bdCaad873a5e56EC270B1684b1",
      commissionPercentage: 1,
      init: false
      //allowUnlimitedContractSize: true
      // accounts: [privateKey1, privateKey2, ...]
    },
    "testing":
    {
      chainId: parseInt(process.env.REACT_APP_CHAIN_ID_TESTING),
      url: process.env.REACT_APP_CHAIN_ADDRESS_TESTING,
      accounts: [process.env.REACT_APP_CHAIN_ACCOUNT_TESTING], // private key
      commissionReceiver: "0x2FDD38109d47C99E9eC1aac14b1f3c8D84af47af",
      commissionPercentage: 1,
      init: false
    }/*,
    "prod":
    {

    }*/
  },
  solidity: "0.8.18",
  /*settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },*/
  paths: 
  {
    artifacts: "./src/contracts/abi/",
    tests: "./src/contracts/test",
    cache: "./src/contracts/cache",
    //sources: "./src/contracts/solidity"
  }
};
