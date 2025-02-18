import { Helmet } from "react-helmet-async";
import MarqueeText from "../MarqueeText";
import { useEffect } from "react";
import Swal from "sweetalert2";



const OnlineDoctor = () => {


    useEffect(() => {
        // Display SweetAlert2 when the component is mounted (i.e., when the route is visited)
        Swal.fire({
            title: 'Page is Under Development!',
            text: 'i am still working on this page! Stay tuned for updates!',
            icon: 'info',
            confirmButtonText: 'Got it!',
        });
    }, []);


    return (
        <>
            <Helmet>
                <title>CureMedix | Online Doctor</title>
            </Helmet>
            <div className="px-16">
                {/* <h2 className="text-4xl text-center font-semibold pt-10">your online doctor coming soon.......</h2> */}




                <div className="flex flex-col lg:flex-row items-start justify-between px-4 sm:px-8 py-12 bg-gray-100 min-h-screen">
                    {/* Text Section */}
                    <div className="lg:w-1/2 space-y-4 px-4 sm:px-6">

                        <MarqueeText />

                        {/* <h4 className="text-sm text-gray-500">online doctor</h4> */}
                        <h2 className="text-2xl sm:text-3xl font-bold">
                            Goodbye waiting room. <br /> Hello online doctor
                        </h2>
                        <p className="text-gray-600">
                            Speak to a qualified specialist from Germany online in just a few
                            minutes via CureMedix. You can receive a sick note and electronic
                            prescription directly via the app.
                        </p>
                        <div className="space-x-0 sm:space-x-4 mt-4 sm:mt-6 flex flex-col sm:flex-row">
                            <button className="btn bg-emerald-600 text-gray-100 w-full sm:w-auto mb-2 sm:mb-0">To the CureMedix Online Doctor</button>
                            <button className="btn btn-ghost w-full sm:w-auto">Find an inpatient doctor near you</button>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center px-4 sm:px-6">
                        <img
                            src="https://i.ibb.co.com/b5zPg2by/online-doctor.jpg"
                            alt="Online Doctor"
                            className="rounded-lg shadow-lg w-80 sm:w-96 lg:w-104"
                        />
                    </div>
                </div>



            </div>
        </>
    );
};

export default OnlineDoctor;