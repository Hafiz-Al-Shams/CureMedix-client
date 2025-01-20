import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";



const SignIn = () => {


    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state);

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        signInUser(email, password)
            .then(result => {
                // console.log('Login successful: ', result.user.email);

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 2000
                });
                e.target.reset();
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log('ERROR from Firebase', error.message);
                Swal.fire({
                    title: 'Error!',
                    text: 'Invalid Email or Password!!',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
                // e.target.reset();
            })

    }


    // return null;

    return (
        <div className="hero bg-base-100 min-h-[60vh] mt-3">

            <Helmet>
                <title>CureMedix | Sign In</title>
            </Helmet>

            <div className="hero-content flex-col lg:flex-row gap-12 p-6 items-start">
                {/* Left Side Text */}
                <div className="flex flex-col justify-center text-center lg:text-left lg:w-1/2 space-y-4 mt-40">
                    <h1 className="text-4xl font-extrabold text-gray-800">Welcome Back to CureMedix</h1>
                    <p className="text-lg text-gray-600">
                        Sign in to access your account and explore our premium healthcare products and services.
                    </p>
                </div>

                {/* Right Side Form */}
                <div className="card w-full max-w-lg mx-auto lg:w-96 bg-white shadow-xl rounded-xl p-8">
                    <form onSubmit={handleSignIn} className="space-y-6">
                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-blue-500">Forgot password?</a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control">
                            <button className="btn btn-primary w-full py-2 mt-4">Sign In</button>
                        </div>
                    </form>

                    {/* New Account */}
                    <div className="text-center mt-4">
                        <p className="text-gray-600">New to CureMedix?</p>
                        <Link to="/signUp">
                            <button className="btn btn-outline btn-accent mt-1.5 w-full">Create an Account</button>
                        </Link>
                    </div>

                    {/* Social Login */}
                    <div className="mt-6">
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;