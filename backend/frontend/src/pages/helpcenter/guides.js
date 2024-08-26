import React from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Switcher from '../../components/switcher'
import { Link } from 'react-router-dom'
import {BsTelephone} from "../../assets/icons/vander"

export default function Guides() {
    return (
        <>
            <Navbar />
            <section className="relative table w-full py-36 bg-[url('../../assets/images/bg/bg1.jpg')] bg-bottom bg-no-repeat">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">Guides & Support</h3>

                    </div>
                </div>

                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/index">Giglink</Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/helpcenter-overview">Helpcenter</Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white" aria-current="page">Guides</li>
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
                        <div className="">
                            <h5 className="font-semibold text-xl">Getting started</h5>
                            <ul className="list-none mt-4">
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Deciding to purchase</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>List your space</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Landing an experience or adventure</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Top uses questions</Link></li>
                            </ul>
                        </div>

                        <div className="">
                            <h5 className="font-semibold text-xl">Your calendar</h5>
                            <ul className="list-none mt-4">
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Pricing & availability</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Booking settings</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Responding to enquiries & requests</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Snoozing or deactivating your listing</Link></li>
                            </ul>
                        </div>

                        <div className="">
                            <h5 className="font-semibold text-xl">Your listings</h5>
                            <ul className="list-none mt-4">
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Updating your listing</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Neighbourhoods</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Listing photos & photography</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Giglink Plus</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>API-connected software</Link></li>
                            </ul>
                        </div>

                        <div className="">
                            <h5 className="font-semibold text-xl">How payouts work</h5>
                            <ul className="list-none mt-4">
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Getting paid</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Adding payout info</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Your payout status</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Donations</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Taxes</Link></li>
                            </ul>
                        </div>

                        <div className="">
                            <h5 className="font-semibold text-xl">Your reservations</h5>
                            <ul className="list-none mt-4">
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Giglink safely</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Giglink Experiences and Adventures</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Changing a reservation</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Cancelling a reservation</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Long-term reservations</Link></li>
                            </ul>
                        </div>

                        <div className="">
                            <h5 className="font-semibold text-xl">Reservation help</h5>
                            <ul className="list-none mt-4">
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Help with a reservation or guest</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Guest cancellations</Link></li>
                            </ul>
                        </div>

                        <div className="">
                            <h5 className="font-semibold text-xl">Your account</h5>
                            <ul className="list-none mt-4">
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Your profile</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Account security</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Identification & verifications</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Reviews</Link></li>
                                <li className="mt-2"><Link to="#" className="text-slate-400"><i className="mdi mdi-arrow-right text-violet-600 me-2"></i>Superhost status</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="container md:mt-24 mt-16">
                    <div className="grid grid-cols-1 text-center">
                        <h3 className="mb-4 md:text-3xl text-2xl md:leading-snug leading-snug font-semibold">Have Question ? Get in touch!</h3>

                        <p className="text-slate-400 max-w-xl mx-auto">We are a huge marketplace dedicated to connecting great artists of all Giglink with their fans and unique token collectors!</p>

                        <div className="mt-6">
                            <Link to="/helpcenter-support" className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full me-2 mt-2 inline-flex items-center"><BsTelephone className="me-1"/> Contact us</Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            {/* <Switcher /> */}
        </>
    )
}
