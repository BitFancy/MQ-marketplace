import React from 'react'
import { Link } from 'react-router-dom';
import {BsTelephone} from "../assets/icons/vander"

export default function GetTouch() {
    return (
        <div className="container md:mt-24 mt-16">
            <div className="grid grid-cols-1 text-center">
                <h3 className="mb-4 md:text-3xl text-2xl md:leading-snug leading-snug font-semibold">Have Question ? Get in touch!</h3>

                <p className="text-slate-400 max-w-xl mx-auto">We are a huge marketplace dedicated to connecting great artists of all token collectors!</p>

                <div className="mt-6">
                    <Link to="/contact" className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full me-2 mt-2 inline-flex items-center"><BsTelephone className='me-1'/>  Contact us</Link>
                </div>
            </div>
        </div>
    )
}
