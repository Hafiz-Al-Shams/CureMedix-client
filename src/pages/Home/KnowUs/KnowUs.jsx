


const KnowUs = () => {
    return (
        <div className="mt-4 md:mt-5 lg:mt-6">
            <div className="bg-base-200/5 p-6 lg:p-8 rounded-lg flex flex-col sm:flex-row justify-between items-center">
                {/* Text Section */}
                <div className="w-full sm:w-6/12 lg:w-5/12 text-center sm:text-left px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">KNOW US</h2>
                    <p className="text-lg md:text-xl lg:text-2xl font-medium md:font-semibold text-green-600">
                        10+ Years Experience On Medical Industry
                    </p>
                    <p className="text-base-content/80 mt-4 text-sm sm:text-base">
                        With over a decade of expertise in the medical field, we are committed to providing high-quality healthcare solutions. Our team has been dedicated to improving patient care and delivering trusted medical products. We focus on innovation, reliability, and customer satisfaction, ensuring that every service we offer meets the highest standards. Let us be your trusted partner in healthcare.
                    </p>
                    <button disabled className="mt-2 btn btn-sm">Learn More</button>
                </div>

                {/* Image Section */}
                <div className="w-full sm:w-6/12 lg:w-5/12 flex justify-center mt-6 sm:mt-0">
                    <img
                        src="https://i.ibb.co.com/y0Wj6xz/pexels-pavel-danilyuk-8442108.jpg"
                        alt="Team in Lab"
                        className="rounded-lg shadow-md w-full sm:w-10/12 lg:w-8/12"
                    />
                </div>
            </div>

        </div>
    );
};

export default KnowUs;