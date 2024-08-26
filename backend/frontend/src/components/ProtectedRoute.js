// Import necessary dependencies
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
//import { useAuthCore } from '@particle-network/auth-core-modal';
import urls from '../constants/urls';
import UserContext from '../contexts/UserContext';
//import { useAccount } from '@particle-network/connectkit'
// Define the ProtectedRoute component
export const ProtectedRoute = () => 
{
    //const { isUserAuthenticated } = useContext(UserContext);
    //return isUserAuthenticatedy ? <Outlet /> : <Navigate to={urls.home} />;
    return <Outlet />;
}