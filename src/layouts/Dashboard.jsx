import { FaAd, FaCalendar, FaEnvelope, FaHome, FaList, FaShoppingCart, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import { RiShoppingBag2Line } from "react-icons/ri";
import { MdPayments } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { PiFlagBannerFill } from "react-icons/pi";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart();

    // getting isAdmin value from the database
    const [isAdmin] = useAdmin();
    // const isAdmin = true;

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-emerald-500/70 pt-10">
                <ul className="menu p-4 space-y-1.5">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allCategories">
                                    <FaList></FaList>
                                    All Categories</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/payments">
                                    <MdPayments />
                                    Manage Payments</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/salesReport">
                                    <BiSolidReport />
                                    Sales Report</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageBanner">
                                    <PiFlagBannerFill />
                                    Manage Banner</NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/history">
                                        <FaCalendar></FaCalendar>
                                        Not History</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart ({cart.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <FaAd></FaAd>
                                        Add a Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory">
                                        <FaList></FaList>
                                        Real Payment History</NavLink>
                                </li>
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider py-4"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/shop">
                            <RiShoppingBag2Line className="text-xl" />
                            Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;