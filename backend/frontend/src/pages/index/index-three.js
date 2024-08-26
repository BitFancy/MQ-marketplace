import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import { data } from '../../data/data';
import TinySlider from "tiny-slider-react";
import Feature from '../../components/feature';
import CollectionTwo from '../../components/collection-two';
import AuctionsTwo from '../../components/auctions-two';
import CreatorTwo from '../../components/creator-two';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';
import Switcher from '../../components/switcher';
import {LuClock} from "../../assets/icons/vander"

const settings = {
    controls: false,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    speed: 400,
    gutter: 12,
    responsive: {
        1025: {
            items: 5
        },

        992: {
            items: 4
        },

        767: {
            items: 3
        },

        425: {
            items: 1
        },
    },

}

export default function IndexThree() {
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
            <Navbar />
            <section className="relative pt-24 overflow-hidden">
                <div className="container-fluid">
                    <div className="grid grid-cols-1 relative">
                        <div className="tiny-five-item">

                            <TinySlider settings={settings}>
                                {gridData.map((el, index) => (
                                    <div className="tiny-slide" key={index}>
                                        <div className="group relative overflow-hidden p-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:shadow-md dark:shadow-md hover:dark:shadow-gray-700 transition-all duration-500 h-fit m-2">
                                            <div className="relative overflow-hidden">
                                                <div className="relative overflow-hidden rounded-lg">
                                                    <img src={el.image} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />
                                                </div>

                                                <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                                    <Link to={`/item-detail/${el.id}`} className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-lightning-bolt"></i> Buy Now</Link>
                                                </div>

                                                <div className="absolute top-2 end-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                    <Link to="/" className="btn btn-icon btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-plus"></i></Link>
                                                </div>
                                                {el.date ?
                                                    <div className="absolute bottom-2 start-0 end-0 mx-auto text-center bg-gradient-to-r from-violet-600 to-red-600 text-white inline-table text-lg px-3 rounded-full">
                                                            <LuClock className=" align-middle me-1 inline"/> <small id="auction-item-2" className="font-bold">
                                                            {el.remaining?.days} : {el.remaining?.hours}: {el.remaining?.minutes}: {el.remaining?.seconds}
                                                        </small>
                                                    </div> : ""
                                                    }
                                            </div>

                                            <div className="mt-3">
                                                <div className="flex items-center">
                                                    <img src={el.avatar} className="rounded-full h-8 w-8" alt="" />
                                                    <Link to={`/creator-profile/${el.id}`} className="ms-2 text-[15px] font-medium text-slate-400 hover:text-violet-600">{el.subtext}</Link>
                                                </div>

                                                <div className="my-3">
                                                    <Link to={`/item-detail/${el.id}`} className="font-semibold hover:text-violet-600">{el.title}</Link>
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
                                    </div>
                                ))}
                            </TinySlider>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative md:pb-24 pb-16">
                <Feature />
                <CollectionTwo title="Top Collection" description="We are a huge marketplace dedicated to connecting great artists of all Giglink with their fans and unique token collectors!" />
                <AuctionsTwo title="Live Auctions"  description="We are a huge marketplace dedicated to connecting great artists of all Giglink with their fans and unique token collectors!"
                     />

                <CreatorTwo title="Creators & Seller" description="We are a huge marketplace dedicated to connecting great artists of all Giglink with their fans and unique token collectors!"
                     /> 
            </section>
            <Footer />
            <Switcher />
        </>
    )
}
