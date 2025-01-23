import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { NavLink } from "react-router-dom";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AllCategories = () => {

    const { register, handleSubmit, reset } = useForm();

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: categories = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/categories');
            return res.data;
        }
    });

    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res.data);
        if (res.data.success) {
            const newCategory = {
                name: data.name,
                count: 0,
                image: res.data.data.display_url,
                details: data.details,
            }
            // console.log(newCategory);
            const categoryRes = await axiosSecure.post('/categories', newCategory);
            console.log(categoryRes.data);

            if (categoryRes.data.insertedId) {
                reset();
                refetch();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} is added to the category`,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }
        // console.log(res.data.data.display_url);
        // console.log(res.data.display_url);
        console.log('with image url', res.data);
    };


    return (
        <div className="p-6 max-w-screen-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 mt-7">All Categories</h1>
            <table className="min-w-full bg-base-100 border-collapse shadow-xl border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-emerald-800/90 text-white">
                        <th className="py-3 px-4 border-b text-left">No.</th>
                        <th className="py-3 px-4 border-b text-left">Name</th>
                        <th className="py-3 px-4 border-b text-left">Medicines</th>
                        <th className="py-3 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, i) => (
                        <tr
                            key={i}
                            className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100 transition duration-300`}
                        >
                            <td className="py-3 px-4">{i + 1}</td>
                            <td className="py-3 px-4">{category.name}</td>
                            <td className="py-3 px-4">{category.count}</td>
                            <td className="py-3 px-4">

                                <NavLink to={`/dashboard/updateCategory/${category._id}`}>
                                    <button className="btn bg-blue-200 btn-sm">Update</button>
                                </NavLink>
                                <button
                                    // onClick={() => handleViewDetails(category)}
                                    className="ml-5"
                                >
                                    <div className="text-xl text-red-500"
                                    >
                                        <FaTrash></FaTrash>
                                    </div>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="mt-20 mb-5 text-3xl font-semibold">add new category</h2>
            <div className="mb-16">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Category Name"
                            {...register("name", { required: true })}
                            className="input input-bordered w-full" />
                    </div>
                    <div className="form-control my-4">
                        <label className="label">
                            <span className="label-text-alt">Category Details</span>
                        </label>
                        <textarea {...register("details", { required: true })} className="textarea textarea-bordered h-16" placeholder="Details"></textarea>
                    </div>
                    <div className="form-control mb-5">
                        <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <button className="btn btn-success text-white">
                        Add Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AllCategories;