import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "../ToastNotification";

const ModalEditUsers = ({ isOpen, onClose, user }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    name: user?.nama || "",
    email: user?.email || "",
    password: user?.password || "",
    role_id: user?.roles_id || "",
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

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.nama,
        email: user.email,
        password: user.password, 
        role_id: user.roles_id,
      });
    }
  }, [user]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi.";
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi.";
    if (formData.password && formData.password.length < 8)
      newErrors.password = "Password harus minimal 8 karakter.";
    if (!formData.role_id) newErrors.role_id = "Pilih peran (role).";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      nama: formData.name,
      email: formData.email,
      roles_id: Number(formData.role_id),
    };

    if (formData.password) {
      payload.password = formData.password;
    }

    try {
      await axios.put(`${apiUrl}/users/${user.id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      showToast("success", "User updated successfully!");
      onClose();
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error updating user:", error.response?.data || error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-start mt-8 z-50">
      <div className="bg-white border border-secondary p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
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
            <label className="block text-sm font-medium text-gray-700">Email</label>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 p-2 w-full border rounded-lg ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Enter new password (optional)"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute right-3 top-4 cursor-pointer text-gray-400"
                onClick={togglePasswordVisibility}
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Role Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Role</label>
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
            {errors.role_id && <p className="text-red-500 text-sm">{errors.role_id}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg mr-2">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-secondary text-white rounded-lg">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditUsers;
