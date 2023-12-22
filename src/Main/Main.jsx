import { Outlet } from "react-router-dom";
import Navbar from "../CommonComponents/Navbar/Navbar";
import Footer from "../CommonComponents/Footer/Footer";




const Main = () => {
    return (
        <div>
            <div className="flex flex-col min-h-[100vh]">
                <div className="flex-grow">
                    <Navbar></Navbar>
                    <Outlet></Outlet>
                </div>
                <div className="flex-shrink-0">
                    <Footer></Footer>
                </div>
            </div>
        </div>
    );
};

export default Main;