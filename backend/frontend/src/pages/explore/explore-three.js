import React, { useState } from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer';
import Switcher from '../../components/switcher';
import { Link } from 'react-router-dom';
import { data } from '../../data/data';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight,PiBrowsersLight, MdOutlineSportsVolleyball, AiOutlinePieChart, LuMusic4, TbCameraPlus, PiRocketLaunchBold} from "../../assets/icons/vander"

export default function ExploreThree() {

    const [selectedCategory, setSelectedCategory] = useState(null);

  
    const matchCategory = (category) => {
        setSelectedCategory(category);
    };

    const filteredData = selectedCategory
        ? data.filter((item) => item.category === selectedCategory)
        : data;

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
                    <div className="grid grid-cols-1 items-center gap-[30px]">
                        <div className="filters-group-wrap text-center">
                            <div className="filters-group">
                                <ul className="mb-0 list-none container-filter-box filter-options">
                                    <li onClick={() => matchCategory(null)} className={`${selectedCategory === null ? 'active' : ''} inline-flex items-center font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-full transition duration-500 `} data-group="all"><PiBrowsersLight className='me-1'/>  All</li>
                                    <li onClick={() => matchCategory('Games')} className={`${selectedCategory === 'Games' ? 'active' : ''} inline-flex items-center font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-full transition duration-500`}><MdOutlineSportsVolleyball className="me-1"/> Games</li>
                                    <li onClick={() => matchCategory('Art')} className={`${selectedCategory === 'Art' ? 'active' : ''} inline-flex items-center font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-full transition duration-500`} data-group="art"><AiOutlinePieChart className="me-1"/> Art</li>
                                    <li onClick={() => matchCategory('Music')} className={`${selectedCategory === 'Music' ? 'active' : ''} inline-flex items-center font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-full transition duration-500`} data-group="music"><LuMusic4 className='me-1'/> Music</li>
                                    <li onClick={() => matchCategory('Video')} className={`${selectedCategory === 'Video' ? 'active' : ''} inline-flex items-center font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-full transition duration-500`} data-group="video"><TbCameraPlus className="me-1"/> Video</li>
                                    <li onClick={() => matchCategory('Memes')} className={`${selectedCategory === 'Memes' ? 'active' : ''} inline-flex items-center font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-full transition duration-500`} data-group="memes"><PiRocketLaunchBold className='me-1'/> Memes</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-4 gap-[30px]">
                        {
                            filteredData.map((item, index) => (
                                <div key={index} className="picture-item shuffle-item shuffle-item--visible" data-groups='["games"]'>
                                    <div className="group relative overflow-hidden p-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:shadow-md dark:shadow-md hover:dark:shadow-gray-700 transition-all duration-500 hover:-mt-2 h-fit">
                                        <div className="relative overflow-hidden">
                                            <div className="relative overflow-hidden rounded-lg">
                                                <img src={item.image} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />
                                            </div>

                                            <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                                <Link to={`/item-detail/${item.id}`} className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-lightning-bolt"></i> Buy Now</Link>
                                            </div>

                                            <div className="absolute top-2 end-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                <Link to="/" className="btn btn-icon btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-plus"></i></Link>
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
                                </div>
                            ))
                        }
                    </div>
                    <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                            <div className="md:col-span-12 text-center">
                                <nav>
                                    <ul className="inline-flex items-center -space-x-px">
                                        <li>
                                            <Link to="/#" className=" w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">
                                                <MdKeyboardArrowLeft className='text-[20px]'/>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">1</Link>
                                        </li>
                                        <li>
                                            <Link to="/#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">2</Link>
                                        </li>
                                        <li>
                                            <Link to="/#" aria-current="page" className="z-10 w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-white bg-violet-600 shadow-sm dark:shadow-gray-700">3</Link>
                                        </li>
                                        <li>
                                            <Link to="/#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">4</Link>
                                        </li>
                                        <li>
                                            <Link to="/#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">
                                                <MdKeyboardArrowRight className="text-[20px]"/>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                </div>
            </section>
            <Footer />
            <Switcher />
        </>
    )
}
