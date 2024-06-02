
import { FaHome, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { GiShoppingBag } from 'react-icons/gi';
import { IoCalendarSharp } from 'react-icons/io5';
import { MdBookmarkAdded, MdOutlineRestaurantMenu, MdPayments, MdRateReview } from 'react-icons/md';
import { RiContactsBook3Fill, RiMenuSearchFill } from 'react-icons/ri';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {

    const [cart] = useCart();

    // TODO: get Admin value from the database
    const [isAdmin] = useAdmin(); 


    const AdminDashboardSidebar = <>

        <li className="font-medium text-base hover:text-white duration-300 uppercase"><NavLink to={'/dashboard/adminHome'} className={({isActive}) => isActive ? 'text-white' : 'text-[151515]'}>
            <span className='flex justify-start items-center gap-2'>
            <FaHome className='text-2xl'></FaHome>
            <span>Admin Home</span>
            </span>
            </NavLink></li>
        <li className="font-medium text-base hover:text-white duration-300 uppercase"><NavLink to={'/dashboard/addItems'} className={({isActive}) => isActive ? 'text-white' : 'text-[151515]'}>
            <span className='flex justify-start items-center gap-2'>
            <MdOutlineRestaurantMenu className='text-2xl' />
            <span>Add Items</span>
            </span>
            </NavLink></li>
        <li className="font-medium text-base hover:text-white duration-300 uppercase"><NavLink to={'/dashboard/manageItems'} className={({isActive}) => isActive ? 'text-white' : 'text-[151515]'}>
            <span className='flex justify-start items-center gap-2'>
            <RiMenuSearchFill className='text-2xl' />
            <span>Manage Items</span>
            </span>
            </NavLink></li>
        <li className="font-medium text-base hover:text-white duration-300 uppercase"><NavLink to={'/dashboard/allUsers'} className={({isActive}) => isActive ? 'text-white' : 'text-[151515]'}>
            <span className='flex justify-start items-center gap-2'>
            <FaUsers className='text-2xl' />
            <span>All Users</span>
            </span>
            </NavLink></li>
        <li className="font-medium text-base hover:text-white duration-300 uppercase"><NavLink to={'/dashboard/manageBookings'} className={({isActive}) => isActive ? 'text-white' : 'text-[151515]'}>
            <span className='flex justify-start items-center gap-2'>
            <MdBookmarkAdded className='text-2xl' />
            <span>Manage Bookings</span>
            </span>
            </NavLink></li>
    </>


    const dashboardSidebar = <>

          <li className="font-medium text-base hover:text-white  duration-300 uppercase"><NavLink to={'/dashboard/userHome'} className={({isActive}) => isActive ?'text-white' : 'text-[#151515]'}>
          <span className='flex justify-start items-center gap-2'>
            <FaHome className='text-2xl'></FaHome>
            <span>User Home</span>
            </span>
            </NavLink></li>
        <li className="font-medium text-base hover:text-white  duration-300 uppercase"><NavLink to={'/dashboard/reservation'} className={({isActive}) => isActive ? 'text-white' : 'text-[#151515]'}>
        <span className='flex justify-start items-center gap-2'>
        <IoCalendarSharp className='text-2xl' />
            <span>Reservation</span>
            </span>    
        </NavLink></li>
        <li className="font-medium text-base hover:text-white duration-300 uppercase"><NavLink to={'/dashboard/cart'} className={({isActive}) => isActive ? 'text-white' : 'text-[151515]'}>
            <span className='flex justify-start items-center gap-2'>
            <FaShoppingCart className='text-2xl'></FaShoppingCart>
            <span>My Cart <span>({cart.length})</span></span>
            </span>
            </NavLink></li>
        <li className="font-medium text-base hover:text-white  duration-300 uppercase"><NavLink to={'/dashboard/paymentHistory'} className={({isActive}) => isActive ? 'text-white' : 'text-[#151515]'}>
        <span className='flex justify-start items-center gap-2'>
            <MdPayments className='text-2xl' />
            <span>Payment History</span>
            </span>
            </NavLink></li>
        <li className="font-medium text-base hover:text-white duration-300 uppercase"><NavLink to={'/dashboard/myBookings'} className={({isActive}) => isActive ? 'text-white' : 'text-[#151515]'}>
        <span className='flex justify-start items-center gap-2'>
        <MdBookmarkAdded className='text-2xl' />
            <span>My Booking</span>
            </span>
            </NavLink></li>
        <li className="font-medium text-base hover:text-white  duration-300 uppercase"><NavLink to={'/dashboard/addReview'} className={({isActive}) => isActive ? 'text-white' : 'text-[#151515]'}>
        <span className='flex justify-start items-center gap-2'>
        <MdRateReview className='text-2xl' />
            <span>Add Review</span>
            </span>
            </NavLink></li>
    </>

    const interfaceSidebar = <>
            <li className="font-medium text-base hover:text-white duration-300 uppercase"><NavLink to={'/'} className={({isActive}) => isActive ? 'text-white' : 'text-[151515]'}>
            <span className='flex justify-start items-center gap-2'>
            <FaHome className='text-2xl'></FaHome>
            <span>Home</span>
            </span>
            </NavLink></li>
            <li className="font-medium text-base hover:text-white duration-300 uppercase"><NavLink to={'/orderMenu/salad'} className={({isActive}) => isActive ? 'text-white' : 'text-[151515]'}>
            <span className='flex justify-start items-center gap-2'>
            <MdOutlineRestaurantMenu className='text-2xl' />
            <span>Menu</span>
            </span>
            </NavLink></li>
            <li className="font-medium text-base hover:text-white duration-300 uppercase"><NavLink to={'/order/shop'} className={({isActive}) => isActive ? 'text-white' : 'text-[151515]'}>
            <span className='flex justify-start items-center gap-2'>
            <GiShoppingBag className='text-2xl' />
            <span>Shop</span>
            </span>
            </NavLink></li>
            <li className="font-medium text-base hover:text-white duration-300 uppercase"><NavLink to={'/order/contact'} className={({isActive}) => isActive ? 'text-white' : 'text-[151515]'}>
            <span className='flex justify-start items-center gap-2'>
            <RiContactsBook3Fill className='text-2xl' />
            <span>Contact</span>
            </span>
            </NavLink></li>
    </>


    return (
        <div className='flex'>
            {/* dashboard side bar */}
            <div className='px-10 py-6 min-h-screen bg-[#D1A054]'>
            <Link to={'/'} className="font-Cinzel font-black lg:text-2xl text-2xl uppercase flex flex-col items-center justify-center -space-y-2 mb-5"><span className="">Bistro Boss</span><h5 className="font-bold lg:text-2xl text-xl tracking-widest">Restaurant</h5>
            </Link>
                <div>
                {
                    isAdmin ?
                    <>
                    <ul className=' py-5 border-b-2 border-white space-y-4'>
                        {AdminDashboardSidebar}
                    </ul>
                    </>
                    :
                    <>
                    <ul className=' py-5 border-b-2 border-white space-y-4'>
                    {dashboardSidebar}
                    </ul>
                    </>
                }
                <ul className=' py-5 space-y-4'>
                    {interfaceSidebar}
                </ul>
                </div>
            </div>
            {/* dashboard content */}
            <div className='flex-1 container mx-auto px-4 bg-[#F3F3F3]'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;