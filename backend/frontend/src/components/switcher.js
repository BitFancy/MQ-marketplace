import React from 'react'
import { Link } from "react-router-dom";
import { animateScroll as scroll } from 'react-scroll';
import {AiOutlineShoppingCart, FiArrowUp,HiOutlineMoon,HiOutlineSun} from "../assets/icons/vander"

export default function Switcher() {
    const scrollToTop = () => {
        scroll.scrollToTop({
            duration: 500,
            smooth: true,
        });
    };

    function changeMode(mode, event) {
        switch (mode) {
            case 'mode':
                if (document.documentElement.className.includes("dark")) {
                    document.documentElement.className = 'light'
                } else {
                    document.documentElement.className = 'dark'
                }
                break;
            case 'layout':
                if (event.target?.innerText === "LTR") {
                    document.documentElement.dir = "ltr"
                }
                else {
                    document.documentElement.dir = "rtl"
                }
                break;

            default:
                break;
        }
    }

    return (
        <>
            <Link to="#" onClick={scrollToTop} id="back-to-top" className="back-to-top fixed hidden text-lg rounded-full z-10 bottom-5 end-5 h-9 w-9 text-center bg-violet-600 text-white leading-9 justify-center items-center"><FiArrowUp className='text-base'/></Link>

            <div className="fixed top-[25%] -left-2 z-50">
                <span className="relative inline-block rotate-90">
                    <input type="checkbox" className="checkbox opacity-0 absolute" id="chk" onClick={(event) => changeMode('mode', event)} />
                    <label className="label bg-slate-900 dark:bg-white shadow dark:shadow-gray-800 cursor-pointer rounded-full flex justify-between items-center p-1 w-14 h-8" htmlFor="chk">
                        <HiOutlineMoon className="text-[20px] text-yellow-500"/>
                        <HiOutlineSun className="text-[20px] text-yellow-500"/>
                        <span className="ball bg-white dark:bg-slate-900 rounded-full absolute top-[2px] left-[2px] w-7 h-7"></span>
                    </label>
                </span>
            </div>

            <div className="fixed top-[40%] -left-3 z-50">
                <Link to="#" id="switchRtl">
                    <span className="py-1 px-3 relative inline-block rounded-b-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow dark:shadow-gray-800 font-semibold rtl:block ltr:hidden" onClick={(event) => changeMode('layout', event)}>LTR</span>
                    <span className="py-1 px-3 relative inline-block rounded-b-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow dark:shadow-gray-800 font-semibold ltr:block rtl:hidden" onClick={(event) => changeMode('layout', event)}>RTL</span>
                </Link>
            </div>

            <div className="fixed top-[60%] -left-12 z-50 hidden sm:block">
                <Link to="https://1.envato.market/giglink-react" target="_blank" className="py-1 px-3 relative inline-flex items-center rounded-b-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow dark:shadow-gray-700 font-semibold"><AiOutlineShoppingCart className="me-2"/> Download</Link>
            </div>

        </>
    )
}
