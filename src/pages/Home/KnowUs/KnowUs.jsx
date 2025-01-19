


const KnowUs = () => {
    return (
        <div className="">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex justify-between items-center">
                <div className="pl-10 w-5/12">
                    <h2 className="text-3xl font-bold mb-4">KNOW US</h2>
                    <p className="text-xl font-medium text-green-600">10+ Years Experience On Medical Industry</p>
                    <p className="text-gray-600 mt-4">
                        With over a decade of expertise in the medical field, we are committed to providing high-quality healthcare solutions. Our team has been dedicated to improving patient care and delivering trusted medical products. We focus on innovation, reliability, and customer satisfaction, ensuring that every service we offer meets the highest standards. Let us be your trusted partner in healthcare.
                    </p>
                    <button className="mt-6 btn btn-primary">Learn More</button>
                </div>
                <div className="w-5/12">
                    <img
                        src="https://i.ibb.co.com/y0Wj6xz/pexels-pavel-danilyuk-8442108.jpg"
                        alt="Team in Lab"
                        className="rounded-lg shadow-md w-8/12"
                    />
                </div>
            </div>
        </div>
    );
};

export default KnowUs;