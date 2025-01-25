import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaArrowAltCircleLeft, FaDollarSign, FaUsers } from "react-icons/fa";



// const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



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


    // optional testing
    // const { data: chartData = [] } = useQuery({
    //     queryKey: ['order-stats'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get('/order-stats');
    //         return res.data;
    //     }
    // })

    // // custom shape for the bar chart
    // const getPath = (x, y, width, height) => {
    //     return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    //     ${x + width / 2}, ${y}
    //     C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    //     Z`;
    // };

    // const TriangleBar = (props) => {
    //     const { fill, x, y, width, height } = props;

    //     return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    // };

    // // custom shape for the pie chart
    // const RADIAN = Math.PI / 180;
    // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //     const y = cy + radius * Math.sin(-midAngle * RADIAN);

    //     return (
    //         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    //             {`${(percent * 100).toFixed(0)}%`}
    //         </text>
    //     );
    // };

    // const pieChartData = chartData.map(data => {
    //     return { name: data.category, value: data.revenue }
    // })



    return (
        <div className="w-10/12 mx-auto">
            <h2 className="text-4xl font-semibold my-10">
                <span>Welcome </span>
                {
                    user?.displayName ? `Admin (${user.displayName})` : 'Back'
                }
            </h2>


            <div className="stats shadow">

                <div className="stat p-10 bg-lime-200">
                    <div className="stat-figure text-red-500">
                        <FaDollarSign className='text-3xl'></FaDollarSign>
                    </div>
                    <div className="stat-title text-gray-600 mb-2.5">Total Sales Revenue</div>
                    <div className="stat-value">${stats.revenue}</div>

                </div>

                <div className="stat p-10 bg-secondary/15">
                    <div className="stat-figure text-primary">
                        <FaUsers className='text-3xl'></FaUsers>
                    </div>
                    <div className="stat-title text-gray-600 mb-2.5">Users</div>
                    <div className="stat-value">{stats.users}</div>

                </div>


                <div className="stat p-10 bg-orange-300">
                    <div className="stat-figure text-lime-500">
                        <FaArrowAltCircleLeft className="text-3xl"></FaArrowAltCircleLeft>
                    </div>
                    <div className="stat-title text-gray-600 mb-2.5">Medicines</div>
                    <div className="stat-value">{stats.medicines}</div>

                </div>

                <div className="stat p-10 bg-sky-300">
                    <div className="stat-figure text-rose-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="stat-title text-gray-600 mb-2.5">Orders</div>
                    <div className="stat-value">{stats.orders}</div>

                </div>

            </div>



            {/* optional */}
            {/* chart */}

            {/* <div className="flex">
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div> */}
            {/* chart */}


        </div>
    );
};

export default AdminHome;