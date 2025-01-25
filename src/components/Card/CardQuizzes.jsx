import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Ellipsis, Play, SquarePen, Trash2 } from "lucide-react";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch daftar kuis
    fetch(`${apiUrl}/quiz`)
      .then((response) => response.json())
      .then((data) => {
        setQuizzes(data);
      })
      .catch((error) => {
        console.error("Gagal Get Data Quiz", error);
      });
  }, []);

  const handleCardClick = (quizId) => {
    navigate(`/Quiz/${quizId}`);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {quizzes.map((quiz) => (
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
      ))}
    </div>
  );
}

export default QuizList;
