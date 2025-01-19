import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";



const DetailsCard = () => {
    const { categoryName } = useParams();

    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/medicines`)
            .then(res => res.json())
            .then(data => {
                const filteredMedicines = data.filter(medicine => medicine.category === categoryName);
                setMedicines(filteredMedicines);
            })
            .catch(error => console.error("Error happened while fetching data:", error));
    }, [categoryName]);

    return (
        <>
            <Helmet>
                <title>Category - {categoryName}</title>
            </Helmet>
            <div className="p-6 max-w-screen-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Medicines for {categoryName}</h1>
                <table className="min-w-full bg-base-100 border-collapse shadow-xl border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-emerald-800/90 text-white">
                            <th className="py-3 px-4 border-b text-left">No.</th> {/* Serial number column */}
                            <th className="py-3 px-4 border-b text-left">Name</th>
                            <th className="py-3 px-4 border-b text-left">Price</th>
                            <th className="py-3 px-4 border-b text-left">Stock</th>
                            <th className="py-3 px-4 border-b text-left">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((medicine, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } border-b hover:bg-gray-100 transition duration-300`}
                            >
                                <td className="py-3 px-4">{index + 1}</td> {/* Display dynamic serial number */}
                                <td className="py-3 px-4">{medicine.name}</td>
                                <td className="py-3 px-4">${medicine.price}</td>
                                <td className="py-3 px-4">{medicine.stock}</td>
                                <td className="py-3 px-4">{medicine.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default DetailsCard;