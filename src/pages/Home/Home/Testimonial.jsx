
import user from '../../../assets/imgUser.png'

const Testimonial = () => {

    const testimonials = [
        {
            name: "Luca Moretti",
            image: user,
            rating: 5,
            review:
                "9.5/10 - One of the best online pharmacies and a trustworthy one too. Highly recommended!",
        },
        {
            name: "Sophie Müller",
            image: user,
            rating: 5,
            review: "They are super fast. Highly recommended.",
        },
        {
            name: "Mateo Novak",
            image: user,
            rating: 5,
            review: "Great delivery service and well-organized customer service. Recommend!",
        },
        {
            name: "Elena Petrova",
            image: user,
            rating: 4.5,
            review: "Their delivery system is top-notch. Satisfied with their service.",
        },
        {
            name: "Oliver Dupont",
            image: user,
            rating: 5,
            review:
                "Service is really praiseworthy. Easy communication, supportive help line. Quick delivery impressed me.",
        },
        {
            name: "Isla O'Connor",
            image: user,
            rating: 5,
            review:
                "Excellent service, good behavior, fastest delivery as promised. Best wishes to you!",
        },
        {
            name: "Theo van Dijk",
            image: user,
            rating: 5,
            review: "One of the best favorite online shops. Highly recommended.",
        },
        {
            name: "Amelie Jensen",
            image: user,
            rating: 5,
            review: "One of the leading companies. Amazed and their service is very good.",
        },
    ];


    return (
        <div className='lg:mt-10 lg:mb-16'>
            <section className="bg-gray-100 py-4 md:py-7 lg:py-12 px-4 rounded-lg">
                <h2 className="text-2xl lg:text-4xl font-bold text-center mb-4 lg:mb-8 lg:pb-4">
                    Reviews From Our Valuable Customers
                </h2>
                <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-md w-full sm:w-[47%] lg:w-[30%]"
                        >
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                                <div className="flex space-x-1 text-yellow-500">
                                    {"★".repeat(Math.floor(testimonial.rating))}
                                    {testimonial.rating % 1 !== 0 && "☆"}
                                </div>
                                <p className="text-gray-600 mt-1 text-sm">{testimonial.review}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Testimonial;