
import moment from "moment";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <div className="bg-gradient-to-r from-[#1F2937] from-50% to-[#111827] to-50%">
            <div className="px-4 py-24 grid lg:grid-cols-2 grid-cols-1 gap-5 text-white container mx-auto">
            <div className="text-center space-y-6">
                <h3 className="font-inter font-medium text-3xl uppercase">Contact Us</h3>
                <div className="font-inter font-medium text-xl space-y-2">
                <Link className="">123 ABS Street, Uni 21, Bangladesh</Link>
                <Link className="">+88 123456789</Link>
                <p>Mon - Fri: 08:00 - 22:00</p>
                <p>Sat - Sun: 10:00 - 23:00</p>
                </div>
            </div>
            <div className="text-center space-y-6">
                <h3 className="font-inter font-medium text-3xl">Follow US</h3>
                <div className="space-y-6">
                <p className="font-medium text-xl">Join us on social media</p>
                <div className="flex justify-center items-center gap-4">
                    <Link className="text-2xl text-white"><FaFacebookF /></Link>
                    <Link className="text-2xl text-white"><FaInstagram /></Link>
                    <Link className="text-2xl text-white"><FaTwitter /></Link>
                </div>
                </div>
            </div>
        </div>
        <div className="text-center bg-[#151515]">
            <p className="font-medium text-xl text-white px-4 py-3">Copyright © Shourav Ahammed {moment().format("YYYY")}. All rights reserved.</p>
        </div>
        </div>
    );
};

export default Footer;