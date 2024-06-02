import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

export const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useContext(AuthContext)
    // request interceptor to add authorization header for every secure call to the API
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    })

    // interceptor 401 and 403 status 
    axiosSecure.interceptors.response.use(function (response) {

        return response;
    }, async(error) => {
        const status = error.response.status
        // console.log('error status in the interceptor', status)
        if (status === 401 || status === 403) {
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;