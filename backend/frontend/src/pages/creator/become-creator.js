import React, { useEffect } from 'react'
import creator from '../../assets/images/creator.png';
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

import { Link } from 'react-router-dom';
//import { useAuthCore, useConnect } from '@particle-network/auth-core-modal';

import { useAccount, useConnectModal } from '@particle-network/connectkit'
export default function BecomeCreator() {
    const connectModal = useConnectModal();
    const account = useAccount();
    const handleChange = () => 
    {
        const fileUploader = document.querySelector('#input-file');
        const getFile = fileUploader.files
        if (getFile.length !== 0) {
            const uploadedFile = getFile[0];
            readFile(uploadedFile);
        }
    }

    const handleLogin = async () => 
    {
        try 
        {
            if (!account) 
            {
                connectModal.openConnectModal();             
            }
        } 
        catch (error) 
        {
            if (error.code === 4011) 
            {
                console.log("User canceled the operation");
            } 
            else 
            {
                console.error("Error:", error);
            }
        }
    }

    const readFile = (uploadedFile) => {
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const parent = document.querySelector('.preview-box');
                parent.innerHTML = `<img class="preview-content" src=${reader.result} />`;
            };

            reader.readAsDataURL(uploadedFile);
        }
    };
    


    // quick fix when user is logged in
    /*useEffect(() => 
    {
        if (account)
        {
            window.location.href = "/";
        }
    });*/
    
    return (
        <>
            <Navbar />

            <section className="relative table w-full py-32 bg-gray-50 dark:bg-slate-800">
                <div className="container">
                    <div className="grid lg:grid-cols-12 grid-cols-2 pb-8 mt-10 gap-[30px] items-center">
                        <div className="lg:col-span-4">
                            <img src={creator} alt="" />
                        </div>

                        <div className="lg:col-span-8">
                            <span className="font-medium text-xl">Join with Giglink!</span>
                            <h3 className="md:text-5xl text-3xl md:leading-snug tracking-wide leading-snug font-semibold mt-2">Start Your <br /> <span className="bg-gradient-to-r from-red-600 to-violet-600 text-transparent bg-clip-text">Journey</span></h3>

                            <p className="text-slate-400 mt-4 text-lg">We are a huge marketplace dedicated to connecting great artists of all giglink with their fans and unique token collectors!</p>
                        
                            <p className="text-slate-400 mt-4 text-lg">
                                { !account ? <button id="submit" name="send" onClick={() => handleLogin()} className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full justify-center flex items-center">Become a creator</button>         
                                :
                                <Link to = '/upload-work'> <button id="submit" name="send"  className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full justify-center flex items-center">Become a creator</button> </Link>
                                }
                                </p>
                        </div>
                    </div>
                </div>

                {/*<div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="breadcrumb tracking-[0.5px] mb-0 inline-block">
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out hover:text-violet-600"><Link to="/index">Giglink</Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-violet-600" aria-current="page">Become Creator</li>
                    </ul>
                </div>*/}
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
                    <div className="md:flex justify-center">
                        <div className="lg:w-3/4">
                            <div className="lg:flex justify-center p-6 bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800">
                               <div className="lg:w-1/3 md:w-full">
                                    <p className="font-semibold mb-6">Upload your ART here, Please click "Upload Image" Button.</p>
                                    <div className="preview-box flex justify-center rounded-md shadow dark:shadow-gray-800 overflow-hidden bg-gray-50 dark:bg-slate-800 text-slate-400 p-2 text-center small">Supports JPG, PNG and MP4 videos. Max file size : 10MB.</div>
                                    <input type="file" id="input-file" name="input-file" accept="image/*" hidden onChange={() => handleChange()} />
                                    <label className="btn-upload btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full w-full mt-6 cursor-pointer" htmlFor="input-file">Upload Image</label>
                                </div>

                                <div className="lg:w-2/3 md:w-full mt-8 lg:mt-0 lg:ms-6">
                                    <form>
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="text-start">
                                                <label htmlFor="name" className="font-semibold">Display Name:</label>
                                                <input name="name" id="name" type="text" className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-2" placeholder="Name :" />
                                            </div>

                                            <div className="text-start">
                                                <label htmlFor="name" className="font-semibold">URL:</label>
                                                <input name="url" id="giglink-url" type="url" className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-2" defaultValue="https://giglink.exe/streetboyyy" />
                                            </div>

                                            <div className="text-start">
                                                <label htmlFor="comments" className="font-semibold">Bio:</label>
                                                <textarea name="comments" id="comments" className="form-input w-full text-[15px] py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-2xl outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-2" placeholder="I'm a Digital Artist. Digital Art with over 3 years of experience. Experienced with all stages of the Art cycle for dynamic projects."></textarea>
                                            </div>

                                            {/* <div className="text-start">
                                                <label htmlFor="name" className="font-semibold">Twitter Account:</label>
                                                <p className="text-slate-400 text-[15px]">Link your twitter account to gain more trust on the Marketplace</p>
                                                <input type="text" className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-2" placeholder="Twitter Profile Name" id="twitter_name" name="name" />
                                            </div> */}

                                            <button id="submit" name="send" className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full justify-center flex items-center" >Upload your NFT</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </>
    )
}
