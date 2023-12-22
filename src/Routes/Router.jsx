import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Components/Home/Home/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import Dashboard from "../Components/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoutes";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import MyProfile from "../Components/Profile/MyProfile";
import CreateNewTask from "../Components/Dashboard/CreateNewTask";
import Myprofile from "../Components/Dashboard/MyProfile";
import SeeTask from "../Components/Dashboard/SeeTask";
import UpdateTask from "../Components/Dashboard/UpdateTask";
import Contact from "../Components/Contact/Contact";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage/>,
        children: [
            {
                
                    path: '/',
                    element: <Home></Home>
                
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            }
            
            
            
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            
            {
                path: 'createtask',
                element: <CreateNewTask></CreateNewTask>
            },
            {
                path: 'seetask',
                element: <SeeTask></SeeTask>
            },
            {
                path: 'profile',
                element: <Myprofile></Myprofile>
            },
            {
                path: 'seetask/update/:id',
                element: <UpdateTask></UpdateTask>,
                loader: ({ params }) => fetch(`http://localhost:5000/usertasks/${params.id}`),
            }
            
        ]
    }
]);

export default router;