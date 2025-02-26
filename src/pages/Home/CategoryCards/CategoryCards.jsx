import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const CategoryCards = () => {




    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchMedicines = async () => {
            try {
                const res = await fetch("https://cure-medix-server.vercel.app/medicines");
                const medicinesData = await res.json();

                const newCategories = {};
                medicinesData.forEach(medicine => {
                    if (!newCategories[medicine.category]) {
                        newCategories[medicine.category] = {
                            name: medicine.category,
                            count: 0,
                            image: null, // Placeholder for the image
                        };
                    }
                    newCategories[medicine.category].count += 1;
                });

                return Object.values(newCategories).sort((a, b) => b.count - a.count);
            } catch (error) {
                console.log("Error fetching medicines data:", error);
                return [];
            }
        };

        const fetchCategoryImages = async () => {
            try {
                const res = await fetch("https://cure-medix-server.vercel.app/categoryImages");
                const categoryImagesData = await res.json();
                return categoryImagesData;
            } catch (error) {
                console.log("Error fetching category images data:", error);
                return [];
            }
        };

        // Combining data
        const fetchAndCombineData = async () => {
            const [medicineCategories, categoryImages] = await Promise.all([fetchMedicines(), fetchCategoryImages()]);

            // Creating a map of images by category name for easy lookup
            const imageMap = categoryImages.reduce((map, item) => {
                map[item.categoryName] = item.imageUrl;
                return map;
            }, {});

            // Merging the data: adding images to their corresponding categories
            const combinedCategories = medicineCategories.map(category => ({
                ...category,
                image: imageMap[category.name] || category.image, // Using image from categoryImages or fallback to placeholder
            }));

            setCategories(combinedCategories);
        };

        fetchAndCombineData();
    }, []);




    return (
        <>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mt-12 md:mt-14 lg:mt-24 mb-1 md:mb-2.5 lg:mb-7 text-black/90">Our Top Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6 pt-6 pb-12 md:pb-16 lg:pb-28">
                {categories.map((category, i) => (
                    <div key={i} className="card bg-base-100 shadow-xl rounded-lg">
                        <figure className="w-full">
                            <img src={category.image} alt={category.name} className="w-full h-52 object-cover rounded-t-lg" />
                        </figure>
                        <div className="card-body p-4 space-y-2">
                            <h2 className="card-title text-2xl font-semibold">{category.name}</h2>
                            <p className="text-base text-gray-600">{category.count} medicines available</p>
                            <div className="card-actions justify-end">
                                <Link to={`/categoryDetails/${category.name}`}>
                                    <button className="btn primary-btn">View Details</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>

    );
};

export default CategoryCards;