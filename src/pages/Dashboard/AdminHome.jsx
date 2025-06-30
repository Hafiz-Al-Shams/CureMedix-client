import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaArrowAltCircleLeft, FaDollarSign, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
// import useAxiosPublic from "../../hooks/useAxiosPublic";






const AdminHome = () => {
    // const { user } = useAuth();
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });


    // Fetch banner requests
    const { data: banners = [], refetch: refetchBanners } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/banners');
            return res.data;
        }
    });

    // Function to handle banner status toggle
    const handleToggleBannerStatus = async (bannerId, currentStatus) => {
        console.log(currentStatus);
        const newStatus = !currentStatus;
        try {
            await axiosSecure.patch(`/banners/${bannerId}`, { isBanner: newStatus });
            refetchBanners(); // Refresh the banner list
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Banner status updated to ${newStatus ? "Accepted" : "Pending"}`,
                showConfirmButton: false,
                timer: 1000,
            });
        } catch (error) {
            console.error("Error updating banner:", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to update banner",
                showConfirmButton: false,
                timer: 1000,
            });
        }
        console.log(newStatus);
    };


    // Format number to 2 decimal places safely
    const fmt = (val) => {
        if (val === undefined || val === null || isNaN(val)) return '0.00';
        return Number(val).toFixed(2);
    };

    console.log(stats.totalPaid);
    console.log(stats.totalPending);
    console.log(stats.revenue);

    return (
        <div className="">
            <h2 className="text-4xl font-semibold my-10">
                <span>Welcome Home Admin</span>
            </h2>

            <div className="stats shadow max-w-[80vw]">

                <div className="stat p-6 bg-lime-200">
                    <div className="stat-figure text-red-500">
                        <FaDollarSign className='text-3xl'></FaDollarSign>
                    </div>
                    <div className="stat-title text-gray-600 mb-2.5 text-xl">Total Sales Revenue</div>
                    <div className="stat-value">${fmt(stats.revenue)}</div>
                </div>

                <div className="stat p-6 bg-secondary/15">
                    <div className="stat-figure text-primary">
                        <FaUsers className='text-3xl'></FaUsers>
                    </div>
                    <div className="stat-title text-gray-600 mb-2.5 text-xl">Users</div>
                    <div className="stat-value">{stats.users}</div>
                </div>

                <div className="stat p-6 bg-orange-300">
                    <div className="stat-figure text-lime-500">
                        <FaArrowAltCircleLeft className="text-3xl"></FaArrowAltCircleLeft>
                    </div>
                    <div className="stat-title text-gray-600 mb-2.5 text-xl">Medicines</div>
                    <div className="stat-value">{stats.medicines}</div>
                </div>

                <div className="stat p-6 bg-sky-300">
                    <div className="stat-figure text-rose-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="stat-title text-gray-600 mb-2.5 text-xl">Orders</div>
                    <div className="stat-value">{stats.orders}</div>
                </div>

                <div className="stat p-6 bg-red-500/50">
                    <div className="stat-figure text-blue-700">
                        <FaDollarSign className='text-3xl'></FaDollarSign>
                    </div>
                    <div className="stat-title text-gray-600 mb-2.5 text-xl">Total Pending</div>
                    <div className="stat-value">${fmt(stats.totalPending)}</div>
                </div>

                <div className="stat p-6 bg-lime-200">
                    <div className="stat-figure text-red-500">
                        <FaDollarSign className='text-3xl'></FaDollarSign>
                    </div>
                    <div className="stat-title text-gray-600 mb-2.5 text-xl">Total Paid</div>
                    <div className="stat-value">${fmt(stats.totalPaid)}</div>
                </div>

            </div>

            {/* New Banner Requests Section */}
            <div className="my-10">
                <h2 className="text-2xl font-semibold mb-6">Banner Requests</h2>
                {banners.length === 0 ? (
                    <p className="text-gray-500">No banner requests available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">
                        {banners.map((banner) => (
                            <div
                                key={banner._id}
                                className="card bg-base-100 shadow-xl transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-2xl"
                            >
                                <figure className="w-full h-40 overflow-hidden rounded-t-lg">
                                    <img
                                        src={banner.image}
                                        alt="Banner"
                                        className="object-cover w-full h-full"
                                    />
                                </figure>
                                <div className="card-body">
                                    <p className="text-base-content/90">
                                        Status: {banner.isBanner ? (
                                            <span className="text-green-600 font-semibold">Accepted</span>
                                        ) : (
                                            <span className="text-yellow-600 font-semibold">Pending</span>
                                        )}
                                    </p>
                                    <div className="card-actions justify-end mt-2">
                                        <button
                                            onClick={() => handleToggleBannerStatus(banner._id, banner.isBanner)}
                                            className={`btn btn-sm ${banner.isBanner ? "bg-red-500 text-white" : "bg-green-600 text-white"}`}
                                        >
                                            {banner.isBanner ? "Remove Banner" : "Make Banner"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>


        </div>
    );
};

export default AdminHome;