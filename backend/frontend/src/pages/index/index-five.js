import React, { useEffect } from 'react'
import { data } from '../../data/data';
import { Link } from 'react-router-dom';

import Navbar from '../../components/navbar'
import TinySlider from "tiny-slider-react";
import CreatorThree from '../../components/creator-three';
import Feature from '../../components/feature';
import Blog from '../../components/blog';
import GetTouch from '../../components/get-touch';
import Footer from '../../components/footer';
import ExploreTtem from '../../components/explore-item';
import Switcher from '../../components/switcher';

const settings = {
    items: 1,
    controls: true,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    nav: false,
    speed: 400,
    gutter: 0,
    controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>']
};
export default function IndexFive() {
    useEffect(() => {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
    }, []);
    return (
        <>
            <Navbar />
            <section className="relative lg:pt-24 pt-[74px] overflow-hidden">
                <div className="container-fluid lg:px-10 md:px-3 relative overflow-hidden">
                    <span className="absolute blur-[200px] w-[600px] h-[600px] rounded-full top-1/2 start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 bg-gradient-to-tl from-red-600/40 to-violet-600/40 dark:from-red-600/60 dark:to-violet-600/60"></span>
                    <div className="lg:py-24 py-[74px] md:rounded-lg shadow dark:shadow-gray-800 bg-violet-700/10 dark:bg-violet-600/20">
                        <div className="container">
                            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                                <div className="md:col-span-7">
                                    <div className="md:me-6">
                                        <h4 className="font-bold lg:leading-snug leading-snug text-4xl lg:text-6xl mb-4"><span className="bg-gradient-to-l from-red-600 to-violet-600 text-transparent bg-clip-text">Buy, sell,</span>    and <br /> showcase NFTs</h4>
                                        <p className="text-lg max-w-xl">We are a huge marketplace dedicated to connecting great artists of all Giglink with their fans and unique token collectors!</p>

                                        <div className="mt-6">
                                            <Link to="/explore-two" className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full me-2 mt-2">Explore Now</Link>
                                            <Link to="/upload-work" className="btn bg-transparent hover:bg-violet-600 border-violet-600 text-violet-600 hover:text-white rounded-full mt-2">Sell Now</Link>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden after:content-[''] after:absolute after:h-10 after:w-10 after:bg-violet-600/10 dark:after:bg-violet-600/30 after:-bottom-[50px] after:start-[30%] after:-z-1 after:rounded-full after:animate-ping"></div>
                                </div>

                                <div className="md:col-span-5 relative">
                                    <div className="tiny-one-icon-item">
                                        <TinySlider settings={settings}>
                                            {data.map((el, index) => (
                                                <div className="tiny-slide" key={index}>
                                                    <div className="m-2 p-3 bg-white dark:bg-slate-900 rounded-lg shadow dark:shadow-gray-800">
                                                        <Link to={`/item-detail/${el.id}`} className="group relative overflow-hidden rounded-lg">
                                                            <img src={el.image} className="rounded-lg" alt="" />

                                                            <span className="absolute bottom-5 start-5">
                                                                <span className="mb-2 block">
                                                                    <span className="font-semibold text-white">{el.title}</span>
                                                                </span>

                                                                <span className="flex items-center">
                                                                    <img src={el.avatar} className="rounded-full h-8 w-8" alt="" />
                                                                    <span className="ms-2 text-[15px] font-medium text-white">{el.subtext}</span>
                                                                </span>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </TinySlider>
                                    </div>

                                    <div className="overflow-hidden after:content-[''] after:absolute after:h-14 after:w-14 after:bg-violet-600/10 dark:after:bg-violet-600/30 after:-top-[50px] after:start-[30%] after:-z-1 after:rounded-lg after:animate-[spin_10s_linear_infinite]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative md:py-24 py-16">
                <CreatorThree title="Best Creators & Sellers of" description="Best sellers of the week's NFTs"/>

                <Feature />
                <ExploreTtem title="Explore Hot Items" />
                <Blog />
                <GetTouch />
            </section>
            <Footer />
            <Switcher />
        </>
    )
}
