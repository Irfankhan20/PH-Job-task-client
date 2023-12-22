import { useContext } from "react";



import { Link, Outlet } from "react-router-dom";
import { FaBook, FaImage, FaProductHunt } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import Navbar from "../../CommonComponents/Navbar/Navbar";
import Footer from "../../CommonComponents/Footer/Footer";



const Dashboard = () => {
    const { user } = useContext(AuthContext);
    
  
    


    return (
        <div>
           
           <Navbar></Navbar>
          
            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col p-10">
                    <label htmlFor="my-drawer-2" className=" drawer-buttona lg:hidden absolute right-0 top-2 btn cursor-pointer bg-[#77f4f4] hover:bg-[#23e6e6]">open dashboard</label>
                    <Outlet></Outlet>

                    
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-[#d1ffff] text-base-content">
                        {/* Sidebar content here */}

                        <div className="p-4">
                            <div className="text-center">
                                <img className="w-20 h-20 rounded-full mx-auto mb-2" src={user.photoURL} alt="Profile" />
                                
                                        <h4 className="text-lg font-bold pb-2">
                                            {user.displayName}
                                            <span className='bg-[#23e6e6] ml-3 text-white font-semibold text-xs px-2 py-1 rounded-full'>User</span>
                                            
                                        </h4>
                                        <p className="text-gray-600 ">{user.email}</p>
                                        <p className="pt-3 font-medium">task management dashboard</p>

                                
                            </div>
                        </div>
                        <hr className='border-2 border-black' />

                        

                        
                        <li> <Link to="/dashboard/createtask"><FaBook></FaBook> Create New Task</Link> </li>
                            <li> <Link to="/dashboard/seetask"><FaProductHunt></FaProductHunt>See Previous Tasks</Link> </li>
                            <li> <Link to="/dashboard/profile"><FaImage></FaImage> My Profile</Link> </li>

                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;