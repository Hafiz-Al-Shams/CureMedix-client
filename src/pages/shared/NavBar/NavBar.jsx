import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png';
import { CgMenuHotdog } from "react-icons/cg";
import { PiShoppingCartBold } from "react-icons/pi";
import { FaStethoscope } from "react-icons/fa";
import { RiShoppingBag2Line } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import useSeller from "../../../hooks/useSeller";
import useAuth from "../../../hooks/useAuth";
import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { useDaisyTheme } from "../../../hooks/useDaisyTheme";
import { useThemeClasses } from "../../../hooks/useThemeClasses";


// ─── Local hook: 4‑way logic based on theme & isActive ────────────────────
const useNavLinkClasses = () => {
    const theme = useDaisyTheme(); // "light" or "dark"

    // !bg-base-300 !text-base-content

    return ({ isActive }) => {
        const base = "rounded-sm md:rounded-md text-sm md:text-base px-2.5";
        const hoverAnim = "transition-transform duration-75 ease-in-out hover:scale-105";
        // 1) Active (both themes)
        if (isActive) {
            return `!bg-neutral-content/50 !text-base-100 font-medium ${base} py-1.5 ${hoverAnim}`;
        }
        // 2) Inactive + dark theme
        if (theme === "dark") {
            return `!bg-transparent !text-neutral-content opacity-90 border-[1px] border-neutral-content font-light md:font-medium ${base} py-1 ${hoverAnim}`;
        }
        // 3) Inactive + light theme
        return `!bg-transparent !text-gray-200 opacity-90 border-[1px] border-gray-200 font-light md:font-medium ${base} py-1 ${hoverAnim}`;
    };
};



const NavBar = () => {
    const { user, signOutUser } = useAuth();
    const [isAdmin] = useAdmin();
    const [isSeller] = useSeller();
    const [cart] = useCart();
    const navigate = useNavigate();

    // ─── Theme toggle + persistence ─────────────────────────────────────────
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        const saved = localStorage.getItem("theme") || "light";
        setTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);
    }, []);
    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        localStorage.setItem("theme", next);
        document.documentElement.setAttribute("data-theme", next);
    };

    // ─── NavLink class‐generator ──────────────────────────────────────────────
    const navLinkClasses = useNavLinkClasses();

    // ─── Logout handler ───────────────────────────────────────────────────────
    const handleLogOut = () => {
        signOutUser()
            .then(() =>
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Logged out!",
                    showConfirmButton: false,
                    timer: 1000,
                })
            )
            .catch((err) => console.error("ERROR", err.message));
    };

    // ─── Main nav links ──────────────────────────────────────────────────────
    const links = (
        <>
            <li>
                <NavLink to="/" className={navLinkClasses}>
                    <div className="flex items-center gap-1">
                        <IoMdHome className="text-xl" />
                        <h5>Home</h5>
                    </div>
                </NavLink>
            </li>
            <li>
                <NavLink to="/shop" className={navLinkClasses}>
                    <div className="flex items-center gap-1">
                        <RiShoppingBag2Line className="text-xl" />
                        <h5>Shop</h5>
                    </div>
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/cart" className={navLinkClasses}>
                    <div className="relative inline-block">
                        <BsCart2 className="text-base md:text-lg lg:text-2xl" />
                        <span className="absolute -top-0.5 -right-1 bg-gray-100 text-black text-[11px] w-4 h-4 flex items-center justify-center rounded-full">
                            {cart.length}
                        </span>
                    </div>
                </NavLink>
            </li>
            <li>
                <NavLink to="/online-doctor" className={navLinkClasses}>
                    <div className="flex items-center gap-1">
                        <FaStethoscope />
                        <h5>Online Doctor</h5>
                    </div>
                </NavLink>
            </li>
        </>
    );

    // ─── Dropdown links for logged‐in user ───────────────────────────────────
    const dropdownLinks = (
        <>
            <li>
                <NavLink to="/update-profile">Update Profile</NavLink>
            </li>
            {user && isAdmin && (
                <li>
                    <NavLink to="/dashboard/adminHome">Dashboard</NavLink>
                </li>
            )}
            {user && isSeller && (
                <li>
                    <NavLink to="/dashboard/sellerHome">Dashboard</NavLink>
                </li>
            )}
            {!isSeller && !isAdmin && (
                <li>
                    <NavLink to="/dashboard/userHome">Dashboard</NavLink>
                </li>
            )}
            <li>
                <a onClick={handleLogOut}>Logout</a>
            </li>
        </>
    );

    return (
        <div
            className={`sticky top-0 z-10 navbar py-1 px-4 sm:px-8 lg:px-28 ${theme === "dark"
                ? "bg-neutral-800 text-neutral-content"
                : "bg-emerald-900 text-neutral-content"
                }`}
        >
            {/* START: mobile dropdown */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden transition-transform duration-75 ease-in-out hover:scale-105"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className={`menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-1.5 ${theme === "dark"
                            ? "bg-neutral-800 text-neutral-content"
                            : "bg-emerald-900 text-neutral-content"
                            }`}
                    >
                        {links}
                    </ul>
                </div>
                <Link
                    to="/"
                    className="flex items-center gap-1.5 transition-transform duration-75 ease-in-out hover:scale-105"
                >
                    <img src={logo} alt="logo" className="hidden md:block w-4 lg:w-5" />
                    <h4 className="md:text-xl font-semibold">CureMedix</h4>
                </Link>
            </div>

            {/* CENTER: desktop nav */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-6 font-semibold text-base-300">
                    {links}
                </ul>
            </div>

            {/* END: theme toggle & user/avatar */}
            <div className="navbar-end space-x-3 md:space-x-4 lg:space-x-6">
                <div
                    className="tooltip tooltip-bottom transition-transform duration-75 ease-in-out hover:scale-105"
                    data-tip={theme === "light" ? "Toggle Dark" : "Toggle Light"}
                >
                    <button
                        onClick={toggleTheme}
                        className="btn btn-xs md:btn-sm btn-circle border-[1px] border-neutral-content"
                    >
                        {theme === "light" ? <MdOutlineDarkMode /> : <MdLightMode />}
                    </button>
                </div>

                {user ? (
                    <div className="dropdown dropdown-end mt-1.5">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-xs p-0 rounded-full transition-transform duration-75 ease-in-out hover:scale-105"
                        >
                            <img
                                src={user.photoURL}
                                alt="avatar"
                                className="w-8 lg:w-9 h-8 lg:h-9 rounded-full object-cover"
                            />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-[1] mt-3 w-52 p-4 shadow space-y-2"
                        >
                            {dropdownLinks}
                        </ul>
                    </div>
                ) : (
                    <NavLink to="/signIn" className={navLinkClasses}>
                        <button className="py-0 px-1 transition-transform duration-75 ease-in-out hover:scale-105">
                            Join Us
                        </button>
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default NavBar;