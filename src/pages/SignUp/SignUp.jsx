import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../SocialLogin/SocialLogin";




const SignUp = () => {



    const { createUser, updateUserProfile, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photoURL.files[0];  // Changed to grab file
        const email = form.email.value;
        const password = form.password.value;
        const role = form.role.value;  // Added to grab role from select

        // Password validation
        if (password.length < 6) {
            Swal.fire({
                text: "Password must be 6 characters or longer",
                icon: "error",
                confirmButtonText: "Try Again",
            });
            return;
        }

        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,15}$/;
        if (!passRegex.test(password)) {
            Swal.fire({
                text: "at least One Number, One Uppercase & One Lowercase is needed",
                icon: "error",
                confirmButtonText: "Try Again",
            });
            return;
        }

        createUser(email, password)
            .then((result) => {
                // Assuming you have a function to upload the photo (or use Firebase storage)
                const formData = new FormData();
                formData.append("photo", photo);

                updateUserProfile({ displayName: name, photoURL: photo.name })
                    .then(() => {
                        signOutUser()
                            .then(() => {
                                Swal.fire({
                                    title: "Registration Successful",
                                    text: "Now please Login to Continue",
                                    icon: "success",
                                    confirmButtonText: "OK",
                                });
                                e.target.reset();
                                navigate("/signIn");
                            })
                            .catch((error) => console.log("Error during sign-out:", error));
                    })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire({
                            title: "Error!",
                            icon: "error",
                            confirmButtonText: "Try Again",
                        });
                    });
            })
            .catch((error) => {
                console.log("ERROR from Firebase", error.message);
            });
    };

    return (
        <>
            <div className="hero bg-base-100 min-h-[60vh] mt-3 mb-20">
                <Helmet>
                    <title>CureMedix | Sign Up</title>
                </Helmet>

                <div className="hero-content flex-col lg:flex-row gap-12 p-6 items-start">
                    {/* Left Side Text */}
                    <div className="flex flex-col justify-center text-center lg:text-left lg:w-1/2 space-y-4 mt-40">
                        <h1 className="text-4xl font-extrabold text-gray-800">Join the CureMedix Community</h1>
                        <p className="text-lg text-gray-600">
                            Sign up to access premium healthcare products and services. Its quick and easy.
                        </p>
                    </div>

                    {/* Right Side Form */}
                    <div className="card w-full max-w-lg mx-auto lg:w-96 bg-white shadow-xl rounded-xl p-8">
                        <form onSubmit={handleRegister} className="space-y-6">
                            {/* Username */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700">Username</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your username"
                                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

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

                            {/* Upload Photo */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700">Upload Photo</span>
                                </label>
                                <div className="flex items-center">
                                    <label
                                        htmlFor="photoUpload"
                                        className="cursor-pointer text-sm text-gray-700 border border-gray-300 py-2 px-4 rounded-md hover:border-gray-500 focus:outline-none"
                                    >
                                        Choose Photo
                                    </label>
                                    <input
                                        type="file"
                                        id="photoUpload"
                                        name="photoURL"
                                        className="hidden"
                                        accept="image/*"
                                        required
                                    />
                                </div>
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
                            </div>

                            {/* Select Role */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700">Select Role</span>
                                </label>
                                <select
                                    name="role"
                                    className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="user">User</option>
                                    <option value="seller">Seller</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <div className="form-control">
                                <button className="btn btn-primary w-full py-2 mt-4">Sign Up</button>
                            </div>
                        </form>

                        {/* Already have an account? */}
                        <div className="text-center mt-4">
                            <p className="text-gray-600">Already have an account?</p>
                            <Link to="/signIn">
                                <button className="btn btn-outline btn-accent mt-1.5 w-full">Sign In</button>
                            </Link>
                        </div>

                        {/* Social Login */}
                        <div className="mt-6">
                            <SocialLogin />
                        </div>
                    </div>

                </div>
            </div>

        </>
    );

};

export default SignUp;