import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Switcher from '../components/switcher'
import { Link } from 'react-router-dom'
import {MdOutlineArrowForward} from "../assets/icons/vander"

export default function PrivacyPolicy() {
    return (
        <>
            <Navbar />
            <section className="relative table w-full py-36 bg-[url('../../assets/images/bg/bg1.jpg')] bg-bottom bg-no-repeat">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">Privacy Policy</h3>

                    </div>
                </div>

                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/"> MetaQueer MArketplace </Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white" aria-current="page">Privacy Policy</li>
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
                    <div className="md:flex justify-center">
                        <div className="md:w-3/4">
                            <div className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md">
                                <h5 className="text-xl font-semibold mb-4">Summary:</h5>
                                <p className="text-slate-400"> This summary outlines how MetaQueer.Space collects, uses, and protects your personal information. </p>
                                <p className="text-slate-400"> For full details, please refer to our complete Privacy Policy. </p>

                                <h5 className="text-xl font-semibold mb-4 mt-8"> Information We Collect:</h5>
                                <p className="text-slate-400"> - When creating an account: Particle Network wallet address, username, email.</p>
                                <p className="text-slate-400"> - Optional information: Full name, location, social media handles, bio, websites, profile picture</p>
                                <p className="text-slate-400"> - Usage data and blockchain interactions</p>

                                <h5 className="text-xl font-semibold mb-4 mt-8"> How We Use Your Information:</h5>
                                <p className="text-slate-400"> - Maintain and improve the Platform </p>
                                <p className="text-slate-400"> - Provide services and support </p>
                                <p className="text-slate-400"> - Personalize your experience </p>
                                <p className="text-slate-400"> - Send updates and promotional information </p>
                                <p className="text-slate-400"> - Manage IP disputes and security </p>

                                <h5 className="text-xl font-semibold mb-4 mt-8"> Information Sharing:</h5>
                                
                                <ul className="list-none text-slate-400 mt-4"> We do not sell your personal information. We share information with:

                                    <li className="flex items-center mt-2"><MdOutlineArrowForward className="text-violet-600 text-base align-middle me-2"/> Affiliates and partners necessary for our services</li>
                                    <li className="flex items-center mt-2"><MdOutlineArrowForward className="text-violet-600 text-base align-middle me-2"/> Analytics and service providers</li>
                                    <li className="flex items-center mt-2"><MdOutlineArrowForward className="text-violet-600 text-base align-middle me-2"/> Law enforcement when required</li>
                                    <li className="flex items-center mt-2"><MdOutlineArrowForward className="text-violet-600 text-base align-middle me-2"/> Parties involved in copyright disputes (DMCA compliance)</li>

                                </ul>

                                <h5 className="text-xl font-semibold mb-4 mt-8">Your Rights :</h5>
                                
                                
                                <ul className="list-none text-slate-400 mt-4"> Depending on your location, you may have rights to:

                                    <li className="flex items-center mt-2"><MdOutlineArrowForward className="text-violet-600 text-base align-middle me-2"/> Access and control your personal information</li>
                                    <li className="flex items-center mt-2"><MdOutlineArrowForward className="text-violet-600 text-base align-middle me-2"/> Request deletion of your data</li>
                                    <li className="flex items-center mt-2"><MdOutlineArrowForward className="text-violet-600 text-base align-middle me-2"/> Data portability</li>
                                    <li className="flex items-center mt-2"><MdOutlineArrowForward className="text-violet-600 text-base align-middle me-2"/> Non-discrimination (for California residents)</li>

                                </ul>

                                <h5 className="text-xl font-semibold mb-4 mt-8"> Cookies:</h5>
                                <p className="text-slate-400"> We use cookies to improve your browsing experience. You can opt-out by adjusting your browser settings. </p>


                                <h5 className="text-xl font-semibold mb-4 mt-8"> Contact Us:</h5>
                                <p className="text-slate-400"> For privacy-related inquiries or to exercise your rights, contact us at admin@metaqueer.space. </p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
           
        </>
    )
}
