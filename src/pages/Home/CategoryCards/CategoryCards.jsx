import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const CategoryCards = () => {
    const [categories, setCategories] = useState([]);



    useEffect(() => {
        fetch("http://localhost:5000/medicines")
            .then(res => res.json())
            .then(data => {
                const gCategories = {};
                data.forEach(medicine => {
                    if (!gCategories[medicine.category]) {
                        gCategories[medicine.category] = {
                            name: medicine.category,
                            count: 0,
                            image: medicine.image
                        };
                    }
                    gCategories[medicine.category].count += 1;
                });
                const sortedCategories = Object.values(gCategories).sort((a, b) => b.count - a.count);
                setCategories(sortedCategories);
            })
            .catch(error => console.log("Error happened while fetching data:", error));
    }, []);



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-6">
            {categories.map((category, i) => (
                <div key={i} className="card bg-base-100 shadow-xl rounded-lg">
                    <figure className="w-full">
                        <img src={category.image} alt={category.name} className="w-full h-52 object-cover rounded-t-lg" />
                    </figure>
                    <div className="card-body p-4 space-y-2">
                        <h2 className="card-title text-xl font-semibold">{category.name}</h2>
                        <p className="text-sm text-gray-600">{category.count} medicines available</p>
                        <div className="card-actions justify-end">
                            <Link to={`/categoryDetails/${category.name}`}>
                                <button className="btn btn-primary text-white">View Details</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default CategoryCards;