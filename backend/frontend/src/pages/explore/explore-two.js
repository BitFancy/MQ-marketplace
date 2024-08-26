import React from 'react'
import Navbar from '../../components/navbar'
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Switcher from '../../components/switcher';
import { data } from '../../data/data';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight, LuSearch} from "../../assets/icons/vander"

export default function ExploreTwo() {
    
    return (
        <>
            <Navbar />
            <section className="relative table w-full py-36 bg-[url('../../assets/images/bg/bg1.jpg')] bg-bottom bg-no-repeat">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">Explore Items</h3>

                    </div>
                </div>

                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/index">Giglink</Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white" aria-current="page">Explore</li>
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
                    <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-[30px]">
                        <div className="lg:col-span-3">
                            <div className="shadow dark:shadow-gray-700 p-6 rounded-md bg-white dark:bg-slate-900 sticky top-20">
                                <form>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div>
                                            <label htmlFor="searchname" className="form-label font-semibold dark:text-white text-[15px]">Search Company</label>
                                            <div className="relative mt-2">
                                                <LuSearch className="text-lg absolute top-2 start-3"/>
                                                <input name="search" id="searchname" type="text" className="form-input w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0" placeholder="Search" />
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <label className="form-label font-semibold dark:text-white text-[15px]">Categories:</label>
                                            <select className="form-select form-input mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0">
                                                <option>Art</option>
                                                <option>Music</option>
                                                <option>Domain Names</option>
                                                <option>Virtual World</option>
                                                <option>Trading Cards</option>
                                                <option>Sports</option>
                                            </select>
                                        </div>

                                        <div className="mt-2">
                                            <label className="form-label font-semibold dark:text-white text-[15px]">Items:</label>
                                            <select className="form-select form-input mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0">
                                                <option>Buy Now</option>
                                                <option>Auctions</option>
                                                <option>Offers</option>
                                            </select>
                                        </div>

                                        <div className="mt-2">
                                            <label className="form-label font-semibold dark:text-white text-[15px]">Sort By:</label>
                                            <select className="form-select form-input mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0">
                                                <option>Top Rated</option>
                                                <option>Lower Rated</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-9">
                            <div className="grid lg:grid-cols-3 grid-cols-1 gap-[30px]">
                                {
                                    data.map((item, index) => (
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
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Switcher />
        </>
    )
}
