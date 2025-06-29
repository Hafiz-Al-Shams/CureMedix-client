import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Discount from "../Discount/Discount";
import CategoryCards from "../CategoryCards/CategoryCards";
import KnowUs from "../KnowUs/KnowUs";
import Qualities from "./Qualities/Qualities";
import Newsletter from "./Newsletter";
import AppPromotion from "./AppPromotion";
import Testimonial from "./Testimonial";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>CureMedix | Home</title>
            </Helmet>
            {/* <h1 className="text-7xl text-center my-10">CureMedix HOME</h1> */}
            <div className="">
                <Banner></Banner>
            </div>
            <div className="max-w-[90vw] md:max-w-[95vw] lg:max-w-screen-xl mx-auto pb-3">

                <div className="">
                    <CategoryCards></CategoryCards>
                </div>
                <div className="">
                    <AppPromotion></AppPromotion>

                </div>
                <div className="bg-base-100 pt-4 md:pt-7 lg:pt-10 rounded-md md:rounded-lg lg:rounded-xl">
                    <h2 className="mb-0.5 md:mb-1 lg:mb-1.5 w-10/12 md:w-8/12 lg:w-6/12 mx-auto text-center text-lg md:text-2xl lg:text-3xl font-semibold pb-0.5 pt-0.5">Medicines with Super Discounts!</h2>
                    <Discount></Discount>
                </div>
                {/* <div className="divider divider-success"></div> */}
                <Testimonial></Testimonial>
                {/* <div className="divider divider-success mb-4 md:mb-7 lg:mb-10"></div> */}
                <KnowUs></KnowUs>
                <Qualities></Qualities>
                <div className="">

                </div>

            </div>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;