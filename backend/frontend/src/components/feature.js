import React from 'react'
import { Link } from 'react-router-dom';
import { Hexagon } from 'react-feather';
import {TbSitemap, LuLayers, TbCameraPlus} from '../assets/icons/vander'

export default function Feature() {
    return (
        <div className="container md:mt-24 mt-16">
            <div className="grid grid-cols-1 text-center">
                <h3 className="mb-4 md:text-3xl text-2xl md:leading-snug leading-snug font-semibold">Giglink is a web3 destination.</h3>

                <p className="text-slate-400 max-w-xl mx-auto">We are a huge marketplace dedicated to connecting great artists of all Giglink with their fans and unique token collectors!</p>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-10 gap-[30px]">

                <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
                    <div className="relative overflow-hidden text-transparent -m-3">
                        <Hexagon className="h-28 w-28 fill-violet-600/5 mx-auto rotate-[30deg]"></Hexagon>
                        <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-violet-600 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                            <TbSitemap/>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link to="#" className="text-lg h5 font-semibold transition duration-500 ease-in-out hover:text-violet-600">Create Item</Link>
                        <p className="text-slate-400 transition duration-500 ease-in-out mt-3">If the distribution of letters and 'words' is random, the reader will not be distracted from making.</p>
                    </div>
                </div>
                <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
                    <div className="relative overflow-hidden text-transparent -m-3">
                        <Hexagon className="h-28 w-28 fill-violet-600/5 mx-auto rotate-[30deg]"></Hexagon>
                        <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-violet-600 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                            <LuLayers/>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link to="#" className="text-lg h5 font-semibold transition duration-500 ease-in-out hover:text-violet-600">Collect</Link>
                        <p className="text-slate-400 transition duration-500 ease-in-out mt-3">If the distribution of letters and 'words' is random, the reader will not be distracted from making.</p>
                    </div>
                </div>
                <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
                    <div className="relative overflow-hidden text-transparent -m-3">
                        <Hexagon className="h-28 w-28 fill-violet-600/5 mx-auto rotate-[30deg]"></Hexagon>
                        <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-violet-600 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                            <TbCameraPlus/>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link to="#" className="text-lg h5 font-semibold transition duration-500 ease-in-out hover:text-violet-600">Sell Item</Link>
                        <p className="text-slate-400 transition duration-500 ease-in-out mt-3">If the distribution of letters and 'words' is random, the reader will not be distracted from making.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
