import React from "react";
import { useState } from "react";
import LogoGoogle from "../../assets/img/logoGoogle.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignIn = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (!isOpen) return null; 

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div
        className="bg-white p-6 rounded-xl w-full max-w-xs h-[30rem] relative shadow-2xl mt-[3.5rem] mr-[3.5rem]"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title and Switch to Sign Up */}
        <h2 className="text-center text-2xl font-semibold">Sign in</h2>
        <p className="text-center text-gray-500 mt-2">
          Don’t have an account?{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>

        <form>
          {/* Email Input */}
          <div className="mt-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            />
          </div>

          {/* Password Input with Toggle */}
          <div className="mt-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-3 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </span>
          </div>

          {/* Forgot Password Link */}
          <p className="text-right text-sm text-blue-500 hover:underline mt-2">
            Forgot your password?
          </p>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <span className="h-px w-full bg-gray-300"></span>
          <span className="px-2 text-gray-500">OR</span>
          <span className="h-px w-full bg-gray-300"></span>
        </div>

        {/* Google Sign In */}
        <button className="w-full py-3 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100">
          <img
            src={LogoGoogle}
            alt="Google Icon"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
