import React from 'react'
import { Link } from 'react-router-dom';
import { data } from '../data/data';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "../assets/icons/vander"

export default function CollectionTwo(props) {
    const { title, description, pagination} = props;
    return (
        <>
            <div className={`container ${title !== undefined ? 'md:mt-24 mt-16' : ''}`}>
               
                <div className="grid grid-cols-1 text-center">
                    <h3 className="mb-4 md:text-3xl text-2xl md:leading-snug leading-snug font-semibold">{title}</h3>
                    <p className="text-slate-400 max-w-xl mx-auto">{description}</p>
                </div>
                  

                <div className={`grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] ${title !== undefined ? 'mt-12' : ''}`}>
                    {
                        data.slice(0,8).map((item, index) => (
                            <div key={index} className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-lg p-3 shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-800 hover:scale-105 ease-in-out duration-500">
                                <img src={item.image} className="rounded-lg" alt="" />

                                <div className="relative p-4 -mt-14">
                                    <div className="relative inline-block">
                                        <img src={item.avatar} className="h-16 rounded-md shadow-md dark:shadow-gray-800" alt="" />
                                        <i className="mdi mdi-check-decagram text-emerald-600 text-2xl absolute -bottom-3 -end-2"></i>
                                    </div>

                                    <div className="mt-3">
                                        <Link to="/explore-one" className="font-semibold block text-[18px] hover:text-violet-600">{item.title}</Link>
                                        <span className="text-slate-400 mt-1 text-sm"><span className="italic">by</span> <Link to={`/creator-profile/${item.id}`}className="text-violet-600 font-medium">{item.subtext}</Link></span>
                                        <span className="text-slate-400 block text-[16px] mt-1">25 Items</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {pagination ? 
                  <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
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
              </div> : ""}
            </div>

        </>
    )
}
