import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const CategoryCards = () => {




    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchMedicines = async () => {
            try {
                const res = await fetch("http://localhost:5000/medicines");
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
                const res = await fetch("http://localhost:5000/categoryImages");
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
            <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold text-center mt-4 md:mt-6 lg:mt-8 mb-0 text-base-content">Our Top Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-1 md:pt-2.5 lg:pt-5 pb-4 md:pb-5 lg:pb-7">
                {categories.map((category, i) => (
                    <div
                        key={i}
                        className="card bg-base-100 shadow-xl rounded-lg border-[1px] border-white/25 transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-2xl"
                    >
                        <figure className="w-full">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-24 md:h-28 lg:h-40 object-cover rounded-t-lg"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{category.name}</h2>
                            <p className="text-base-content/90 text-xs md:text-sm lg:text-base">
                                {category.count} medicines available
                            </p>
                            <div className="card-actions justify-end">
                                <Link to={`/categoryDetails/${category.name}`}>
                                    <button className="btn btn-xs md:btn-sm border-2 border-gray-400/80">Details</button>
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