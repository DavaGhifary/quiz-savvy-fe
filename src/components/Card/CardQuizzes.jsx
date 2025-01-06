import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CardQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL; // Base URL dari backend
        const response = await axios.get(`${apiUrl}/quiz`);
        console.log("API Response:", response.data); // Debugging response
        setQuizzes(response.data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError(err.response?.data?.message || "Failed to load quizzes.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleCardClick = (quizId) => {
    navigate(`/Quiz/${quizId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-wrap gap-4">
      {quizzes.map((quiz) => {
        const imageUrl = quiz.gambar
          ? `http://localhost:8000/storage/images/quizzes${quiz.gambar}`
          : "/Group 13.png";
        console.log(imageUrl); // Debugging gambar path

        return (
          <div
            key={quiz.id}
            className="block bg-white w-[14.5rem] h-[21rem] rounded-lg p-4 shadow-sm shadow-indigo-100"
            onClick={() => handleCardClick(quiz.id)}
          >
            <img
              src={imageUrl}
              className="h-56 w-full rounded-md object-cover"
              alt={quiz.title}
            />
            <div className="mt-2">
              <div className="font-medium">{quiz.title}</div>
              <div className="text-xs text-gray-500">{quiz.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardQuizzes;
