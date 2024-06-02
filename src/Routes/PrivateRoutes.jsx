
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import PropTypes from 'prop-types';
import loadingAir from '../assets/others/loader3.gif'
import { AuthContext } from "../Providers/AuthProvider";
const PrivateRoutes = ({children}) => {

    const {user, loading} = useContext(AuthContext)
    const location = useLocation();
    console.log(location, location.pathname)

    if(loading){
        return <>
        <div className=" md:w-1/3 w-full h-screen  mx-auto">
        <div className="flex h-screen justify-center items-center">
        <img className="md:w-[40%] w-[50%]" src={loadingAir} alt="" />
        </div>
        </div>
        </>
    }
    if(!user){
        return <Navigate to='/login' state={{from: location}} replace={true} />
    }
    return children;
};

// PrivateRoutes.propTypes = {
//     children: PropTypes.node,
// }


export default PrivateRoutes;