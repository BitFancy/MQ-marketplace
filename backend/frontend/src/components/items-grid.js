import React, { useEffect, useState, useRef, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from '../assets/icons/vander'
import misc from "../constants/misc";
import urls from '../constants/urls';
import axios from 'axios';
import { useNFTMarketplace } from '../contexts/NFTMarketplaceContext';
import UserContext from '../contexts/UserContext';

export default function ItemsGrid(props) {

    const { title, description, pagination, address, addresses} = props;
    const [marketItems, setMarketItems] = useState([]);
    //const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(true);
    const { getMarketItems, getUserMarketItems, formatPrice } = useNFTMarketplace();
    const { getUserAvatar } = useContext(UserContext);
    const initialized = useRef(false);

    useEffect(() => 
    {
        const fetchMarketItems = async (items) => 
        {
            //setNoData(false);
            try 
            {
                const updatedItems = await Promise.all(items.map(async (item) => 
                {
                    try 
                    {
                        const response = await axios.get(item.tokenURI);
                        const { name, description, image } = response.data;
                        const etherPrice = formatPrice(item.price);
                        let user_data = {};
                        let userInfo = {};
                        try{
                            user_data = await axios.get(process.env.REACT_APP_API_ADDRESS + '/user/details/' + item.seller);
                            userInfo = user_data.data.result.data;
                        }
                        catch (error) {
                            console.error("Error fetching additional data:", error);
                            userInfo = { address: null, sid: null, avatar: '/avatar/1.jpg', art_name: 'Unnamed' }
                        }
                        const avatar = getUserAvatar(userInfo);
                        return {
                            ...item,
                            name,
                            description,
                            image,
                            etherPrice,
                            avatar,
                            userInfo
                        };
                    } catch (error) {
                        //const userInfo = { address: null, sid: null, avatar: '/avatar/1.jpg', art_name: 'Unnamed' }
                        console.error("Error fetching additional data:", error);
                        /*return {
                            ...item,
                            //name,
                            description,
                            image,
                            etherPrice: 0,
                            userInfo
                        };*/
                    }
                }));
                setLoading(false);
                setMarketItems(prevItems => [...prevItems, ...updatedItems]);
            } catch (error) {
                console.error('Error fetching market items:', error);
            }
        };

        if (!initialized.current) 
        {
            initialized.current = true;
            if (typeof addresses !== 'undefined')
            {
                addresses.forEach(address => {
                    getUserMarketItems(address, 0n).then(items => 
                    {
                        fetchMarketItems(items);
                    }).catch(error => 
                    {
                        console.error('Error fetching market items:', error);
                    });
                });
            }
            else
            {
                getMarketItems().then(items => 
                {
                    fetchMarketItems(items);
                }).catch(error => 
                {
                    console.error('Error fetching market items:', error);
                });
            }
        }
        document.documentElement.classList.add('dark');
    }, [getMarketItems, getUserMarketItems, address, formatPrice]);

    return (
        <>
            <div className={`container ${title !== undefined ? 'md:mt-24 mt-16' : ''}`} id="market-items-grid">
                {
                    title !== undefined ? (
                        <div className="grid grid-cols-1 text-center">
                            <h3 className="mb-4 md:text-3xl text-2xl md:leading-snug leading-snug font-semibold">{title}</h3>

                            <p className="text-slate-400 max-w-xl mx-auto">{description}</p>
                        </div>
                    ) : ('')
                }
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                        <Circles color="#00BFFF" height={80} width={80} />
                    </div>
                ) : ('')}
                {marketItems.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>&nbsp;</p>
                ) : (
                <div className={`grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] ${title !== undefined ? 'mt-12' : ''}`}>
                    {
                        marketItems.map((ele, index) => (
                            <div key={index} className="group relative overflow-hidden p-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:shadow-md dark:shadow-md hover:dark:shadow-gray-700 transition-all duration-500 hover:-mt-2 h-fit">
                                <div className="relative overflow-hidden">
                                <div className="relative overflow-hidden rounded-lg" style={{ height: '200px' }}>
                                    <img src={ele.image} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500 object-cover w-full h-full" alt="" />
                                </div>

                                    <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                        <Link to={`${urls.item_detail}/${ele.tokenId}`} className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-lightning-bolt"></i> Buy Now</Link>
                                    </div>

                                    {/*<div className="absolute top-2 end-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <Link to="#" className="btn btn-icon btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-plus"></i></Link>
                                    </div>*/}

                                    {/*<div className="absolute bottom-2 start-0 end-0 mx-auto text-center bg-gradient-to-r from-violet-600 to-red-600 text-white inline-table text-lg px-3 rounded-full">
                                            <LuClock className='me-1 inline text-base'/> <small id="auction-item-2" className="font-bold">
                                            {ele.remaining?.days} : {ele.remaining?.hours}: {ele.remaining?.minutes}: {ele.remaining?.seconds}
                                        </small>
                                    </div>*/}
                                </div>

                                <div className="mt-3">
                                    <div className="flex items-center">
                                        <img src={ele.avatar} className="rounded-full h-8 w-8" alt="" />
                                        <Link to={`${urls.creator_profile}/${ele.userInfo.sid}`} className="ms-2 text-[15px] font-medium text-slate-400 hover:text-violet-600">@{ele.userInfo.art_name}</Link>
                                   </div>

                                    <div className="my-3">
                                        <Link to={`${urls.item_detail}/${ele.tokenId}`} className="font-semibold hover:text-violet-600">{ele.name}</Link>
                                    </div>

                                    <div className="flex justify-between p-2 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700">
                                        <div>
                                            <span className="text-[16px] font-medium text-slate-400 block">Price</span>
                                            <span className="text-[16px] font-semibold block"><i className="mdi mdi-ethereum"></i> {ele.etherPrice} {misc.currency}</span>
                                        </div>

                                        {/*<div>
                                            <span className="text-[16px] font-medium text-slate-400 block">Highest Bid</span>
                                            <span className="text-[16px] font-semibold block"><i className="mdi mdi-ethereum"></i> 3.55 ETH</span>
                                        </div>*/}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div> )}
            {pagination?
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
          </div> : ""
                }
            
            </div>
        </>
    )
}
