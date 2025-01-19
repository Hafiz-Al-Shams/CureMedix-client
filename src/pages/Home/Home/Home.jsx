import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Discount from "../Discount/Discount";
import CategoryCards from "../CategoryCards/CategoryCards";
import KnowUs from "../KnowUs/KnowUs";
import Qualities from "./Qualities/Qualities";


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
                <div className="bg-base-100 pt-10">
                    <h2 className="text-center text-3xl font-semibold pb-6">discounted products</h2>
                    <Discount></Discount>
                </div>
                <KnowUs></KnowUs>
                <Qualities></Qualities>
            </div>
        </div>
    );
};

export default Home;