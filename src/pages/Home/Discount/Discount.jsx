import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';


const Discount = () => {
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        fetch('https://cure-medix-server.vercel.app/medicines')
            .then(response => response.json())
            .then(data => {
                const discountedMedicines = data.filter(medicine => medicine.discount);
                setMedicines(discountedMedicines);
            });
    }, []);

    return (
        <>
            <section className="my-4 px-4 lg:px-8">
                <Swiper
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 3, spaceBetween: 25 },
                        1024: { slidesPerView: 4, spaceBetween: 30 },
                    }}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 1780,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper mb-5 md:mb-7 lg:mb-10"
                >
                    {medicines.map((medicine, index) => (
                        <SwiperSlide key={index} className="flex flex-col items-center">

                            <div className="relative w-full h-48 lg:h-72">
                                <img src={medicine.image} alt={medicine.name} className="object-cover h-full w-full" />
                            </div>
                            <h3 className="text-lg lg:text-xl font-semibold mt-1 lg:mt-2">{medicine.name}</h3>
                            <h3 className="text-sm lg:text-lg text-base-content/80 mb-14 md:mb-8 lg:mb-10">
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