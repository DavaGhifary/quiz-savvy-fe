import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ellipsis, Play, SquarePen, Trash2 } from "lucide-react";
import { getSession } from "../../utils/session";
import ModalEditTitle from "../Modal/ModalEditTitle";
import { showToast } from "../ToastNotification";

const CardMyQuizz = () => {
  const [popupEditDeleteQuiz, setPopupEditDeleteQuiz] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [quizToEdit, setQuizToEdit] = useState(null);
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMyQuiz = async () => {
      try {
        const userDetails = getSession("userDetails");
        const createdBy = userDetails.id;
        const response = await fetch(`${apiUrl}/myQuiz?createdBy=${createdBy}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };

    fetchMyQuiz();
  }, [apiUrl]);

  const handleCardClick = (quizId) => {
    navigate(`/Quiz/${quizId}`);
  };

  const handleEllipsisClick = (quizId) => {
    setPopupEditDeleteQuiz(quizId);
  };

  const handlePopupClose = () => {
    setPopupEditDeleteQuiz(null);
  };

  const handleEditQuizTitle = (quiz) => {
    setQuizToEdit(quiz);
    setEditModalOpen(true);
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      const response = await fetch(`${apiUrl}/quiz/${quizId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete quiz");
      }

      // Remove the deleted quiz from the state
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.id !== quizId)
      );
      showToast("success", "Quiz Deleted successfully!");

      setPopupEditDeleteQuiz(null); // Close the popup
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const closeModal = () => {
    setEditModalOpen(false);
    setQuizToEdit(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handlePopupClose();
      }
    };

    if (popupEditDeleteQuiz !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupEditDeleteQuiz]);

  return (
    <>
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
            <div
              className="bg-Tertiary absolute top-2 right-2 p-1 rounded-md cursor-pointer"
              onClick={() => handleEllipsisClick(quiz.id)}
            >
              <Ellipsis className="text-primary" />
            </div>

            {popupEditDeleteQuiz === quiz.id && (
              <div
                ref={popupRef}
                className="popup-container absolute top-3 right-2 mt-2 w-42 bg-white border border-[#D9D9D9] rounded-md shadow-md"
              >
                <ul>
                  <li
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                    onClick={() => handleDeleteQuiz(quiz.id)}
                  >
                    <Trash2 className="text-primary" />
                    <span className="text-sm text-primary">Delete</span>
                  </li>
                  <li
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                    onClick={() => handleEditQuizTitle(quiz)}
                  >
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
            )}

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

      {editModalOpen && (
        <ModalEditTitle
          isOpen={editModalOpen}
          closeModal={() => setEditModalOpen(false)}
          initialData={quizToEdit}
          quizId={quizToEdit?.id}
        />
      )}
    </>
  );
};

export default CardMyQuizz;
