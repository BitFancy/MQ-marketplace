import React, { useState } from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer';
import Switcher from '../../components/switcher';
import { Link } from 'react-router-dom';
import {MdOutlineArrowForward, RxQuestionMarkCircled, PiBookBookmarkBold, HiOutlineCog6Tooth} from "../../assets/icons/vander"

export default function HelpcenterOverview() {
    const accordionData = [
        {
            title: 'How does it work ?',
            content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
        },
        {
            title: 'Do I need a designer to use Giglink ?',
            content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
        },
        {
            title: 'What do I need to do to start selling ?',
            content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
        },
        {
            title: 'What happens when I receive an order ?',
            content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
        },
    ]
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            setActiveIndex(0);
        } else {
            setActiveIndex(index);
        }
    }

    return (
        <>
            <Navbar />
            <section className="relative table w-full py-36 bg-[url('../../assets/images/bg/bg1.jpg')] bg-bottom bg-no-repeat">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="mb-6 md:text-4xl text-3xl md:leading-snug leading-snug font-semibold text-white">Hello ! <br /> How can we help you?</h3>

                        <div className="text-center subcribe-form mt-4 pt-2">
                            <form className="relative mx-auto max-w-xl">
                                <input type="text" id="help" name="name" className="pt-4 pe-40 pb-4 ps-6 w-full h-[50px] outline-none text-slate-900 dark:text-white rounded-full bg-white/70 dark:bg-slate-900/70 shadow dark:shadow-gray-800" placeholder="Search your questions or topic..." />
                                <button type="submit" className="btn absolute top-[2px] end-[3px] h-[46px] bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full">Search</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/index">Giglink</Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white" aria-current="page">Helpcenter</li>
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
                                <Link to="/helpcenter-faqs" className="title h5 text-lg font-semibold hover:text-violet-600">FAQs</Link>
                                <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>

                                <div className="mt-5">
                                    <Link to="/helpcenter-faqs" className="btn btn-link text-violet-600 hover:text-violet-600 after:bg-violet-600 duration-500 ease-in-out items-center inline-flex">Read More <MdOutlineArrowForward className="text-base ms-1"/></Link>
                                </div>
                            </div>
                        </div>

                        <div className="text-center px-6 mt-6">
                            <div className="w-20 h-20 bg-violet-600/5 text-violet-600 rounded-full text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 mx-auto">
                                <PiBookBookmarkBold/>
                            </div>

                            <div className="content mt-7">
                                <Link to="/helpcenter-guides" className="title h5 text-lg font-semibold hover:text-violet-600">Guides / Support</Link>
                                <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>

                                <div className="mt-5">
                                    <Link to="/helpcenter-guides" className="btn btn-link text-violet-600 hover:text-violet-600 after:bg-violet-600 duration-500 ease-in-out inline-flex items-center">Read More <MdOutlineArrowForward className='ms-1 text-base'/></Link>
                                </div>
                            </div>
                        </div>

                        <div className="text-center px-6 mt-6">
                            <div className="w-20 h-20 bg-violet-600/5 text-violet-600 rounded-full text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 mx-auto">
                                <HiOutlineCog6Tooth/>
                            </div>

                            <div className="content mt-7">
                                <Link to="/helpcenter-support" className="title h5 text-lg font-semibold hover:text-violet-600">Support Request</Link>
                                <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>

                                <div className="mt-5">
                                    <Link to="/helpcenter-support" className="btn btn-link text-violet-600 hover:text-violet-600 after:bg-violet-600 duration-500 ease-in-out inline-flex items-center">Read More <MdOutlineArrowForward className='ms-1 text-base'/></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container md:mt-24 mt-16">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h3 className="mb-4 md:text-3xl text-2xl md:leading-snug leading-snug font-semibold">Get Started</h3>

                        <p className="text-slate-400 max-w-xl mx-auto">We are a huge marketplace dedicated to connecting great artists of all Giglink with their fans and unique token collectors!</p>
                    </div>

                    <div className="flex justify-center mt-8">
                        <div className="lg:w-2/3">

                            {accordionData.map((item, index) => (
                                <div key={index} className="relative shadow dark:shadow-gray-800 rounded-md overflow-hidden mt-4">
                                    <h2 className="text-base font-semibold" id="accordion-collapse-heading-1">
                                        <button onClick={() => toggleAccordion(index)} type="button"
                                            className={`flex justify-between items-center p-5 w-full font-semibold text-start ${activeIndex === index ? 'bg-gray-50 dark:bg-slate-800 text-violet-600' : ''}`}
                                            data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                                            <span>{item.title}</span>
                                            <svg data-accordion-icon className={`w-4 h-4  shrink-0 ${activeIndex === index ? "rotate-180" : "rotate-360"}`}  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                        </button>
                                    </h2>
                                    {activeIndex === index && (
                                        <div id="accordion-collapse-body-1" aria-labelledby="accordion-collapse-heading-1">
                                            <div className="p-5">
                                                <p className="text-slate-400 dark:text-gray-400">{item.content}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Switcher />
        </>
    )
}
