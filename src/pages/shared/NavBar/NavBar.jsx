// import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import { Tooltip } from "react-tooltip";
// import Swal from "sweetalert2";
import logo from '../../../assets/logo.png';
import { CgMenuHotdog } from "react-icons/cg";
import { PiShoppingCartBold } from "react-icons/pi";
import { FaStethoscope } from "react-icons/fa";
import { RiShoppingBag2Line } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { useState } from "react";



const NavBar = () => {
    // const { user, signOutUser } = useContext(AuthContext);

    // console.log(user?.email);
    // const navigate = useNavigate();

    // const [profilePhoto, setProfilePhoto] = useState('');
    // const [userName, setUserName] = useState('');

    // useEffect(() => {
    //     if (user) {
    //         setProfilePhoto(user.photoURL);
    //         setUserName(user.displayName);
    //     }
    // }, [user]);


    // const handleLogOut = () => {
    //     signOutUser()
    //         .then(() => {
    //             // console.log('user signOut successful');
    //             Swal.fire({
    //                 position: "center",
    //                 icon: 'warning',
    //                 title: 'Log out done!',
    //                 showConfirmButton: false,
    //                 timer: 2000

    //                 // confirmButtonText: 'ok'
    //             });
    //             // setProfilePhoto('');
    //             // setUserName('');
    //         })
    //         .catch(error => console.log('ERROR', error.message))
    // }


    const links = <>
        <li><NavLink to="/">
            <div className="flex justify-center items-center gap-0.5">
                <IoMdHome />
                <h5>Home</h5>
            </div>
        </NavLink></li>
        <li><NavLink to="/categories">
            <div className="flex justify-center items-center gap-0.5">
                <CgMenuHotdog />
                <h5>Categories</h5>
            </div>
        </NavLink></li>
        <li><NavLink to="/offers">% Offers</NavLink></li>
        <li><NavLink to="/shop">
            <div className="flex justify-center items-center gap-1">
                <RiShoppingBag2Line />
                <h5>Shop</h5>
            </div>
        </NavLink></li>
        <li><NavLink to="/cart">
            <div className="flex justify-center items-center gap-1">
                <PiShoppingCartBold />
                <h5>Cart</h5>
            </div>
        </NavLink></li>
        <li><NavLink to="/doctor">
            <div className="flex justify-center items-center gap-1">
                <FaStethoscope />
                <h5>Online Doctor</h5>
            </div>
        </NavLink></li>
    </>

    // const links2 = <>
    //     {/* <li><NavLink to={`/my-foods/${user?.email}`}>My Foods</NavLink></li> */}
    //     <li><NavLink to="/add-food">Add food</NavLink></li>
    //     <li><NavLink to="/my-orders">My Orders</NavLink></li>
    // </>


    const [theme, setTheme] = useState("English");

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        // document.documentElement.setAttribute("data-theme", newTheme);
    };


    return (
        <>
            <div className="sticky top-0 z-10 navbar font-medium py-3 px-10 bg-emerald-900 text-neutral-content">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2">
                            {links}
                        </ul>
                    </div>
                    <Link to="/">
                        <div className="flex justify-center items-center gap-1.5">
                            <div>
                                <img className="w-8" src={logo} alt="" />
                            </div>
                            <h4 className="text-2xl font-bold">CureMedix</h4>
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
                            className="select select-bordered w-28 text-xs text-neutral"
                            // value={'language'}
                            value={theme}
                            onChange={(e) => handleThemeChange(e.target.value)}
                        >
                            <option value="english" >English</option>
                            <option value="bangla">Bangla</option>
                            <option value="japanese">Japanese</option>
                            <option value="german">German</option>
                            <option value="french">French</option>
                        </select>
                    </div>

                    <div className="">
                        <NavLink to="/signIn"><button className="btn bg-neutral-400/20 text-white/90">Join Us</button></NavLink>
                    </div>


                    {/* {
                        user ?
                            <>
                                <div className="flex justify-center items-center gap-3">

                                    <div className="dropdown dropdown-left">
                                        <div tabIndex={0} role="button" className="btn bg-transparent rounded-full">
                                            <img className="w-11 rounded-full cursor-pointer" src={profilePhoto} alt="photo" />
                                        </div>
                                        <ul
                                            tabIndex={0}
                                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-4 shadow space-y-2">
                                            {links2}
                                        </ul>
                                    </div>
                                    <div><a onClick={handleLogOut} data-tooltip-id="my-tooltip"
                                        data-tooltip-content={userName}
                                        data-tooltip-place="bottom-start" className="btn bg-neutral-400/40 text-base-content">Log Out</a></div>
                                </div>
                            </>
                            :
                            <>
                                <NavLink to="/signIn"><button className="btn bg-neutral-400/40 text-base-content">Login</button></NavLink>
                            </>
                    } */}
                    {/* <Tooltip id="my-tooltip" /> */}
                </div>
            </div>
        </>
    );
};

export default NavBar;