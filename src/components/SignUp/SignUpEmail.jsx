import React, { useState } from "react";
import axios from "axios";
import LogoGoogle from "../../assets/img/logoGoogle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "../ToastNotification";

const SignUpEmail = ({ isOpen, onClose, onSwitchToSignIn }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(""); // Reset error message on input change
  };

  const handleContinue = async () => {
    // Validasi pada setiap langkah
    if (step === 1) {
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }
    }

    if (step === 2) {
      if (!formData.name || formData.name.length < 3) {
        setErrorMessage("Username must be at least 3 characters long.");
        return;
      }
    }

    if (step === 3) {
      if (!formData.password || formData.password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long.");
        return;
      }
    }

    // Jika input valid, lanjut ke langkah berikutnya atau kirim data
    if (step < 3) {
      setErrorMessage(""); // Hapus pesan error jika valid
      setStep(step + 1);
    } else {
      const payload = {
        email: formData.email,
        nama: formData.name,
        password: formData.password,
        password_confirmation: formData.password,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/register`,
          payload
        );
        showToast("success", response.data.message || "Registration successful!");
        setErrorMessage("");
        onClose();
      } catch (error) {
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          if (errorData.errors && typeof errorData.errors === "object") {
            const errorMessages = Object.values(errorData.errors).join(", ");
            setErrorMessage(errorMessages);
            showToast("error", errorMessages);
          } else {
            setErrorMessage(errorData.message || "Unknown error");
            showToast("error", errorData.message || "Unknown error");
          }
        } else {
          setErrorMessage(error.message || "Something went wrong");
          showToast("error", error.message || "Something went wrong");
        }
      }
    }
  };

  const handleClose = () => {
    setStep(1);
    setErrorMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="bg-white p-6 rounded-xl w-full max-w-xs h-[24rem] relative shadow-2xl mt-[3.5rem] mr-[3.5rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={handleClose}
        >
          &times;
        </button>

        <h2 className="text-center text-2xl font-semibold">Sign Up for free</h2>
        <p className="text-center text-gray-500 mt-2">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => {
              handleClose();
              onSwitchToSignIn();
            }}
          >
            Log in
          </span>
        </p>

        <form>
          {step === 1 && (
            <div className="mt-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                required
              />
              {errorMessage && step === 1 && (
                <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="mt-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Your username"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                required
              />
              {errorMessage && step === 2 && (
                <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="mt-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create Your password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                required
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
              {errorMessage && step === 3 && (
                <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={handleContinue}
            className="w-full py-3 mt-4 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none"
          >
            {step < 3 ? "Continue" : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center justify-center my-6">
          <span className="h-px w-full bg-gray-300"></span>
          <span className="px-2 text-gray-500">OR</span>
          <span className="h-px w-full bg-gray-300"></span>
        </div>

        <button className="w-full py-3 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100">
          <img src={LogoGoogle} alt="Google Icon" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignUpEmail;
