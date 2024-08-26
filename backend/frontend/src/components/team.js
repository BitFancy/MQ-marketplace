import React from 'react'
import image from '../assets/images/client/04.jpg';
import image1 from '../assets/images/client/05.jpg';
import image2 from '../assets/images/client/06.jpg';
import image3 from '../assets/images/client/07.jpg';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'react-feather';

export default function Team() {
    const teamData = [
        {
            image:image,
            name:"Richie Try to Reach it",
            title:"Jack of all trades, Master of None."
        },
        {
            image:image1,
            name:"Charlie The Italian One",
            title:"Technology Muse"
        },
        {
            image:image2,
            name:"Charl The Boer",
            title:"Technology Design"
        },
        {
            image:image3,
            name:"Glen Make a Plan",
            title:"Administrative"
        }
    ]
    return (
        <div className="container lg:mt-24 mt-16">
            <div className="grid grid-cols-1 pb-8 text-center">
                <h6 className="text-violet-600 font-medium mb-2">Our Minds</h6>
                <h3 className="mb-4 md:text-3xl text-2xl md:leading-snug leading-snug font-semibold">Management Team</h3>

                <p className="text-slate-400 max-w-xl mx-auto">We are creating a marketplace dedicated to connecting Queer artists, Creators and Entrepreneurs with their fans and unique token collectors!</p>
            </div>

            <div className="grid md:grid-cols-12 grid-cols-1 mt-8 gap-[30px]">
                {teamData.map((item,index)=>{
                    return(
                    <div className="lg:col-span-3 md:col-span-6" key={index}>
                        <div className="group text-center">
                            <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
                                <img src={item.image} className="" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black h-52 w-52 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>

                                <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 transition-all duration-500 ease-in-out">
                                    <li className="inline space-x-1"><Link to="#" className="btn btn-icon btn-sm rounded-full border border-violet-600 bg-violet-600 hover:border-violet-600 hover:bg-violet-600 text-white"><Facebook className="h-4 w-4"></Facebook></Link></li>
                                    <li className="inline space-x-1"><Link to="#" className="btn btn-icon btn-sm rounded-full border border-violet-600 bg-violet-600 hover:border-violet-600 hover:bg-violet-600 text-white"><Instagram className="h-4 w-4"></Instagram></Link></li>
                                    <li className="inline space-x-1"><Link to="#" className="btn btn-icon btn-sm rounded-full border border-violet-600 bg-violet-600 hover:border-violet-600 hover:bg-violet-600 text-white"><Linkedin className="h-4 w-4"></Linkedin></Link></li>
                                </ul>
                            </div>

                            <div className="content mt-3">
                                <Link to="#" className="text-lg font-semibold hover:text-violet-600 transition-all duration-500 ease-in-out">{item.name}</Link>
                                <p className="text-slate-400">{item.title}</p>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}
