import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { db } from "../../firebase/firebase.init";


const SignUp = () => {

    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { createUser, updateUserProfile, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        const role = "admin"; // Hardcode 'admin' role for this example. You can change this logic later.

        // Continue with user creation and profile update
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile({ displayName: data.name, photoURL: data.photoURL })
                    .then(() => {
                        // Save user role in Firestore
                        db.collection("users").doc(loggedUser.uid).set({
                            name: data.name,
                            email: data.email,
                            role: role, // Store role in Firestore
                        })
                            .then(() => {
                                // Create user entry in the database
                                const userInfo = {
                                    name: data.name,
                                    email: data.email
                                };
                                axiosPublic.post('/users', userInfo)
                                    .then(res => {
                                        if (res.data.insertedId) {
                                            console.log('User added to the database');
                                            reset();
                                            Swal.fire({
                                                position: 'top-end',
                                                icon: 'success',
                                                title: 'User created successfully.',
                                                showConfirmButton: false,
                                                timer: 1500
                                            });

                                            // Sign out the user after successful registration
                                            signOutUser()
                                                .then(() => {
                                                    Swal.fire({
                                                        title: "Registration Successful",
                                                        text: "Now please Login to Continue",
                                                        icon: "success",
                                                        confirmButtonText: "OK",
                                                    });
                                                    navigate("/signIn");
                                                })
                                                .catch(error => console.log("Error during sign-out:", error));
                                        }
                                    })
                                    .catch(error => console.log("Error creating user in the database:", error));
                            })
                            .catch(error => console.log("Error saving user role in Firestore:", error));
                    })
                    .catch(error => console.log("Error updating user profile:", error));
            })
            .catch(error => console.log("Error during user creation:", error));
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
                            Sign up to access premium healthcare products and services. It is quick and easy.
                        </p>
                    </div>

                    {/* Right Side Form */}
                    <div className="card w-full max-w-lg mx-auto lg:w-96 bg-white shadow-xl rounded-xl p-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Username */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700">Username</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="Enter your username"
                                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                            </div>

                            {/* Upload Photo */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700">Upload Photo</span>
                                </label>
                                <div className="flex items-center">
                                    <label
                                        htmlFor="photoUpload"
                                        className="cursor-pointer text-sm text-gray-700 border border-gray-300 py-2 px-4 rounded-md bg-gray-100 hover:border-gray-500 focus:outline-none"
                                    >
                                        Choose Photo
                                    </label>
                                    <input
                                        type="file"
                                        id="photoUpload"
                                        {...register("photoURL", { required: "Photo is required" })}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </div>
                                {errors.photoURL && <span className="text-red-600">{errors.photoURL.message}</span>}
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,15}$/,
                                            message: "Password must include at least one uppercase letter, one number, and one lowercase letter",
                                        },
                                    })}
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                            </div>

                            {/* Select Role */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700">Select Role</span>
                                </label>
                                <select
                                    {...register("role", { required: "Role is required" })}
                                    className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="user">User</option>
                                    <option value="seller">Seller</option>
                                </select>
                                {errors.role && <span className="text-red-600">{errors.role.message}</span>}
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