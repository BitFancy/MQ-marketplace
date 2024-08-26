import React, { useEffect } from 'react'
import image from '../../assets/images/items/1.gif';
import image1 from '../../assets/images/items/1.jpg';
import image2 from '../../assets/images/items/2.jpg';
import image3 from '../../assets/images/items/3.jpg';
import image4 from '../../assets/images/items/2.gif';
import image5 from '../../assets/images/items/4.jpg';
import image6 from '../../assets/images/items/3.gif';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Switcher from '../../components/switcher';
import { Link } from 'react-router-dom';
import {LuSearch, PiWalletBold, BsTag, PiFireSimpleBold, FiHeart, PiBrowsersLight,FiUsers,VscListFlat, PiMusicNotesBold, LuCamera,FaRegPaperPlane} from "../../assets/icons/vander"

export default function Activity() {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);
    return (
        <>
            <Navbar />
            <section className="relative table w-full py-36 bg-[url('../../assets/images/bg/bg1.jpg')] bg-bottom bg-no-repeat">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">Activities</h3>

                    </div>
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
                    <div className="md:flex">
                        <div className="lg:w-3/5 md:w-1/2 md:pe-4">
                            <div className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-800 overflow-hidden ease-in-out duration-500 w-full mx-auto lg:max-w-2xl">
                                <div className="lg:flex">
                                    <div className="relative md:shrink-0">
                                        <img className="h-full w-full object-cover lg:w-48" src={image} alt="" />
                                    </div>
                                    <div className="p-6 w-full">
                                        <ul className="flex justify-between items-center list-none pb-6">
                                            <li className="block items-center">
                                                <span className="bg-slate-900 text-white dark:bg-slate-800 text-[12px] px-2.5 py-1 font-semibold rounded-full h-5">Listing</span>
                                                <span className="text-slate-400 text-sm ms-2">3min 50sec ago</span>
                                            </li>
                                            <li>
                                                <Link to="#" className="text-lg rounded-full text-gray-300 dark:text-gray-800 hover:text-red-600 focus:text-red-600 dark:hover:text-red-600 dark:focus:text-red-600"><i className="mdi mdi-heart"></i></Link>
                                            </li>
                                        </ul>

                                        <Link to="/item-detail" className="font-semibold">QUEEN'S COURT - Silver Card #72/250 was put up for sale for </Link>

                                        <div className="pt-6">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600/5 hover:bg-violet-600 border-violet-600/10 hover:border-violet-600 text-violet-600 hover:text-white">Buy now for $15</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-800 overflow-hidden ease-in-out duration-500 w-full mx-auto lg:max-w-2xl mt-[30px]">
                                <div className="lg:flex">
                                    <div className="relative md:shrink-0">
                                        <img className="h-full w-full object-cover lg:w-48" src={image1} alt="" />
                                    </div>
                                    <div className="p-6 w-full">
                                        <ul className="flex justify-between items-center list-none pb-6">
                                            <li className="block items-center">
                                                <span className="bg-slate-900 text-white dark:bg-slate-800 text-[12px] px-2.5 py-1 font-semibold rounded-full h-5">Sale</span>
                                                <span className="text-slate-400 text-sm ms-2">3min 50sec ago</span>
                                            </li>
                                            <li>
                                                <Link to="#" className="text-lg rounded-full text-gray-300 dark:text-gray-800 hover:text-red-600 focus:text-red-600 dark:hover:text-red-600 dark:focus:text-red-600"><i className="mdi mdi-heart"></i></Link>
                                            </li>
                                        </ul>

                                        <Link to="/item-detail" className="font-semibold">ethkun #5001 was sold for $9.27. </Link>

                                        <div className="pt-6">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600/5 hover:bg-violet-600 border-violet-600/10 hover:border-violet-600 text-violet-600 hover:text-white">Buy now for $15</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-800 overflow-hidden ease-in-out duration-500 w-full mx-auto lg:max-w-2xl mt-[30px]">
                                <div className="lg:flex">
                                    <div className="relative md:shrink-0">
                                        <img className="h-full w-full object-cover lg:w-48" src={image2} alt="" />
                                    </div>
                                    <div className="p-6 w-full">
                                        <ul className="flex justify-between items-center list-none pb-6">
                                            <li className="block items-center">
                                                <span className="bg-slate-900 text-white dark:bg-slate-800 text-[12px] px-2.5 py-1 font-semibold rounded-full h-5">Offer</span>
                                                <span className="text-slate-400 text-sm ms-2">3min 50sec ago</span>
                                            </li>
                                            <li>
                                                <Link to="#" className="text-lg rounded-full text-gray-300 dark:text-gray-800 hover:text-red-600 focus:text-red-600 dark:hover:text-red-600 dark:focus:text-red-600"><i className="mdi mdi-heart"></i></Link>
                                            </li>
                                        </ul>

                                        <Link to="/item-detail" className="font-semibold">A global offer of $100.00 was placed for FACES </Link>

                                        <div className="pt-6">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600/5 hover:bg-violet-600 border-violet-600/10 hover:border-violet-600 text-violet-600 hover:text-white">Buy now for $15</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-800 overflow-hidden ease-in-out duration-500 w-full mx-auto lg:max-w-2xl mt-[30px]">
                                <div className="lg:flex">
                                    <div className="relative md:shrink-0">
                                        <img className="h-full w-full object-cover lg:w-48" src={image3} alt="" />
                                    </div>
                                    <div className="p-6 w-full">
                                        <ul className="flex justify-between items-center list-none pb-6">
                                            <li className="block items-center">
                                                <span className="bg-slate-900 text-white dark:bg-slate-800 text-[12px] px-2.5 py-1 font-semibold rounded-full h-5">Deposit</span>
                                                <span className="text-slate-400 text-sm ms-2">3min 50sec ago</span>
                                            </li>
                                            <li>
                                                <Link to="#" className="text-lg rounded-full text-gray-300 dark:text-gray-800 hover:text-red-600 focus:text-red-600 dark:hover:text-red-600 dark:focus:text-red-600"><i className="mdi mdi-heart"></i></Link>
                                            </li>
                                        </ul>

                                        <Link to="/item-detail" className="font-semibold">Anatomy Science Ape Club #1113 was sold for $32.87.</Link>

                                        <div className="pt-6">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600/5 hover:bg-violet-600 border-violet-600/10 hover:border-violet-600 text-violet-600 hover:text-white">Buy now for $15</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-800 overflow-hidden ease-in-out duration-500 w-full mx-auto lg:max-w-2xl mt-[30px]">
                                <div className="lg:flex">
                                    <div className="relative md:shrink-0">
                                        <img className="h-full w-full object-cover lg:w-48" src={image4} alt="" />
                                    </div>
                                    <div className="p-6 w-full">
                                        <ul className="flex justify-between items-center list-none pb-6">
                                            <li className="block items-center">
                                                <span className="bg-slate-900 text-white dark:bg-slate-800 text-[12px] px-2.5 py-1 font-semibold rounded-full h-5">Listing</span>
                                                <span className="text-slate-400 text-sm ms-2">3min 50sec ago</span>
                                            </li>
                                            <li>
                                                <Link to="#" className="text-lg rounded-full text-gray-300 dark:text-gray-800 hover:text-red-600 focus:text-red-600 dark:hover:text-red-600 dark:focus:text-red-600"><i className="mdi mdi-heart"></i></Link>
                                            </li>
                                        </ul>

                                        <Link to="/item-detail" className="font-semibold">Swiss Army Man #16/30 was sold for $600.00. </Link>

                                        <div className="pt-6">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600/5 hover:bg-violet-600 border-violet-600/10 hover:border-violet-600 text-violet-600 hover:text-white">Buy now for $15</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-800 overflow-hidden ease-in-out duration-500 w-full mx-auto lg:max-w-2xl mt-[30px]">
                                <div className="lg:flex">
                                    <div className="relative md:shrink-0">
                                        <img className="h-full w-full object-cover lg:w-48" src={image5} alt="" />
                                    </div>
                                    <div className="p-6 w-full">
                                        <ul className="flex justify-between items-center list-none pb-6">
                                            <li className="block items-center">
                                                <span className="bg-slate-900 text-white dark:bg-slate-800 text-[12px] px-2.5 py-1 font-semibold rounded-full h-5">Sale</span>
                                                <span className="text-slate-400 text-sm ms-2">3min 50sec ago</span>
                                            </li>
                                            <li>
                                                <Link to="#" className="text-lg rounded-full text-gray-300 dark:text-gray-800 hover:text-red-600 focus:text-red-600 dark:hover:text-red-600 dark:focus:text-red-600"><i className="mdi mdi-heart"></i></Link>
                                            </li>
                                        </ul>

                                        <Link to="/item-detail" className="font-semibold">Unsupervised — Machine Hallucinations — MoMA Dreams — I by Refik Anadol #84/100, 1 AP was sold for $1,210.16. </Link>

                                        <div className="pt-6">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600/5 hover:bg-violet-600 border-violet-600/10 hover:border-violet-600 text-violet-600 hover:text-white">Buy now for $15</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-800 overflow-hidden ease-in-out duration-500 w-full mx-auto lg:max-w-2xl mt-[30px]">
                                <div className="lg:flex">
                                    <div className="relative md:shrink-0">
                                        <img className="h-full w-full object-cover lg:w-48" src={image6} alt="" />
                                    </div>
                                    <div className="p-6 w-full">
                                        <ul className="flex justify-between items-center list-none pb-6">
                                            <li className="block items-center">
                                                <span className="bg-slate-900 text-white dark:bg-slate-800 text-[12px] px-2.5 py-1 font-semibold rounded-full h-5">Listing</span>
                                                <span className="text-slate-400 text-sm ms-2">3min 50sec ago</span>
                                            </li>
                                            <li>
                                                <Link to="#" className="text-lg rounded-full text-gray-300 dark:text-gray-800 hover:text-red-600 focus:text-red-600 dark:hover:text-red-600 dark:focus:text-red-600"><i className="mdi mdi-heart"></i></Link>
                                            </li>
                                        </ul>

                                        <Link to="/item-detail" className="font-semibold">3D Bear #7333 was put up for sale for $8.00. </Link>

                                        <div className="pt-6">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600/5 hover:bg-violet-600 border-violet-600/10 hover:border-violet-600 text-violet-600 hover:text-white">Buy now for $15</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="mt-[30px] text-center">
                                <Link to="#" className="text-violet-600"><i className="mdi mdi-loading mdi-spin"></i> More Items</Link>
                            </div>
                        </div>

                        <div className="lg:w-2/5 md:w-1/2 md:ps-4">
                            <div className="sticky top-20">
                                <h5 className="text-lg font-semibold">Filter by</h5>

                                <div className="form-icon relative mt-4">
                                    <LuSearch className="text-lg absolute top-1/2 -translate-y-1/2 start-3"/>
                                    <input type="text" className="form-input w-full text-[15px] ps-10 py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0" name="s" id="searchItem2" placeholder="Search..." />
                                </div>

                                <h5 className="text-lg font-semibold mt-6">Collection Type</h5>

                                <ul className="list-none mt-4">
                                    <li className="inline-block m-2"><Link to="#" className="px-3 py-1.5 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-violet-600 dark:hover:bg-violet-600 font-semibold rounded-lg shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out inline-flex items-center"><PiWalletBold className="me-1 text-base"/> Purchased</Link></li>
                                    <li className="inline-block m-2"><Link to="#" className="px-3 py-1.5 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-violet-600 dark:hover:bg-violet-600 font-semibold rounded-lg shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out inline-flex items-center"><BsTag className="me-1 text-base"/> Sales</Link></li>
                                    <li className="inline-block m-2"><Link to="#" className="px-3 py-1.5 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-violet-600 dark:hover:bg-violet-600 font-semibold rounded-lg shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out inline-flex items-center"><PiFireSimpleBold className='me-1 text-base'/> Burns</Link></li>
                                    <li className="inline-block m-2"><Link to="#" className="px-3 py-1.5 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-violet-600 dark:hover:bg-violet-600 font-semibold rounded-lg shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out inline-flex items-center"><FiHeart className="me-1 text-base"/> Likes</Link></li>
                                    <li className="inline-block m-2"><Link to="#" className="px-3 py-1.5 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-violet-600 dark:hover:bg-violet-600 font-semibold rounded-lg shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out inline-flex items-center"><PiBrowsersLight className='me-1 text-base'/> Bids </Link></li>
                                    <li className="inline-block m-2"><Link to="#" className="px-3 py-1.5 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-violet-600 dark:hover:bg-violet-600 font-semibold rounded-lg shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out inline-flex items-center"><FiUsers className="me-1 text-base"/> Following</Link></li>
                                    <li className="inline-block m-2"><Link to="#" className="px-3 py-1.5 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-violet-600 dark:hover:bg-violet-600 font-semibold rounded-lg shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out inline-flex items-center"><VscListFlat className="me-1 text-base"/> Listing</Link></li>
                                    <li className="inline-block m-2"><Link to="#" className="px-3 py-1.5 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-violet-600 dark:hover:bg-violet-600 font-semibold rounded-lg shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out inline-flex items-center"><PiMusicNotesBold className='me-1 text-base'/> Music</Link></li>
                                    <li className="inline-block m-2"><Link to="#" className="px-3 py-1.5 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-violet-600 dark:hover:bg-violet-600 font-semibold rounded-lg shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out inline-flex items-center"><LuCamera className="me-1 text-base"/> Video</Link></li>
                                    <li className="inline-block m-2"><Link to="#" className="px-3 py-1.5 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-violet-600 dark:hover:bg-violet-600 font-semibold rounded-lg shadow dark:shadow-gray-800 transition-all duration-500 ease-in-out inline-flex items-center"><FaRegPaperPlane className="me-1"/> Illustration</Link></li>
                                </ul>
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
