import { Helmet } from "react-helmet-async";
// import Banner from "../../components/Banner";
// import Category from "../../components/Category";
// import Featured from "./Featured/Featured";
// import PopularMenu from "./PopularMenu/PopularMenu";
// import Testimonials from "./Testimonials/Testimonials";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>CureMedix | Home</title>
            </Helmet>
            <h1 className="text-7xl text-center my-10">CureMedix HOME</h1>
            {/* <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonials></Testimonials> */}
        </div>
    );
};

export default Home;