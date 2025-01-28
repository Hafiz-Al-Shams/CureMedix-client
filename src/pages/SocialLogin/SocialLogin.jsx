import { useContext } from "react";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const SocialLogin = () => {

    const { signInWithGoogle } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                // console.log('Login successful: ', result.user.email);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    role: 'user',
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        // console.log(res.data);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: 'Google Login Successful',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        navigate('/');
                    })

                // navigate(from, { replace: true });
            })
            .catch(error => {
                console.log('ERROR', error.message);
            })
    }


    return (
        <div className='m-4'>
            <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className='btn'>
                <FaGoogle className="text-red-700 font-bold text-lg"></FaGoogle>
                Login with Google</button>
        </div>
    );
};

export default SocialLogin;