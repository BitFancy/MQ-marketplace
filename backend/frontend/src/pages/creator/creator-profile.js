import React, { useEffect, useContext, useRef, useState } from 'react'
import single from '../../assets/images/blog/single.jpg';
import Navbar from '../../components/navbar'
import Footer from '../../components/footer';

import { useParams } from 'react-router-dom';
import ItemsGrid from '../../components/items-grid';
import UserContext from '../../contexts/UserContext';
import DiscoverItems from '../../components/discover-items';

export default function CreatorProfile() {
    const params = useParams();
    const id = params.id;
    const { getUserDetails, getUserAvatar } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState(null);
    const [noDetails, setNoDetails] = useState(false);
    const initialized = useRef(false);

    const loadFile = (event) => {
        const image = document.getElementById(event.target.name);
        image.src = URL.createObjectURL(event.target.files[0]);
    };

    useEffect(() => {
        const fetchData = async () => {

            if (!initialized.current) {
                setNoDetails(false);
                initialized.current = true;
                const result = (await getUserDetails(id))?? {address: id, sid: id, art_name: 'unnamed'};
                result.avatar = getUserAvatar(result);
                if (result) {
                    result.addresses = [id];
                    setUserDetails(result);
                }
                else {
                    setNoDetails(true);
                }
            }
        };

        fetchData();

    }, [id, getUserDetails]);

    return (
        <>
            <Navbar />
                    <section className="relative md:pb-24 pb-16 lg:mt-24 mt-[74px]">
                        <div className="lg:container container-fluid">
                            <div className="group profile-banner relative overflow-hidden text-transparent lg:rounded-xl shadow dark:shadow-gray-700">
                                {/*<input id="pro-banner" name="profile-banner" type="file" className="hidden" onChange={loadFile} />*/}
                                <div className="relative shrink-0">
                                    <img src={single} className="h-80 w-full object-cover" id="profile-banner" alt="" />
                                    <div className="absolute inset-0 bg-slate/10 group-hover:bg-slate-900/40 transition duration-500" /></div>
                                <label className="absolute inset-0 cursor-pointer" htmlFor="pro-banner"></label>
                            </div>
                        </div>

                        <div className="md:flex justify-center">
                            <div className="md:w-full">
                                <div className="relative -mt-[60px] text-center p-4">
                                    <div className="group profile-pic w-[112px] mx-auto">
                                        {/*<input id="pro-img" name="profile-image" type="file" className="hidden" onChange={loadFile} />*/}
                                        <div>
                                            <div className="relative h-28 w-28 mx-auto rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800 overflow-hidden">
                                                <img src={userDetails?.avatar?? `/avatar/${Math.ceil(Math.random() * 7 + 1)}.jpg`} className="rounded-full" id="profile-image" alt="" />
                                            
                                                <div className="absolute inset-0 group-hover:bg-slate-900/40 transition duration-500"></div>
                                                <label className="absolute inset-0 cursor-pointer" htmlFor="pro-img"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <h5 className="text-xl font-semibold">User Profile {/*<i className="mdi mdi-check-decagram text-emerald-600 align-middle text-lg"></i>*/}</h5>
                                        {/* <p className="text-slate-400 text-[16px] mt-1">Created by <Link to="/" className="text-violet-600 font-semibold">1x5484dcdvcdscds56c4</Link></p>

                                        <div className="mt-4">
                                            <Link to="#" className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white mx-1"><i className="mdi mdi-plus"></i> Follow me</Link>
                                            <Link to="#" className="btn btn-icon btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white mx-1"><i className="mdi mdi-account-plus"></i></Link>
                                            <Link to="/creator-profile-edit" className="btn btn-icon btn-sm rounded-full bg-violet-600/5 hover:bg-violet-600 border-violet-600/10 hover:border-violet-600 text-violet-600 hover:text-white mx-1"><i className="mdi mdi-cog"></i></Link>
                                        </div>*/}
                                        { userDetails?.art_name &&
                                            <h5 className='mt-4 content-center'> {userDetails?.art_name} </h5>
                                        }
                                        <h5 className='mt-4 content-center'>Address: {id}</h5>
                                        <DiscoverItems allData={true} pagination={true} showAuction={true} showSale={true} title={'My NFTs on Sale or Auction'} seller ={id}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* <ItemsGrid addresses={userDetails.addresses} /> */}
                    </section>

            {noDetails ?
                (
                    <section className="relative md:pb-24 pb-16 lg:mt-24 mt-[74px] flex justify-center items-center">
                        <div className="p-4 text-center bg-gray-200 rounded-lg">
                            Seller not found.
                        </div>
                    </section>
                ) : null}

            <Footer />
        </>
    )
}
