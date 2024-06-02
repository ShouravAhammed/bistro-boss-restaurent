import { Helmet } from "react-helmet-async";
import PopularMenu from "../PopularMenu.jsx/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import FeaturedMenu from "./FeaturedItem/FeaturedMenu";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro | Home</title>
            </Helmet>
            <Banner/>
            <div className="lg:w-3/4 w-full mx-auto py-10 container px-4">
            <Category/>
            <PopularMenu></PopularMenu>
            </div>
            <FeaturedMenu></FeaturedMenu>
            <div className="lg:w-3/4 w-full mx-auto py-10 container px-4">
            <Testimonials></Testimonials>
            </div>
        </div>
    );
};

export default Home;