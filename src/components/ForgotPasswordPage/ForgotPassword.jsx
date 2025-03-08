import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoGoogle from "../../assets/img/logoGoogle.png";
import { showToast } from "../ToastNotification";
import { setSession } from "../../utils/session";

const ForgotPassword = ({ isOpen, onClose, onSwitchToSignIn }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!isOpen) return null;

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/forgot-password`, { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Email not found");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-start">
      <div
        className="bg-white p-6 py-9 rounded-xl w-full max-w-xs h-auto relative shadow-2xl mt-[3.5rem] mr-[3.5rem]"
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
        <h2 className="text-center text-2xl font-semibold">Forgot Password?</h2>
        <p className="text-left text-gray-500 mt-2 mx-3">
          Please enter the email you use to sign in, or back to
          <span
            onClick={() => {
              onClose();
              onSwitchToSignIn();
            }}
            className="text-blue-500 cursor-pointer hover:underline pl-1"
          >
            Sign In
          </span>
        </p>

        <form onSubmit={handleSubmitEmail}>
          {/* Email Input */}
          <div className="mt-4">
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            className={`w-full py-3 mt-4 text-white bg-blue-500 rounded-full ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            } focus:outline-none`}
            disabled={isLoading}
          >
            {isLoading ? "Request reset link..." : "Request reset link"}
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
          <img src={LogoGoogle} alt="Google Icon" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
