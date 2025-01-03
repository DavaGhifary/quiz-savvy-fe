import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoGoogle from "../../assets/img/logoGoogle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "../ToastNotification";
import { setSession } from "../../utils/session";

const SignIn = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {

    const apiUrl = import.meta.env.VITE_API_URL;


    e.preventDefault();
    setErrorMessage("");

    if (!formData.email || !formData.password) {
      setErrorMessage("Email and password are required.");
      showToast("error", "Email and password are required.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/login`,
        formData
      );

      // Check if token and user are present in the response
      const { token, user } = response.data;
      if (!token || !user) {
        throw new Error("Login failed: Invalid response data.");
      }

      // Set session with 24 hours expiration
      setSession("authToken", token, 24);
      setSession("userDetails", user, 24);

      // Show success toast
      showToast("success", "Login successful!");
      navigate("/Dashboard");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred. Please try again.";
      setErrorMessage(errorMsg);
      showToast("error", errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
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
          <span
            onClick={() => {
              onClose();
              onSwitchToSignUp();
            }}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mt-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            />
          </div>

          {/* Password Input with Toggle */}
          <div className="mt-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-3 text-gray-500 cursor-pointer"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </span>
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
            {isLoading ? "Signing In..." : "Sign In"}
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

export default SignIn;
