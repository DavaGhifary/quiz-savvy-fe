import React, { useEffect, useState } from "react";
import axios from "axios";
import { showToast } from "../ToastNotification";

const ModalEditRoles = ({ isOpen, onClose, role }) => {
  const [formData, setFormData] = useState({ nama: "" });

  const apiUrl = import.meta.env.VITE_API_URL;

  // Update form saat role berubah
  useEffect(() => {
    if (role) {
      setFormData({ nama: role.nama || "" });
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!formData.nama.trim()) {
      showToast("error", "Nama role tidak boleh kosong!");
      return;
    }

    try {
      await axios.put(`${apiUrl}/roles/${role.id}`, { nama: formData.nama });
      showToast("success", "Role updated successfully!");
      onClose(); // Tutup modal setelah edit berhasil
    } catch (error) {
      console.error("Error updating role:", error.response?.data || error);
      showToast("error", "Failed to update role!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-start mt-8 z-50">
      <div className="bg-white border border-secondary p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Edit Roles</h2>
        <form onSubmit={handleEdit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name Roles
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg"
              placeholder="Enter role name"
              required
            />
          </div>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditRoles;
