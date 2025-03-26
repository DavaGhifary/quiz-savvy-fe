import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import axios from "axios";
import ModalEnterCodeCard from "../Modal/ModalEnterCodeCard";

function QuizList({ searchTerm }) {
  const [quizzes, setQuizzes] = useState([]);
  const [isEnterCodeModalOpen, setIsEnterCodeModalOpen] = useState(false);
  const navigate = useNavigate();
  const closeEnterCodeModal = () => setIsEnterCodeModalOpen(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/quiz`)
      .then((response) => response.json())
      .then((data) => {
        setQuizzes(data);
      })
      .catch((error) => {
        console.error("Gagal Get Data Quiz", error);
      });
  }, []);

  const handleCardClick = async (quizId) => {
    const response = await axios.get(`${apiUrl}/quiz/${quizId}`);
    const isPrivate = response.data.is_private;

    if (isPrivate === 1) {
      setIsEnterCodeModalOpen(true);
    } else {
      navigate(`/Quiz/${quizId}`);
    }
  };

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      quiz.title &&
      quiz.title.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );

  const handleEnterCodeSubmit = async (code) => {
    if (!code || code.length !== 6) {
      alert("Please enter a valid 6-digit code");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/quiz/check-code`, { code });


      if (response.data.quiz.id) {
        const quizId = response.data.quiz.id;
        navigate(`/Quiz/${quizId}`);
      } else {
        alert("Invalid response from server");
      }
    } catch (error) {
      console.error("Error Response:", error.response?.data || "Invalid code");
      alert(error.response?.data?.message || "Invalid code");
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {filteredQuizzes.length > 0 ? (
        filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
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
        ))
      ) : (
        <p className="text-gray-500">No quizzes found.</p>
      )}
      <ModalEnterCodeCard
        isOpen={isEnterCodeModalOpen}
        closeModal={closeEnterCodeModal}
        onSubmit={handleEnterCodeSubmit}
      />
    </div>
  );
}

export default QuizList;
