import { Outlet } from "react-router-dom";
import NavBar from "../pages/shared/NavBar/NavBar";
import Footer from "../pages/shared/Footer/Footer";



const MainLayout = () => {
    return (
        <>
            <NavBar></NavBar>
            <div className="min-h-screen bg-emerald-50">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </>
    );
};

export default MainLayout;