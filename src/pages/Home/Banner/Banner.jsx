import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useDaisyTheme } from "../../../hooks/useDaisyTheme";
import { Link } from "react-router-dom";
import slider1 from "../../../../src/assets/home/slider_1.jpg";
import slider2 from "../../../../src/assets/home/slider_2.jpg";
import slider3 from "../../../../src/assets/home/slider_3.jpg";

// 
// import useBanners from "../../../hooks/useBanners"; // Added: Import the new custom hook
// 

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

    // 
    // Added: Use the custom hook to fetch banner images
    // const [slide1, slide2, slide3, refetch] = useBanners();
    // 

    return (
        <div className="relative">
            <Carousel
                autoPlay
                interval={3000}
                infiniteLoop
                showThumbs={false}
                transitionTime={500}
            >
                <div className="h-[50vh]">
                    <img src={slider1} alt="Slide 1" className="w-full h-full object-cover" />
                </div>
                <div className="h-[50vh]">
                    <img src={slider2} alt="Slide 2" className="w-full h-full object-cover" />
                </div>
                <div className="h-[50vh]">
                    <img src={slider3} alt="Slide 3" className="w-full h-full object-cover" />
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