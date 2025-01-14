import { Outlet } from "react-router-dom";
import NavBar from "../pages/shared/NavBar/NavBar";



const MainLayout = () => {
    return (
        <>
            <NavBar></NavBar>
            <div className="min-h-screen">
                <Outlet></Outlet>
            </div>
            {/* <Footer></Footer> */}
        </>
    );
};

export default MainLayout;