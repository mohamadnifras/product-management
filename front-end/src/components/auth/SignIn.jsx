import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import {useDispatch,useSelector} from "react-redux"
import {signIn} from "../../redux/authSlice"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const validationSchema = Yup.object().shape({

  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
 

function SignIn() {
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state)=> state.auth)

const handleSubmit = async (values) => {
  console.log("values:", values)
    try {
      await dispatch(signIn(values))
        .unwrap()
        .then((respons) => {
          toast.success(respons.message);
        });
    } catch (error) {
      console.log(error,"error")
      toast.error(error);
    }
  };

  useEffect(()=>{
    if(user){
      navigate("/home")
    }
  },[user,navigate])
  return (
    <div className="flex h-screen bg-[#FFFFFF] font-display">
      <div className="w-1/1 flex flex-col justify-center items-center p-8 bg-[#FFFFFF]">
        <h1 className="text-3xl font-bold text-yellow-500 mb-8">
          Sign In to Your Account
        </h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
         
            <Form className="w-80 flex flex-col space-y-4">
              {/* Email */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-[20px]">
                  <MdOutlineEmail />
                </span>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full pl-10 px-4 py-3 bg-gray-100 rounded focus:outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-[20px]">
                  <GoLock />
                </span>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full pl-10 px-4 py-3 bg-gray-100 rounded focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex justify-center">
                <a href="#" className="underline font-semibold">forgot password?</a>
             </div>

              {/* Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-yellow-500 text-white py-3 w-[200px]  rounded-full hover:bg-yellow-600 transition disabled:opacity-50"
                >
                  SIGN IN
                </button>
              </div>
            </Form>
        
        </Formik>
      </div>
      <div className="hidden md:flex md:w-1/2 bg-[url('/signup.png')] bg-cover bg-no-repeat  flex-col justify-center items-center text-white p-8">
        <div className="flex flex-col items-center text-center text-white space-y-6 p-10">
          <h1 className="text-[50px] font-bold">Hello Friend!</h1>

          <p className="text-[20px] text-gray-200 font-mono">
            Enter your personal details and <br />
            start your journey with us
          </p>

          <button 
          onClick={()=> navigate("/")}
          className="px-10 py-3 rounded-full border border-white text-white hover:bg-white hover:text-[#04364A] transition">
            SIGN UP
          </button>
        </div>
      </div>
       <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default SignIn;
