import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Discount from "../Discount/Discount";
import CategoryCards from "../CategoryCards/CategoryCards";
import KnowUs from "../KnowUs/KnowUs";
import Qualities from "./Qualities/Qualities";
import Newsletter from "./Newsletter";
import AppPromotion from "./AppPromotion";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>CureMedix | Home</title>
            </Helmet>
            {/* <h1 className="text-7xl text-center my-10">CureMedix HOME</h1> */}
            <div className="max-w-screen-2xl mx-auto pb-3">
                <Banner></Banner>
                <div className="">
                    <CategoryCards></CategoryCards>
                </div>
                <div className="">
                    <AppPromotion></AppPromotion>

                </div>
                <div className="bg-base-100 pt-4 md:pt-7 lg:pt-10 rounded-md md:rounded-lg lg:rounded-xl">
                    <h2 className="mb-5 md:mb-7 lg:mb-10 w-10/12 md:w-8/12 lg:w-6/12 mx-auto text-center text-2xl md:text-3xl lg:text-4xl font-semibold pb-5 pt-4 bg-emerald-100/50">Medicines with Super Discounts!</h2>
                    <Discount></Discount>
                </div>
                <KnowUs></KnowUs>
                <Qualities></Qualities>
                <div className="pb-5 md:pb-9 lg:pb-14">
                    <Newsletter></Newsletter>
                </div>
            </div>
        </div>
    );
};

export default Home;