import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { MdDashboardCustomize, MdLogin } from "react-icons/md";
import DefaultUser from '../../../assets/others/profile.png'
import { AiOutlineShoppingCart } from "react-icons/ai";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";


const Navbar = () => {
  const {user, logOut} = useContext(AuthContext);
  const [cart ] = useCart();
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logOut();
  }

    const navOptions = <>
        <li className="font-extrabold text-base hover:text-[#EEFF25] duration-300 uppercase"><NavLink to={'/'} className={({isActive}) => isActive ? 'text-[#EEFF25]' : 'text-white'}>Home</NavLink></li>
        {
          user && <>
          <li className="font-extrabold text-base hover:text-[#EEFF25] duration-300 uppercase"><NavLink to={'/menu'} className={({isActive}) => isActive ? 'text-[#EEFF25]' : 'text-white'}>Our Menu</NavLink></li>
        <li className="font-extrabold text-base hover:text-[#EEFF25] duration-300 uppercase"><NavLink to={'/orderMenu/salad'} className={({isActive}) => isActive ? 'text-[#EEFF25]' : 'text-white'}>Order Menu</NavLink></li>
          </>
        }
        <li className="font-extrabold text-base hover:text-[#EEFF25] duration-300 uppercase"><NavLink to={'/contact'} className={({isActive}) => isActive ? 'text-[#EEFF25]' : 'text-white'}>Contact Us</NavLink></li>
    </>

    return (
        <div className="fixed w-full z-30 container mx-auto">
            <div className="navbar px-4 z-20 text-white py-4 bg-[#00000080]">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-1">
        {navOptions}
      </ul>
    </div>
    <Link to={'/'} className="font-Cinzel font-black lg:text-3xl text-2xl uppercase flex flex-col items-center justify-center -space-y-2 "><span className="">Bistro Boss</span><h5 className="font-bold lg:text-2xl text-xl tracking-widest">Restaurant</h5></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu-horizontal px-1 space-x-4">
      {navOptions}
    </ul>
  </div>
  <div className="navbar-end">

   {
    user && !isAdmin ?  <Link to={'/dashboard/cart'} className="mr-2">
    <button className="text-[#ffffff] font-bold flex justify-center items-center">
      <span className="text-3xl"><AiOutlineShoppingCart /></span>
      <div className="text-sm -mt-2 text-[#EEFF25]">+{cart.length}</div>
    </button>
   </Link>
   :
   <></>
   }
   {  user ? 
<div className="dropdown dropdown-end">
<label tabIndex={0} className="btn btn-circle btn-sm hover:border-2 border-green-500 duration-300" data-tooltip-id="drop" data-tooltip-content={user?.displayName}>
   <div className="w-8 rounded-full bg-white">
     <img className="rounded-full" alt="" src={user?.photoURL ? user?.photoURL : DefaultUser} />  
  </div>
 </label>
 {/* <Tooltip id="drop" /> */}
    <ul tabIndex={0} className="flex flex-col gap-2 menu-sm dropdown-content mt-3 z-[1] shadow bg-white rounded-none p-4 w-52">
      <li><p className="text-base font-extrabold text-center text-[#151515]">{user?.displayName || 'User Name'}</p></li>
        {
          user && isAdmin && <li>
           <Link to={'dashboard/adminHome'} className="btn p-2 rounded-none w-full text-[#151515] flex justify-start items-center gap-1">
            <span className="text-2xl"><MdDashboardCustomize /></span>
            <span>Dashboard</span>
            </Link> 
          </li>
        }
        {
          user && !isAdmin && 
          <Link to={'dashboard/userHome'} className="btn p-2 rounded-none w-full text-[#151515] flex justify-start items-center gap-1">
            <span className="text-2xl"><MdDashboardCustomize /></span>
            <span>Dashboard</span>
            </Link> 
        }
      <li>
      <button onClick={handleLogOut} className="btn p-2 rounded-none w-full text-[#151515] flex justify-start items-center gap-1">
            <span className="text-2xl"><MdLogin /></span>
            <span>Logout</span>
            </button> 

  </li>
    </ul>
  </div> 
  : <Link
  to={'/login'}
  className="text-center px-5 pt-1.5 pb-1 relative rounded-lg group font-bold overflow-hidden border-b-4 border-black bg-white text-black inline-block uppercase"
>
  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-black group-hover:h-full"></span>
  <span className="relative group-hover:text-white">
    Login
  </span>
</Link>
}
  </div>
</div>
        </div>
    );
};

export default Navbar;