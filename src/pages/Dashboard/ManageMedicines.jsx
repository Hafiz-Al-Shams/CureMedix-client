import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const ManageMedicines = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    // const { data: medicines = [], refetch } = useQuery({
    //     queryKey: ['medicines'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get('/medicines');
    //         return res.data;
    //     }
    // });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });

        if (res.data.success) {
            const newMedicine = {
                name: data.name,
                details: data.details,
                image: res.data.data.display_url,
                type: data.type,
                price: parseFloat(data.price),
                stock: parseInt(data.stock, 10),
                discountPercentage: parseInt(data.discountPercentage, 10),
                category: data.category,
                company: data.company,
                unit: data.unit,
                count: 0, // Default count
                seller: user.email
            };

            const MedicineRes = await axiosSecure.post('/medicines', newMedicine);

            if (MedicineRes.data.insertedId) {
                reset();
                // refetch();
                setIsModalOpen(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} is added to the Medicine`,
                    showConfirmButton: false,
                    timer: 1000,
                });
            }
        }
    };

    return (
        <>
            <div className="my-10 text-center text-4xl font-semibold">
                Manage all Your Medicines Here:
            </div>
            <div className="my-10">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(true)}>
                    Add Medicine
                </button>
            </div>
            <div>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="modal modal-open">
                            <div className="modal-box p-10">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* Medicine Name */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Medicine Name*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Medicine Name"
                                            {...register("name", { required: "Medicine Name is required" })}
                                            className="input input-bordered w-full"
                                        />
                                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                    </div>

                                    {/* Medicine Details */}
                                    <div className="form-control my-4">
                                        <label className="label">
                                            <span className="label-text-alt">Medicine Details*</span>
                                        </label>
                                        <textarea
                                            {...register("details", { required: "Details are required" })}
                                            className="textarea textarea-bordered h-16"
                                            placeholder="Details"
                                        ></textarea>
                                        {errors.details && <p className="text-red-500">{errors.details.message}</p>}
                                    </div>

                                    {/* Image Upload */}
                                    <div className="form-control mb-5">
                                        <label className="label">
                                            <span className="label-text">Upload Image*</span>
                                        </label>
                                        <input
                                            {...register("image", { required: "Image is required" })}
                                            type="file"
                                            className="file-input w-full max-w-xs"
                                        />
                                        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                                    </div>

                                    {/* Type */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Type*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Pain Relief"
                                            {...register("type", { required: "Type is required" })}
                                            className="input input-bordered w-full"
                                        />
                                        {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                                    </div>

                                    {/* Price */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Price*</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g., 3.50"
                                            {...register("price", { required: "Price is required" })}
                                            className="input input-bordered w-full"
                                        />
                                        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                                    </div>

                                    {/* Stock */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Stock*</span>
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="e.g., 80"
                                            {...register("stock", { required: "Stock is required" })}
                                            className="input input-bordered w-full"
                                        />
                                        {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
                                    </div>

                                    {/* Discount Percentage */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Discount Percentage</span>
                                        </label>
                                        <select
                                            {...register("discountPercentage")}
                                            className="select select-bordered w-full"
                                        >
                                            <option value="0" defaultValue>0%</option>
                                            <option value="25">25%</option>
                                            <option value="40">40%</option>
                                            <option value="50">50%</option>
                                            <option value="70">70%</option>
                                        </select>
                                    </div>

                                    {/* Category */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Category</span>
                                        </label>
                                        <select
                                            {...register("category")}
                                            className="select select-bordered w-full"
                                        >
                                            <option value="Tablet" defaultValue>Tablet</option>
                                            <option value="Inhaler">Inhaler</option>
                                            <option value="Injection">Injection</option>
                                            <option value="Syrup">Syrup</option>
                                            <option value="Capsule">Capsule</option>
                                        </select>
                                    </div>

                                    {/* Company */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Company</span>
                                        </label>
                                        <select
                                            {...register("company", { required: "Please select a company" })}
                                            className="select select-bordered w-full"
                                            defaultValue=""
                                        >
                                            <option value="">Company Name</option>
                                            <option value="Pfizer">Pfizer</option>
                                            <option value="Novartis">Novartis</option>
                                            <option value="Roche">Roche</option>
                                            <option value="Sanofi">Sanofi</option>
                                            <option value="GSK">GSK</option>
                                        </select>
                                        {errors.company && <p className="text-red-500">{errors.company.message}</p>}
                                    </div>


                                    {/* Unit */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Item Mass Unit</span>
                                        </label>
                                        <select
                                            {...register("unit")}
                                            className="select select-bordered w-full"
                                        >
                                            <option value="Mg" defaultValue>Mg</option>
                                            <option value="ML">ML</option>
                                        </select>
                                    </div>

                                    {/* Modal Actions */}
                                    <div className="modal-action flex justify-between mt-4">
                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-success text-white">
                                            Add Medicine
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ManageMedicines;