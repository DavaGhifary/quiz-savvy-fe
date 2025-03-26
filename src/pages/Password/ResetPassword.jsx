import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { KeyRound } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const location = useLocation(); // Ambil lokasi URL

  // Ambil token dari query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password tidak cocok!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/reset-password",
        {
          token,
          password,
          password_confirmation: confirmPassword,
        }
      );
      setMessage(response.data.message);

      // Redirect ke halaman utama setelah berhasil reset password
      setTimeout(() => {
        navigate("/");
      }, 2000); // Delay 2 detik agar user bisa membaca pesan sukses
    } catch (error) {
      console.log(error);
      setMessage("Gagal reset password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="w-12 flex justify-center items-center mx-auto mb-8">
          <div className="bg-primary bg-opacity-40 p-4 rounded-full">
            <KeyRound className="text-primary" size={32} />
          </div>
        </div>
        <p className="text-center pb-8 text-xl font-semibold">Reset your password</p>
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="w-80 mb-4">
              <input
                className="w-full border-2 border-gray-300 px-2 py-2 rounded-md focus:outline-primary text-primary"
                type="password"
                placeholder="Password baru"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="w-80 mb-4">
              <input
                className="w-full border-2 border-gray-300 px-2 py-2 rounded-md focus:outline-primary text-primary"
                type="password"
                placeholder="Konfirmasi password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="w-80 bg-primary text-white font-medium py-2 rounded-md"
              type="submit"
            >
              Reset Password
            </button>
            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
