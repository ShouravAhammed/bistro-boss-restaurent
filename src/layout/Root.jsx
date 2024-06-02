import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";


const Root = () => {

    const location = useLocation();
    console.log(location);
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signUp')

    return (
        <div className="font-inter">
            {
                noHeaderFooter || <Navbar/>
            }
            <Outlet/>
            {
               noHeaderFooter ||  <Footer/>
            }
        </div>
    );
};

export default Root;