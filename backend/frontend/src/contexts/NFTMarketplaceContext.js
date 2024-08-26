import React, { createContext, useContext, useState } from 'react';
import MetaqueerStore from  '../MQT_v2/.deploys/pinned-contracts/80002/0x08ca15b254e42c3c1add75ff1e180927f6051ec1.json';
import MQT from '../MQT_v2/.deploys/pinned-contracts/80002/0x3cc7d929c5c5ca6388acfc336ebc6c97d53029cc.json';
import {ethers} from 'ethers';
import Web3 from 'web3';

const MarketPlaceABI = MetaqueerStore.abi;
const MarketPlaceAddress = MetaqueerStore.address;
const NFTABI = MQT.abi;
const NFTaddress = MQT.address;

const NFTMarketplaceContext = createContext();

export const useNFTMarketplace = () => useContext(NFTMarketplaceContext);

export const NFTMarketplaceContextProvider = ({ children }) => 
{
    let decimalNumber;
    let hexString;
    let customChainId;
    let customNetwork;
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [MarketPlaceContract, setMarketPlaceContract] = useState(null);
    const [NFTContract, setNFTContract] = useState(null);
    const [marketItemList, setMarketItemList] = useState([]);
    //const [marketItemList, setMarketItemList] = useState([]);
    //const marketMemo  = useMemo(()=>({ marketItemList, setMarketItemList }), [marketItemList]);

    
    // Function to fetch items from the smart contract    
    const updateProvider = async (newProvider) => 
    {
        console.log("Updating provider", newProvider);
        const web3provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3provider);
        const web3signer = web3provider.getSigner();
        setSigner(web3signer);
        const address = await web3signer.getAddress();
        console.log("Connected address:", address);
        setMarketPlaceContract(new ethers.Contract(MarketPlaceAddress, MarketPlaceABI, web3signer));
        setNFTContract(new ethers.Contract(NFTaddress, NFTABI, web3signer));
    };
 
    function fromUnixTimestamp(unixTimestamp) {
        if (typeof unixTimestamp === 'bigint') {
          unixTimestamp = Number(unixTimestamp);
        }
        const date = new Date(unixTimestamp * 1000);
        return date.toISOString();
    }

    const toUnixTimestamp = (dateTimeString) => {
        let formattedString = dateTimeString.replace(' ', 'T');
        let date = new Date(formattedString);
        return Math.floor(date.getTime() / 1000);
    };
    
    const getMarketItems = async () =>
    {
        try 
        {
            // if(!signer){
            //     return [];
            // }
            // const result = await MarketPlaceContract.getAllActiveItems();
            let web3;
            try{
                web3 = new Web3(process.env.REACT_APP_CHAIN_ADDRESS_TESTING);
            }catch{
                try{
                    web3 = new Web3(process.env.REACT_APP_CHAIN_ADDRESS_TESTING1);
                }catch{
                    try{
                        web3 = new Web3(process.env.REACT_APP_CHAIN_ADDRESS_TESTING2);
                    }catch{
                        try{
                            web3 = new Web3(process.env.REACT_APP_CHAIN_ADDRESS_TESTING3);
                        }catch{
                            try{
                                web3 = new Web3(process.env.REACT_APP_CHAIN_ADDRESS_TESTING4);   
                            }catch{
                                web3 = new Web3(process.env.REACT_APP_CHAIN_ADDRESS_TESTING5);
                            }
                        }
                    }
                }
            }
            const contract = new web3.eth.Contract(MarketPlaceABI, MarketPlaceAddress);
            const result = await contract.methods.getAllActiveItems().call();
            setMarketItemList(result);
            return result;
        }
        catch (error) 
        {
            setMarketItemList([]);
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
            return NaN;
        }
      }

    const buyMarketItem = async (_itemId, _price) => 
    {
        try 
        {
            const weiPrice  = ethers.utils.parseUnits(_price, "ether");
            console.log(weiPrice);
            const tx = await MarketPlaceContract.purchaseMarketItem(_itemId, {
                value: weiPrice
            });
            const receipt = await tx.wait();
            
            if (receipt.status === 1) {

                const event = receipt.events.find(event => event.event === 'MarketItemPurchased');
    
                if (event) {
    
                    const [itemId, buyer, price] = event.args;
    
                    console.log(`Event Result: itemId=${itemId.toString()}, buyer=${buyer.toString()}, price=${formatPrice(price)}`);
                
                    return {"itemId":itemId.toString(), "buyer":buyer.toString(), "price":formatPrice(price)};

                }else{
                    throw new Error("not received success event");
                }
            }else{
                throw new Error("Fail to buy market item");
            }
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
            const web3 = new Web3(process.env.REACT_APP_CHAIN_ADDRESS_TESTING);
            const contract = new web3.eth.Contract(MarketPlaceABI, MarketPlaceAddress);
            const response = await contract.methods.getMarketItem(itemId).call();
            //const response = await MarketPlaceContract.getMarketItem(itemId);
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
        try {
            // Convert Wei to Ether
            let etherValue = ethers.utils.formatEther(price);
            return etherValue.toString();
        } catch (error) {
            console.error(error);
            return 'N/A';
        }
    }

    const changeItemStateAndPrice = async (_itemId, _price) => 
    {
        try 
        {
            console.log(_price);
            const weiPrice  = ethers.utils.parseUnits(_price, "ether");
            const tx = await MarketPlaceContract.changeItemPrice(_itemId, weiPrice);
            const receipt = await tx.wait();
            
            if (receipt.status === 1) {
                return true;
            }else{
                return false;
            }
        }
        catch (error) 
        {
            console.error(error);
            return false;
        }
    }

    
    const createMarketItem = async (_tokenURI, _price, _dataType, _isAuction, _startTime, _endTime) => {
        try {
            // Ensure web3, connectWallet, and NFTContract are properly defined and initialized
            if (!NFTContract) {
                throw new Error("Required dependencies are not defined");
            }
    
            // Convert the price to Wei
            const priceInWei = ethers.utils.parseEther(_price.toString());

            // Check if account is fetched
            if (!provider) {
                throw new Error("No account found. Please connect your wallet.");
            }
    
            // Get the mint price
            const _mintPrice = await mintPrice();
    
            console.log(_mintPrice, _tokenURI, await signer.getAddress(), priceInWei);
    
            // Mint the NFT
            const tx = await NFTContract.mintNFT(_tokenURI,  {
                value: _mintPrice
            });
            const receipt = await tx.wait();
            
            if (receipt.status === 1) {

                const event = receipt.events.find(event => event.event === 'TokenCreated');
    
                if (event) {
    
                    const [tokenId, owner, tokenURI] = event.args;
    
                    console.log(`Event Result: tokenId=${tokenId.toString()}, owner=${owner.toString()}, tokenURI=${tokenURI}`);
                    
                    const market_tx = await MarketPlaceContract.addMarketItem(NFTaddress, [parseInt(tokenId)], priceInWei, _dataType, _isAuction, _startTime, _endTime); 
                    
                    const market_receipt = await market_tx.wait();
                    
                    if (market_receipt.status===1){
                        
                        const _event = market_receipt.events.find(new_event => new_event.event === 'MarketItemAdded');
        
                        if (_event) {
                            const [itemId, nftContract, tokenIds, seller, price, isAuction, startTime, endTime ] = _event.args;
                            console.log(`Event Result: itemId=${itemId}, nftContract=${nftContract}, tokenIds=${tokenIds}, seller=${seller}, price=${price},isAuction=${isAuction}, startTime=${startTime}, endTime=${endTime}`);
                            return {"itemId":itemId, "nftContract": nftContract, "tokenIds": [tokenId], 
                                "seller": seller, "price": price, "isAuction": isAuction, "startTime": startTime, "endTime": endTime};
                        }else{
                            throw new Error("not received success event");
                        }
                        
                    }else{
                        throw new Error("Fail to add item to MarketPlace");
                    }
                }
            }else{
                throw new Error("could not mint NFT");
            }

    
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


    const bid = async (_itemId, _price) => {
        try 
        {
            console.log(_price);
            const weiPrice  = ethers.utils.parseUnits(_price, "ether");
            console.log(weiPrice);
            const tx = await MarketPlaceContract.bid(_itemId, {
                value: weiPrice
            });
            const receipt = await tx.wait();
                        
            if (receipt.status === 1) {

                const event = receipt.events.find(event => event.event === 'BidPlaced');
                
                if (event) {
    
                    const [auctionId, bidder, amount] = event.args;
    
                    console.log(`Event Result: itemId=${auctionId}, bidder=${bidder}, price=${formatPrice(amount)}`);
                
                    return {"itemId":parseInt(auctionId), "bidder": bidder, "price":formatPrice(amount)};

                }else{
                    throw new Error("not received success event");
                }
            }else{
                throw new Error("Fail to bid market item");
            }
        }
        catch (error) 
        {
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
        <NFTMarketplaceContext.Provider value={{ formatPrice ,buyMarketItem, getMarketItem, getMarketItems, addMarketItem, removeMarketItem, bid,
            changeItemStateAndPrice, getUserMarketItems, marketItemList, createMarketItem, getBalance, getAccounts, connectWallet, updateProvider, fromUnixTimestamp, toUnixTimestamp }}>
            {children}
        </NFTMarketplaceContext.Provider>
    );
};

