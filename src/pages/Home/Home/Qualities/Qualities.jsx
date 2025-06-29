import { BiSupport } from "react-icons/bi";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";



const Qualities = () => {
    return (
        <div className="my-2.5 md:my-4 lg:my-12">
            <h3 className="text-center font-semibold text-xl md:text-2xl lg:text-3xl mt-2.5 md:mt-4 lg:mt-8 mb-1.5 md:mb-2 lg:mb-3.5">
                Our Awesome Services
            </h3>

            {/* Removed combined border from this container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-16 bg-base-100 px-4 lg:px-16 py-4 lg:py-5 mb-3.5 lg:mb-10">

                {/* Free Shipping */}
                <div
                    className="
        flex flex-col items-center space-y-2
        border-[1px] border-base-content rounded-lg p-4
        /* added individual border, rounding & padding */
      "
                >
                    <h3 className="text-lg sm:text-xl font-semibold pb-2 sm:pb-3">Free Shipping</h3>
                    <div className="text-4xl sm:text-5xl text-orange-600">
                        <MdOutlineLocalShipping />
                    </div>
                    <p className="text-base-content/75 text-sm sm:text-base">Free shipping worldwide</p>
                </div>

                {/* Support 24/7 */}
                <div
                    className="
        flex flex-col items-center space-y-2
        border-[1px] border-base-content rounded-lg p-4
        /* added individual border, rounding & padding */
      "
                >
                    <h3 className="text-lg sm:text-xl font-semibold pb-2 sm:pb-3">Support 24/7</h3>
                    <div className="text-4xl sm:text-5xl text-blue-600">
                        <BiSupport />
                    </div>
                    <p className="text-base-content/75 text-sm sm:text-base">Contact us 24 hours a day</p>
                </div>

                {/* Secure Payments */}
                <div
                    className="
        flex flex-col items-center space-y-2
        border-[1px] border-base-content rounded-lg p-4
        /* added individual border, rounding & padding */
      "
                >
                    <h3 className="text-lg sm:text-xl font-semibold pb-2 sm:pb-3">Secure Payments</h3>
                    <div className="text-4xl sm:text-5xl text-orange-600">
                        <RiSecurePaymentLine />
                    </div>
                    <p className="text-base-content/75 text-sm sm:text-base">100% payment protection</p>
                </div>

                {/* Easy Return */}
                <div
                    className="
        flex flex-col items-center space-y-2
        border-[1px] border-base-content rounded-lg p-4
        /* added individual border, rounding & padding */
      "
                >
                    <h3 className="text-lg sm:text-xl font-semibold pb-2 sm:pb-3">Easy Return</h3>
                    <div className="text-4xl sm:text-5xl text-blue-700">
                        <GiReturnArrow />
                    </div>
                    <p className="text-base-content/75 text-sm sm:text-base">Simple returns policy</p>
                </div>

            </div>
        </div>


    );
};

export default Qualities;