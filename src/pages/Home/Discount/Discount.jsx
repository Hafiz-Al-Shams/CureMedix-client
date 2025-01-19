

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

// import slide1 from '../../../assets/home/slide1.jpg'
// import slide2 from '../../../assets/home/slide2.jpg'
// import slide3 from '../../../assets/home/slide3.jpg'
// import slide4 from '../../../assets/home/slide4.jpg'
// import slide5 from '../../../assets/home/slide5.jpg'



const Discount = () => {
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/medicines')
            .then(response => response.json())
            .then(data => {
                const discountedMedicines = data.filter(medicine => medicine.discount);
                setMedicines(discountedMedicines);
            });
    }, []);

    return (
        <>
            <section>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 1780,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper mb-24"
                >
                    {medicines.map((medicine, index) => (
                        <SwiperSlide key={index} className="flex flex-col items-center">
                            <div className="relative w-full h-72 bg-gray-200">
                                <img src={medicine.image} alt={medicine.name} className="object-cover h-full w-full" />
                            </div>
                            <h3 className="text-2xl font-bold mt-4">{medicine.name}</h3>
                            <h3 className="text-xl text-gray-600 mt-1 mb-10">
                                {medicine.discountPercentage} discount
                            </h3>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </>
    );
};

export default Discount;