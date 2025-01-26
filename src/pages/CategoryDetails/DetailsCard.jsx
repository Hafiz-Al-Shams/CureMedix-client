import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";



const DetailsCard = () => {
    const { categoryName } = useParams();

    const [medicines, setMedicines] = useState([]);

    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();


    useEffect(() => {
        axios.get("https://cure-medix-server.vercel.app/medicines")
            .then(res => {
                const filteredMedicines = res.data.filter(medicine => medicine.category === categoryName);
                setMedicines(filteredMedicines);
            })
            .catch(error => {
                console.error("Error happened while fetching data:", error);
            });
    }, [categoryName]);

    // useEffect(() => {
    //     fetch(`https://cure-medix-server.vercel.app/medicines`)
    //         .then(res => res.json())
    //         .then(data => {
    //             const filteredMedicines = data.filter(medicine => medicine.category === categoryName);
    //             setMedicines(filteredMedicines);
    //         })
    //         .catch(error => console.error("Error happened while fetching data:", error));
    // }, [categoryName]);



    const handleViewDetails = (medicine) => {
        Swal.fire({
            title: medicine.name,
            text: `${medicine.description}`,
            imageUrl: medicine.image,
            imageWidth: 400,
            imageHeight: 250,
            imageAlt: medicine.name,
            html: `
                    <div class="text-left ml-10">
                        <p><strong>Category:</strong> ${medicine.category}</p>
                        <p><strong>Type:</strong> ${medicine.type}</p>
                        <p><strong>Price:</strong> $${medicine.price}</p>
                        <p><strong>Stock:</strong> ${medicine.stock}</p>
                        <p><strong>Discount:</strong> ${medicine.discount ? medicine.discountPercentage : "NA"}</p>
                    </div>
                `,
            showCloseButton: true,
            // draggable: true
        });
    };


    const handleAddToCart = (medicine) => {
        const { name, image, price, _id } = medicine;
        if (user && user.email) {
            const cartItem = {
                medicineId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 2000
                        });
                        refetch();
                    }

                })
        }
        else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signIn', { state: { from: location } })
                }
            });
        }
    };



    return (
        <>
            <Helmet>
                <title>CureMedix | Category - {categoryName}</title>
            </Helmet>
            <div className="px-6 max-w-screen-2xl min-h-screen mx-auto pt-16">
                <h1 className="text-3xl font-bold mb-6">Medicines for {categoryName}</h1>
                <table className="min-w-full bg-base-100 border-collapse shadow-xl border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-emerald-800/90 text-white">
                            <th className="py-3 px-4 border-b text-left">No.</th>
                            <th className="py-3 px-4 border-b text-left">Name</th>
                            <th className="py-3 px-4 border-b text-left">Price</th>
                            <th className="py-3 px-4 border-b text-left">Discount</th>
                            <th className="py-3 px-4 border-b text-left">Stock</th>
                            <th className="py-3 px-4 border-b text-left">Type</th>
                            <th className="py-3 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((medicine, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100 transition duration-300`}
                            >
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{medicine.name}</td>
                                <td className="py-3 px-4">${medicine.price}</td>
                                <td className="py-3 px-4">
                                    {medicine.discountPercentage ? `${medicine.discountPercentage}` : "NA"}
                                </td>

                                <td className="py-3 px-4">{medicine.stock}</td>
                                <td className="py-3 px-4">{medicine.type}</td>
                                <td className="py-3 px-4">
                                    <button
                                        className="mr-5 mt-2"
                                    >
                                        <div className="text-xl text-emerald-950"
                                            onClick={() => handleViewDetails(medicine)}
                                        >
                                            <FaEye />
                                        </div>
                                    </button>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleAddToCart(medicine)}
                                    >
                                        Select
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default DetailsCard;