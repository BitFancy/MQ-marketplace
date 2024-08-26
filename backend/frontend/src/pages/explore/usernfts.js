import React, { useEffect, useContext } from 'react'
import Navbar from '../../components/navbar'
import { useNavigate, useParams } from 'react-router-dom';
import AuctionsTwo from '../../components/auctions-two'
import Footer from '../../components/footer';
import Switcher from '../../components/switcher';
import { Link } from 'react-router-dom';
import DiscoverItems from '../../components/discover-items';
import UserContext from '../../contexts/UserContext';
import urls from '../../constants/urls'


export default function UserNFTs() {
    
    const navigate = useNavigate();
    const params = useParams();
    const address = params.id;
    const { userData, isUserAuthenticated } = useContext(UserContext);
    useEffect(() => {
        document.documentElement.classList.add('dark');
        // if (!isUserAuthenticated) {   
		// 	navigate(urls.home);
        // }
    }, []);

    // useEffect( () =>  {
    //     if (!isUserAuthenticated) {
	// 		navigate(urls.home);
    //     }
    // }, [isUserAuthenticated]);
    
    return (
        <>
            <Navbar />
            <section className="relative table w-full py-36 bg-[url('../../assets/images/bg/bg1.jpg')] bg-bottom bg-no-repeat">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">User's NFTs Sale or Auction</h3>
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">Address: #{address}</h3>
                        
                    </div>
                </div>
            </section>
            <section className="relative py-16">
                <DiscoverItems allData={true} pagination={true} showAuction={true} showSale={true} title={'My NFTs on Sale or Auction'} seller ={address}/>
                {/* <AuctionsTwo pagination={true} allData={true}/> */}
            </section>
            <Footer />
            {/* <Switcher /> */}
        </>
    )
}
