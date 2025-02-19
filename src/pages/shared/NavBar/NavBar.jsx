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
// import { Tooltip } from "react-tooltip";




const NavBar = () => {
    const { user, signOutUser } = useAuth();
    const [isAdmin] = useAdmin();
    const [isSeller] = useSeller();
    const [cart] = useCart();

    // console.log(user?.email);
    const navigate = useNavigate();

    const [profilePhoto, setProfilePhoto] = useState('');
    const [userName, setUserName] = useState('');
    // const [loading, setLoading] = useState(true);
    // const [cart, setCart] = useState([]);

    useEffect(() => {
        if (user) {
            setProfilePhoto(user.photoURL);
            setUserName(user.displayName);
            // setLoading(false);
            // console.log(user.photoURL);
            // console.log(user.displayName);
        }
        // setLoading(false);
    }, [user]);


    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                // console.log('user signOut successful');
                Swal.fire({
                    position: "center",
                    icon: 'warning',
                    title: 'Log out done!',
                    showConfirmButton: false,
                    timer: 1000

                    // confirmButtonText: 'ok'
                });
                // setProfilePhoto('');
                // setUserName('');
            })
            .catch(error => console.log('ERROR', error.message))
    }


    const links = <>
        <li><NavLink to="/">
            <div className="flex justify-center items-center gap-0.5">
                <IoMdHome className="text-xl" />
                <h5>Home</h5>
            </div>
        </NavLink></li>
        {/* <li><NavLink to="/categories">
            <div className="flex justify-center items-center gap-0.5">
                <CgMenuHotdog className="text-xl" />
                <h5>Categories</h5>
            </div>
        </NavLink></li> */}
        {/* <li><NavLink to="/offers">% Offers</NavLink></li> */}
        <li><NavLink to="/shop">
            <div className="flex justify-center items-center gap-1">
                <RiShoppingBag2Line className="text-xl" />
                <h5>Shop</h5>
            </div>
        </NavLink></li>

        {/* condition will be user && !isAdmin && ! isSeller && --- */}
        {/* {
            user && !isAdmin && (
                <li><NavLink to="/dashboard/cart">
                    <div className="flex justify-center items-center gap-1">
                        <PiShoppingCartBold className="text-xl" />
                        <div className="badge badge-secondary">+{cart.length}</div>
                    </div>
                </NavLink></li>
            )
        } */}

        <li><NavLink to="/dashboard/cart">
            <div className="flex justify-center items-center gap-1">
                <PiShoppingCartBold className="text-xl" />
                <div className="badge badge-secondary">+{cart.length}</div>
            </div>
        </NavLink></li>

        <li><NavLink to="/online-doctor">
            <div className="flex justify-center items-center gap-1">
                <FaStethoscope className="" />
                <h5>Online Doctor</h5>
            </div>
        </NavLink></li>
    </>

    const dropdownLinks = (
        <>
            <li>
                <NavLink to="/update-profile">Update Profile</NavLink>
            </li>

            {
                user && isAdmin && <li><NavLink to="/dashboard/adminHome">Dashboard</NavLink></li>
            }
            {
                user && isSeller && <li><NavLink to="/dashboard/sellerHome">Dashboard</NavLink></li>
            }
            {
                !isSeller && !isAdmin && <li><NavLink to="/dashboard/userHome">Dashboard</NavLink></li>
            }

            {/* TODO */}
            {/* logic1= user && isAdmin && ------*/}
            {/* logic2= user && isSeller && ---------*/}
            {/* logic3= user && !isAdmin && ! isSeller && -----*/}

            <li><a onClick={handleLogOut}>Logout</a></li>
        </>
    );


    const [theme, setTheme] = useState("English");

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        // document.documentElement.setAttribute("data-theme", newTheme);
    };


    return (
        <>
            <div className="sticky top-0 z-10 navbar font-medium py-3 px-4 sm:px-8 lg:px-28 bg-emerald-900 text-neutral-content">
                <div className="navbar-start">
                    <div className="dropdown">

                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2"
                        >
                            {links}
                        </ul>
                    </div>
                    <Link to="/">
                        <div className="flex justify-center items-center gap-1.5">
                            <div className="hidden md:flex">
                                <img className="w-7" src={logo} alt="" />
                            </div>
                            <h4 className="text-base md:text-2xl font-bold">CureMedix</h4>
                        </div>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-4 font-semibold">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end space-x-8">
                    <div className="">

                        <select
                            className="text-gray-900 font-bold w-14 sm:w-16 md:w-20 text-[9px] sm:text-[10px] md:text-xs px-1 py-0 lg:py-3 h-auto min-h-7 sm:min-h-8 border border-gray-300 rounded-md"
                            value={theme}
                            onChange={(e) => handleThemeChange(e.target.value)}
                        >
                            <option value="english">English</option>
                            <option value="bangla">Bangla</option>
                            <option value="japanese">Japanese</option>
                            <option value="german">German</option>
                            <option value="french">French</option>
                        </select>
                    </div>


                    {user ? (
                        <div className="flex justify-center items-center gap-3">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn bg-transparent rounded-full p-0">
                                    <img
                                        className="w-12 h-12 rounded-full object-cover cursor-pointer"
                                        src={profilePhoto}
                                        alt="photo"
                                    />
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-[1] mt-3 w-52 p-4 shadow space-y-2"
                                >
                                    {dropdownLinks}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <NavLink to="/signUp">
                            <button className="btn bg-neutral-400/20 text-white/90">Join Us</button>
                        </NavLink>
                    )}
                </div>
            </div>

        </>
    );
};

export default NavBar;