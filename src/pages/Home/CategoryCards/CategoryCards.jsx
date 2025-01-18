import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const CategoryCards = () => {
    const [categories, setCategories] = useState([]);



    useEffect(() => {
        fetch("http://localhost:5000/medicines")
            .then(res => res.json())
            .then(data => {
                // Grouping medicines by category
                const groupedCategories = data.reduce((acc, medicine) => {
                    const category = acc[medicine.category] || { name: medicine.category, count: 0, image: medicine.image };
                    category.count += 1;
                    acc[medicine.category] = category;
                    return acc;
                }, {});
                setCategories(Object.values(groupedCategories));
            })
            .catch(error => console.log("Error happened while fetching data:", error));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {categories.map((category, index) => (
                <div key={index} className="card bg-base-100 shadow-xl">
                    <figure>
                        <img src={category.image} alt={category.name} className="h-52 w-full object-cover" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{category.name}</h2>
                        <p>{category.count} medicines available</p>
                        <div className="card-actions justify-end">
                            <Link to={`/categoryDetails/${category.name}`}>
                                <button className="btn btn-primary">View Details</button>
                            </Link>


                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryCards;