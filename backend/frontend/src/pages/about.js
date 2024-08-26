import React, { useState } from 'react'
import Navbar from '../components/navbar'
import Team from '../components/team'
import Blog from '../components/blog'
import Footer from '../components/footer'
import about from '../assets/images/about.jpg';
//import Switcher from '../components/switcher'
import { Link } from 'react-router-dom'
import ModalVideo from 'react-modal-video'
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import {FaRegEnvelope} from "../assets/icons/vander"

export default function About() {
    const [isOpen, setOpen] = useState(false)

    return (
        <>
            <Navbar />
            <section className="relative table w-full py-36 bg-[url('../../assets/images/bg/bg1.jpg')] bg-bottom bg-no-repeat">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">About Us</h3>

                    </div>
                </div>

                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/">MetaQueer</Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white" aria-current="page">About Us</li>
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
                    <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 items-center gap-[30px]">
                        <div className="lg:col-span-5">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg -mt-[15px] -ms-[15px] h-[98%] w-[98%] -z-1"></div>
                                <img src={about} className="rounded-lg shadow-md dark:shadow-gray-800" alt="" />
                                <div className="absolute bottom-2/4 translate-y-2/4 start-0 end-0 text-center">
                                    <Link to="#" onClick={() => setOpen(true)} data-id="S_CGed6E610" className="lightbox h-20 w-20 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-violet-600">
                                        <i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="S_CGed6E610" onClose={() => setOpen(false)} />

                        <div className="lg:col-span-7">
                            <div className="lg:ms-5">
                                <span className="text-violet-600 font-medium">Creative Vision & Mission</span>
                                <h3 className="mb-4 md:text-3xl text-2xl md:leading-snug leading-snug font-semibold">Creating a marketplace focussed <br /> spesifically on Queer people.</h3>

                                <p className="text-slate-400 max-w-xl">We are creating a space to celebrate Queer culture and stimulate the Pink economy.</p>
                                <p className="text-slate-400 max-w-xl mt-4">MetaQueer will allow for representation of a community in the new technological space. It will focus on promoting participation in the Web3.0 era by creating opportunities for the LGBTIQA community while providing a safe space for all members. 
A platform like MetaQueer will greatly enhance a sense of identity. Through participation on the platform, it will belong to everybody</p>

                                <div className="mt-6">
                                    <Link to="/contact" className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full me-2 mt-2 inline-flex items-center"><FaRegEnvelope className='me-1'/> Contact us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container lg:mt-24 mt-16 lg:pt-24 pt-16">
                    <div className="absolute inset-0 opacity-25 dark:opacity-50 bg-[url('../../assets/images/map.png')] bg-no-repeat bg-center"></div>
                    <div className="relative grid grid-cols-1 pb-8 text-center z-1">
                        <h3 className="mb-4 md:text-3xl text-2xl md:leading-snug leading-snug font-semibold text-black dark:text-white">A Queer Safe Space </h3>

                        <p className="text-slate-400 max-w-xl mx-auto">Explore, Discover and Engage with a wide range of Queer creators, artists and entrepreneurs </p>
                    </div>

                    <div className="relative grid md:grid-cols-3 grid-cols-1 items-center mt-8 gap-[30px] z-1">
                        <div className="counter-box text-center">
                            <h1 className="lg:text-5xl text-4xl font-semibold mb-2">$<span className="counter-value" data-target="40">3</span>M</h1>
                            <h5 className="counter-head text-lg font-medium text-slate-400">Trading volume</h5>
                        </div>

                        <div className="counter-box text-center">
                            <h1 className="lg:text-5xl text-4xl font-semibold mb-2"><span className="counter-value" data-target="200">2</span>+</h1>
                            <h5 className="counter-head text-lg font-medium text-slate-400">NFTs created</h5>
                        </div>

                        <div className="counter-box text-center">
                            <h1 className="lg:text-5xl text-4xl font-semibold mb-2"><span className="counter-value" data-target="235">0</span>K</h1>
                            <h5 className="counter-head text-lg font-medium text-slate-400">Total users</h5>
                        </div>
                    </div>
                </div>

                <Team />
                <Blog />
            </section>
            <Footer />
            {/* <Switcher /> */}
        </>
    )
}
