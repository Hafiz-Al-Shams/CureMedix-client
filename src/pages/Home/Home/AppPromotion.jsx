import { FaApple, FaGooglePlay } from "react-icons/fa";



const AppPromotion = () => {
    return (
        <div className="mb-10 md:mb-14 lg:mb-24">
            <section className="bg-gradient-to-r from-green-50 to-green-200 px-6 py-12 sm:px-10 md:py-16 lg:py-20 flex flex-col md:flex-row items-center justify-around gap-8 rounded-lg shadow-lg">
                {/* Text & QR Code Section */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900">
                        Even Easier <br /> with our free App
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base md:text-xl mt-4">
                        <strong>Download Now</strong> <br />
                        Scan the QR code with your smartphone or tablet camera.
                    </p>

                    {/* QR Code & Store Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                        <img
                            src="https://i.ibb.co.com/tMnCQpb6/sample-qr.jpg"
                            alt="QR Code"
                            className="w-24 h-24 rounded-md shadow-md"
                        />
                        <div className="flex flex-col gap-3">
                            <button className="btn btn-outline btn-dark flex items-center gap-2 px-4 py-2 w-48">
                                <FaGooglePlay className="text-lg" />
                                <span>Get it on Google Play</span>
                            </button>
                            <button className="btn btn-outline btn-dark flex items-center gap-2 px-0.5 py-2 w-48">
                                <FaApple className="text-lg" />
                                <span>Download on App Store</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* App Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src="https://i.ibb.co.com/rf0kTT6M/2966983.webp"
                        alt="App Preview"
                        className="w-3/4 sm:w-1/2 md:w-full max-w-xs md:max-w-sm lg:max-w-md drop-shadow-lg rounded-lg"
                    />
                </div>
            </section>
        </div>
    );
};

export default AppPromotion;