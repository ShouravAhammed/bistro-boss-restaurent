import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home/Home";
import Contact from "../pages/Contact/Contact";
import Menu from "../pages/Menu/Menu";
import OrderMenu from "../pages/OrderMenu/OrderMenu";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import Cart from "../pages/Dashboard/Cart/Cart";
import Dashboard from "../layout/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoutes from "./AdminRoutes";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItems from "../pages/Dashboard/UpdateItems/UpdateItems";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistroey/PaymentHistory";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
  
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/menu",
            element: <PrivateRoutes><Menu></Menu></PrivateRoutes>
        },
        {
            path: "/orderMenu/:category",
            element: <OrderMenu></OrderMenu>
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/signUp",
            element: <SignUp></SignUp>
        },
        {
            path: "/contact",
            element: <Contact></Contact>
        },
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children: [
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        {
          path: 'cart',
          element: <Cart></Cart>
        },
        {
          path: 'payment',
          element: <Payment></Payment>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },
        // Admin dashboard 
        {
          path: 'adminHome',
          element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>
        },
        {
          path: 'allUsers',
          element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
        },
        {
          path: 'addItems',
          element: <AdminRoutes><AddItems></AddItems></AdminRoutes>
        },
        {
          path: 'manageItems',
          element: <AdminRoutes><ManageItems></ManageItems></AdminRoutes>
        },
        {
          path: 'updateItems/:id',
          element: <AdminRoutes><UpdateItems></UpdateItems></AdminRoutes>,
          loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/menu/${params.id}`)
        },
      ]
    }
  ]);  

export default router;
