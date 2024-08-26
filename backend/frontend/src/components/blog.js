import React from 'react'
import { Link } from 'react-router-dom';
import { blogData } from '../data/data';
import {LuClock, MdOutlineArrowForward, LuCalendarDays} from '../assets/icons/vander'

export default function blog() {
    return (
        <div className="container lg:mt-24 mt-16">
            <div className="grid grid-cols-1 pb-8 text-center">
                <h3 className="mb-4 md:text-3xl text-2xl md:leading-snug leading-snug font-semibold">Latest Blog or News</h3>

                <p className="text-slate-400 max-w-xl mx-auto">We are a huge marketplace dedicated to connecting great artists of all Giglink with their fans and unique token collectors!</p>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
                {blogData.slice(0,3).map((item,index)=>{
                    return(
                        <div key={index} className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700 hover:shadow-md transition-all duration-500">
                            <img src={item.image} alt="" />

                            <div className="relative p-6">
                                <div className="absolute start-6 -top-4">
                                    <span className="bg-violet-600 text-white text-[12px] px-2.5 py-1 font-semibold rounded-full h-5">{item.category}</span>
                                </div>

                                <div className="">
                                    <div className="flex mb-4">
                                        <span className="text-slate-400 text-[16px] inline-flex items-center"><LuCalendarDays className="text-slate-900 dark:text-white me-2"/>{item.date}</span>
                                        <span className="text-slate-400 text-[16px] ms-3 inline-flex items-center"><LuClock className="text-slate-900 dark:text-white me-2 text-base"/>5 min read</span>
                                    </div>

                                    <Link to={`/blog-detail/${item.id}`} className="title text-lg font-medium hover:text-violet-600 duration-500 ease-in-out">{item.title}</Link>

                                    <div className="flex justify-between mt-4">
                                        <Link to={`/blog-detail/${item.id}`} className="btn btn-link text-[16px] font-medium hover:text-violet-600 after:bg-violet-600 duration-500 ease-in-out inline-flex items-center">Read More <MdOutlineArrowForward className='text-sm ms-1'/></Link>
                                        <span className="text-slate-400 text-[16px]">by <Link to="/creator-profile" className="text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-600 font-medium">{item.subtext}</Link></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
