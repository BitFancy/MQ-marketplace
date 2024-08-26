import React from 'react'
import image from '../../assets/images/items/2.jpg';
import single from '../../assets/images/blog/single.jpg';
import image1 from '../../assets/images/blog/05.jpg';
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Switcher from '../../components/switcher';
import { Link, useParams } from 'react-router-dom';
import {LuClock, LuCalendarDays} from "../../assets/icons/vander"
import { blogData } from '../../data/data';

export default function BlogDetail() {
    const params = useParams();
    const id = params.id
    const blog = blogData.find((blogs) => blogs.id === parseInt (id));
    return (
        <>
            <Navbar />
            <section className="relative pt-32 md:pb-24 pb-16">
                <div className="container">
                    <div className="md:flex justify-center">
                        <div className="lg:w-3/5">
                            <h5 className="md:text-3xl text-2xl md:leading-snug leading-snug font-semibold">{blog?.title ? blog?.title  : "TOKEN2040: The Future of Crypto, Decrypted"}</h5>
                            <p className="text-slate-400 text-lg mt-4">The NFT space has made unprecedented progress since we first launched Giglink in late 2021, as it hit several major milestones in the past…</p>

                            <div className="flex mt-5">
                                <span className="font-medium inline-flex items-center"><LuCalendarDays className="me-1"/>{blog?.date ? blog?.date : "20th October, 2022"}</span>
                                <span className="ms-3 font-medium inline-flex items-center"><LuClock className="me-2"/>5 min read</span>
                            </div>

                            <div className="flex items-center mt-5">
                                <div className="relative inline-block">
                                    <img src={image} className="h-14 rounded-full" alt="" />
                                </div>

                                <div className="ms-3">
                                    <Link to="/creator-profile" className="font-semibold block hover:text-violet-600">Michael Williams</Link>
                                    <span className="text-slate-400 text-sm block mt-1">@FunnyGuy</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex justify-center mt-6">
                        <div className="lg:w-full">
                            <div className="relative">
                                <img src={blog?.image ? blog?.image : single} className="rounded-lg shadow-md dark:shadow-gray-800 w-full h-auto" alt="" />
                                <div className="absolute bottom-2/4 translate-y-2/4 start-0 end-0 text-center">
                                    <Link to="#" data-type="youtube" data-id="S_CGed6E610"
                                        className="lightbox h-20 w-20 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-violet-600">
                                        <i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex justify-center mt-6">
                        <div className="lg:w-3/5">
                            <p className="text-slate-400">However, as the space keeps expanding and people proceed to mint thousands of NFTs every day, an important question arises - how do we make sure that all that creative work remains accessible over time?</p>
                            <p className="text-slate-400 mt-4">Earlier this year, as NFTs began hitting the mainstream, the industry faced a major technical problem. As highlighted by some analysts, most of the JPEGs (or other file formats) that serve as the media basis for their respective NFTs weren't stored on the chain itself. Instead, NFTs often simply redirected to a URL where the corresponding media was hosted - in most cases, that was a separate domain that belonged to either the creator or the platform where that NFT was minted.</p>
                            <p className="text-slate-400 mt-4">But what happens when those domains go down? With that discovery, it became apparent that some NFTs have a single point of failure, which, in turn, could significantly impact their longevity and value.</p>
                            <p className="text-slate-400 mt-4">In light of that, numerous projects and organisations have begun working on a potential fix. In a recent Clubhouse session, we brought those pioneering protocols and projects - Protocol Labs (an open-source lab that is working on Filecoin, IPFS and libp2p), Async.art, Fleek and Arweave - together to have a constructive discussion about the future of NFT metadata. Here's a concise recap of the main ideas that were discussed there.</p>

                            <img src={image1} className="rounded-lg mt-4" alt="" />

                            <h5 className="text-lg font-semibold mt-4">What's an NFT?</h5>

                            <p className="text-slate-400 mt-4">This is the part that takes a bit of open-mindedness. An NFT is a unique digital token, with most using the ethereum blockchain to digitally record transactions. It's not a cryptocurrency like bitcoin or ether, because those are fungible -- exchangeable for another bitcoin or cash. NFTs are recorded in a digital ledger in the same way as cryptocurrency, so there's a listing of who owns each one.</p>
                            <p className="text-slate-400 mt-4">What makes an NFT unique is the digital asset tied to the token. This can be an image, video, tweet or piece of music that's uploaded to a marketplace, which creates the NFT to be sold.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            {/* <Switcher /> */}
        </>
    )
}
