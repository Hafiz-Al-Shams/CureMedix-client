import { BiSupport } from "react-icons/bi";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";



const Qualities = () => {
    return (
        <div>
            <h3 className="text-center font-bold text-3xl mt-20 mb-4">Our Awesome Services</h3>
            <div className="flex justify-around items-center bg-white py-10 rounded-lg shadow-md mb-16">
                <div className="flex flex-col items-center space-y-2">

                    <h3 className="text-xl font-semibold pb-3">Free Shipping</h3>
                    <div className="text-5xl text-orange-600">
                        <MdOutlineLocalShipping />
                    </div>
                    <p className="text-gray-600 text-sm">Free shipping worldwide</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <h3 className="text-xl font-semibold pb-3">Support 24/7</h3>
                    <div className="text-5xl text-blue-600">
                        <BiSupport />
                    </div>

                    <p className="text-sm text-gray-600">Contact us 24 hours a day</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <h3 className="text-xl font-semibold pb-3">Secure Payments</h3>
                    <div className="text-5xl text-orange-600">
                        <RiSecurePaymentLine />
                    </div>

                    <p className="text-sm text-gray-600">100% payment protection</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <h3 className="text-xl font-semibold pb-3">Easy Return</h3>
                    <div className="text-5xl text-blue-700">
                        <GiReturnArrow />
                    </div>
                    <p className="text-sm text-gray-600">Simple returns policy</p>
                </div>
            </div>
        </div>
    );
};

export default Qualities;