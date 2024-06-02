import { useContext } from "react";
import { FaFacebookF, FaGithubSquare, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import signUpImage from '../../assets/others/authentication2.png'
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
 const axiosPublic = useAxiosPublic();
 const {createUser, googleAuth, updateUserProfile} = useContext(AuthContext);
 const location = useLocation();
 console.log(location);
 const navigate = useNavigate();
 const from = location.state?.from?.pathname || "/";

 const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

 const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
    .then(result => {
        const user = result.user;
        console.log(user);
        // registration success toast

        updateUserProfile(data.name, data.photoURL)
        .then(() => {
            console.log('Profile Updated')

            const userInfo = {
                name: data.name,
                email: data.email,
            }

            axiosPublic.post('/users', userInfo)
            .then(res => {
                if(res.data.insertedId){
                    Toast.fire({
                        icon: "success",
                        title: "Sign Up successfully"
                      })
                    //   navigate 
                    navigate('/');
                }
            })

        }).catch(error => {
            console.log(error)
            
        })

        
    }).catch(error => {
        const signUpError = error.message
        console.log(signUpError);
        Toast.fire({
            icon: "warning",
            title: "Account Already Used"
          })
    })
}



const handleGoogleSignIn = () => {
    googleAuth()
    .then(result => {
        const user = result.user;
        console.log(user)
        const userInfo = {
            name: user.displayName,
            email: user.email,
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
            console.log(res.data);
            Toast.fire({
                icon: "success",
                title: "Signed in successfully"
              }); 
            //   navigate 
            navigate(from, {replace: true});
        })
                     
    })
}

    return (
        <div>
            <Helmet><title>Bistro Boss | Sign Up</title></Helmet>
            <div className="container mx-auto px-4 mt-10">
                <div className="">
                <div className="grid grid-cols-3 shadow-2xl md:w-5/6 w-full mx-auto md:p-8 p-5 items-center">
                <div className="col-span-1">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <h3 className="text-center font-bold text-[#151515] text-3xl pb-4">Sign Up Now</h3>
                    <div className="space-y-2">
                            <label className="text-base font-semibold text-[#444444]">Name</label>
                            <input type="text" name="name" className="border-2 border-gray-300 rounded-md p-2 w-full text-base text-[#A1A1A1]" placeholder="Type here" {...register("name", {required: true})}  />
                            {errors.name && <span className="text-sm font-bold text-red-600">Name is required</span>}
                    </div>
                    <div className="space-y-2">
                            <label className="text-base font-semibold text-[#444444]">Photo URL</label>
                            <input type="text" className="border-2 border-gray-300 rounded-md p-2 w-full text-base text-[#A1A1A1]" placeholder="Type here" {...register("photoURL", {required: true})}  />
                            {errors.photoURL && <span className="text-sm font-bold text-red-600">PhotoURL is required</span>}
                    </div>
                    <div className="space-y-2">
                            <label className="text-base font-semibold text-[#444444]">Email</label>
                            <input type="email" name="email" className="border-2 border-gray-300 rounded-md p-2 w-full text-base text-[#A1A1A1]" placeholder="Type here" {...register("email", 
                            {required: true, 
                            pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/ })} />
                            {errors.email && <span className="text-sm font-bold text-red-600">Email is required and should be valid (no uppercase)</span>}


                    </div>
                    <div className="space-y-2">
                            <label className="text-base font-semibold text-[#444444]">Password</label>
                            <input type="password" name="password" className="border-2 border-gray-300 rounded-md p-2 text-base text-[#A1A1A1] w-full" {...register("password", {required: true, minLength: 6,
                            maxLength: 20,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })}   placeholder="Enter your password"/>
                            {errors.password?.type === 'required' && <span className="text-sm font-bold text-red-600">password is required</span>}
                            {errors.password?.type === 'minLength' && <span className="text-sm font-bold text-red-600">Password must be  6 characters or longer</span>}
                            {errors.password?.type === 'maxLength' && <span className="text-sm font-bold text-red-600">Password less then 20 characters</span>}
                            {errors.password?.type === 'pattern' && <span className="text-sm font-bold text-red-600">Password must be one uppercase, one lowercase, one number and one special characters</span>}

                    </div>
                    <div className="w-full my-4">
                    <button
              className="text-center px-7 pt-3 w-full pb-2 relative rounded-lg group font-bold overflow-hidden border-b-4 border-[#D1A054] text-white bg-[#D1A054] inline-block uppercase"
            >
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full"></span>
              <span className="relative group-hover:text-[#D1A054]">
                 Sign Up
              </span>
            </button>
                    </div>
                    {/* new user */}
                    <p className="text-[#D1A054] font-medium text-base text-center"><small>Already registered?</small> <Link to={'/login'}>Go to Log in</Link></p>
                </form>
                {/* facebook, google, github */}
                <div className="my-5 text-center">
                    <p className="text-base font-bold text-[#444444]">Or sign in with</p>
                    <div className="flex justify-center items-center gap-8 mt-3">
                        <button className="rounded-full p-3 border-2 border-[#D1A054] text-[#151515] text-xl hover:bg-[#D1A054] hover:text-white duration-300">
                            <FaFacebookF></FaFacebookF>
                        </button>
                        <button className="rounded-full p-3 border-2 border-[#D1A054] text-[#151515] text-xl hover:bg-[#D1A054] hover:text-white duration-300">
                            <FaGithubSquare/>
                        </button>
                        <button onClick={handleGoogleSignIn} className="rounded-full p-3 border-2 border-[#D1A054] text-[#151515] text-xl hover:bg-[#D1A054] hover:text-white duration-300">
                            <FaGoogle/>
                        </button>
                    </div>
                </div>
                </div>

                <div className="flex justify-center items-center col-span-2">
                    <img src={signUpImage} alt="" />
                </div>
                
                </div>
                </div>
                
            </div>
        </div>
    );
};

export default SignUp;