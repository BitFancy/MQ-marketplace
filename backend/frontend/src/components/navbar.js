import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { Link } from "react-router-dom";
import { PiWalletBold, AiOutlineUser, LiaSignOutAltSolid, LuSettings } from "../assets/icons/vander"
import logo_icon_40 from '../assets/images/logo-icon-40.png';
import logo_dark from '../assets/images/logo-dark.png';
import logo_white from '../assets/images/logo-white.png';
import urls from '../constants/urls'
//import EnvDiv from './env-div';
import { ConnectButton, useAccount, useConnectModal, useParticleConnect, useParticleProvider } from '@particle-network/connectkit'
import { useAuthCore } from '@particle-network/auth-core-modal';
import UserContext from '../contexts/UserContext';
import { useNFTMarketplace } from '../contexts/NFTMarketplaceContext';

export default function Navbar() 
{
    const account = useAccount();
    const provider = useParticleProvider();
    const { disconnect, connectKit } = useParticleConnect();
    const { userInfo } = useAuthCore();
    const connectModal = useConnectModal();
    const { getBalance, getAccounts, updateProvider } = useNFTMarketplace();
    const { userData, setIsUserAuthenticated, verifyWalletSignature, verifyParticleAuth, getUserAvatar } = useContext(UserContext);
    const [isDropdown, openDropdown] = useState(true);
    const [isOpen, setMenu] = useState(true);
    const [userAvatar, setUserAvatar] = useState(null);
    const connectKITC = useRef(null);
    const [walletAddress, setWalletAddress] = useState('');
    const [addressBalance, setAddressBalance] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const initialized = useRef(false);
    const isConnected = useRef(false);
    const isDisconnected = useRef(false);
    //const [hasProviderInitialized, setHasProviderInitialized] = useState(false);

    const OpenWallet = async () => {

        if (!account) {
            connectModal.openConnectModal();
            return;
        }

        try {
            const accounts = await getAccounts();
            setWalletAddress(accounts[0]);
            const balance = await getBalance(accounts[0]);
            setAddressBalance(balance);
            setIsDialogOpen(true);

        } catch (error) {
            console.error('Error getting wallet data:', error);
        }
    };

    const handleLogin = async () => {

        try {
            connectModal.openConnectModal();
        } catch (error) {
            if (error.code === 4011) {
                console.log("User canceled the operation");
            } 
            else {
                console.error("Login error:", error);
            }
        }
    };

    const handleLogout = async () => {

        //clearUser();
        await disconnect();
        setIsUserAuthenticated(false);
        //window.location.reload();
    };
    
    const activateMenu = useCallback(() => {
        var menuItems = document.getElementsByClassName("sub-menu-item");
        if (menuItems) {

            var matchingMenuItem = null;
            for (var idx = 0; idx < menuItems.length; idx++) {
                if (menuItems[idx].href === window.location.href) {
                    matchingMenuItem = menuItems[idx];
                }
            }
    
            if (matchingMenuItem) {
                matchingMenuItem.classList.add('active');
    
                var immediateParent = getClosest(matchingMenuItem, 'li');
    
                if (immediateParent) {
                    immediateParent.classList.add('active');
                }
    
                var childParent = getClosest(immediateParent, '.child-menu-item'); // Rename 'parent' to 'childParent'
                if (childParent) {
                    childParent.classList.add('active');
                }
    
                var parentItem = getClosest(childParent || immediateParent, '.parent-menu-item'); // Rename 'parent' to 'parentItem'
                if (parentItem) {
                    parentItem.classList.add('active');
    
                    var parentMenuItem = parentItem.querySelector('.menu-item');
                    if (parentMenuItem) {
                        parentMenuItem.classList.add('active');
                    }
    
                    var parentOfParent = getClosest(parentItem, '.parent-parent-menu-item');
                    if (parentOfParent) {
                        parentOfParent.classList.add('active');
                    }
                } else {
                    var parentOfParentItem = getClosest(matchingMenuItem, '.parent-parent-menu-item'); // Rename 'parentOfParent' to 'parentOfParentItem'
                    if (parentOfParentItem) {
                        parentOfParentItem.classList.add('active');
                    }
                }
            }
        }
    }, []);  
    
    /*useEffect(() => {

        if (provider !== undefined && userInfo && !hasProviderInitialized) {
            console.log("Setting provider", provider);
            updateProvider(provider);
            setHasProviderInitialized(true);
        }

    }, [provider, hasProviderInitialized]);*/

    useEffect(() => {

        const particleAuthHandler = async () => {

            if (userInfo && account && provider && !initialized.current) {
                initialized.current = true;
                console.log("connected particle", account, userInfo);
                const isVerifid = await verifyParticleAuth(account, userInfo);
                if (!isVerifid) {
                    console.log("NOT VERIFIED");
                    await disconnect();
                    return;
                }
                updateProvider(provider);
                setUserAvatar(getUserAvatar(userData));
                setIsUserAuthenticated(true);
            }
        };
        particleAuthHandler();

    }, 
    [userInfo, userData, account, provider, disconnect, updateProvider, setUserAvatar, getUserAvatar, verifyParticleAuth, setIsUserAuthenticated]);

    useEffect(() => {

        if (!connectKITC.current) {
            connectKITC.current = connectKit;
        }

        const walletConnectHandler = async (provider) => {

            if (!isConnected.current) {
                isConnected.current = true;
                isDisconnected.current = false;
                console.log("connected wallet");
                const isVerifid = await verifyWalletSignature();
                if (!isVerifid){
                    await disconnect();
                    return;
                }
                updateProvider(window.ethereum);
                setUserAvatar(getUserAvatar(userData));
                setIsUserAuthenticated(true);
                const hideWalletContainer = () => {
                    const walletContainer = document.querySelector('.particle-wallet-entry-container');
                    if (walletContainer) {
                      walletContainer.style.display = 'none';
                      observer.disconnect();
                    }
                 };
                const observer = new MutationObserver(hideWalletContainer);
                observer.observe(document.body, { childList: true, subtree: true });
                hideWalletContainer(); 
            }
        };

        const walletDisconnectHandler = async (provider) => {

            if (!isDisconnected.current)
            {
                isDisconnected.current = true;
                isConnected.current = false;
                console.log('disconnected wallet');
                //window.location.reload();
            }
        };

        connectKITC.current.on('connect', walletConnectHandler);
        connectKITC.current.on('disconnect', walletDisconnectHandler);

        return () => {
            connectKITC.current.off('connect', walletConnectHandler);
            connectKITC.current.off('disconnect', walletDisconnectHandler);
        };

    }, 
    [userData, connectKit, disconnect, setUserAvatar, getUserAvatar, setIsUserAuthenticated, verifyWalletSignature]);

    useEffect(() => {

        activateMenu();

    }, [activateMenu]); 

    window.addEventListener("scroll", windowScroll);
    
    function windowScroll() {

        const navbar = document.getElementById("topnav");
        if (
            document.body.scrollTop >= 50 ||
            document.documentElement.scrollTop >= 50
        ) {
            if (navbar !== null) {
                navbar?.classList.add("nav-sticky");
            }
        } else {
            if (navbar !== null) {
                navbar?.classList.remove("nav-sticky");
            }
        }
        const mybutton = document.getElementById("back-to-top");
        if (mybutton != null) {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                mybutton.classList.add("flex");
                mybutton.classList.remove("hidden");
            } else {
                mybutton.classList.add("hidden");
                mybutton.classList.remove("flex");
            }
        }
    }

    const toggleMenu = () => {
        setMenu(!isOpen)
        if (document.getElementById("navigation")) {
            const anchorArray = Array.from(document.getElementById("navigation").getElementsByTagName("a"));
            anchorArray.forEach(element => {
                element.addEventListener('click', (elem) => {
                    const target = elem.target.getAttribute("href")
                    if (target !== "") {
                        if (elem.target.nextElementSibling) {
                            var submenu = elem.target.nextElementSibling.nextElementSibling;
                            submenu.classList.toggle('open');
                        }
                    }
                })
            });
        }
    }

    const getClosest = (elem, selector) => {
        // Element.matches() polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function (s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) { }
                    return i > -1;
                };
        }
        // Get the closest matching element
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector)) return elem;
        }
        return null;

    };

    return (
        <>
            <nav id="topnav" className="defaultscroll is-sticky">

                {/* <EnvDiv /> */}
                
                <div className="container">
                    {/* <!-- Logo container--> */}
                    <Link className="logo ps-0" to="/">
                        <img src={logo_white} className="hidden dark:inline-block h-10" alt="" />
                        {/* <img src={logo_icon_28} className="inline-block sm:hidden" alt="" /> */}
                        {/* <div className="sm:block hidden">
                            <img src={logo_dark} className="inline-block dark:hidden h-7" alt="" />
                            <img src={logo_white} className="hidden dark:inline-block h-7" alt="" />
                        </div> */}
                    </Link>

                    <div className="menu-extras">
                        <div className="menu-item">
                            {/* <!-- Mobile menu toggle--> */}
                            <Link to="#" className="navbar-toggle" id="isToggle" onClick={toggleMenu}>
                                <div className="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/*<div className={`fixed inset-0 z-10 overflow-y-auto ${isDialogOpen ? 'block' : 'hidden'}`}>
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                            <div className="relative bg-white rounded-lg max-w-lg w-full p-4">
                                <div className="text-center">
                                    <p className="text-lg font-medium text-black">Address:</p>
                                    <p className="text-lg font-medium text-black">{walletAddress}</p>
                                    <p className="text-lg font-medium text-black">Balance:</p>
                                    <p className="text-lg font-medium text-black">{addressBalance} ETH</p>
                                    <button className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg shadow-lg hover:bg-violet-600 hover:text-white" onClick={() => setIsDialogOpen(false)}>Close</button>
                                </div>
                            </div>
                        </div>
    </div>*/}


                    {/* <!--Login button Start--> */}
                    <ConnectButton.Custom>
                        {({ account, openConnectModal }) => {
                            if (!account) {
                                return (
                                    <ul className="buy-button list-none mb-0">
                                        <li className="inline-block ps-1 mb-0">
                                            <button onClick={handleLogin} className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full" type="button">
                                                login
                                            </button>
                                        </li>
                                    </ul>
                                );
                            } else {
                                return (
                                    <ul className="buy-button list-none mb-0">

                                        <li className="inline-block ps-1 mb-0">
                                            <button
                                                onClick={OpenWallet}
                                                className="btn btn-icon rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white">
                                                <PiWalletBold />
                                            </button>
                                        </li>

                                        <li className="dropdown inline-block relative ps-1">
                                            <button onClick={() => openDropdown(!isDropdown)} data-dropdown-toggle="dropdown" className="dropdown-toggle btn btn-icon rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white inline-flex" type="button">
                                                <img src={userAvatar} className="rounded-full" alt="" />
                                            </button>
                                            <div className={`dropdown-menu absolute end-0 m-0 mt-4 z-10 min-w-200 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 ${isDropdown ? 'hidden' : 'block'}`} style={{ minWidth: '200px' }}>
                                                <div className="relative">
                                                    <div className="py-8 bg-gradient-to-tr from-violet-600 to-red-600"></div>
                                                    <div className="absolute px-4 -bottom-7 start-0">
                                                        <div className="flex items-end">
                                                            <img src={userAvatar} className="rounded-full w-10 h-w-10 shadow dark:shadow-gray-700" alt="" />
                                                            {userData && (
                                                                <span className="font-semibold text-[15px] ms-1">{userData.art_name}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-10 px-4">
                                                    <h5 className="font-semibold text-[15px]">&nbsp;</h5>
                                                    {/*<div className="flex items-center justify-between">
                                                        <span className="text-[13px] text-slate-400">{account}</span>
                                                    </div>*/}
                                                </div>
                                               
                                                <ul className="py-2 text-start">
                                                    <li>
                                                        <Link to={`/user-nfts/${account}`} className="inline-flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600"><AiOutlineUser className="text-[16px] align-middle me-1"/>My NFT</Link>
                                                    </li>
                                                    <li>
                                                        <Link to={`${urls.creator_profile}/${account}`} className="inline-flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600"><AiOutlineUser className="text-[16px] align-middle me-1"/>User Profile</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/creator-profile-edit" className="inline-flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600"><LuSettings className="text-[16px] align-middle me-1"/> Settings</Link>
                                                    </li>
                                                    <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>
                                                    <li>
                                                        <Link className="inline-flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600" onClick={handleLogout}>
                                                            <LiaSignOutAltSolid className="text-[16px] align-middle me-1"/> Logout
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li> 
                                    </ul>
                                )
                            }
                        }}
                    </ConnectButton.Custom>

                    <div id="navigation" className={`${isOpen === true ? 'hidden' : 'block'}`}>
                        <ul className="navigation-menu justify-end">
                            <li><Link to={urls.home} className="sub-menu-item">Home</Link></li>
                            {/* <li><Link to={urls.sale} className="sub-menu-item">Sale</Link></li> */}
                            <li className="has-submenu parent-parent-menu-item"><Link to="#">Explore</Link><span className="menu-arrow"></span>
                                <ul className="submenu">
                                    <li><Link to="/explore-one" className="sub-menu-item">Explore Items</Link></li> 
                                    <li><Link to={urls.auction} className="sub-menu-item">Live Auction</Link></li> 
                                    {/* <li><Link to={urls.sale} className="sub-menu-item">NFTs on Sale</Link></li>  */}
                                    <li><Link to={urls.coming_soon} className="sub-menu-item">Activities</Link></li> 
                                    <li><Link to='/comingsoon' className="sub-menu-item">Collections</Link></li>
                                    {/* <li><Link to='/activity' className="sub-menu-item">Activities</Link></li> 
                                    <li><Link to='/collections' className="sub-menu-item">Collections</Link></li>  */}
                                    {account ? (
                                
                                    <li><Link to={urls.upload_work} className="sub-menu-item">Upload Works</Link></li>
            
                                    ) : (
                                    <li><Link to={urls.become_creator} className="sub-menu-item">Upload Works</Link></li>
                                    )}
                                </ul>
                            </li>
                            <li className="has-submenu parent-parent-menu-item">
                                <Link to="#">Pages</Link><span className="menu-arrow"></span>
                                <ul className="submenu">
                                    <li><Link to={urls.aboutus} className="sub-menu-item">About Us</Link></li>
                                    <li><Link to={urls.contact} className="sub-menu-item">Contact</Link></li> 
                                    <li className="has-submenu parent-menu-item"><Link to="#"> About </Link><span className="submenu-arrow"></span>
                                        <ul className="submenu">
                                        <li><Link to={urls.coming_soon} className="sub-menu-item"> Coming Soon</Link></li>
                                        <li><Link to={urls.maintenance} className="sub-menu-item"> Maintenance</Link></li>
                                        <li><Link to={urls.thankyou} className="sub-menu-item"> Thank you</Link></li>                                   
                                        </ul>
                                    </li>
                                    <li className="has-submenu parent-menu-item"><Link to="#"> Help Center </Link><span className="submenu-arrow"></span>
                                        <ul className="submenu">
                                            <li><Link to={urls.helpcenterOverview} className="sub-menu-item"> Overview</Link></li>
                                            <li><Link to={urls.helpcenterFaqs} className="sub-menu-item"> FAQs</Link></li>
                                            <li><Link to={urls.helpcenterGuides} className="sub-menu-item"> Guides</Link></li>
                                            <li><Link to={urls.helpcenterSupport} className="sub-menu-item"> Support</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to={urls.terms} className="sub-menu-item">Terms Policy</Link></li>
                                    <li><Link to={urls.privacy} className="sub-menu-item">Privacy Policy</Link></li>
                                </ul>
                            </li>
                            {/*<li className="has-submenu parent-parent-menu-item">
                                <Link to="#">Explore</Link><span className="menu-arrow"></span>
                                <ul className="submenu">
                                    <li><Link to="/explore-one" className="sub-menu-item"> Explore One</Link></li>
                                    <li><Link to="/explore-two" className="sub-menu-item"> Explore Two</Link></li>
                                    <li><Link to="/explore-three" className="sub-menu-item"> Explore Three</Link></li>
                                    <li><Link to="/auction" className="sub-menu-item">Live Auction</Link></li>
                                    <li><Link to="/item-detail" className="sub-menu-item"> Item Detail</Link></li>
                                    <li><Link to="/activity" className="sub-menu-item"> Activities</Link></li>
                                    <li><Link to="/collections" className="sub-menu-item">Collections</Link></li>
                                    <li><Link to="/upload-work" className="sub-menu-item">Upload Works</Link></li>
                                </ul>
                            </li>
                            <li className="has-submenu parent-parent-menu-item">
                                <Link to="#">Pages</Link><span className="menu-arrow"></span>
                                <ul className="submenu">
                                    <li><Link to="/aboutus" className="sub-menu-item">About Us</Link></li>
                                    <li className="has-submenu parent-menu-item"><Link to="#"> Creator </Link><span className="submenu-arrow"></span>
                                        <ul className="submenu">
                                            <li><Link to="/creators" className="sub-menu-item"> Creators</Link></li>
                                            <li><Link to="/creator-profile" className="sub-menu-item"> Creator Profile</Link></li>
                                            <li><Link to="/creator-profile-edit" className="sub-menu-item"> Profile Edit</Link></li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu parent-menu-item"><Link to="#"> Blog </Link><span className="submenu-arrow"></span>
                                        <ul className="submenu">
                                            <li><Link to="/blogs" className="sub-menu-item"> Blogs</Link></li>
                                            <li><Link to="/blog-detail" className="sub-menu-item"> Blog Detail</Link></li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu parent-menu-item"><Link to="#"> Auth Pages </Link><span className="submenu-arrow"></span>
                                        <ul className="submenu">
                                            <li><Link to="/login" className="sub-menu-item"> Login</Link></li>
                                            <li><Link to="/signup" className="sub-menu-item"> Signup</Link></li>
                                            <li><Link to="/reset-password" className="sub-menu-item"> Forgot Password</Link></li>
                                            <li><Link to="/lock-screen" className="sub-menu-item"> Lock Screen</Link></li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu parent-menu-item"><Link to="#"> Special </Link><span className="submenu-arrow"></span>
                                        <ul className="submenu">
                                            <li><Link to="/comingsoon" className="sub-menu-item"> Coming Soon</Link></li>
                                            <li><Link to="/maintenance" className="sub-menu-item"> Maintenance</Link></li>
                                            <li><Link to="/error" className="sub-menu-item"> 404!</Link></li>
                                            <li><Link to="/thankyou" className="sub-menu-item"> Thank you</Link></li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu parent-menu-item"><Link to="#"> Help Center </Link><span className="submenu-arrow"></span>
                                        <ul className="submenu">
                                            <li><Link to="/helpcenter-overview" className="sub-menu-item"> Overview</Link></li>
                                            <li><Link to="/helpcenter-faqs" className="sub-menu-item"> FAQs</Link></li>
                                            <li><Link to="/helpcenter-guides" className="sub-menu-item"> Guides</Link></li>
                                            <li><Link to="/helpcenter-support" className="sub-menu-item"> Support</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to={urls.terms} className="sub-menu-item">Terms Policy</Link></li>
                                    <li><Link to={urls.upload_work} className="sub-menu-item">Privacy Policy</Link></li>
                                </ul>
                            </li>*/}
                        
                            {/* {account ? (
                                <>
                                <li>
                                    <Link to={`/user-nfts/${account}`}className="sub-menu-item">My NFT</Link>
                                </li>
                                <li><Link to={urls.upload_work} className="sub-menu-item">Upload Works</Link></li>
                                </>
                            ) : (
                                <li><Link to={urls.become_creator} className="sub-menu-item">Become Creator</Link></li>
                            )} */}
                            {/*<li><Link to={urls.user_nfts} className="sub-menu-item">My NFT</Link></li>*/}
                            {/* <li className="has-submenu parent-parent-menu-item">
                                <Link to="#">Help Center</Link><span className="menu-arrow"></span>
                                <ul className="submenu">
                                    <li><Link to={urls.helpcenterOverview} className="sub-menu-item"> Overview</Link></li>
                                    <li><Link to={urls.helpcenterFaqs} className="sub-menu-item"> FAQs</Link></li>
                                    <li><Link to={urls.helpcenterGuides} className="sub-menu-item"> Guides</Link></li>
                                    <li><Link to={urls.helpcenterSupport} className="sub-menu-item"> Support</Link></li>
                                    <li><Link to={urls.terms} className="sub-menu-item">Terms Policy</Link></li>
                                    <li><Link to={urls.privacy} className="sub-menu-item">Privacy Policy</Link></li>
                                </ul>
                            </li>
                            
                            <li className="has-submenu parent-parent-menu-item">
                                <Link to="#">About Us</Link><span className="menu-arrow"></span>
                                <ul className="submenu">
                                    <li><Link to={urls.aboutus} className="sub-menu-item">About US</Link></li>
                                    <li><Link to={urls.contact} className="sub-menu-item">Contact</Link></li> 
                                    <li><Link to={urls.coming_soon} className="sub-menu-item"> Coming Soon</Link></li>
                                    <li><Link to={urls.maintenance} className="sub-menu-item"> Maintenance</Link></li>
                                    <li><Link to={urls.thankyou} className="sub-menu-item"> Thank you</Link></li>
                                </ul>
                            </li> */}
                            
                    </ul>
                </div>
            </div>
            {/*<div className={`fixed inset-0 z-10 overflow-y-auto ${isDialogOpen ? 'block' : 'hidden'}`}>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                    <div className="relative bg-white rounded-lg max-w-lg w-full p-4">
                        <div className="text-center">
                            <p className="text-lg font-medium text-black">Address:</p>
                            <p className="text-lg font-medium text-black">{walletAddress}</p>
                            <p className="text-lg font-medium text-black">Balance:</p>
                            <p className="text-lg font-medium text-black">{addressBalance} ETH</p>
                            <button className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg shadow-lg hover:bg-violet-600 hover:text-white" onClick={() => setIsDialogOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>*/}
            <div className={`fixed inset-0 z-10 overflow-y-auto ${isDialogOpen ? 'block' : 'hidden'}`}>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                    <div className="relative bg-slate-900 rounded-lg max-w-lg w-full p-4 ">
                        <div className="text-center" style={{ padding: '20px' }}>
                            <p className="text-lg font-medium text-white">Address:</p>
                            <p className="text-lg font-medium text-white">{walletAddress}</p>
                            <p className="text-lg font-medium text-white">Balance:</p>
                            <p className="text-lg font-medium text-white">{addressBalance} ETH</p>
                            <button className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg shadow-lg hover:bg-violet-600 hover:text-white" onClick={() => setIsDialogOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
    )
}