import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { data } from '../data/data';
import { images } from '../data/data';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight, FiUserPlus} from "../assets/icons/vander"

import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';

export default function CreatorTwo(props) {
    const [isOpen, setisOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handleMovePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + images.length - 1) % images.length);
    };

    const handleMoveNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    const handleImageClick = (index) => {
        console.log(index);
        setCurrentImageIndex(index);
        setisOpen(true);
    };
    const currentImage = images[currentImageIndex];
    const { title, description,pagination, allData } = props;
    return (
        <div className={`container  ${title !== undefined ? 'md:mt-24 mt-16' : ''}`}>
            <div className="grid grid-cols-1 text-center">
                <h3 className="mb-4 md:text-3xl text-2xl md:leading-snug leading-snug font-semibold">{title}</h3>

                <p className="text-slate-400 max-w-xl mx-auto">{description}</p>
            </div>
            {allData ? <div className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] ${title !== undefined ? 'mt-12' : ''}`}>
                {
                    data.map((item, index) => (
                        <div key={index} className="group relative overflow-hidden bg-gray-50 dark:bg-slate-800 rounded-md shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-800 ease-in-out duration-500 hover:-mt-2 h-fit">
                            <div className="flex justify-between items-center p-3">
                                <div className="flex items-center">
                                    <div className="relative inline-block">
                                        <img src={item.avatar} className="h-16 rounded-md" alt="" />
                                        <i className="mdi mdi-check-decagram text-emerald-600 text-lg absolute -top-2 -end-2"></i>
                                    </div>

                                    <div className="ms-3">
                                        <Link to={`/creator-profile/${item.id}`}className="font-semibold block hover:text-violet-600">{item.name}</Link>
                                        <span className="text-slate-400 text-sm block mt-1">{item.subtext}</span>
                                    </div>
                                </div>

                                <Link to="#" className="btn btn-icon rounded-full bg-violet-600/5 hover:bg-violet-600 border-violet-600/10 hover:border-violet-600 text-violet-600 hover:text-white"><FiUserPlus className="text-[20px]"/></Link>
                            </div>

                            <div className="p-2 border-t dark:border-t-gray-700">
                                <div className="flex items-center">
                                    {
                                        item.subImage.map((subitem, index) => (
                                            <div className="w-1/2 p-1" key={index}>
                                                <Link to="#" className="rounded-md lightbox">
                                                    <img src={subitem.image} onClick={() => handleImageClick(subitem.index)} className="rounded-md" alt="" />
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
                 {isOpen && (
                    <Lightbox
                        mainSrc={currentImage}
                        prevSrc={images[(currentImageIndex + images.length - 1) % images.length]}
                        nextSrc={images[(currentImageIndex + 1) % images.length]}

                        onCloseRequest={() => setisOpen(false)}
                        onMovePrevRequest={handleMovePrev}
                        onMoveNextRequest={handleMoveNext}
                    />
                )}
            
            </div> :
            <div className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] ${title !== undefined ? 'mt-12' : ''}`}>
            {
                data.slice(0,6).map((item, index) => (
                    <div key={index} className="group relative overflow-hidden bg-gray-50 dark:bg-slate-800 rounded-md shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-800 ease-in-out duration-500 hover:-mt-2 h-fit">
                        <div className="flex justify-between items-center p-3">
                            <div className="flex items-center">
                                <div className="relative inline-block">
                                    <img src={item.avatar} className="h-16 rounded-md" alt="" />
                                    <i className="mdi mdi-check-decagram text-emerald-600 text-lg absolute -top-2 -end-2"></i>
                                </div>

                                <div className="ms-3">
                                    <Link to={`/creator-profile/${item.id}`} className="font-semibold block hover:text-violet-600">{item.name}</Link>
                                    <span className="text-slate-400 text-sm block mt-1">{item.subtext}</span>
                                </div>
                            </div>

                            <Link to="#" className="btn btn-icon rounded-full bg-violet-600/5 hover:bg-violet-600 border-violet-600/10 hover:border-violet-600 text-violet-600 hover:text-white"><FiUserPlus className="text-[20px]"/></Link>
                        </div>

                        <div className="p-2 border-t dark:border-t-gray-700">
                            <div className="flex items-center">
                                {
                                    item.subImage.map((subitem, index) => (
                                        <div className="w-1/2 p-1" key={index}>
                                            <Link to="#" className="rounded-md lightbox">
                                                <img src={subitem.image} onClick={() => handleImageClick(subitem.index)} className="rounded-md" alt="" />
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
             {isOpen && (
                <Lightbox
                    mainSrc={currentImage}
                    prevSrc={images[(currentImageIndex + images.length - 1) % images.length]}
                    nextSrc={images[(currentImageIndex + 1) % images.length]}

                    onCloseRequest={() => setisOpen(false)}
                    onMovePrevRequest={handleMovePrev}
                    onMoveNextRequest={handleMoveNext}
                />
            )}
        
        </div>}
              {pagination ?  <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                        <div className="md:col-span-12 text-center">
                            <nav>
                                <ul className="inline-flex items-center -space-x-px">
                                    <li>
                                        <Link to="#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">
                                            <MdKeyboardArrowLeft className="text-[20px]"/>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">1</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">2</Link>
                                    </li>
                                    <li>
                                        <Link to="#" aria-current="page" className="z-10 w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-white bg-violet-600 shadow-sm dark:shadow-gray-700">3</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">4</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">
                                            <MdKeyboardArrowRight className="text-[20px]"/>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>:''}      
           
        </div>
    )
}
