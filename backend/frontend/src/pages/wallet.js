import React, { useEffect } from 'react'
import metamask from '../assets/images/wallet/metamask.png';
import alpha from '../assets/images/wallet/alpha.png';
import binance from '../assets/images/wallet/binance.png';
import bitski from '../assets/images/wallet/bitski.png';
import coinbase from '../assets/images/wallet/coinbase.png';
import enjin from '../assets/images/wallet/enjin.png';
import formatic from '../assets/images/wallet/formatic.png';
import pionex from '../assets/images/wallet/pionex.png';
import torus from '../assets/images/wallet/torus.png';
import trustwallet from '../assets/images/wallet/trustwallet.png';
import connect from '../assets/images/wallet/wallet-connect.png';
import Navbar from '../components/navbar'
import Footer from '../components/footer';
import Switcher from '../components/switcher';
import { Link } from 'react-router-dom';
import {MdOutlineArrowForward} from "../assets/icons/vander"

export default function Wallet() {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);
    const walletData = [
        {
            title: 'MetaMask',
            image: metamask
        },
        {
            title: 'Alpha',
            image: alpha
        },
        {
            title: 'Binance',
            image: binance
        },
        {
            title: 'Bitski',
            image: bitski
        },
        {
            title: 'Coinbase',
            image: coinbase
        },
        {
            title: 'Enjin',
            image: enjin
        },
        {
            title: 'Formatic',
            image: formatic
        },
        {
            title: 'Pionex',
            image: pionex
        },
        {
            title: 'Torus',
            image: torus
        },
        {
            title: 'Trustwallet',
            image: trustwallet
        },
        {
            title: 'Wallet Connect',
            image: connect
        },

    ]
    return (
        <>
            <Navbar />
            <section className="relative table w-full py-36 bg-[url('../../assets/images/bg/bg1.jpg')] bg-bottom bg-no-repeat">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">Wallet Connect</h3>
                    </div>
                </div>

                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/">Giglink</Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white" aria-current="page">Wallet</li>
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
                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
                        {
                            walletData.map((ele, index) => (
                                <div key={index} className="group relative rounded-xl bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 p-6 text-center mt-10 hover:shadow-md dark:hover:shadow-gray-800 transition-all duration-500">
                                    <div className="relative -mt-16">
                                        <img src={ele.image} className="bg-white dark:bg-slate-900 h-20 w-20 rounded-full shadow-md dark:shadow-gray-800 mx-auto p-3" alt="" />
                                        <h5 className="text-lg font-semibold mt-5">{ele.title}</h5>
                                        <p className="text-slate-400 mt-3">Learn about how to get the wallet and much more clicking <Link to="/" data-modal-toggle="loginform" className="btn btn-link text-violet-600 hover:text-violet-600 after:bg-violet-600 duration-500 ease-in-out inline-flex items-center">here <MdOutlineArrowForward className="ms-1 text-base"/></Link></p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <Footer />
            {/* <Switcher /> */}
        </>
    )
}
