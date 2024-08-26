import React, { useState, useEffect } from 'react'
import logo_icon_80 from '../../assets/images/logo-icon-80.png';
import Switcher from '../../components/switcher';

export default function Maintenance() {
    const [minutes, setMinutes] = useState(0);
    const [remainingSeconds, setRemainingSeconds] = useState(0);

    useEffect(() => {

        let intervalId = setInterval(() => {
            calculateTimeRemaining()
        }, 1000);

        var seconds = 3599;
        function calculateTimeRemaining() {

            const minutes = Math.round((seconds - 30) / 60);
            const remainingSeconds = seconds % 60;

            setMinutes(minutes);
            setRemainingSeconds(remainingSeconds);

            if (seconds === 0) {
                clearInterval(intervalId);
            } else {
                seconds = seconds - 1;
            }
        }

        return () => {
            clearInterval(intervalId);
        };
    }, []);
    return (
        <>
            <section className="relative h-screen flex items-center justify-center text-center bg-[url('../../assets/images/bg/bg2.jpg')] bg-no-repeat bg-center">
                <div className="absolute inset-0 bg-slate-900/40"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                <div className="container">
                    <div className="grid grid-cols-1">
                        <img src={logo_icon_80} className="mx-auto" alt="" />
                        <h1 className="text-white mb-6 mt-10 md:text-5xl text-3xl font-bold">Site is under maintenance</h1>
                        <p className="text-white/70 max-w-xl mx-auto">We are a huge marketplace dedicated to connecting great artists of all Giglink with their fans and unique token collectors!</p>
                    </div>

                    <div className="grid grid-cols-1 mt-10">
                        <div className="text-center">
                            <span id="maintenance" className="timer text-white font-semibold text-[56px] tracking-[1px]">{minutes}:{remainingSeconds}</span>
                            <span className="block text-base font-semibold uppercase text-white">Minutes</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-10">
                        <div className="text-center subcribe-form">
                            <form className="relative mx-auto max-w-xl">
                                <input type="email" id="subemail" name="name" className="pt-4 pe-40 pb-4 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white/70 dark:bg-slate-900/70 border border-gray-100 dark:border-gray-700" placeholder="Enter your email id.." />
                                <button type="submit" className="btn absolute top-[2px] end-[3px] h-[46px] bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full">Subcribe Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* <Switcher /> */}
        </>
    )
}
