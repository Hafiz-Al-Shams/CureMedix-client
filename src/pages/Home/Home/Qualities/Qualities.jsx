import { BiSupport } from "react-icons/bi";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";



const Qualities = () => {
    return (
        <div>
            <h3 className="text-center font-bold text-2xl md:text-3xl lg:text-5xl mt-9 md:mt-11 lg:mt-20 mb-2.5 md:mb-4 lg:mb-8">
                Our Awesome Services
            </h3>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-16 bg-white px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16 rounded-lg shadow-md mb-12 sm:mb-16">

                {/* Free Shipping */}
                <div className="flex flex-col items-center space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold pb-2 sm:pb-3">Free Shipping</h3>
                    <div className="text-4xl sm:text-5xl text-orange-600">
                        <MdOutlineLocalShipping />
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">Free shipping worldwide</p>
                </div>

                {/* Support 24/7 */}
                <div className="flex flex-col items-center space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold pb-2 sm:pb-3">Support 24/7</h3>
                    <div className="text-4xl sm:text-5xl text-blue-600">
                        <BiSupport />
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">Contact us 24 hours a day</p>
                </div>

                {/* Secure Payments */}
                <div className="flex flex-col items-center space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold pb-2 sm:pb-3">Secure Payments</h3>
                    <div className="text-4xl sm:text-5xl text-orange-600">
                        <RiSecurePaymentLine />
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">100% payment protection</p>
                </div>

                {/* Easy Return */}
                <div className="flex flex-col items-center space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold pb-2 sm:pb-3">Easy Return</h3>
                    <div className="text-4xl sm:text-5xl text-blue-700">
                        <GiReturnArrow />
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">Simple returns policy</p>
                </div>
            </div>
        </div>

    );
};

export default Qualities;