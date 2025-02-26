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

    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const [resultMedicines, setResultMedicines] = useState(medicines);
    const [searchValue, setSearchValue] = useState("");
    const [debounceTimer, setDebounceTimer] = useState(null);


    // state for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [sortOrder, setSortOrder] = useState("");





    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMedicines = resultMedicines.slice(indexOfFirstItem, indexOfLastItem);


    const totalPages = Math.ceil(resultMedicines.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };



    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
    };




    const handleViewDetails = (medicine) => {
        Swal.fire({
            title: medicine.name,
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



    // State to manage the debounce timer
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



    const handleSortByName = () => {
        const sortedMedicines = [...resultMedicines].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        setResultMedicines(sortedMedicines);
    };


    // Handle Sorting by Price
    const handleSortByPrice = (order) => {
        const sortedMedicines = [...resultMedicines].sort((a, b) =>
            order === "asc" ? a.price - b.price : b.price - a.price
        );
        setResultMedicines(sortedMedicines);
        setSortOrder(order);
    };



    return (
        <div className="px-6 pt-2.5 max-w-screen-2xl mx-auto pb-24">
            <Helmet>
                <title>CureMedix | Shop</title>
            </Helmet>
            <h1 className="text-3xl font-bold mb-2.5 mt-5">Shop Your Necessary Medicines Here</h1>


            <div className="flex justify-between items-center">

                <div className="flex justify-center gap-2.5 mb-2.5">
                    <div className="">
                        <button
                            className="btn primary-btn"
                            onClick={handleSortByName}
                        >
                            Sort by Name (A-Z)
                        </button>

                    </div>

                    <div className="">
                        {/* Sorting by Price Dropdown */}
                        <select
                            className="select select-bordered border-2 border-emerald-500 w-full text-lg"
                            value={sortOrder}
                            onChange={(e) => handleSortByPrice(e.target.value)}
                        >
                            <option value="">Sort by Price</option>
                            <option value="asc">Low to High</option>
                            <option value="desc">High to Low</option>
                        </select>

                    </div>
                </div>




                <div className="pr-4">
                    <h5 className="text-gray-900 font-medium mb-1">Search by Name or Type</h5>
                    <label className="input input-bordered input-primary flex items-center gap-2 mb-8">
                        <input type="text" name="search" className="grow" placeholder="Search Medicines" value={searchValue}
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

            </div>


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
                    {currentMedicines.map((medicine, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100 transition duration-300`}>
                            <td className="py-3 px-4">{indexOfFirstItem + index + 1}</td>
                            <td className="py-3 px-4">{medicine.name}</td>
                            <td className="py-3 px-4">${medicine.price}</td>
                            <td className="py-3 px-4">{medicine.discountPercentage ? `${medicine.discountPercentage}` : "NA"}</td>
                            <td className="py-3 px-4">{medicine.stock}</td>
                            <td className="py-3 px-4">{medicine.type}</td>
                            <td className="py-3 px-4">
                                <button className="mr-5 mt-2" onClick={() => handleViewDetails(medicine)}>
                                    <div className="text-xl text-emerald-950"><FaEye /></div>
                                </button>
                                <button className="btn btn-primary btn-sm" onClick={() => handleAddToCart(medicine)}>
                                    Select
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>


            </table>

            {/* for pagination */}
            <div className="flex justify-between items-center mt-6 px-1">
                {/* Items per page selection */}
                <select
                    className="border p-2 rounded-md"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                >
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                    <option value="20">20 per page</option>
                    <option value="50">50 per page</option>
                </select>

                {/* Pagination Controls */}
                <div className="flex gap-2">
                    <button
                        className="px-3 py-1 border rounded-md disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? "bg-gray-300" : ""}`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className="px-3 py-1 border rounded-md disabled:opacity-50"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Shop;