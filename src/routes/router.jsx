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


// import Register from "../pages/Register/Register";
// import SignIn from "../pages/SignIn/SignIn";
// import PrivateRoute from "./PrivateRoute";
// import FoodDetails from "../pages/FoodDetails/FoodDetails";
// import AllFoods from "../pages/AllFoods/AllFoods";
// import FoodPurchase from "../pages/FoodPurchase/FoodPurchase";
// import AddFood from "../pages/AddFood/AddFood";
// import UpdateFood from "../pages/UpdateFood/UpdateFood";
// import MyFoods from "../pages/MyFoods/MyFoods";
// import MyOrders from "../pages/MyOrders/MyOrders";
// import Gallery from "../pages/Gallery/Gallery";




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
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'cart',
                element: <Cart></Cart>,
            },
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router;