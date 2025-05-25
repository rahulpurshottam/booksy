import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    
    try {
      const response = await axios.post(backendurl+ "/user/signup", userInfo);
      
      if (response.data) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        toast.success("Signup Successful!");
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(`Error: ${errorMessage}`);
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="w-[600px]">
          <div className="bg-gray-800 p-8 rounded-md shadow-lg text-white relative">
            {/* Close Button */}
            <Link
              to="/"
              className="absolute top-4 right-4 text-white bg-gray-700 hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-lg"
            >
              ✕
            </Link>
            
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              <h3 className="text-2xl font-bold mb-6 text-center">Signup</h3>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  {...register("fullname", { required: true })}
                />
                {errors.fullname && (
                  <p className="text-sm text-red-400 mt-1">This field is required</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  {...register("email", { 
                    required: true,
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.email.message || "This field is required"}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  {...register("password", { 
                    required: true,
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.password.message || "This field is required"}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button 
                  type="submit"
                  className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
                >
                  Signup
                </button>
                <p className="text-xl">
                  Have account?{" "}
                  <Link
                    to="/?openLogin=true"
                    className="underline text-blue-500 cursor-pointer"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
