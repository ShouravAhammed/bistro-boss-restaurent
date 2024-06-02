import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import loadingAir from '../assets/others/loader3.gif'

const AdminRoutes = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation();
    console.log(location, location.pathname)

    if(loading || isAdminLoading){
        return <>
        <div className=" md:w-1/3 w-full h-screen  mx-auto">
        <div className="flex h-screen justify-center items-center">
        <img className="md:w-[40%] w-[50%]" src={loadingAir} alt="" />
        </div>
        </div>
        </>
    }
    if(!user && isAdmin){
        return <Navigate to='/login' state={{from: location}} replace={true} />
    }
    return children;
};

export default AdminRoutes;