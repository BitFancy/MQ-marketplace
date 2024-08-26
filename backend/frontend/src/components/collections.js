
import React, { useEffect } from 'react'
import TinySlider from "tiny-slider-react";
import '../../node_modules/tiny-slider/dist/tiny-slider.css';
import { Link } from 'react-router-dom';
import { data } from '../data/data';
import {MdOutlineArrowForward} from "../assets/icons/vander"

const settings = {
    lazyload: true,
    controls: true,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
    nav: false,
    speed: 400,
    gutter: 0,
    responsive: {
        1025: {
            items: 4
        },

        992: {
            items: 3
        },

        767: {
            items: 2
        },
        320: {
            items: 1
        },
    },
}

export default function Collections() {
    // useEffect(() => {
    //     console.log(data);
    //     console.log(typeof data);
    // }, []);

    return (
        <>
            <div className="container md:mt-36 mt-24">
                <div className="md:flex justify-between items-center">
                    <div className="md:w-10/12 md:text-start text-center">
                        <h3 className="md:text-[30px] text-[26px] font-semibold">Top Collections</h3>
                    </div>
                    <div className="md:w-2/12 text-end md:block hidden">
                        <Link to="/collections" className="btn btn-link text-[16px] font-medium hover:text-violet-600 after:bg-violet-600 duration-500 ease-in-out inline-flex items-center">See More <MdOutlineArrowForward className="text-sm ms-1"/></Link>
                    </div>
                </div>

                <div className="grid relative grid-cols-1 mt-10">
                    <div className="tiny-four-icon-item">
                        <TinySlider settings={settings}>
                            {
                                data.map((item, index) => (
                                    <div className="tiny-slide" key={index}>
                                        <div className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-lg p-3 shadow dark:shadow-gray-800 ease-in-out duration-500 m-2">
                                            <img src={item.image} className="rounded-lg" alt="" />

                                            <div className="relative p-4 -mt-14">
                                                <div className="relative inline-block">
                                                    <img src={item.avatar} className="h-16 rounded-md shadow-md dark:shadow-gray-800" alt="" />
                                                    <i className="mdi mdi-check-decagram text-emerald-600 text-2xl absolute -bottom-3 -end-2"></i>
                                                </div>

                                                <div className="mt-3">
                                                    <Link to="/explore-one" className="font-semibold block text-[18px] hover:text-violet-600">{item.title}</Link>
                                                    <span className="text-slate-400 mt-1 text-sm"><span className="italic">by</span> <Link to={`/creator-profile/${item.id}`}className="text-violet-600 font-medium">{item.subtext}</Link></span>
                                                    <span className="text-slate-400 block text-[16px] mt-1">{item.items} Items</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                        </TinySlider>

                    </div>
                </div>

                <div className="grid grid-cols-1 mt-6 md:hidden">
                    <div className="text-center">
                        <Link to="/collections" className="btn btn-link text-[16px] font-medium hover:text-violet-600 after:bg-violet-600 duration-500 ease-in-out inline-flex items-center">See More <MdOutlineArrowForward className="text-sm ms-1"/></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
