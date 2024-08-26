import React from 'react'
import logo_white from '../assets/images/logo-white.png';
import app from '../assets/images/app.png';
import playstore from '../assets/images/playstore.png';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'react-feather';
import {AiOutlineShoppingCart, MdKeyboardArrowRight, FaRegEnvelope, BsPencil, FiDribbble, BiLogoBehance, FaLinkedin, LiaFacebookF, AiOutlineInstagram, AiOutlineTwitter } from "../assets/icons/vander"

export default function Footer() {
    return (
        <footer className="footer bg-dark-footer relative text-gray-200 dark:text-gray-200 mt-24">
            <div className="container">
                <div className="grid grid-cols-1">
                    <div className="relative py-16">
                        <div className="relative w-full">
                            <div className="relative -top-40 bg-white dark:bg-slate-900 lg:px-8 px-6 py-10 rounded-xl shadow dark:shadow-gray-800 overflow-hidden">
                               {/* <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-[30px]">
                                    <div className="md:text-start text-center z-1">
                                        <h3 className="text-[26px] font-semibold text-slate-900 dark:text-white">Subscribe to Newsletter!</h3>
                                        <p className="text-slate-400 max-w-xl mx-auto">You can't spill the tea without this.</p>
    </div>

                                    <div className="subcribe-form z-1">
                                        <form className="relative max-w-lg md:ms-auto">
                                            <input type="email" id="subcribe" name="email" className="pt-4 pe-40 pb-4 ps-6 w-full h-[50px] outline-none text-slate-900 dark:text-white rounded-full bg-white dark:bg-slate-900 shadow dark:shadow-gray-800" placeholder="Enter your email :" />
                                            <button type="submit" className="btn absolute top-[2px] end-[3px] h-[46px] bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full">Subscribe</button>
                                        </form>
                                    </div>
                                </div>*/}
                                
                                <div className="absolute -top-5 -start-5">
                                    <FaRegEnvelope className="lg:text-[150px] text-7xl text-slate-900/5 dark:text-white/5 -rotate-45"/>
                                </div>

                                <div className="absolute -bottom-5 -end-5">
                                   <BsPencil className="lg:text-[150px] text-7xl text-slate-900/5 dark:text-white/5"/>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px] -mt-24">
                                <div className="lg:col-span-4 md:col-span-12">
                                    <Link to="#" className="text-[22px] focus:outline-none">
                                        <img src={logo_white} alt="" />
                                    </Link>
                                    <p className="mt-6 text-gray-300"> Explore, Discover and Engage with Queer Creators, Artists and Entrepreneurs .</p>

                                </div>

                                {/*<div className="lg:col-span-2 md:col-span-4">
                                    <h5 className="tracking-[1px] text-lg text-gray-100 font-semibold"> Marketplace </h5>
                                    <ul className="list-none footer-list mt-6">
                                        <li><Link to="/explore-one" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Explore Item</Link></li>
                                        <li className="mt-[10px]"><Link to="/auction" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Live Auction</Link></li>
                                        <li className="mt-[10px]"><Link to="/activity" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Activities</Link></li>
                                        <li className="mt-[10px]"><Link to="/wallet" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Wallets</Link></li>
                                        <li className="mt-[10px]"><Link to="/creators" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Creators</Link></li>
                                    </ul>
                            </div>*/}

                                <div className="lg:col-span-3 md:col-span-4">
                                    <h5 className="tracking-[1px] text-lg text-gray-100 font-semibold">Usefull Links</h5>
                                    <ul className="list-none footer-list mt-6">
                                        <li><Link to="/aboutus" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> About Us</Link></li>
                                        {/*<li className="mt-[10px]"><Link to="/blogs" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Blog & News</Link></li>*/}
                                        <li className="mt-[10px]"><Link to="/terms" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Terms & Condition</Link></li>
                                        <li className="mt-[10px]"><Link to="/privacy" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Privacy policy</Link></li>
                                        {/*<li className="mt-[10px]"><Link to="/login" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Login</Link></li>*/}
                                        <li className="mt-[10px]"><Link to="/contact" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Contact Us</Link></li>
                                    </ul>
                                </div>

                                <div className="lg:col-span-3 md:col-span-4">
                                    {/* <h5 className="tracking-[1px] text-lg text-gray-100 font-semibold"> MetaQueer APK </h5>

                                    <ul className="list-none mt-6">
                                        <li className="inline"><img src={app} className="h-9 inline-block" alt="" /></li>
                                        <li className="inline"><img src={playstore} className="h-9 inline-block" alt="" /></li>
                                    </ul> */}

                                    <div className="mt-6">
                                        <h5 className="tracking-[1px] text-lg text-gray-100 font-semibold">Contact Details</h5>

                                        <div className="flex mt-6">
                                            <Mail className="w-5 h-5 text-violet-600 me-3 mt-1"></Mail>
                                            <div className="">
                                                <Link to="mailto:info@metaqueer.space" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out">info@metaqueer.space </Link>
                                            </div>
                                        </div>

                                        {/* <div className="flex mt-6">
                                            <Phone className="w-5 h-5 text-violet-600 me-3 mt-1"></Phone>
                                            <div className="">
                                                <Link to="tel:+152534-468-854" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out">+152 534-468-854</Link>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-[30px] px-0 border-t border-gray-800 dark:border-gray-700">
                <div className="container text-center">
                    <div className="grid md:grid-cols-2 items-center gap-6">
                        <div className="md:text-start text-center">
                            <p className="mb-0 text-gray-300">© {(new Date().getFullYear())}{" "} All Rights Reserved. <i className="mdi mdi-heart text-red-600"></i> MetaQueer Inc <Link to="https://metaqueer.space/" target="_blank" className="text-reset">MetaQueer</Link>.</p>
                        </div>

                        <ul className="list-none md:text-end text-center">
                            <li className="inline space-x-1"><Link to="https://1.envato.market/giglink-react" target="_blank" className="btn btn-icon btn-sm border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><AiOutlineShoppingCart className='text-base'/></Link></li>
                            <li className="inline space-x-1"><Link to="https://dribbble.com/shreethemes" target="_blank" className="btn btn-icon btn-sm border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><FiDribbble className='text-base'/></Link></li>
                            <li className="inline space-x-1"><Link to="https://www.behance.net/shreethemes" target="_blank" className="btn btn-icon btn-sm border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><BiLogoBehance className='text-base'/></Link></li>
                            <li className="inline space-x-1"><Link to="http://linkedin.com/company/shreethemes" target="_blank" className="btn btn-icon btn-sm border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><FaLinkedin className='text-base'/></Link></li>
                            <li className="inline space-x-1"><Link to="https://www.facebook.com/metaqueer" target="_blank" className="btn btn-icon btn-sm border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><LiaFacebookF className='text-base'/></Link></li>
                            <li className="inline space-x-1"><Link to="https://www.instagram.com/metaqueer.space/" target="_blank" className="btn btn-icon btn-sm border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><AiOutlineInstagram className='text-base'/></Link></li>
                            <li className="inline space-x-1"><Link to="https://twitter.commetaqueerspace" target="_blank" className="btn btn-icon btn-sm border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><AiOutlineTwitter className='text-base'/></Link></li>
                            <li className="inline space-x-1"><Link to="mailto:info@metaqueer.space" className="btn btn-icon btn-sm border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><FaRegEnvelope className="align-middle"/></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
