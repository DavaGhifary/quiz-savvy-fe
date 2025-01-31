import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ChevronsUpDown, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuizList = () => {
  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [quizCategoriesMap, setQuizCategoriesMap] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/categories`)
      .then(response => setCategories(response.data))
      .catch(error => setError(error.message || "Something went wrong"));
  }, []);

  useEffect(() => {
    axios.get(`${apiUrl}/quiz`)
      .then(response => setQuizzes(response.data))
      .catch(error => setError(error.message || "Something went wrong"));
  }, []);

  useEffect(() => {
    axios.get(`${apiUrl}/quiz-categories`)
      .then(response => {
        setQuizCategoriesMap(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message || "Something went wrong");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filteredQuizIds = quizCategoriesMap
        .filter(map => map.category_id === parseInt(selectedCategory))
        .map(map => map.quiz_id);

      setFilteredQuizzes(quizzes.filter(quiz => filteredQuizIds.includes(quiz.id)));
    } else {
      setFilteredQuizzes(quizzes);
    }
  }, [selectedCategory, quizCategoriesMap, quizzes]);

  const handleCardClick = (quizId) => {
    navigate(`/Quiz/${quizId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="relative inline-block text-left mb-4" ref={dropdownRef}>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center gap-4 w-full rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          {selectedCategory ? categories.find(cat => cat.id === parseInt(selectedCategory))?.category_name : "Select a Category"}
          <ChevronsUpDown className="text-xs" />
        </button>
        {isOpen && (
          <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => { setSelectedCategory(""); setIsOpen(false); }}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => { setSelectedCategory(category.id.toString()); setIsOpen(false); }}
                >
                  {category.category_name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        {filteredQuizzes.map(quiz => (
          <div
            key={quiz.id}
            className="block relative bg-white w-[14.5rem] h-[21rem] rounded-lg p-4 shadow-sm shadow-indigo-100"
          >
            <img src={quiz.gambar} className="h-56 w-full rounded-md object-cover" alt={quiz.title} />
            <div className="mt-2">
              <div className="font-medium">{quiz.title}</div>
              <div className="text-xs text-gray-500">{quiz.description}</div>
              <div className="flex justify-end p-1">
                <div className="bg-primary p-1 rounded-full cursor-pointer" onClick={() => handleCardClick(quiz.id)}>
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
