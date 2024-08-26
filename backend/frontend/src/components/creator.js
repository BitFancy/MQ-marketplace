import React, { useEffect, useState, useContext }  from 'react';
import { Link } from 'react-router-dom';
import { data } from '../data/data';
import {FiUserPlus} from "../assets/icons/vander"
import { useNFTMarketplace } from '../contexts/NFTMarketplaceContext';
import UserContext from '../contexts/UserContext';
import axios from 'axios';
import { availableMemory } from 'process';

export default function Creator(props) {
    const { marketItemList  } = useNFTMarketplace();
    const { title, description } = props;
    const [ sellerList, setSellerList] = useState([]);
    const {  getUserAvatar } = useContext(UserContext);
    useEffect(() => {
        const fetchData = async () => {
            // Count the number of items each seller sells
            const sellerCounts = marketItemList.reduce((acc, item) => {
                acc[item.seller] = (acc[item.seller] || 0) + 1;
                return acc;
            }, {});
            // sellerCounts will be: { SellerA: 2, SellerB: 2, SellerC: 1 }
            
            // Convert sellerCounts object to an array of [sellerName, count] pairs
            const sellerArray = Object.entries(sellerCounts);
            
            // Sort this array based on the count in descending order
            sellerArray.sort((a, b) => b[1] - a[1]);
            
            // Extract the sorted list of sellers from the sorted array
            const sortedSellers = sellerArray.map(seller => seller[0]);
            var sortedSellerDatas = sortedSellers.map((seller)=>{
               return { avatar: null, art_name: 'unnamed', address: seller, itemCount: sellerCounts[seller]}
            });
            setSellerList(sortedSellerDatas);
            sortedSellerDatas = [];
            // Fetch additional data for each seller
            for (let seller of sortedSellers) {
                try{
                    let user_data = await axios.get(process.env.REACT_APP_API_ADDRESS + '/user/details/' + seller);
                    console.log(user_data);
                    let userInfo = user_data.data.result.data;
                    sortedSellerDatas.push({avatar: getUserAvatar(userInfo), art_name: userInfo.art_name??'unnamed', address: seller, itemCount: sellerCounts[seller]});
                } catch (e) {
                    sortedSellerDatas.push({avatar: null, art_name: 'unnamed', itemCount: sellerCounts[seller], address:seller});
                }
            }
            console.log(sortedSellerDatas);
            if (sortedSellerDatas.length > 0) {
                setSellerList(sortedSellerDatas);
            }
        }

        fetchData();

    }, [marketItemList]);

    return (
        <div className="container md:mt-24 mt-16">
            <div className="grid grid-cols-1 text-center">
                <h3 className="mb-4 md:text-3xl text-2xl md:leading-snug leading-snug font-semibold">{title}</h3>
                <p className="text-slate-400 max-w-xl mx-auto">{description}</p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-10 gap-[30px]">
            {
                sellerList.slice(0, 9).map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-md bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 overflow-hidden">
                        <div className="flex items-center">
                            <div className="relative inline-block">
                                <img src={item.avatar ?? `/avatar/${Math.ceil(Math.random() * 7 + 1)}.jpg`} className="h-16 rounded-md" alt="" />
                                <i className="mdi mdi-check-decagram text-emerald-600 text-lg absolute -top-2 -end-2"></i>
                            </div>

                            <div className="ms-3 overflow-hidden">
                                <Link to={`/creator-profile/${item.address}`} className="font-semibold block hover:text-violet-600">
                                    {item.art_name}
                                    <br />
                                    {item.address}
                                    <br/>
                                    Selling Items: {item.itemCount}
                                </Link>
                            </div>
                        </div>
                        
                        <Link to="#" className="btn btn-icon rounded-full bg-violet-600/5 hover:bg-violet-600 border-violet-600/10 hover:border-violet-600 text-violet-600 hover:text-white">
                            <FiUserPlus className='text-[20px]' />
                        </Link>
                    </div>
                ))
            }
            </div>
        </div>
    )
}
