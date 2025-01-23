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
            {
                path: 'cart',
                element: <Cart></Cart>,
            },

            // admin routes
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
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
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router;