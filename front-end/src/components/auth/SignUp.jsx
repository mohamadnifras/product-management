import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { signUp } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; // Added Link
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

  const handleSubmit = async (values) => {
    try {
      const response = await dispatch(signUp(values)).unwrap();
      toast.success(response?.message || "Registered Successfully");
      navigate("/signin");
    } catch (error) {
      console.log(error, "error");
      toast.error(error || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#FFFFFF] font-display">
      {/* Left Section (Desktop only) */}
      <div className="hidden md:flex md:w-1/2 bg-[url('/signup.png')] bg-cover bg-no-repeat flex-col justify-center items-center text-white p-8">
        <div className="flex flex-col items-center text-center space-y-6 p-10">
          <h1 className="text-[40px] md:text-[50px] font-bold">Welcome Back!</h1>
          <p className="text-[16px] md:text-[20px] text-gray-200 font-mono">
            To keep connected with us please <br />
            login with your personal info
          </p>
          <button
            onClick={() => navigate("/signin")}
            className="px-8 md:px-10 py-3 rounded-full border border-white text-white hover:bg-white hover:text-[#04364A] transition"
          >
            SIGN IN
          </button>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6 md:mb-8">
          Create Account
        </h1>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-sm flex flex-col space-y-4">
              {/* Name */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
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
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
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
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
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

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-yellow-500 text-white py-3 w-[200px] rounded-full hover:bg-yellow-600 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Signing Up..." : "SIGN UP"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {/* Mobile: Already have an account? */}
        <p className="text-sm text-gray-600 mt-4 md:hidden">
          Already have an account?{" "}
          <Link to="/signin" className="text-yellow-500 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default SignUp;
