import { FiMail } from "react-icons/fi";



const Newsletter = () => {

    // const [email, setEmail] = useState("");

    // const handleSubscribe = () => {
    //     alert(`Subscribed with: ${email}`);
    //     setEmail("");
    // };


    return (
        <div>
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-800 text-white px-6 py-10 sm:px-8 sm:py-12 md:py-16 lg:py-20 rounded-lg shadow-lg flex flex-col items-center text-center">
                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                    Subscribe to Our Weekly Newsletter
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-lg mb-6">
                    Get the latest updates, promotions, and industry insights delivered straight to your inbox.
                </p>

                {/* Input & Button */}
                <div className="flex flex-col sm:flex-row w-full max-w-md sm:max-w-lg md:max-w-xl gap-3">
                    <div className="relative w-full">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full pl-10 text-gray-900 text-sm md:text-base"
                        />
                    </div>
                    <button
                        className="btn btn-primary px-6 py-2 text-sm md:text-base"
                    // onClick={handleSubscribe}
                    >
                        Subscribe
                    </button>
                </div>

                {/* Disclaimer */}
                <p className="text-xs sm:text-sm text-gray-300 mt-4">
                    We respect your privacy. Unsubscribe anytime.
                </p>
            </div>
        </div>
    );
};

export default Newsletter;