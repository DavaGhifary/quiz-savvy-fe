import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "../ToastNotification";

const ModalAddUsers = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_id: "",
  });
  const [errors, setErrors] = useState({}); 

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/roles`);
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, [apiUrl]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Hapus error saat input diubah
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi.";
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi.";
    if (!formData.password.trim()) newErrors.password = "Password wajib diisi.";
    if (formData.password.length < 8)
      newErrors.password = "Password harus minimal 8 karakter.";
    if (!formData.role_id) newErrors.role_id = "Pilih peran (role).";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      nama: formData.name, 
      email: formData.email,
      password: formData.password,
      roles_id: Number(formData.role_id),
    };

    try {
      await axios.post(`${apiUrl}/users`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      showToast("success", "Users added successfully!");
      setFormData({ name: "", email: "", password: "", role_id: "" }); 
      setErrors({}); 
      onClose();
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error adding user:", error.response?.data || error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-start mt-8 z-50">
      <div className="bg-white border border-secondary p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          Add New User
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border rounded-lg ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border rounded-lg ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border rounded-lg ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter password"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-8 text-gray-500 cursor-pointer"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role_id"
              value={formData.role_id}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border rounded-lg ${
                errors.role_id ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.nama}
                </option>
              ))}
            </select>
            {errors.role_id && (
              <p className="text-red-500 text-sm">{errors.role_id}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-secondary text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddUsers;
