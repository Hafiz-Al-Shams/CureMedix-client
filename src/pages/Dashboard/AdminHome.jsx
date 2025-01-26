import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaArrowAltCircleLeft, FaDollarSign, FaUsers } from "react-icons/fa";






const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });





    return (
        <div className="w-11/12 mx-auto">
            <h2 className="text-4xl font-semibold my-10">
                <span>Welcome </span>
                {
                    user?.displayName ? `Admin (${user.displayName})` : 'Back'
                }
            </h2>


            <div className="stats shadow">

                <div className="stat p-6 bg-lime-200">
                    <div className="stat-figure text-red-500">
                        <FaDollarSign className='text-3xl'></FaDollarSign>
                    </div>
                    <div className="stat-title text-gray-600 mb-2.5 text-xl">Total Sales Revenue</div>
                    <div className="stat-value">${stats.revenue}</div>

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
                    <div className="stat-value">${stats.totalPending}</div>

                </div>

                <div className="stat p-6 bg-lime-200">
                    <div className="stat-figure text-red-500">
                        <FaDollarSign className='text-3xl'></FaDollarSign>
                    </div>
                    <div className="stat-title text-gray-600 mb-2.5 text-xl">Total Paid</div>
                    <div className="stat-value">${stats.totalPaid}</div>

                </div>

            </div>





        </div>
    );
};

export default AdminHome;