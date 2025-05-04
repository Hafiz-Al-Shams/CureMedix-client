import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useDaisyTheme } from "../../../hooks/useDaisyTheme";
import { Link } from "react-router-dom";


const Banner = () => {

    const theme = useDaisyTheme(); // "light" or "dark"
    const overlayClass = theme === "dark" ? "bg-black/60" : "bg-neutral-800/40";

    // Base button utilities + hover animations
    const baseBtn = `
    btn lg:btn-lg lg:btn-block font-light
    border-0
    transition duration-150 ease-in-out
    transform hover:scale-110
    hover:shadow-xl hover:shadow-white/25
  `;

    // Theme‑specific hover adjustments
    const lightBtnClasses = `
    bg-emerald-800/70 text-base-100
    ${baseBtn}
    hover:bg-emerald-800/80
    hover:text-white
  `;
    const darkBtnClasses = `
    bg-neutral-800 text-gray-300/90
    ${baseBtn}
    hover:text-gray-300
  `;

    const btnClasses = theme === "dark" ? darkBtnClasses : lightBtnClasses;



    return (
        <div className="relative">
            <Carousel
                autoPlay
                interval={3000}
                infiniteLoop
                showThumbs={false}
                transitionTime={500}
            >
                <div>
                    <img src="https://i.ibb.co/DHg5qZxC/3.png" alt="Slide 1" />
                </div>
                <div>
                    <img src="https://i.ibb.co/273fM0RZ/4.png" alt="Slide 2" />
                </div>
                <div>
                    <img src="https://i.ibb.co/x8mCnQhP/1.png" alt="Slide 3" />
                </div>
                <div>
                    <img src="https://i.ibb.co/ccBYgxXr/2.png" alt="Slide 4" />
                </div>
            </Carousel>

            {/* dim overlay */}
            <div className={`absolute inset-0 pointer-events-none ${overlayClass}`} />

            {/* persistent CTA */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto mb-7 md:mb-10 lg:mb-16">
                <Link to="/shop">
                    <button className={btnClasses}>
                        Find Necessary Medicines
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Banner;