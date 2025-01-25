import React, { useState, useEffect } from "react";
import axios from "axios";
import { Play } from "lucide-react";

const QuizList = () => {
  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch categories
  useEffect(() => {
    axios
      .get(`${apiUrl}/categories`)
      .then((response) => {
        setCategories(response.data); // Store categories
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Something went wrong");
        setLoading(false);
      });
  }, []);

  // Fetch quizzes based on selected category
  useEffect(() => {
    if (!selectedCategory) {
      setQuizzes([]); // Clear quizzes if no category is selected
      return;
    }

    setLoading(true);
    axios
      .get(`${apiUrl}/quiz-categories`, {
        params: { category_id: selectedCategory }, // Correctly send category_id as a query parameter
      })
      .then((response) => {
        setQuizzes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Something went wrong");
        setLoading(false);
      });
  }, [selectedCategory]);

  // Handle card click for quiz
  const handleCardClick = (quizId) => {
    console.log(`Quiz ID clicked: ${quizId}`);
    // Implement the functionality to handle quiz click (e.g., redirect, open modal, etc.)
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Filter by Category:
        </label>
        <select
          id="category"
          className="mt-1 block w-full border-gray-300 rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      {/* Quiz Cards */}
      <div className="flex flex-wrap gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.category_id}
            className="block relative bg-white w-[14.5rem] h-[21rem] rounded-lg p-4 shadow-sm shadow-indigo-100"
          >
            <img
              src={quiz.gambar}
              className="h-56 w-full rounded-md object-cover"
              alt={quiz.title}
            />
            <div className="mt-2">
              <div className="font-medium">{quiz.title}</div>
              <div className="text-xs text-gray-500">{quiz.description}</div>
              <div className="flex justify-end p-1">
                <div
                  className="bg-primary p-1 rounded-full cursor-pointer"
                  onClick={() => handleCardClick(quiz.id)}
                >
                  <Play className="text-white p-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
