import React, { createContext, useContext, useState } from 'react';
import Web3 from 'web3';
import MetaqueerStore from  '../MQT_v2/.deploys/pinned-contracts/80002/0x49c30c253604a66d7c654c463b71252302d0dbda.json';
import MQT from '../MQT_v2/.deploys/pinned-contracts/80002/0xa9e81c73d8f6d76147f812f8cadb24156da4c5ec.json';
import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';


const MarketPlaceABI = MetaqueerStore.abi;
const MarketPlaceAddress = MetaqueerStore.address;
const NFTABI = MQT.abi;
const NFTaddress = MQT.address;

const NFTMarketplaceContext = createContext();

export const useNFTMarketplace = () => useContext(NFTMarketplaceContext);

export const NFTMarketplaceContextProvider = ({ children }) => 
{
    let providerAddress;
    let contractAddress;
    let decimalNumber;
    let hexString;
    let customChainId;
    let customNetwork;
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [MarketPlaceContract, setMarketPlaceContract] = useState(null);
    const [NFTContract, setNFTContract] = useState(null);

    const updateProvider = async (newProvider) => 
    {
        console.log("Updating provider", newProvider);
        const web3provider = new ethers.providers.Web3Provider(newProvider);
        setProvider(web3provider);
        setSigner(web3provider?.getSigner());
        console.log(signer);
        setMarketPlaceContract(new ethers.Contract(MarketPlaceAddress, MarketPlaceABI, signer));
        setNFTContract(new ethers.Contract(NFTaddress, NFTABI, signer));
    };
 
    const getMarketItems = async () =>
    {
        try 
        {
            const result = await MarketPlaceContract.getAllActiveItems();
            console.log(result);
            return result;
        }

        catch (error) 
        {
            console.error(error);
            return [];
        }
    };
    
    const mintPrice = async () =>{
        try {
            const result = await NFTContract._mintPrice();
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
      }

    const buyMarketItem = async (itemId, price) => 
    {
        try 
        {
            const tx = await MarketPlaceContract.purchaseMarketItem(itemId, {
                value: ethers.utils.parseEther(price.toString)
            });
            const result = await tx.wait();
            return result;
        }
        catch (error) 
        {
            console.error(error);
            return null;
        }
    }
    
    const getMarketItem = async (itemId) => 
    {
        try 
        {           
            const response = await MarketPlaceContract.getMarketItem(itemId);
            console.log(response);
            return response;

        }
        catch (error) 
        {
            console.error(error);
            return null;
        }
     };
    
    const getUserMarketItems = async (address) => 
    {
        try 
        {
            const records = await MarketPlaceContract.getMarketItemsBySeller(address);
       
            return records;
        } 
        catch (error) 
        {
            console.error(error);
            return null;
        }
    };

    const formatPrice = (price) =>
    {
        const etherPerWei = new BigNumber(10).pow(18);
        const priceInEther = new BigNumber(price).div(etherPerWei);
        return priceInEther.toString();
    }

    const changeItemStateAndPrice = async (itemId, price) => 
    {
        try 
        {
            if (price <= 0) 
            {
                throw new Error("Price must be greater than 0");
            }
            const priceInWei = ethers.utils.parseEther(price.toString());
            const tx = await MarketPlaceContract.chagneItemPrice(itemId, priceInWei);
            return await tx.wait();
        } 
        catch (error) 
        {
            console.error("Error creating market item:", error);
            return null;
        }
    }
    const createMarketItem = async (tokenURI, price) => {
        try {
            // Ensure web3, connectWallet, and NFTContract are properly defined and initialized
            if (!NFTContract) {
                throw new Error("Required dependencies are not defined");
            }
    
            // Convert the price to Wei
            const priceInWei = ethers.utils.parseEther(price.toString());

            // Check if account is fetched
            if (!account) {
                throw new Error("No account found. Please connect your wallet.");
            }
    
            // Get the mint price
            const _mintPrice = await mintPrice();
    
            console.log(_mintPrice, tokenURI, account, priceInWei);
    
            // Mint the NFT
            const tx = await NFTContract.mintNFT(tokenURI, priceInWei, {
                value: _mintPrice
            });
            
            const response = await tx.wait();
            console.log(response);
            return response;
    
        } catch (error) {
            console.error("Error creating market item:", error);
            return null;
        }
    };
    
    const connectWallet = async () => {

        switch (process.env.REACT_APP_CHAIN_ENV) {
            case 'dev':
                decimalNumber = parseInt(process.env.REACT_APP_CHAIN_ID_DEV);
                hexString = decimalNumber.toString(16);
                customChainId = '0x' + hexString;
                customNetwork = {
                    chainId: customChainId,
                    chainName: 'GANACHE SERVER TEST',
                    nativeCurrency: {
                        name: 'ETH',
                        symbol: 'ETH',
                        decimals: 18,
                    },
                    rpcUrls: [
                        process.env.REACT_APP_CHAIN_ADDRESS_DEV
                            .replace('ws://', 'http://').replace('wss://', 'https://')
                    ],
                    //blockExplorerUrls: ['https://custom-block-explorer-url.com']
                };
                await provider.request({
                    method: "wallet_addEthereumChain",
                    params: [customNetwork]
                });
                await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: customChainId }]
                });
                break;
            case 'testing':
                decimalNumber = parseInt(process.env.REACT_APP_CHAIN_ID_TESTING);
                hexString = decimalNumber.toString(16);
                customChainId = '0x' + hexString;
                await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: customChainId }]
                });
                break;
            case 'prod':
                decimalNumber = parseInt(process.env.REACT_APP_CHAIN_ID_PROD);
                hexString = decimalNumber.toString(16);
                customChainId = '0x' + hexString;
                await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: customChainId }]
                });
                break;
            default:
                // Default to dev environment if REACT_APP_NETWORK is not set or unrecognized
               //providerAddress = process.env.REACT_APP_CHAIN_ADDRESS_DEV;
                break;
        }
        return await provider.request({ method: 'eth_requestAccounts' });
    }
    const getAccounts = async () => 
    {
        try 
        {
            const accounts = await connectWallet();
            return accounts;
        } 
        catch (error) 
        {
            console.error('Error fetching accounts from MetaMask:', error);
            return null;
        }
    };


    const bid = async (itemId, price) => {
        try {
          //const [account] = await connectWallet();
            const tx = await MarketPlaceContract.bid(itemId, {
                value: ethers.utils.parseEther(price.toString())
            });
            return await tx.wait();
        } catch (error) {
          console.error(error);
          return null;
        }
      };
    
    const removeMarketItem = async (itemId) => {
        try {
            //const [account] = await connectWallet();
            const tx = await MarketPlaceContract.removeMarketItem(itemId);
            return await tx.wait();
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const addMarketItem = async (nftAddress, tokenIds, price, description, isAuction, starttime, endtime) => {
        try {
            //const [account] = await connectWallet();
            const tx = await MarketPlaceContract.addMarketItem(nftAddress, tokenIds, price, description, isAuction, starttime, endtime);
            return await tx.wait();
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    
    const getBalance = async (address) => 
    {
        if (provider) {
            try {
              const balance = await provider.getBalance(address);
              return ethers.utils.formatEther(balance); // Convert balance from wei to ether
            } catch (error) {
              console.error('Error fetching balance:', error);
            }
        }
    };
    

    return (
        <NFTMarketplaceContext.Provider value={{ formatPrice, buyMarketItem, getMarketItem, getMarketItems, addMarketItem, removeMarketItem, bid,
            changeItemStateAndPrice, getUserMarketItems, createMarketItem, getBalance, getAccounts, connectWallet, updateProvider }}>
            {children}
        </NFTMarketplaceContext.Provider>
    );
};

