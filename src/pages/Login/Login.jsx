import { Helmet } from "react-helmet-async";
import loginImage from '../../assets/others/authentication2.png'
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithubSquare, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { LuReplace } from "react-icons/lu";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {

    const axiosPublic = useAxiosPublic();
    const [disabled, setDisabled] = useState(true);
    const {googleAuth, signIn} = useContext(AuthContext);
    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state)


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

    useEffect(() => {
        loadCaptchaEnginge(6);
    } , [])

    const handleLogin = e => {
        e.preventDefault();
        
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const loginInfo = {email, password}
        console.log(loginInfo);

        signIn(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            Toast.fire({
                icon: "success",
                title: "Signed in successfully"
              });
              //   navigate 
              navigate(from, { replace: true });
        }).catch(error => {
            console.log(error);
            Toast.fire({
                icon: "error",
                title: "Unauthorized Users"
              });
              
        }) 
    }
    // google sign in

    const handleGoogleSignIn = () => {
        googleAuth()
        .then(result => {
            const user = result.user;
            console.log(user)
            const userInfo = {
                email: user.email,
                name: user.displayName,
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                const user = res.data;
                console.log(user);
                Toast.fire({
                    icon: "success",
                    title: "Signed in successfully"
                  }); 
                //   navigate 
                navigate(from, { replace: true });            
            })

            
        })
    }


    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)){
            setDisabled(false)
        }else{
            setDisabled(true)

        }
    }

    return (
        <div>
            <Helmet><title>Bistro | Login</title></Helmet>
            <div className="container mx-auto px-4 mt-10">
                <div className="">
                <div className="grid grid-cols-3 shadow-2xl md:w-5/6 w-full mx-auto md:p-8 p-5 items-center">
                <div className="flex justify-center items-center col-span-2">
                    <img src={loginImage} alt="" />
                </div>
                <div className="col-span-1">
                <form onSubmit={handleLogin} className="space-y-3">
                    <h3 className="text-center font-bold text-[#151515] text-3xl pb-4">Login</h3>
                    <div className="space-y-2">
                            <label className="text-base font-semibold text-[#444444]">Email</label>
                            <input type="email" name="email" className="border-2 border-gray-300 rounded-md p-2 w-full text-base text-[#A1A1A1]" placeholder="Type here" />
                    </div>
                    <div className="space-y-2">
                            <label className="text-base font-semibold text-[#444444]">Password</label>
                            <input type="password" name="password" className="border-2 border-gray-300 rounded-md p-2 text-base text-[#A1A1A1] w-full" placeholder="Enter your password" />
                    </div>
                    <div className="space-y-2">
                            <label className="text-base font-semibold text-[#444444]">
                            <LoadCanvasTemplate />
                            </label>
                            <input onBlur={handleValidateCaptcha} type="text" name="captcha" className="border-2 border-gray-300 rounded-md p-2 text-base text-[#A1A1A1] w-full" placeholder="Type the captcha above" />
                    </div>
                    <div className="w-full my-4">
                    <button disabled={disabled}
              className="btn text-center px-7 pt-3 w-full pb-2 relative rounded-lg group font-bold overflow-hidden border-b-4 border-[#D1A054] text-white bg-[#D1A054] inline-block uppercase"
            >
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full"></span>
              <span className="relative group-hover:text-[#D1A054]">
                 Sign In
              </span>
            </button>
                    </div>
                    {/* new user */}
                    <p className="text-[#D1A054] font-medium text-base text-center"><small>New here?</small> <Link to={'/signUp'}>Create a new account</Link></p>
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
                        <button onClick={handleGoogleSignIn} className=" rounded-full p-3 border-2 border-[#D1A054] text-[#151515] text-xl hover:bg-[#D1A054] hover:text-white duration-300">
                            <FaGoogle/>
                        </button>
                    </div>
                </div>
                </div>
                
                </div>
                </div>
                
            </div>
        </div>
    );
};

export default Login;