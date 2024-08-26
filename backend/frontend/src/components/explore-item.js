import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { data } from '../data/data';
import {LuClock} from "../assets/icons/vander"

export default function ExploreTtem({title}) {
    const [gridData, setData] = useState(data);
    useEffect(() => {
        const interval = setInterval(() => {
            remainingDays();
        }, 1000);

        return () => clearInterval(interval);
    });

    const remainingDays = () => {
        const formattedData = data.map((item) => ({
            ...item,
            remaining: calculateDays(item.date),
        }));
        setData(formattedData);
    }

    const calculateDays = (date) => {
        let startDate = new Date(date);
        let currentDate = new Date();
        const diff = startDate.getTime() - currentDate.getTime();

        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        return { hours, minutes, seconds, days }
    }

    return (
        <>
            <div className="container md:mt-24 mt-16">
                <div className="grid grid-cols-1 text-center">
                    <h3 className="md:text-[30px] text-[26px] font-semibold">{title}</h3>
                </div>

                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-10 gap-[30px]">
                    {
                        gridData.slice(0,8).map((item, index) => (
                            <div key={index} className="group relative p-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:shadow-md dark:shadow-md hover:dark:shadow-gray-700 transition-all duration-500 h-fit">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg -mt-1 group-hover:-mt-2 -ms-1 group-hover:-ms-2 h-[98%] w-[98%] -z-1 transition-all duration-500"></div>
                                <div className="relative overflow-hidden">
                                    <div className="relative overflow-hidden rounded-lg">
                                        <img src={item.image} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />
                                    </div>

                                    <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                        <Link to={`/item-detail/${item.id}`} className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-lightning-bolt"></i> Buy Now</Link>
                                    </div>

                                    <div className="absolute top-2 end-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <Link to="#" className="btn btn-icon btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-plus"></i></Link>
                                    </div>
                                    {item.date ?
                                    <div className="absolute bottom-2 start-0 end-0 mx-auto text-center bg-gradient-to-r from-violet-600 to-red-600 text-white inline-table text-lg px-3 rounded-full">
                                        <LuClock className="inline me-2 text-base"/><small id="auction-item-2" className="font-bold">
                                            {item.remaining?.days} : {item.remaining?.hours}: {item.remaining?.minutes}: {item.remaining?.seconds}
                                        </small>
                                    </div> : ""
                                     }
                                </div>

                                <div className="mt-3">
                                    <div className="flex items-center">
                                        <img src={item.avatar} className="rounded-full h-8 w-8" alt="" />
                                        <Link to={`/creator-profile/${item.id}`} className="ms-2 text-[15px] font-medium text-slate-400 hover:text-violet-600">{item.subtext}</Link>
                                    </div>

                                    <div className="my-3">
                                        <Link to={`/item-detail/${item.id}`} className="font-semibold hover:text-violet-600">{item.title}</Link>
                                    </div>

                                    <div className="flex justify-between p-2 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700">
                                        <div>
                                            <span className="text-[16px] font-medium text-slate-400 block">Price</span>
                                            <span className="text-[16px] font-semibold block"><i className="mdi mdi-ethereum"></i> 3.5 ETH</span>
                                        </div>

                                        <div>
                                            <span className="text-[16px] font-medium text-slate-400 block">Highest Bid</span>
                                            <span className="text-[16px] font-semibold block"><i className="mdi mdi-ethereum"></i> 3.55 ETH</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
