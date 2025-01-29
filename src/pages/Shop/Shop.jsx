import { useState } from "react";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { Helmet } from "react-helmet-async";


const Shop = () => {
    const medicines = useLoaderData();
    // const [medicines, setMedicines] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    // useEffect(() => {
    //     axios.get("https://cure-medix-server.vercel.app/medicines")
    //         .then(res => {
    //             setMedicines(res.data);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching medicines:", error);
    //         });
    // }, []);

    const handleViewDetails = (medicine) => {
        Swal.fire({
            title: medicine.name,
            // text: `${medicine.description}`,
            imageUrl: medicine.image,
            imageWidth: 400,
            imageHeight: 250,
            imageAlt: medicine.name,
            html: `
                <div class="text-left ml-10 space-y-1.5">
                    <p><strong>Category:</strong> ${medicine.category}</p>
                    <p><strong>Type:</strong> ${medicine.type}</p>
                    <p><strong>Price per Unit:</strong> $${medicine.price}</p>
                    <p><strong>Stock:</strong> ${medicine.stock}</p>
                    <p><strong>Discount:</strong> ${medicine.discount ? medicine.discountPercentage : "NA"}</p>
                    <p><strong>Description:</strong> ${medicine.description}</p>
                    <p><strong>Company:</strong> ${medicine.company}</p>
                    <p><strong>Seller:</strong> ${medicine.seller}</p>
                </div>
            `,
            showCloseButton: true,
            // draggable: true
        });
    };


    const handleAddToCart = (medicine) => {
        const { name, image, price, _id, type, description, seller, company } = medicine;
        if (user && user.email) {
            const cartItem = {
                medicineId: _id,
                email: user.email,
                name,
                image,
                price,
                type,
                description,
                seller,
                company
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
                            timer: 1000
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




    // testing area

    // const foods = useLoaderData();

    const [resultMedicines, setResultMedicines] = useState(medicines);

    const [searchValue, setSearchValue] = useState("");
    // const [results, setResults] = useState([]);

    // State to manage the debounce timer
    const [debounceTimer, setDebounceTimer] = useState(null);

    const handleSearch = async (query) => {

        try {
            const response = await fetch(`https://cure-medix-server.vercel.app/searchMedicines?search=${encodeURIComponent(query)}`);
            const data = await response.json();
            setResultMedicines(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };


    // Debounced search triggered by input change
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);

        // Clearing any existing debounce timer
        if (debounceTimer) clearTimeout(debounceTimer);

        // Setting a new debounce timer
        const timer = setTimeout(() => {
            handleSearch(value);
        }, 300); // debounce delay
        setDebounceTimer(timer);
    };

    // testing area






    return (
        <div className="px-6 pt-6 max-w-screen-2xl mx-auto pb-24">
            <Helmet>
                <title>CureMedix | Shop</title>
            </Helmet>
            <h1 className="text-3xl font-bold mb-6 mt-7">Shop Your Necessary Medicines Here</h1>



            {/* testing area */}

            {/* searching medicines */}
            <div className="flex justify-end pr-24">

                <label className="input input-bordered input-primary flex items-center gap-2 mb-8">
                    <input type="text" name="search" className="grow" placeholder="Search" value={searchValue}
                        onChange={handleInputChange} // Real-time input handling
                    />

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-6 w-6 opacity-95 text-neutral-content">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>

            </div>

            {/* testing area */}




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
                    {resultMedicines.map((medicine, index) => (
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
    );
};

export default Shop;