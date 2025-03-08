import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

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
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Password baru"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Konfirmasi password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ResetPassword;
