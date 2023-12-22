import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const auth = getAuth(app);
const Login = () => {

    const{signInUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
   
    const provider = new GoogleAuthProvider();
    const from = location?.state?.from.pathname || '/'

     //login with google
     const handleGoogleSignIn=()=>{
        signInWithPopup(auth,provider)
        .then(result=>{
            console.log(result.data);
            navigate(from,{replace:true})
            toast.success('Successfully logged in');

        })
        .catch(err=>{console.log(err);});
    }


    const handleLogIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const value = {email, password}
        console.log(value);

        //signIn user
        signInUser(email,password)
        .then(result => {
            console.log(result.user);

            toast.success("Login successful!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // navigate after login
            navigate(location?.state ? location.state : '/');
        })
        .catch(error => {
            console.error(error);

            toast.error("Login failed. Please check your email and password.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        });

    }




    return (
        <div className="">

            <div className=' my-16 md:my-20 md:w-10/12 w-11/12 mx-auto'>
                <div className="bg-[rgb(190,255,255)] container mx-auto lg:flex lg:flex-row items-center md:p-16 py-8   shadow-2xl">
                    {/* left  part  */}
                    <div className="md:w-1/2">
                        <h1 className='text-3xl mb-8 md:text-start text-center'>Welcome to <span className='text-[#23e6e6] font-bold italic'>TaskHub</span></h1>
                        <img src="https://i.ibb.co/X4NCprq/5423351-Mobile-login-removebg-preview.png" alt="About Us Image" className="md:w-10/12 object-cover " />

                    </div>

                    {/* right part */}
                    <div className="md:w-1/2 w-full ">
                        <div className="card flex-shrink-0 w-full">
                            <h2 className="text-center  text-3xl font-bold">Login Now</h2>
                            <form onSubmit={handleLogIn} className="card-body">
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text text-lg">Email</span>
                                    </label>
                                    <div className='indicator w-full flex-col'>
                                        <span className="indicator-item badge bg-[#23e6e6] text-white border-none">Required</span>
                                        <input type="email" name='email' placeholder="Your Email" className="input input-bordered shadow-lg" required />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg">Password</span>
                                    </label>
                                    <div className='indicator w-full flex-col'>
                                        <span className="indicator-item badge bg-[#23e6e6] text-white border-none">Required</span>
                                        <input type="password" name='password' placeholder="Password" className="input input-bordered shadow-lg" required />
                                    </div>

                                    <label className="label">
                                        <a href="#" className="label-text-alt text-lg link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="mt-6 form-control">
                                    <button className=" bg-[#42fafa] hover:bg-[#23e6e6]  hover:text-white text-white font-bold text-lg py-2 px-10 rounded-lg shadow-2xl duration-300">Login</button>
                                </div>
                                <div className='text-center  mt-6'>
                                    <p className='text-lg  divider '>Or Connect With</p>
                                    <div className='my-4'>
                                        <button  onClick={handleGoogleSignIn} className='px-4'>
                                            <img className='w-10' src="https://i.ibb.co/ftwyb00/Google-G-Logo-svg.png" alt="" />
                                        </button>
                                        <button className='px-4'>
                                            <img className='w-10' src="https://i.ibb.co/VxKN3Mg/github.png" alt="" />

                                        </button>
                                    </div>
                                    <div>
                                        <p className='text-sm'>New to <span className='font-semibold text-[#23e6e6]'>TaskHub</span> ?<Link to="/register"><button className="btn btn-active btn-link normal-case text-sm text-sky-700 ">Registration Here</button>
                                        </Link></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;