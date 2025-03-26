import React, { useState } from "react";
import axios from "axios";
import { showToast } from "../ToastNotification";

const ModalAddCategory = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ category_name: "" }); 

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category_name.trim()) {
      showToast("error","Nama category tidak boleh kosong!");
      return;
    }

    try {
      await axios.post(`${apiUrl}/categories`, { category_name: formData.category_name });
      showToast("success", "Category added successfully!");
      setFormData({ category_name: "" }); 
      onClose();
    } catch (error) {
      console.error("Error adding category:", error.response?.data || error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-start mt-8 z-50">
      <div className="bg-white border border-secondary p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          Add New Category
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name Category
            </label>
            <input
              type="text"
              name="category_name" 
              value={formData.category_name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg"
              placeholder="Enter name category"
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddCategory;
