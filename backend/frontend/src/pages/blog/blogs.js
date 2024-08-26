import React from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Switcher from '../../components/switcher';
import { Link } from 'react-router-dom';
import {LuClock, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineArrowForward, LuCalendarDays} from "../../assets/icons/vander"
import { blogData } from '../../data/data';

export default function Blogs() {
    return (
        <>
            <Navbar />

            <section className="relative table w-full py-36 bg-[url('../../assets/images/bg/bg1.jpg')] bg-bottom bg-no-repeat">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">Blog & News</h3>
                    </div>
                </div>

                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/">Giglink</Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white" aria-current="page">Blogs</li>
                    </ul>
                </div>
            </section>
            <div className="relative">
                <div className="shape absolute start-0 end-0 sm:-bottom-px -bottom-[2px] overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg className="w-full h-auto" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <section className="relative md:py-24 py-16">
                <div className="container">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
                        {
                            blogData.map((ele, index) => (
                                <div key={index} className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700 hover:shadow-md transition-all duration-500">
                                    <img src={ele.image} alt="" />

                                    <div className="relative p-6">
                                        <div className="absolute start-6 -top-4">
                                            <span className="bg-violet-600 text-white text-[12px] px-2.5 py-1 font-semibold rounded-full h-5">{ele.category}</span>
                                        </div>

                                        <div className="">
                                            <div className="flex mb-4">
                                                <span className="text-slate-400 text-[16px] inline-flex items-center"><LuCalendarDays className="text-slate-900 dark:text-white me-2"/>{ele.date}</span>
                                                <span className="text-slate-400 text-[16px] ms-3 inline-flex items-center"><LuClock className="text-slate-900 dark:text-white me-2"/>5 min read</span>
                                            </div>

                                            <Link to={`/blog-detail/${ele.id}`} className="title text-lg font-medium hover:text-violet-600 duration-500 ease-in-out">{ele.title}</Link>

                                            <div className="flex justify-between mt-4">
                                                <Link to={`/blog-detail/${ele.id}`} className="btn btn-link text-[16px] font-medium hover:text-violet-600 after:bg-violet-600 duration-500 ease-in-out inline-flex items-center">Read More <MdOutlineArrowForward className="ms-1 text-base"/></Link>
                                                <span className="text-slate-400 text-[16px]">by <Link to={`/creator-profile/${ele.id}`} className="text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-600 font-medium">{ele.subtext}</Link></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                    <div className="md:col-span-12 text-center">
                        <nav>
                            <ul className="inline-flex items-center -space-x-px">
                                <li>
                                    <Link to="/" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">
                                        <MdKeyboardArrowLeft className="text-[20px]"/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">1</Link>
                                </li>
                                <li>
                                    <Link to="/" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">2</Link>
                                </li>
                                <li>
                                    <Link to="/" aria-current="page" className="z-10 w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-white bg-violet-600 shadow-sm dark:shadow-gray-700">3</Link>
                                </li>
                                <li>
                                    <Link to="/" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">4</Link>
                                </li>
                                <li>
                                    <Link to="/" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">
                                        <MdKeyboardArrowRight className="text-[20px]"/>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </section >
            <Footer />
            {/* <Switcher /> */}
        </>
    )
}
