import React from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Switcher from '../../components/switcher'
import { Link } from 'react-router-dom'
import { Book, Mail, MessageCircle, User } from 'react-feather';
import {MdOutlineArrowForward, RxQuestionMarkCircled, PiBookBookmarkBold, HiOutlineCog6Tooth} from "../../assets/icons/vander"

export default function Support() {
    return (
        <>
            <Navbar />

            <section className="relative table w-full py-36 bg-[url('../../assets/images/bg/bg1.jpg')] bg-bottom bg-no-repeat">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">Submit Your Support Request</h3>

                    </div>
                </div>

                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/">Giglink</Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/helpcenter-overview">Helpcenter</Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white" aria-current="page">Support</li>
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
                    <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px] mx-auto text-center">
                        <div className="lg:col-start-3 lg:col-span-8 md:col-start-2 md:col-span-10">
                            <div className="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800 p-6">
                                <form method="post" name="myForm" id="myForm">
                                    <p className="mb-0" id="error-msg"></p>
                                    <div id="simple-msg"></div>
                                    <div className="grid lg:grid-cols-12 lg:gap-6">
                                        <div className="lg:col-span-6 mb-5">
                                            <div className="text-start">
                                                <label htmlFor="name" className="font-semibold">Your Name:</label>
                                                <div className="form-icon relative mt-2">
                                                    <User className="w-4 h-4 absolute top-3 start-4"></User>
                                                    <input name="name" id="name" type="text" className="form-input w-full text-[15px] ps-11 py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0" placeholder="Name :" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-6 mb-5">
                                            <div className="text-start">
                                                <label htmlFor="email" className="font-semibold">Your Email:</label>
                                                <div className="form-icon relative mt-2">
                                                    <Mail className="w-4 h-4 absolute top-3 start-4"></Mail>
                                                    <input name="email" id="email" type="email" className="form-input w-full text-[15px] ps-11 py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0" placeholder="Email :" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1">
                                        <div className="mb-5">
                                            <div className="text-start">
                                                <label htmlFor="subject" className="font-semibold">Your Question:</label>
                                                <div className="form-icon relative mt-2">
                                                    <Book className="w-4 h-4 absolute top-3 start-4"></Book>
                                                    <input name="subject" id="subject" className="form-input w-full text-[15px] ps-11 py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0" placeholder="Subject :" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <div className="text-start">
                                                <label htmlFor="comments" className="font-semibold">Your Comment:</label>
                                                <div className="form-icon relative mt-2">
                                                    <MessageCircle className="w-4 h-4 absolute top-3 start-4"></MessageCircle>
                                                    <textarea name="comments" id="comments" className="form-input w-full text-[15px] ps-11 py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-2xl outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0" placeholder="Message :"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" id="submit" name="send" className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full justify-center flex items-center">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container md:mt-24 mt-16">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h3 className="mb-4 md:text-3xl text-2xl md:leading-snug leading-snug font-semibold">Find The Help You Need</h3>

                        <p className="text-slate-400 max-w-xl mx-auto">We are a huge marketplace dedicated to connecting great artists of all Giglink with their fans and unique token collectors!</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-6 gap-[30px]">
                        <div className="text-center px-6 mt-6">
                            <div className="w-20 h-20 bg-violet-600/5 text-violet-600 rounded-full text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 mx-auto">
                               <RxQuestionMarkCircled/>
                            </div>

                            <div className="content mt-7">
                                <Link to="/helpcenter-faqs" className="title h5 text-lg font-medium hover:text-violet-600">FAQs</Link>
                                <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>

                                <div className="mt-5">
                                    <Link to="/helpcenter-faqs" className="btn btn-link text-violet-600 hover:text-violet-600 after:bg-violet-600 duration-500 ease-in-out inline-flex items-center">Read More <MdOutlineArrowForward className="ms-1 text-base"/></Link>
                                </div>
                            </div>
                        </div>

                        <div className="text-center px-6 mt-6">
                            <div className="w-20 h-20 bg-violet-600/5 text-violet-600 rounded-full text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 mx-auto">
                                <PiBookBookmarkBold/>
                            </div>

                            <div className="content mt-7">
                                <Link to="/helpcenter-guides" className="title h5 text-lg font-medium hover:text-violet-600">Guides / Support</Link>
                                <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>

                                <div className="mt-5">
                                    <Link to="/helpcenter-guides" className="btn btn-link text-violet-600 hover:text-violet-600 after:bg-violet-600 duration-500 ease-in-out inline-flex items-center">Read More <MdOutlineArrowForward className="ms-1 text-base"/></Link>
                                </div>
                            </div>
                        </div>

                        <div className="text-center px-6 mt-6">
                            <div className="w-20 h-20 bg-violet-600/5 text-violet-600 rounded-full text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 mx-auto">
                                <HiOutlineCog6Tooth/>
                            </div>

                            <div className="content mt-7">
                                <Link to="/helpcenter-support" className="title h5 text-lg font-medium hover:text-violet-600">Support Request</Link>
                                <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>

                                <div className="mt-5">
                                    <Link to="/helpcenter-support" className="btn btn-link text-violet-600 hover:text-violet-600 after:bg-violet-600 duration-500 ease-in-out inline-flex items-center">Read More <MdOutlineArrowForward className="ms-1 text-base"/></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            {/* <Switcher /> */}
        </>
    )
}
