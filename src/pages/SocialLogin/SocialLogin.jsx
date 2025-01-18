import { useContext } from "react";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";



const SocialLogin = () => {

    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                // console.log('Login successful: ', result.user.email);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Google Login Successful',
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate(`/my-orders`);
            })
            .catch(error => {
                console.log('ERROR', error.message);
            })
    }


    return (
        <div className='m-4'>
            <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className='btn'>Login with Google</button>
        </div>
    );
};

export default SocialLogin;