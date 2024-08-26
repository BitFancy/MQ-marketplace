import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';
import axios from 'axios';
import misc from "../constants/misc"
import { MdKeyboardArrowLeft } from "../assets/icons/vander";
import { useNFTMarketplace } from '../contexts/NFTMarketplaceContext';
import { useAccount, useConnectModal } from '@particle-network/connectkit'
export default function UserNftGrid(props) 
{
    const params = useParams();
    const address = params.id
    const account = useAccount();
    const connectModal = useConnectModal();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [marketItems, setMarketItems] = useState([]);
    const [itemTitle, setItemTitle] = useState([]);
    const [itemState, setItemState] = useState(1n);
    const [itemIndex, setItemIndex] = useState(0);
    const [tokenID, setTokenID] = useState(null);
    const [itemPrice, setItemPrice] = useState(null);
    const { title, description, pagination } = props;
    const { formatPrice, getUserMarketItems, changeItemStateAndPrice } = useNFTMarketplace();
    const [loading, setLoading] = useState(false);
    const [isGridLoading, setisGridLoading] = useState(true);
    const initialized = useRef(false);

    const handleListItemClick = async (item, index) => 
    {
        if (!account)
        {
            connectModal.openConnectModal();
            return;
        }
        setTokenID(item.tokenId);
        setItemTitle(item.name);
        setItemPrice(item.etherPrice);
        setItemState(item.state);
        setItemIndex(index);
        setLoading(false);
        setDialogOpen(true);
    };

    const handleChangeItemStateAndPrice = async () => 
    {
        try 
        {
            setLoading(true);
            const state = (itemState === 1n) ? 0n : 1n;
            let price = 0;
            if (state === 0n)
            {
                const priceInput = document.getElementById("price");
                price = parseFloat(priceInput.value);
                if (price <= 0)
                {
                    alert("Please enter a valid price.");
                    setLoading(false);
                    return;
                }
            }
            await changeItemStateAndPrice(tokenID, price, state);
            updateItemStateAndPriceAtIndex(itemIndex, price, state);
            setDialogOpen(false);
            setLoading(false);
        } 
        catch (error) 
        {
            console.error("Error changing item state and price:", error);
            setLoading(false);
        }
    }

    const updateItemStateAndPriceAtIndex = (index, newPrice, newState) => {
        setMarketItems(prevItems => {
          const updatedItems = [...prevItems];
          updatedItems[index] = {
            ...updatedItems[index],
            state: newState,
            etherPrice: newPrice,
          };
          return updatedItems;
        });
      };

    useEffect(() => 
    {
        if (!initialized.current) 
        {
            initialized.current = true;
            getUserMarketItems(address)
                .then(items => {
                    return Promise.all(items.map(item => {
                        return axios.get(item.tokenURI)
                            .then(response => {
                                const { name, description, image } = response.data;
                                const etherPrice = formatPrice(item.price);
                                //setItemState(item.state);
                                return {
                                    ...item,
                                    name,
                                    description,
                                    image,
                                    etherPrice
                                };
                            });
                    }));
                })
                .then(updatedItems => {
                    setisGridLoading(false);
                    setMarketItems(updatedItems);
                })
                .catch(error => {
                    console.error('Error fetching market items:', error);
                });
        }
        document.documentElement.classList.add('dark');
    }, [getUserMarketItems]);

    return (
        <>
            <div className={`container ${title !== undefined ? 'md:mt-24 mt-16' : ''}`}>
                <div className="grid grid-cols-1 text-center">
                    <h3 className="mb-4 md:text-3xl text-2xl md:leading-snug leading-snug font-semibold">{title}</h3>
                    <p className="text-slate-400 max-w-xl mx-auto">{description}</p>
                </div>
                {isGridLoading && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                        <Circles color="#00BFFF" height={80} width={80} />
                    </div>
                )}
                {marketItems.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>&nbsp;</p>
                ) : (
                    <div className={`grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] ${title !== undefined ? 'mt-12' : ''}`}>
                        {marketItems.map((item, index) => (
                            <div key={index} className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-lg p-3 shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-800 hover:scale-105 ease-in-out duration-500">
                                <div className="relative overflow-hidden rounded-lg" style={{ height: '200px' }}>
                                    <img src={item.image} className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500 object-cover w-full h-full" alt="" />
                                </div>
                                <div className="relative p-4 -mt-14">
                                    <div className="relative inline-block">
                                       <br /><br />
                                    </div>
                                    <div className="mt-3">
                                    <button onClick={() => handleListItemClick(item, index)} className="font-semibold block text-[18px] hover:text-violet-600">
                                            {item.state === 1n ? 'List Item' : 'Unlist Item'}
                                        </button>
                                        ID: {item.tokenId.toString()} <br />
                                        Price: {item.etherPrice} {misc.currency} <br />
                                        Name: {item.name}
                                        <p className="text-slate-400 mt-1">{item.description}</p>
                                    </div>
                                    {/* Dialog component */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* Dialog */}
                {dialogOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-50"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ width: '24rem', height: '24rem' }}>
                            <div className="bg-white p-4 rounded-lg relative">
                                {/* Dialog content */}
                                <h2 className="text-black text-lg font-semibold mb-2">{itemState === 1n ? 'List' : 'Unlist'}  {itemTitle}</h2>
                                {itemState === 1n ? (
                                    <div className="mb-4">
                                        <label htmlFor="price" className="block text-sm font-medium text-black">Price ({misc.currency})</label>
                                        <input
                                            type="number"
                                            id="price"
                                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
                                            min="0"
                                            defaultValue={itemPrice}
                                        />
                                    </div>
                                ) : (<div className="mb-4"><br /></div>)}
                                <input type="hidden" id="tokenID" />
                                {/* Submit button */}
                                <div className="flex justify-center mt-4">
                                    <button
                                        onClick={() => setDialogOpen(false)}
                                        className="btn bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 text-white rounded-full justify-center flex items-center mr-2"
                                        style={{ marginRight: '8px' }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleChangeItemStateAndPrice}
                                        className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full justify-center flex items-center"
                                        disabled={loading}
                                    >
                                        {loading ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {pagination ?
                    <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                        <div className="md:col-span-12 text-center">
                            <nav>
                                <ul className="inline-flex items-center -space-x-px">
                                    <li>
                                        <Link to="#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">
                                            <MdKeyboardArrowLeft className="text-[20px]" />
                                        </Link>
                                    </li>
                                    {/* Pagination links */}
                                </ul>
                            </nav>
                        </div>
                    </div> : ""}
            </div>
        </>
    );
}
