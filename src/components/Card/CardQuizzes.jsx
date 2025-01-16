import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Ellipsis, Play, SquarePen, Trash2 } from "lucide-react";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // State untuk peran admin
  const [PopupEditDeleteQuiz, setPopupEditDeleteQuiz] = useState(null);
  const popupRef = useRef(null);
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

    // Fetch informasi pengguna (misal, dari API)
    axios
      .get(`${apiUrl}/roles`)
      .then((response) => {
        console.log("Full API Response:", response); // Log response untuk memeriksa struktur
        if (response.data && Array.isArray(response.data.roles)) {
          const userRole = response.data.roles.find((role) => role.id === 1); // Menemukan role dengan id 1 (Admin)
          if (userRole) {
            console.log("User Role Found:", userRole); // Log user role yang ditemukan
            setIsAdmin(true); // Jika peran ditemukan dan id-nya sesuai, set admin
          } else {
            console.error("Role Admin tidak ditemukan.");
            setIsAdmin(false); // Jika tidak ada role admin, set bukan admin
          }
        } else {
          console.error("Role data is missing or invalid");
        }
      })
      .catch((error) => {
        console.error("Gagal Mendapatkan Peran Pengguna", error);
      });
  }, []);

  const handleCardClick = (quizId) => {
    navigate(`/Quiz/${quizId}`);
  };

  const handleEllipsisClick = (quizId) => {
    setPopupEditDeleteQuiz(quizId);
  };

  const handlePopupClose = () => {
    setPopupEditDeleteQuiz(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handlePopupClose();
      }
    };

    if (PopupEditDeleteQuiz !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [PopupEditDeleteQuiz]);

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
          {/* {isAdmin && ( // Hanya admin yang bisa melihat ikon Ellipsis */}
            <div
              className="bg-Tertiary absolute top-2 right-2 p-1 rounded-md cursor-pointer"
              onClick={() => handleEllipsisClick(quiz.id)}
            >
              <Ellipsis className="text-primary" />
            </div>
          {/* )} */}
          {PopupEditDeleteQuiz === quiz.id &&
            // isAdmin && ( // Popup hanya untuk admin
              <div
                ref={popupRef}
                className="popup-container absolute top-3 right-2 mt-2 w-42 bg-white border border-[#D9D9D9] rounded-md shadow-md"
              >
                <ul className="">
                  <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                    <Trash2 className="text-primary" />
                    <span className="text-sm text-primary">Delete</span>
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                    <SquarePen className="text-primary" />
                    <span className="text-sm text-primary">
                      Edit Quiz Title
                    </span>
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                    <SquarePen className="text-primary" />
                    <span className="text-sm text-primary">
                      Edit Quiz Question
                    </span>
                  </li>
                </ul>
              </div>
            // )
            }
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
