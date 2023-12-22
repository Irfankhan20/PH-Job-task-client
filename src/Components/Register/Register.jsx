
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from.pathname || '/'


    const handleRegister = e => {
        e.preventDefault();
        const accepted = e.target.terms.checked;
        console.log(accepted);
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        //show toast if password length less 6 digit
        if (password.length < 6) {

            toast.error('Password must be at least 6 characters long', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
            return;
        }

        //accept terms and condition toast
        if (!accepted) {

            toast.error('Please accept the Terms and Conditions', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }
        const registerValue = { name, photo, email, password };
        console.log(registerValue);

        //createUser
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                handleUpdateUser(name, photo);

                //if userCreate successful
                toast.success('Registration successful!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,


                });
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.error(error);

                //if userCreate error
                toast.error('Registration failed. Please try again.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            })

        const handleUpdateUser = (name, photo) => {
            const profile = {
                displayName: name,
                photoURL: photo,
            };
            console.log(profile)
            updateUserProfile(profile)
                .then(() => { })
                .catch((error) => console.error(error));
        };
    }

    return (
        <div>


            <div className='my-16 md:my-20 md:w-10/12 w-11/12 mx-auto'>
                <div className="bg-[rgb(190,255,255)] container mx-auto lg:flex lg:flex-row items-center md:p-16 py-8  shadow-2xl">
                    <div className="md:w-1/2 w-full ">
                        <div className="card flex-shrink-0 w-full">
                            <h2 className="text-center  text-3xl font-bold">Register Now</h2>
                            <form onSubmit={handleRegister} className="card-body">
                                {/* name box */}
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text text-lg">Name</span>
                                    </label>
                                    <div className='indicator w-full flex-col'>

                                        <input type="text" name='name' placeholder="Your Name" className="input input-bordered" required />
                                    </div>
                                </div>
                                {/* photo box */}
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text text-lg">Photo URL</span>
                                    </label>
                                    <div className='indicator w-full flex-col'>

                                        <input type="text" name='photo' placeholder="Your Photo URL" className="input input-bordered" required />
                                    </div>
                                </div>
                                {/* email box */}
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text text-lg">Email</span>
                                    </label>
                                    <div className='indicator w-full flex-col'>
                                        <span className="indicator-item badge bg-[#23e6e6] text-white border-none">Required</span>
                                        <input type="email" name='email' placeholder="Your Email" className="input input-bordered" required />
                                    </div>
                                </div>
                                {/* password box */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg">Password</span>
                                    </label>

                                    <div className='indicator w-full flex-col'>
                                        <span className="indicator-item badge bg-[#23e6e6] text-white border-none">Required</span>
                                        <input type="password" name='password' placeholder="Password" className="input input-bordered" required />
                                    </div>

                                    {/* terms and condition  */}
                                    <div className="mb-3 mt-3">
                                        <input type="checkbox" name="terms" id="terms" />
                                        <label className="ml-2 font-medium" htmlFor="terms">Accept Our <a className="text-[#23e6e6]" href="">Terms and condition</a> </label>
                                    </div>


                                </div>
                                {/* register btn  */}
                                <div className="mt-6 form-control">
                                    <button className=" bg-[#42fafa] hover:bg-[#23e6e6] px-10 hover:text-white text-white font-bold text-lg py-2 rounded-lg shadow-2xl duration-300">Register</button>
                                </div>
                                {/* login toggle */}
                                <div className='text-center  mt-6'>

                                    <div>
                                        <p className='text-sm'>Have an Acconut ?<Link to="/login"><button className="btn btn-active btn-link normal-case text-sm text-sky-700 ">Login Here</button>
                                        </Link></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* RIGht part */}
                    <div className="md:w-1/2">
                        <h1 className='text-3xl mb-8 md:text-start text-center ml-14'>Welcome to <span className='text-[#23e6e6] font-bold italic'>TaskHub</span></h1>
                        <img src="https://i.ibb.co/j8gSHcV/Forms-amico.png" alt="About Us Image" className="md:w-10/12 object-cover ml-14" />
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Register;