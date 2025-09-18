import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { signUp } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleSubmit = async (values) => {
  //   try {
  //     await dispatch(signUp(values))
  //       .unwrap()
  //       .then((response) => {
  //         navigate("/signin");
  //         toast.success(response?.data?.message || "Registered Successfully");
  //       });
  //   } catch (error) {
  //     toast.error(error.data?.message);
  //   }
  // };
const handleSubmit = async (values) => {
  try {
    const response = await dispatch(signUp(values)).unwrap();

    toast.success(response?.message || "Registered Successfully"); // ✅ use message
    navigate("/signin");
  } catch (error) {
    console.log(error,"error")
    toast.error(error || "Something went wrong"); // ✅ error.message works
  }
};

 
  return (
    <div className="flex h-screen bg-[#FFFFFF] font-display">
      <div className="hidden md:flex md:w-1/2 bg-[url('/signup.png')] bg-cover bg-no-repeat  flex-col justify-center items-center text-white p-8">
        <div className="flex flex-col items-center text-center text-white space-y-6 p-10">
          <h1 className="text-[50px] font-bold">Welcome Back!</h1>

          <p className="text-[20px] text-gray-200 font-mono">
            To keep connected with us please <br />
            login with your personal info
          </p>

          <button
            onClick={() => navigate("/signin")}
            className="px-10 py-3 rounded-full border border-white text-white hover:bg-white hover:text-[#04364A] transition"
          >
            SIGN IN
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/1 flex flex-col justify-center items-center p-8 bg-[#FFFFFF]">
        <h1 className="text-3xl font-bold text-yellow-500 mb-8">
          Create Account
        </h1>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-80 flex flex-col space-y-4">
              {/* Name */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-[20px]">
                  <FiUser />
                </span>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full pl-10 px-4 py-3 bg-gray-100 rounded focus:outline-none"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

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
              {/* Error Message */}

              {/* Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-yellow-500 text-white py-3 w-[200px]  rounded-full hover:bg-yellow-600 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Signing Up..." : "SIGN UP"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default SignUp;
