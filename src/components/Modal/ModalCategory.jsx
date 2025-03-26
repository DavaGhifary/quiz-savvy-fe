import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModalCode from "../../components/Modal/ModalCode";

const ModalCategory = ({ isOpen, onClose, quizId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const storeQuiz = localStorage.getItem("createdQuizzes");
  const dataQuiz = storeQuiz ? JSON.parse(storeQuiz) : [];
  const kodeQuiz = dataQuiz[0].code;

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`${apiUrl}/categories`)
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the categories!", error);
        });
    }
  }, [isOpen, apiUrl]);

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = () => {
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }

    console.log("Sending data to API...");
    console.log({
      quiz_id: quizId,
      category_id: selectedCategory,
    });

    axios
      .post(`${apiUrl}/quiz-categories`, {
        quiz_id: quizId,
        category_id: selectedCategory,
      })
      .then((response) => {
        console.log("Category submitted successfully:", response.data);
        if (!kodeQuiz) {
          onClose();
          navigate("/Dashboard");
        } else {
          setIsModalOpen(true);
        }
      })
      .catch((error) => {
        console.error(
          "There was an error submitting the category:",
          error.response
        );
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Select Category</h2>
        <select
          value={selectedCategory}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
      <ModalCode isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  ) : null;
};

export default ModalCategory;
