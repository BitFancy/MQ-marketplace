import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Switcher from "../../components/switcher";
import { Link, useParams } from "react-router-dom";
import UserNftGrid from '../../components/user-nft-grid';
import UserContext from '../../contexts/UserContext';
import { Circles } from 'react-loader-spinner';
import { useConnectModal } from '@particle-network/connectkit';
import urls from '../../constants/urls';
import DiscoverItems from '../../components/discover-items';
//import { useNFTMarketplace } from '../../contexts/NFTMarketplaceContext';

export default function ListNFT() {

	const { userData, isUserAuthenticated } = useContext(UserContext);
    //const [price, setPrice] = useState("");
	//const [minimumBid, setMinimumBid] = useState("");
	//const [description, setDescription] = useState("");
	//const [nft, setNft] = useState(null);
	const [days, setDays] = useState(0);
	const [sellType, setSellType] = useState("Sell");
	const [dayType, setDayType] = useState("1 Day");
    const params = useParams();
    const id = params.id;
	const connectModal = useConnectModal();
	const navigate = useNavigate();
	console.log(id);
    useEffect(() => {
		document.documentElement.classList.add("dark");
	}, []);

    const handleSellTypeChange = (event) => {
		setSellType(event.target.value);
	};
	const handleDayTypeChange = (event) => {
		const dayys = event.target.value;
		setDayType(event.target.value);
		if (dayys === "1 Day") {
			setDays(1);
		} else if (dayys === "3 Day") {
			setDays(3);
		} else if (dayys === "5 Day") {
			setDays(5);
		} else if (dayys === "7 Day") {
			setDays(7);
		} else if (dayys === "10 Day") {
			setDays(10);
		} else if (dayys === "15 Day") {
			setDays(15);
		} else if (dayys === "30 Day") {
			setDays(30);
		}
	};

    /*const list = async () => {
        console.log("HERE");
    };*/

	useEffect(() => {

        if (!isUserAuthenticated) {
            const timeout = setTimeout(() => {
                connectModal.openConnectModal();
            }, 15000);

            return () => clearTimeout(timeout); // Cleanup the timeout if the component unmounts
        }

    }, [isUserAuthenticated]);

	useEffect(() => {
		console.log(id);
        if (isUserAuthenticated && userData.address !== id) {
			navigate(urls.home);
        }

    }, [isUserAuthenticated]);

    if (!isUserAuthenticated) {
        return (
            <>  
                <Navbar />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                    <Circles color="#00BFFF" height={80} width={80} />
                </div>
                <Footer />
                {/* <Switcher /> */}
            </>
        );
    }

    return (
		<>
			<Navbar />

			<section className="relative table w-full py-36 bg-[url('../../assets/images/bg/bg1.jpg')] bg-bottom bg-no-repeat">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
				<div className="container">
					<div className="grid grid-cols-1 pb-8 text-center mt-10">
						<h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">
							My NFT
						</h3>
					</div>
				</div>
			</section>
			
			<section className="relative py-16">
                <DiscoverItems allData={true} pagination={true} showAuction={true} showSale={true} title={'My NFTs on Sale or Auction'} seller ={id}/>
                {/* <AuctionsTwo pagination={true} allData={true}/> */}
            </section>

			<Footer />
			{/* <Switcher /> */}
		</>
	);
}