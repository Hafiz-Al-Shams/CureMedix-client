import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import DetailsCard from "../pages/CategoryDetails/DetailsCard";
import Shop from "../pages/Shop/Shop";
import Cart from "../pages/Cart/Cart";
import Dashboard from "../layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers";
import AdminRoute from "./AdminRoute";
import AllCategories from "../pages/Dashboard/AllCategories";
import UpdateCategory from "../pages/Dashboard/UpdateCategory";
import Payment from "../pages/Dashboard/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome";
import ManagePayments from "../pages/Dashboard/ManagePayments";





const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: 'shop',
                element: <Shop></Shop>,
            },
            {
                path: 'signUp',
                element: <SignUp></SignUp>,
            },
            {
                path: 'signIn',
                element: <SignIn></SignIn>,
            },
            {
                path: 'categoryDetails/:categoryName',
                element: <DetailsCard />,
            },
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [

            // admin routes
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>,
            },
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
            },
            {
                path: 'manage-payments',
                element: <AdminRoute><ManagePayments></ManagePayments></AdminRoute>,
            },
            {
                path: 'allCategories',
                element: <AdminRoute><AllCategories></AllCategories></AdminRoute>,
            },
            {
                path: 'updateCategory/:id',
                element: <AdminRoute><UpdateCategory></UpdateCategory></AdminRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/categories/${params.id}`)
            },

            // user routes
            {
                path: 'userHome',
                element: <UserHome></UserHome>,
            },
            {
                path: 'cart',
                element: <Cart></Cart>,
            },
            {
                path: 'payment',
                element: <Payment></Payment>,
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },


        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router;