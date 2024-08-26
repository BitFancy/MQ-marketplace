import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Switcher from "../../components/switcher";
import { IoMdClose, BsExclamationOctagon } from "../../assets/icons/vander";
import misc from "../../constants/misc";
import urls from "../../constants/urls";
import axios from "axios"; // Import axios for HTTP requests
import UserContext from "../../contexts/UserContext";
import { useNFTMarketplace } from "../../contexts/NFTMarketplaceContext";
import { useConnectModal } from "@particle-network/connectkit";

export default function ItemDetail() {
  const params = useParams();
  const id = params.id;
  const { getMarketItem, formatPrice, buyMarketItem, bid, fromUnixTimestamp, changeItemStateAndPrice } =
    useNFTMarketplace();
  const { userData, getUserAvatar, isUserAuthenticated } =
    useContext(UserContext);
  const [placeBid, setPlaceBid] = useState(false);
  const [itemSoldMsg, setItemSoldMsg] = useState(false);
  const [itemErrMsg, setItemErrMsg] = useState(false);
  const [buyNow, setBuyNow] = useState(false);
  const [marketItem, setMarketItem] = useState(false);
  const [changingMarketItem, setChangingMarketItem] = useState(false);
  const connectModal = useConnectModal();
  const [isItemLoading, setisItemLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const initialized = useRef(false);
  const [currentValue, setCurrentValue] = useState(0.000000001);
  const [currentType, setCurrentType] = useState(true); //true for Auction
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();


  const isDisable =()=> (parseFloat(currentValue) <= 0|| startTime >= endTime || 
  (marketItem.startTime === startTime && marketItem.endTime === endTime && marketItem.etherPrice === currentValue && marketItem.isAuction === currentType                                
  ));

  let contractAddress;

  switch (process.env.REACT_APP_CHAIN_ENV) {
    case "dev":
      contractAddress = process.env.REACT_APP_CONTRACT_PROXY_ADDRESS_DEV;
      break;
    case "testing":
      contractAddress = process.env.REACT_APP_CONTRACT_PROXY_ADDRESS_TESTING;
      break;
    case "prod":
      contractAddress = process.env.REACT_APP_CONTRACT_PROXY_ADDRESS_PROD;
      break;
    default:
      contractAddress = process.env.REACT_APP_CONTRACT_PROXY_ADDRESS_DEV;
      break;
  }

  useEffect(() => {
    document.documentElement.classList.add("dark");
    if (/*userInfo &&*/ !initialized.current||initialized.current) {
      initialized.current = true;
      getMarketItem(id)
        .then((item) => {
          axios
            .get(item.tokenURIs[0])
            .then((response) => {
              const { name, image } = response.data;
              const etherPrice = formatPrice(item.price);
              const updatedItem = {
                ...item,
                name,
                image,
                etherPrice,
              };
              setCurrentType(item.isAuction);
              setCurrentValue(updatedItem.etherPrice);
              setMarketItem(updatedItem);
              setStartTime(updatedItem.startTime);
              setEndTime(updatedItem.endTime);
              setisItemLoading(false);
              return updatedItem;
            })
            .then(async (updatedItem) => {
              return await axios
                .get(
                  process.env.REACT_APP_API_ADDRESS +
                    "/user/details/" +
                    updatedItem.seller
                )
                .then((response) => {
                  const { art_name, avatar, sid, address } =
                    response.data.result.data;
                  updatedItem.art_name = art_name;
                  updatedItem.avatar = avatar;
                  updatedItem.sid = sid;
                  updatedItem.avatar = getUserAvatar(updatedItem);
                  setisItemLoading(false);
                  setMarketItem(updatedItem);
                })
                .catch((error) => {
                  console.error("Error fetching additional data:", error);
                });
            });
        })
        .catch((error) => {
          console.error("Error fetching market item:", error);
        });
    }
  }, [getMarketItem, formatPrice, getUserAvatar, id, isItemLoading]);

  const buyMarketItemHandler = async () => {
    if (isLoading) {
      return;
    }

    if (!isUserAuthenticated) {
      connectModal.openConnectModal();
      return;
    }

    setItemSoldMsg(false);
    setItemErrMsg(false);

    if (marketItem.seller.toLowerCase() === userData.address.toLowerCase()) {
      alert("You are already selling this item");
      return;
    }

    if (marketItem.isAuction) {
      setPlaceBid(true);
    } else {
      setBuyNow(true);
    }
  };

  const buyMarketItemProc = async () => {
    try {
      setBuyNow(false);
      setIsLoading(true);
      const result = await buyMarketItem(
        marketItem.itemId,
        marketItem.etherPrice
      );
      if (result) {
        setItemSoldMsg(true);
      } else {
        setItemErrMsg(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error creating market item", error);
    }
  };

  const bidMarketItemProc = async () => {
    try {
      const currentTime = Math.floor(Date.now() / 1000);
      // console.log(
      //   marketItem.isAuction,
      //   marketItem.startTime,
      //   marketItem.endTime
      // );
      if (currentValue <= marketItem.etherPrice) {
        alert("Bid price must be greater than highest bid");
        return;
      }
      setPlaceBid(false);
      setIsLoading(true);
      const result = await bid(marketItem.itemId, currentValue);

      if (result) {
        setItemSoldMsg(true);
      } else {
        setItemErrMsg(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error creating market item", error);
    }
  };

  const changeItemDataProc = async () => {
    try {
      setChangingMarketItem(false);
      setIsLoading(true);
      const result = await changeItemStateAndPrice(
        marketItem.itemId,
        currentValue,
      );
      if (result) {
        setChangingMarketItem(false);
      } else {
        setItemErrMsg(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error changing market item data", error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="relative pt-28 md:pb-24 pb-16">
        <div className="container">
          {isItemLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60vh",
              }}
            >
              <Circles color="#00BFFF" height={80} width={80} />
            </div>
          )}
          {marketItem && (
            <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-[30px]">
              <div className="lg:col-span-5">
                <img
                  src={marketItem.image}
                  className="rounded-md shadow dark:shadow-gray-700"
                  alt=""
                />

                <div className="bg-gray-50 dark:bg-slate-800 rounded-md shadow dark:shadow-gray-800 mt-[30px] p-6 overflow-hidden">
                  <div>
                    <span className="font-medium text-slate-400 block mb-1">
                      NFT Address:
                    </span>
                    <Link
                      to="#"
                      className="font-medium text-violet-600 underline block"
                    >
                      {marketItem.nftContract}
                    </Link>
                  </div>
                  {marketItem.tokenIds.map((id, index) => (
                    <div key={index} className="mt-4 flex gap-4">
                      <span className="font-medium text-slate-400 block mb-1">
                        Token ID:
                      </span>
                      <span className="font-medium block">
                        #{id.toString()}
                      </span>
                    </div>
                  ))}

                  <div className="mt-4 flex gap-4">
                    <span className="font-medium text-slate-400 block mb-1">
                      Blockchain:{" "}
                    </span>
                    <span className="font-medium block">
                      {process.env.REACT_APP_CHAIN_NAME}
                    </span>
                  </div>
                  {
                  isUserAuthenticated&&
                  <div className="mt-4">
                    <div className="font-medium text-slate-400 block mb-1">
                      Deposit & Withdraw:
                    </div>
                    <div>
                        {marketItem.seller.toLowerCase() ===
                        userData?.address.toLowerCase() ? (
                        <Link
                            to="#"
                            onClick={() => {}}
                            className="btn rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white ms-1"
                        >
                            {isLoading ? (
                            "Loading..."
                            ) : (
                            <>
                                <i className="mdi mdi-lightning-bolt"></i> Withdraw
                            </>
                            )}
                        </Link>
                        ) : (
                        <span className="font-medium block">Unsupported</span>
                        )}
                    </div>
                  </div>
                  }
                </div>
              </div>

              <div className="lg:col-span-7 lg:ms-8">
                <h5 className="md:text-2xl text-xl font-semibold">
                  {marketItem.name} (#{marketItem.tokenIds[0].toString()})
                </h5>

                <h4 className="text-yellow-400 mt-4 font-bold">
                  State: {!marketItem.isAuction ? "On Sale" : "On Auction"}
                </h4>
                {/*<span className="font-medium text-slate-400 block mt-2">From this collection: <Link to="/creator-profile" className="text-violet-600">{creater?.subtext ? creater?.subtext : "@FunnyGuy"}</Link></span>*/}

                <h5 className="text-slate-400 mt-4 font-bold text-orange-800">
                  Description: {marketItem.description}
                </h5>
                {/*<p className="text-slate-400 mt-4">What does it mean? Biomechanics is the study of the structure, function and motion of the mechanical aspects of biological systems, at any level from whole organisms to organs, cells and cell organelles, using the methods of mechanics. Biomechanics is a branch of biophysics.</p>*/}

                <div className="mt-4">
                  <span className="text-lg font-medium text-slate-400 block">
                    {marketItem.isAuction ? "Highest Bid" : "Market Price"}
                  </span>
                  {/*<span className="tmd:text-2xl text-xl font-semibold block mt-2"><i className="mdi mdi-ethereum"></i> 3.5 ETH = $ 4,659.75</span>*/}
                  <span className="tmd:text-2xl text-xl font-semibold block mt-2">
                    <i className="mdi mdi-ethereum"></i>
                    {marketItem.etherPrice} {misc.currency}
                  </span>
                </div>
                {isUserAuthenticated &&
                <div className="mt-6">
                    <div>
                    {(marketItem.seller.toLowerCase() ===
                    userData.address.toLowerCase())&& (marketItem.tempOwner.includes("00000000000")) ? (
                        <Link
                            to="#"
                            onClick={() => setChangingMarketItem(true)}
                            className="btn rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white ms-1">
                            { isLoading ? 
                            "Loading..."
                             : 
                             <div>
                                 <i className="mdi mdi-lightning-bolt"></i>
                                    Change MarketItem Data      
                             </div>
                            } 
                        </Link>
                    )
                     : 
                    (
                      <Link
                        to="#"
                        onClick={() => {
                          buyMarketItemHandler();
                        }}
                        className="btn rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white ms-1"
                      >
                        {isLoading ? (
                          "Loading..."
                        ) : (
                          <>
                            <i className="mdi mdi-lightning-bolt"></i>{" "}
                            {marketItem.isAuction ? "Place Bid" : "Buy Now"}
                          </>
                        )}
                      </Link>
                    )}
                  </div>
                  {itemSoldMsg && (
                    <div style={{ marginTop: "20px" }}>
                      Congratulations, you can view your item here:{" "}
                      <Link
                        to={`${urls.user_nfts}/${userData.address}`}
                        style={{ color: "blue" }}
                      >
                        my nft page
                      </Link>
                    </div>
                  )}
                  {itemErrMsg && (
                    <div style={{ marginTop: "20px" }}>
                      Error trying to buy NFT, please try again or contact
                      support
                    </div>
                  )}
                </div>
                }
                <div className="md:flex p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700 mt-6">
                  <div className="md:w-1/2">
                    <div className="flex items-center">
                      <div className="relative inline-block">
                        <img
                          src={marketItem.avatar}
                          className="h-16 rounded-md"
                          alt=""
                        />
                        {/*<i className="mdi mdi-check-decagram text-emerald-600 text-lg absolute -top-2 -end-2"></i>*/}
                      </div>

                      <div className="ms-3">
                        <span className="text-slate-400 text-[16px] block mt-1">
                          {marketItem.isAuction ? "Owner" : "Seller"}
                          <Link
                            to={`/creator-profile/${marketItem.sid}`}
                            className="font-semibold block hover:text-violet-600"
                          >
                            @{marketItem.seller}
                          </Link>
                          {marketItem.isAuction && (
                            <p className="font-semibold block hover:text-violet-600">
                              Highest Bidder: @{marketItem.tempOwner}
                            </p>
                          )}
                        </span>
                      </div>
                    </div>
                    {marketItem.isAuction && (
                      <div className="ms-3">
                        <p className="font-semibold block hover:text-violet-600">
                          StartTime:{" "}
                          {fromUnixTimestamp(
                            parseInt(String(marketItem.startTime))
                          )}
                        </p>
                        <p className="font-semibold block hover:text-violet-600">
                          End Time:{" "}
                          {fromUnixTimestamp(
                            parseInt(String(marketItem.endTime))
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`fixed z-50 overflow-hidden inset-0 m-auto justify-center items-center flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80 ${
                    placeBid ? "" : "hidden"
                  }`}
                >
                  <div className="relative w-full h-auto max-w-md p-4">
                    <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow dark:shadow-gray-800">
                      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                        <h5 className="text-xl font-semibold">Place a Bid</h5>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg p-1.5 ms-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        >
                          <IoMdClose onClick={() => setPlaceBid(false)} />
                        </button>
                      </div>
                      <div className="p-6">
                        <form className="text-start">
                          <div className="grid grid-cols-1">
                            <div className="mb-4">
                              <label className="font-semibold">
                                Your Bid Price:
                              </label>
                              <input
                                name="etherium"
                                id="number"
                                type="number"
                                onChange={(e) =>
                                  setCurrentValue(e.target.value)
                                }
                                className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-3"
                                placeholder={`${marketItem.etherPrice}ETH`}
                              />
                            </div>

                            {/* <div className="mb-4">
                                                    <label className="font-semibold" >Enter Your QTY:</label>
                                                    <input name="quantity" id="number2" type="number" className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-3" placeholder="0"/>
                                                    <span className="text-slate-400 text-sm"><span className="text-slate-900 dark:text-white mt-1">Note:</span> Max. Qty 5</span>
                                                </div> */}
                          </div>
                        </form>

                        <div className="pt-4 border-t dark:border-t-gray-800">
                          <div className="flex justify-between">
                            <p className="font-semibold text-sm">
                              {" "}
                              You must bid more than least:
                            </p>
                            <p className="text-sm text-violet-600 font-semibold">
                              {" "}
                              {marketItem.etherPrice}{" "}
                            </p>
                          </div>
                          <div className="flex justify-between mt-1">
                            <p className="font-semibold text-sm">
                              {" "}
                              current amount:
                            </p>
                            <p className="text-sm text-violet-600 font-semibold">
                              {" "}
                              {currentValue}{" "}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Link
                            to="#"
                            onClick={() => bidMarketItemProc()}
                            data-modal-toggle="NftBid"
                            className={`btn rounded-full ${
                              parseFloat(currentValue) <= marketItem.etherPrice
                                ? "bg-gray-400"
                                : "bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700"
                            } text-white w-full`}
                            disabled={
                              parseFloat(currentValue) <= marketItem.etherPrice
                                ? true
                                : false
                            }
                          >
                            {" "}
                            <i className="mdi mdi-gavel"></i> Place a Bid
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`fixed z-50 overflow-hidden inset-0 m-auto justify-center items-center flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80 ${
                    buyNow ? "" : "hidden"
                  }`}
                >
                  <div className="relative w-full h-auto max-w-md p-4">
                    <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow dark:shadow-gray-800">
                      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                        <h5 className="text-xl font-semibold">Buy Now</h5>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg p-1.5 ms-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        >
                          <IoMdClose onClick={() => setBuyNow(false)} />
                        </button>
                      </div>
                      <div className="p-6">
                        <div className="pt-4 border-t dark:border-t-gray-800">
                          <div className="flex justify-between">
                            <p className="font-semibold text-sm"> Price:</p>
                            <p className="text-sm text-violet-600 font-semibold">
                              {marketItem.etherPrice}{misc.currency}{" "}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center p-4 bg-red-600/10 text-red-600 mt-4 rounded-lg">
                          <BsExclamationOctagon className="text-3xl" />

                          <div className="ms-2">
                            <span className="block font-semibold">
                              This creator is not verified
                            </span>
                            <span className="block">
                              Purchase this item at your own risk
                            </span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Link
                            to="#"
                            onClick={() => buyMarketItemProc()}
                            className="btn rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white w-full"
                          >
                            <i className="mdi mdi-lightning-bolt"></i> Buy Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`fixed z-50 overflow-hidden inset-0 m-auto justify-center items-center flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80 ${changingMarketItem ? "" : "hidden"
                  }`}
                >
                  <div className="relative w-full h-auto max-w-md p-4">
                    <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow dark:shadow-gray-800">
                      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                        <h5 className="text-xl font-semibold">Change MarketItem Data</h5>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg p-1.5 ms-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        >
                          <IoMdClose onClick={() => setChangingMarketItem(false)} />
                        </button>
                      </div>
                      <div className="p-6">
                        <form className="text-start">
                          <div className="grid grid-cols-1">
                            <div className="mb-4">
                              <label className="font-semibold">
                                Item Type: {marketItem.isAuction? 'Auction': 'Sale'}
                              </label>
                              <div>
                                {/* Render the checkbox and attach the change event handler */}
                                <label>
                                    <input 
                                    type="checkbox" 
                                    checked={currentType} 
                                    onChange={(e)=> setCurrentType(e.target.checked)} 
                                    />
                                    Auction
                                </label>
                              </div>
                              <div>
                              <label>
                                {marketItem.isAuction? `Set Minimum Bid Number (${misc.currency})`: `Set Price (${misc.currency})`}
                                <input
                                    name="etherium"
                                    id="number"
                                    type="number"
                                    onChange={(e) =>
                                    setCurrentValue(e.target.value)
                                    }
                                    value={currentValue} 
                                    className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-3"
                                    placeholder={`${marketItem.etherPrice} ${misc.currency}`}
                                />
                              </label>
                              </div>
                            </div>

                            {/* <div className="md:col-span-6 col-span-12">
                                <label className="font-semibold"> Starting Date : </label>
                                <input name="date" type="datetime-local" className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200
                                rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-2 start" placeholder="Select date :" 
                                value={fromUnixTimestamp(startTime)} onChange={(e) => setStartTime(toUnixTimestamp(e.target.value))}
                                />
                                
                            </div>

                            <div className="md:col-span-6 col-span-12">
                                <label className="font-semibold"> Expiration date : </label>
                                <input name="date" type="datetime-local" className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 
                                dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-2 end" placeholder="Select date :" 
                                value={fromUnixTimestamp(endTime)} onChange={(e) => setEndTime(toUnixTimestamp(e.target.value))} 
                                />
                          
                            </div> */}
                            {/* <div className="mb-4">
                                                    <label className="font-semibold" >Enter Your QTY:</label>
                                                    <input name="quantity" id="number2" type="number" className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-3" placeholder="0"/>
                                                    <span className="text-slate-400 text-sm"><span className="text-slate-900 dark:text-white mt-1">Note:</span> Max. Qty 5</span>
                                                </div> */}
                          </div>
                        </form>

                        <div className="mt-4">
                          <Link
                            to="#"
                            onClick={()=>changeItemDataProc()}
                            data-modal-toggle="NftBid"
                            className={`btn rounded-full ${
                              isDisable()
                                ? "bg-gray-400"
                                : "bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700"
                            } text-white w-full}`
                            }
                          >
                            {" "}
                            <i className="mdi mdi-gavel"></i> {isLoading? 'Processing' : 'Change MarketItem Data'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
      {/* <Switcher /> */}
    </>
  );
}
