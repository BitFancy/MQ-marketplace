// UserContext.js
import { createContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import qs from 'querystring-es3';
import misc from '../constants/misc'

const UserContext = createContext(null);

export const UserProvider = ({ children }) => 
{
    //const account = useAccount();
    //const { userInfo } = useAuthCore();
    //const { disconnect } = useParticleConnect();
    //const [userAvatar, setUserAvatar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const isMounted = useRef(false);
    const backendURL = process.env.REACT_APP_API_ADDRESS;

    const getUserStorageData = (storageKey = 'userData') => {

        let userDataFromStorage = null;
        const userDataString = localStorage.getItem(storageKey);
        if (userDataString !== null) {
            userDataFromStorage = JSON.parse(userDataString);
        }
       return userDataFromStorage;
    };

    const setUserStorageData = (newUserData, storageKey = 'userData') => {

            console.log("Updating userData", newUserData);
            //setUserData(newUserData);
            const newUserDataString = JSON.stringify(newUserData)
            localStorage.setItem(storageKey, newUserDataString);
    };

    const clearUserStorageData = () => {

        console.log("Clearing userData");
        setUserData(null);
        localStorage.removeItem('userData');
    };

    const getUserAvatar = (userData) =>{

        if (userData && userData.avatar && 
                (userData.avatar.includes('http://') || 
                        userData.avatar.includes('https://'))) {
            return userData.avatar;
        }
        else if (userData && userData.avatar) {
            return `/avatar/${userData.avatar}`;
        }
        else {
            return `/avatar/1.jpg`;
        }
    }

    const getUserDetails = async (sid) => {

        try {
            const url = `${backendURL}/user/details/${sid}`;
            const resp = await axios.get(url);
            if (resp.status === 200 && resp.data.result.success === true) 
            {
                const result = resp.data.result.data;
                return result;
            }
            return null;
        }
        catch (error)
        {
            console.error('Error:', error);
            return null;
        }
    };

    const checkUserArtName = async (artName, address) => {

        try {
            const response = await axios.post(`${backendURL}/user/check-artname`, 
                 { art_name: artName, address: address },
                 {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                return response;

        } catch (error) {
            console.error('Error checking art name:', error);
            return null;
        }
    };
    
    const saveUserData = async (jwt_data, address, formData) => {

        try {
            const url = `${backendURL}/user/details/${address}`;
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'authorization': jwt_data.token,
            };
            const response = await axios.put(url, new URLSearchParams(formData).toString(), { headers });
            if (response.status === 200 && response.data.result.success) {
                const newUserData = response.data.result.data; 
                const mergedUserData = { ...userData, ...newUserData };
                setUserStorageData(mergedUserData);
                setUserData(mergedUserData);
                console.log('User data saved successfully:', response.data);
                return true;
            }
            return false;
        
        } catch (error) {
            console.error('Error saving user data:', error);
            return false;
        }
    };

    const verifyWalletSignature = async () => {

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts);
            const wallet = localStorage.getItem('particle_connect_cached_provider');
            console.log(wallet);
            const userDataFromStorage = getUserStorageData();
            console.log(userDataFromStorage);
            if (userDataFromStorage === null || 
                    accounts[0] !== userDataFromStorage.address || 
                                userDataFromStorage.wallet !== wallet) {

                const messageToSign = misc.wallet_signature_text;
                const signedMessage = await window.ethereum.request({
                    method: 'personal_sign',
                    params: [messageToSign, accounts[0]]
                });
                console.log(signedMessage);
                const params = {
                    auth_type: 'wallet',
                    signature: signedMessage,
                    message: messageToSign,
                    address: accounts[0],
                    wallet: localStorage.getItem('particle_connect_cached_provider')
                };
                return authenticateUserRequest(params);
            }

            return true;

        } catch (error)  {
            console.error('Error verifying wallet sigunature:', error);
            return false;
        }
    };

    const verifyParticleAuth =  async (address, userInfo) => {
        try {
            const userDataFromStorage = getUserStorageData();

            if (userDataFromStorage === null ||
                    userDataFromStorage.auth_type !== 'particle' || 
                        userDataFromStorage.particle_token !== userInfo.token) {
                const params = {
                    auth_type: 'particle',
                    token: userInfo.token,
                    uuid: userInfo.uuid,
                    address: address,
                    wallet: 'particle'
                };
                return authenticateUserRequest(params);
            }

            return true;

        } catch (error) {
            console.error('Error verifying particle auth:', error);
            return false;
        }
    };

    const authenticateUserRequest =  async (params) => {

        const formData = qs.stringify(params);
        const url = `${backendURL}/authenticate-user/`;
        const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        if (response.status === 200 && response.data.result.success) {
            setUserStorageData(response.data.result.data);
            setUserData(response.data.result.data);
            console.log("userData" , userData);
            return true;
        }

        return false;
    };

    useEffect(() => {

        if (!isMounted.current && userData === null) {
            isMounted.current = true;
            const data = getUserStorageData();
            if (data) {
                setUserData(data);
            }
            setLoading(false);
        }

    }, [userData]);

    return (
        <UserContext.Provider value={{ userData, isUserAuthenticated, getUserStorageData, setUserStorageData, clearUserStorageData, getUserDetails, saveUserData, getUserAvatar, verifyWalletSignature, verifyParticleAuth, setIsUserAuthenticated, checkUserArtName }}>
            {!loading && children}
        </UserContext.Provider>
    );
};

export default UserContext;
