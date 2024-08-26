import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { FaTable, ImTab, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineArrowForward } from "../assets/icons/vander";
import { useNFTMarketplace } from '../contexts/NFTMarketplaceContext';
import { filter, forEach } from 'lodash';
import { BotanixTestnet } from '@particle-network/chains';
import LazyLoad from 'react-lazyload';
import {ethers} from 'ethers';
import misc from '../constants/misc';

export default function DiscoverItems({ title, showAuction, showSale, pagination, dataType, searchString, seller, itemCountPerPage=4, rate=true }) {
    const { formatPrice, getMarketItems, fromUnixTimestamp, marketItemList  } = useNFTMarketplace();
    const [tokenDataList, setTokenDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItemCount, setTotalItemCount] = useState(0);
    function  bigIntReplacer(key, value) {
        return typeof value === 'bigint' ? value.toString() : value;
    }
    
    const convertPrice = (price) => {
        try {
            let etherValue = ethers.utils.formatEther(price);
            return parseFloat(etherValue); // Convert to number for comparison
        } catch (error) {
            console.error(error);
            return NaN; // Return NaN in case of error for safety
        }
    };
    
    useEffect(() => {
        const resizeItems = () => {
            const items = document.querySelectorAll('.group.relative');
            const rows = [];
            let row = [];

            items.forEach((item, index) => {
                row.push(item);
                const itemTop = item.getBoundingClientRect().top;
                if (index === items.length - 1 || itemTop !== items[index + 1]?.getBoundingClientRect().top) {
                    rows.push(row);
                    row = [];
                }
            });

            rows.forEach(row => {
                let maxHeight = 0;
                let maxImageHeight = 0;

                row.forEach(item => {
                    const itemHeight = item.offsetHeight;
                    const image = item.querySelector('img');
                    const imageHeight = image.offsetHeight;

                    if (itemHeight > maxHeight) {
                        maxHeight = itemHeight;
                    }
                    if (imageHeight > maxImageHeight) {
                        maxImageHeight = imageHeight;
                    }
                });

                row.forEach(item => {
                    item.style.height = `${maxHeight}px`;
                    const image = item.querySelector('img');
                    image.style.height = `${maxImageHeight}px`;
                    //image.style.objectFit = 'cover';
                });
            });
        };

        resizeItems();
        window.addEventListener('resize', resizeItems);
        return () => {
            window.removeEventListener('resize', resizeItems);
        };
    }, [tokenDataList]);

    const fetchSmartContractMarketItem = async (tokenItems) => {
        if (!tokenItems || !Array.isArray(tokenItems) || !tokenItems.length) {
            return [];
        }
        

        let arr = [];
        for (let item of tokenItems) {
            try {
                const uri = item?.tokenURIs[0];
                if (!uri || !(uri.startsWith('http://') || uri.startsWith('https://'))) {
                    continue;
                }
                const response = await axios.get(uri);
                const {name, description, image} = response.data;
                const obtainedItem = {...item};
                obtainedItem.dataType = item.description;
                delete obtainedItem.description;
                if (!image) {
                    continue;
                }
                arr.push({ ...obtainedItem, name, description, image });
            } catch (error) {
                console.log(error);
                continue;
            }
        }
        return arr;
    };
    useEffect(()=>{
        const loadContextMarketItemList = async() =>{
            await getMarketItems();    
        }
        loadContextMarketItemList();
    }, []);

    useEffect(() => {
        const loadMarketItemList = async () => {
            if (!marketItemList ||!Array.isArray(marketItemList) ||!marketItemList.length) {
                setTokenDataList([]);
                return;
            }
            const fetchedItems = await fetchSmartContractMarketItem(marketItemList);
            const filteredArray =  fetchedItems.filter(item => {
                try{
                    if ((item.isAuction && showAuction)||(!item.isAuction && showSale)) 
                        if((!dataType)||(item.dataType === dataType))
                            if ((!seller)||(item.seller.toUpperCase() === seller.toUpperCase()))                                
                                if ((!searchString) || (JSON.stringify(item, bigIntReplacer).includes(searchString)))
                                    return true;
                    return false;
                }
                catch (e)
                {
                    console.log(e);
                    return false;
                }
            }
            );
        
            if(rate)
                filteredArray.sort((a, b) => convertPrice(b.price)  - convertPrice(a.price));
            else
                filteredArray.sort((a, b) => convertPrice(a.price)  - convertPrice(b.price));

            setTotalItemCount(filteredArray.length);
            const currentPageItems = filteredArray.slice((currentPage-1)*itemCountPerPage, Math.min(currentPage*itemCountPerPage, fetchedItems.length)); 
            setTokenDataList(currentPageItems);
        };
        loadMarketItemList();
    }, [marketItemList, showAuction, showSale, currentPage, dataType, searchString, rate]);
    
    return (
        <>
            <div className="container">
                {(tokenDataList.length>0) &&
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-10 gap-[30px]">
                    { tokenDataList.map((item, index) => 
                        
                        <div key={index} className="group relative overflow-hidden p-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:shadow-md dark:shadow-md hover:dark:shadow-gray-700 transition-all duration-500 hover:-mt-2 h-fit">
                            <div className="relative overflow-hidden">
                                <div className="relative overflow-hidden rounded-lg">
                                {/* <LazyLoad height={250} offset={100} placeholder={<img src="placeholder.jpg" alt="loading..." />}> 
                                    <img
                                        src={String(item.image)}
                                        className="w-96 h-96 rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500"
                                        alt="NFT"
                                        onError={handleImageError}
                                    />
                                </LazyLoad> */}
                                    <img src={String(item.image)} className="w-full h-52 rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="loading..." />
                                </div>
                                <h4 style={{ color: item.isAuction ? 'orange' : 'cyan' }}>
                                    {item.isAuction ? 'On Auction' : 'On Sale'}
                                </h4>
                                <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                    <Link to={`/item-detail/${item.itemId}`} className={`btn btn-sm rounded-full ${item.isAuction? 'bg-violet-600': 'bg-violet-400'}  hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white`}>
                                    <i className="mdi mdi-lightning-bolt"></i>{item.isAuction ? 'Bid Now' : 'Buy Now'}
                                    </Link>
                                </div>
                                <div className="absolute top-2 end-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <Link to="#" className="btn btn-icon btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-plus"></i></Link>
                                </div>
                            </div>
                            <div className="mt-3">
                                {/* <div className="flex items-center">
                                    <Link to={`/creator-profile/${item.seller}`} className="font-semibold hover:text-violet-600">
                                        <span className="text-[14px] font-semibold block">Seller: {item.seller} </span>
                                    </Link>
                                </div> */}
                                <div className="my-3 w-full h-14">
                                    <Link to={`/item-detail/${item.itemId}`} className="font-semibold hover:text-violet-600">
                                        <span className="text-[14px] font-semibold block">Description: {item.description}
                                        {item.isAuction && 
                                        <>
                                        <p>Start: {fromUnixTimestamp(item.startTime)}</p>
                                        End: {fromUnixTimestamp(item.endTime)}
                                        </>
                                        }
                                        </span>

                                    </Link>
                                </div>
                                <div className="flex justify-between p-2 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700">
                                    <span className="text-[14px] font-semibold block">{item.isAuction? 'Highest Bid': 'Price'}<br></br><i className="mdi mdi-ethereum"></i> {formatPrice(item.price)} {misc.currency}</span>
                                </div>
                            </div>
                        </div>
                         
                    )}
                </div>
                }
                {
                    pagination ? (
                        <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                            <div className="md:col-span-12 text-center">
                                <nav>
                                    <ul className="inline-flex items-center -space-x-px">
                                        <li>
                                            <div to="#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">
                                                <MdKeyboardArrowLeft className="text-[20px]" onClick={() => setCurrentPage(Math.max(currentPage-4, 1))}/>
                                            </div>
                                        </li>
                                        { [...Array(Math.ceil(totalItemCount/itemCountPerPage)).keys()].map((index, page) => 
                                            ((page >= currentPage-2) && (page <= currentPage+2)) &&
                                                (                              
                                                (page+1 === currentPage) ?
                                                <li key={index}>
                                                <div aria-current="page" className="z-10 w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-white bg-violet-600 shadow-sm dark:shadow-gray-700">{page+1}</div>
                                                </li>
                                                :
                                                <li key={index}>          
                                                <div  onClick={()=>setCurrentPage(page+1)} className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">{page+1}</div>
                                                </li>
                                                )
                                            )    
                                        }
                                        <li>
                                            <div className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">
                                                <MdKeyboardArrowRight className="text-[20px]" onClick={() => setCurrentPage(Math.min(currentPage+4, Math.ceil(totalItemCount/itemCountPerPage)))}/>
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                    ) : (<></>)
                }

                {
                    title !== undefined ? (
                        <div className="grid grid-cols-1 mt-6">
                            <div className="text-center">
                                <Link to="/explore-one" className="btn btn-link text-[16px] font-medium hover:text-violet-600 after:bg-violet-600 duration-500 ease-in-out inline-flex items-center">Explore More <MdOutlineArrowForward className="ms-1 text-sm"/></Link>
                            </div>
                        </div>
                    ) : (<></>)
                }

            </div>
        </>
    )
}
