import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Select from 'react-select'
import DiscoverItems from '../../components/discover-items';
import { useNFTMarketplace } from '../../contexts/NFTMarketplaceContext';
//import Switcher from '../../components/switcher';
import {LuClock, LuSearch, AiOutlineAppstore, AiOutlineStar} from "../../assets/icons/vander"

const options = [
    { value: 'All', label: 'All'},
    { value: 'Image', label: 'Images' },
    { value: 'GIFs', label: 'GIF files' },
    { value: 'Audio', label: 'Audios' },
    { value: 'Video', label: 'Videos' }
];

const buyOptions = [
    { value: 'All', label: 'All' },
    { value: 'Sales', label: 'On Sale' },
    { value: 'Auctions', label: 'On Auctions' }
]

const rateOptions = [
    { value: 'top', label: 'Top Rated' },
    { value: 'low', label: 'Lower Rated' }
]
export default function ExploreOne() {
    const [dataType, setDataType] = useState('');
    const [showSale, setShowSale] = useState(true);
    const [showAuction, setShowAuction] = useState(true);
    const [searchString, setSearchString] = useState('');
    const [rate, setRate] = useState(true);
    const { getMarketItems } = useNFTMarketplace();
    
    const onSelectDataHandler = (selectedoption) => {
        
        switch (selectedoption.value) {
            case "Image":
                setDataType("image/*");
                break;
            case "GIFs":
                setDataType("image/gif");
                break;
            case "Audio":
                setDataType("audio/*"); // using 'audio' for music
                break;
            case "Video":
                setDataType("video/*");
                break;
            case "All":
                setDataType("");
                break;
            default:
                setDataType("");
                break;
        }
    };

    const onSelectRateHandler = (selectedOption) => { 
        switch (selectedOption.value) {
                case "top":
                    setRate(true);
                    break;
                case "low":
                    setRate(false);
                    break;
                default: 
                    setRate(true);
                    break;        
            }
    };
    
    const onSelectBuyHandler = (selectedOption) => { 
        switch (selectedOption.value) {
                case "Sales":
                    setShowSale(true);
                    setShowAuction(false);
                    break;
                case "Auctions":
                    setShowAuction(true);
                    setShowSale(false);
                    break;
                case "All":
                    setShowAuction(true); 
                    setShowSale(true);
                    break;
                default:
                    setShowAuction(true); 
                    setShowSale(true);
                    break;        
            }
    };

    
    useEffect(() => {
        document.documentElement.classList.add('dark');
        getMarketItems();
    }, []);
    return (
        <>
            <Navbar />
            <section className="relative table w-full py-36 bg-[url('../../assets/images/bg/bg1.jpg')] bg-bottom bg-no-repeat">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">Explore Items</h3>

                    </div>
                </div>

            </section>
            <div className="relative">
                <div className="shape absolute start-0 end-0 sm:-bottom-px -bottom-[2px] overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg className="w-full h-auto" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>

            <section className="relative md:pb-24 pb-16 -mt-16">
                <div className="container z-1">
                    <div className="grid grid-cols-1">
                        <form className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow dark:shadow-gray-700">
                            <div className="registration-form text-dark text-start">
                                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                                    <div>
                                        <label className="form-label font-medium dark:text-white">Search:</label>
                                        <div className="filter-search-form relative filter-border mt-2">
                                            <LuSearch className="icons"/>
                                            <input name="name" type="text" id="job-keyword" className="form-input w-full filter-input-box bg-gray-50 dark:bg-slate-800 border-0 focus:ring-transparent" placeholder="Search your keaywords" 
                                            onChange ={(e)=>setSearchString(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="choices-catagory" className="form-label font-medium dark:text-white">Categories:</label>
                                        <div className="filter-search-form relative filter-border mt-2">
                                            <AiOutlineAppstore className="icons"/>
                                            <Select className="form-input z-2 filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={options} 
                                            onChange={onSelectDataHandler}/>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="choices-min-price" className="form-label font-medium dark:text-white">Items:</label>
                                        <div className="filter-search-form relative filter-border mt-2">
                                            <LuClock className="icons text-base"/>
                                            <Select className="form-input z-2 filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={buyOptions} 
                                            onChange={onSelectBuyHandler} 
                                            />

                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="choices-max-price" className="form-label font-medium dark:text-white">Sort By:</label>
                                        <div className="filter-search-form relative mt-2">
                                            <AiOutlineStar className="icons"/>
                                            <Select className="form-input z-2 filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={rateOptions} 
                                             onChange={onSelectRateHandler} 
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <DiscoverItems title={'ALL MarketItems'} pagination={true} showAuction={showAuction} showSale = {showSale} dataType={dataType} searchString={searchString} rate ={rate}/>
            </section>
            <Footer />
            {/* <Switcher /> */}
        </>
    )
}
