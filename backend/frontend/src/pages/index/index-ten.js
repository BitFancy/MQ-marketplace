import React, { useEffect } from 'react'
import image from '../../assets/images/blog/01.jpg';
import image1 from '../../assets/images/blog/03.jpg';
import image2 from '../../assets/images/blog/05.jpg';
import image3 from '../../assets/images/blog/07.jpg';
import image4 from '../../assets/images/blog/09.jpg';
import image5 from '../../assets/images/blog/11.jpg';
import image6 from '../../assets/images/blog/12.jpg';
import image7 from '../../assets/images/blog/14.jpg';
import image8 from '../../assets/images/blog/16.jpg';
import image9 from '../../assets/images/blog/18.jpg';
import image10 from '../../assets/images/blog/20.jpg';
import image11 from '../../assets/images/blog/22.jpg';
import image12 from '../../assets/images/blog/24.jpg';
import image13 from '../../assets/images/blog/26.jpg';
import image14 from '../../assets/images/blog/02.jpg';
import image15 from '../../assets/images/blog/04.jpg';
import image16 from '../../assets/images/blog/06.jpg';
import image17 from '../../assets/images/blog/08.jpg';
import image18 from '../../assets/images/blog/10.jpg';
import image19 from '../../assets/images/blog/13.jpg';
import image20 from '../../assets/images/blog/15.jpg';
import image21 from '../../assets/images/blog/17.jpg';
import image22 from '../../assets/images/blog/19.jpg';
import image23 from '../../assets/images/blog/21.jpg';
import image24 from '../../assets/images/blog/23.jpg';
import image25 from '../../assets/images/blog/25.jpg';
import image26 from '../../assets/images/blog/05.jpg';
import Navbar from '../../components/navbar'
import Creator from '../../components/creator'
import CollectionTwo from '../../components/collection-two'

import QA from '../../components/qa';
import GetTouch from '../../components/get-touch';
import Footer from '../../components/footer';
import AuctionsTwo from '../../components/auctions-two';
import { Link } from 'react-router-dom';
import Switcher from '../../components/switcher';

export default function IndexTen() {
    useEffect(() => {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
    }, []);
    return (
        <>
            <Navbar />
            <section className="relative pt-24 overflow-hidden">
                <div className="container-fluid relative">
                    <div className="grid grid-cols-1">
                        <div className="slider relative overflow-hidden m-auto mb-4 before:content-[''] before:absolute before:top-0 before:start-0 before:z-2 after:content-[''] after:absolute after:top-0 after:end-0 after:z-2">
                            <div className="slide-track flex items-center">
                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image1} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image2} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image3} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image4} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image5} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image6} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image7} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image8} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image9} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image10} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image11} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image12} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image13} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="slider2 relative overflow-hidden m-auto before:content-[''] before:absolute before:top-0 before:start-0 before:z-2 after:content-[''] after:absolute after:top-0 after:end-0 after:z-2">
                            <div className="slide-track flex items-center">
                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image14} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image15} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image16} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image17} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image18} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image19} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image20} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image21} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image22} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image23} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image24} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image25} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="slide h-auto md:w-[360px] w-72 mx-2">
                                    <div className="group relative overflow-hidden rounded-lg shadow dark:shadow-gray-800">
                                        <img src={image26} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt="" />

                                        <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                            <Link to="/item-detail" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-gavel"></i> Bid Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative md:py-24 py-16">
                <Creator title="Best Creators & Sellers" description="We are a huge marketplace dedicated to connecting great artists of all Giglink with their fans and unique token collectors!"
                />

                <CollectionTwo title="Top Collection" description="We are a huge marketplace dedicated to connecting great artists of all Giglink with their fans and unique token collectors!" />
                <AuctionsTwo title="Live Auctions" description="We are a huge marketplace dedicated to connecting great artists of all Giglink with their fans and unique token collectors!" />
                <QA />
                <GetTouch />

            </section>
            <Footer />
            <Switcher />
        </>
    )
}
