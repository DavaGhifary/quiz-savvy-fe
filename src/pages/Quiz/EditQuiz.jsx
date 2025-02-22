import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ModalCategory from "../../components/Modal/ModalCategory";
import { showToast } from "../../components/ToastNotification";
import {
  ChevronLeft,
  CircleHelp,
  Ellipsis,
  Plus,
  Settings,
  Trash2,
  Clock,
} from "lucide-react";
import Checkbox from "../../components/Checbox/Checbox";

const EditQuiz = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "Question 1",
      questions_text: "",
      timeEstimate: 1,
      answers: [
        { jawaban_pilihan: "", jawaban_valid: true },
        { jawaban_pilihan: "", jawaban_valid: true },
      ],
    },
  ]);

  const questionRefs = useRef({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!quizId) return;

    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/questions-with-answers/${quizId}`
        );
        setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [quizId, apiUrl]);

  const handleScrollToQuestion = (questionId) => {
    const questionElement = questionRefs.current[questionId];
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleUpdate = async (question) => {
    try {
      if (!question.id || !quizId) {
        throw new Error("Missing question ID or quiz ID.");
      }

      const payload = {
        quiz_id: quizId,
        question_text: question.question_text || "", // Pastikan tidak null atau undefined
        question_type: question.type || "default_type", // Pastikan memiliki nilai default
      };

      const responseQuestion = await axios.put(
        `${apiUrl}/questions/${question.id}`,
        payload
      );

      const updateAnswers = await Promise.all(
        question.answers.map(async (answer) => {
          if (!answer.id) {
            throw new Error("Missing answer ID.");
          }
          const responseAnswer = await axios.put(
            `${apiUrl}/answers/${answer.id}`,
            {
              question_id: question.id,
              jawaban_pilihan: answer.jawaban_pilihan || "", // Pastikan tidak null atau undefined
              jawaban_valid: answer.jawaban_valid || false, // Pastikan memiliki nilai default
            }
          );
          return responseAnswer.data?.answer || answer;
        })
      );

      setQuizData((prev) =>
        prev.map((q) =>
          q.id === question.id
            ? { ...responseQuestion.data.question, answers: updateAnswers }
            : q
        )
      );
      console.log(quizData);
      showToast("success", "Question and answers updated successfully");
    } catch (error) {
      console.error("Error updating:", error.response?.data);
      showToast("error", "Failed to update data.");
    }
  };

  const handlePopupToggle = (questionId, event) => {
    event.stopPropagation();
    setShowPopup((prev) => (prev === questionId ? null : questionId));
  };

  const handlePageClick = () => {
    setShowPopup(null);
  };

  useEffect(() => {
    document.addEventListener("click", handlePageClick);
    return () => {
      document.removeEventListener("click", handlePageClick);
    };
  }, []);

  const handleAddQuestion = () => {
    const newQuestionId =
      questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    setQuestions((prev) => [
      ...prev,
      {
        id: newQuestionId,
        title: `Question ${newQuestionId}`,
        question_text: "",
        timeEstimate: 1,
        answers: [
          { jawaban_pilihan: "", jawaban_valid: false },
          { jawaban_pilihan: "", jawaban_valid: false },
        ],
      },
    ]);
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== questionId)
    );
  };

  const handleAnswerChange = (questionId, index, field, value) => {
    setQuizData((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map((answer, i) =>
                i === index ? { ...answer, [field]: value } : answer
              ),
            }
          : q
      )
    );
  };

  const handleAddAnswer = (questionId) => {
    setQuizData((prev) =>
      prev.map((q) =>
        q.id === questionId && q.answers.length < 4
          ? {
              ...q,
              answers: [
                ...q.answers,
                { jawaban_pilihan: "", jawaban_valid: false },
              ],
            }
          : q
      )
    );
  };

  const handleRemoveAnswer = (questionId, index) => {
    setQuizData((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, answers: q.answers.filter((_, i) => i !== index) }
          : q
      )
    );
  };

  const saveTimeEstimateToLocalStorage = () => {
    const timeEstimates = questions.map((q) => ({
      id: q.id,
      timeEstimate: q.timeEstimate,
    }));
    localStorage.setItem("timeEstimates", JSON.stringify(timeEstimates));
    console.log("Time estimates saved to localStorage:", timeEstimates);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Header Create Quiz */}
      <div className="w-full h-12 flex items-center justify-between fixed top-0 left-0 bg-white border-b px-4 z-10">
        <Link to="/Dashboard/MyQuiz">
          <div className="bg-[#D9D9D9] rounded-sm">
            <ChevronLeft />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <button className="bg-blue-500 text-sm p-2 rounded-md text-white">
            Create Question
          </button>
          <Settings />
        </div>
      </div>

      {/* Layout Container */}
      <div className="flex">
        {/* Sidebar Create Quiz */}
        <div className="bg-[#F6F6F6] w-[20%] h-screen fixed left-0 top-12 border-r">
          <div className="p-4">
            <div className="flex justify-between">
              <p>Question ({quizData.length})</p>
              <div
                className="bg-white p-1 rounded-full cursor-pointer"
                onClick={handleAddQuestion}
              >
                <Plus />
              </div>
            </div>
            <div className="mt-3">
              {quizData.map((question) => (
                <div
                  key={question.id}
                  className="w-full h-20 border border-[#D9D9D9] rounded-lg mb-2 cursor-pointer"
                  onClick={() => handleScrollToQuestion(question.id)}
                >
                  <div className="h-8 flex items-center mt-1">
                    <div className="bg-[#E4E4E7] w-6 h-6 flex items-center justify-center rounded-full m-2">
                      <p>{question.id}</p>
                    </div>
                    <div className="truncate w-[150px]">
                      <p>{question.question_text}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 mr-3 relative">
                    <Ellipsis
                      onClick={(event) => handlePopupToggle(question.id, event)}
                    />
                    {showPopup === question.id && (
                      <div className="popup-container absolute top-full right-0 mt-2 w-32 bg-white border border-[#D9D9D9] rounded-md shadow-md">
                        <ul className="p-2">
                          <li
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                          >
                            <Trash2 className="text-red-600" />
                            <span className="text-sm text-red-600">Delete</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-[20%] mt-12 p-6 w-full">
          {/* Form Question answer */}
          {quizData.map((question) => (
            <div
              key={question.id}
              ref={(el) => (questionRefs.current[question.id] = el)}
              className="w-full border rounded-md mb-6"
            >
              <div className="h-10 flex items-center justify-end border-b mx-3">
                <div className="flex gap-4">
                  <div>
                    <Ellipsis />
                  </div>
                </div>
              </div>
              <div className="mx-3">
                <div className="flex mt-3 gap-2">
                  <CircleHelp />
                  <p>
                    Question {question.id}
                    <span className="text-red-600">*</span>
                  </p>
                </div>
                <div className="mt-3 flex flex-col mx-9">
                  <textarea
                    className={`bg-[#D9D9D9] w-full h-[5rem] border p-2 mb-1 rounded-md ${
                      isSubmitting && !question.question_text.trim()
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Input Question"
                    value={question.question_text}
                    onChange={(e) =>
                      setQuizData((prev) =>
                        prev.map((q) =>
                          q.id === question.id
                            ? { ...q, question_text: e.target.value }
                            : q
                        )
                      )
                    }
                  />
                  {isSubmitting && !question.question_text.trim() && (
                    <p className="text-red-500 text-sm">
                      Question content is required.
                    </p>
                  )}
                </div>
              </div>
              <div className="mx-3 mt-4 border-b pb-2">
                {question.answers.map((answer, index) => (
                  <div
                    key={`${question.id}-${index}`}
                    className="flex gap-3 items-center mt-2"
                  >
                    <Checkbox
                      isChecked={answer.jawaban_valid}
                      onChange={(e) =>
                        handleAnswerChange(
                          question.id,
                          index,
                          "jawaban_valid",
                          e.target.checked
                        )
                      }
                    />
                    <input
                      type="text"
                      className={`bg-[#D9D9D9] border p-2 flex-1 rounded-md ${
                        isSubmitting && !answer.jawaban_pilihan.trim()
                          ? "border-red-500"
                          : ""
                      }`}
                      placeholder={`Input Answer ${index + 1}`}
                      value={answer.jawaban_pilihan}
                      onChange={(e) =>
                        handleAnswerChange(
                          question.id,
                          index,
                          "jawaban_pilihan",
                          e.target.value
                        )
                      }
                    />
                    <Trash2
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleRemoveAnswer(question.id, index)}
                    />
                  </div>
                ))}
                {isSubmitting &&
                  !question.answers.every((a) => a.jawaban_pilihan.trim()) && (
                    <p className="text-red-500 text-sm ml-9">
                      All answer fields are required.
                    </p>
                  )}
                {question.answers.length < 4 && (
                  <div className="mx-9 my-4">
                    <button
                      className="text-sm flex h-8 items-center gap-2 border border-dashed p-2 rounded-md"
                      onClick={() => handleAddAnswer(question.id)}
                    >
                      <Plus className="w-4" />
                      Add Answer
                    </button>
                  </div>
                )}
              </div>
              <div className="flex gap-6 items-center p-4 rounded-md">
                <div className="flex flex-col">
                  <label
                    htmlFor={`time-${question.id}`}
                    className="text-sm text-gray-600"
                  >
                    Estimation time
                  </label>
                  <div className="bg-gray-300 rounded-md flex items-center gap-2">
                    <input
                      id={`time-${question.id}`}
                      disabled
                      type="number"
                      min="1"
                      className="w-12 bg-gray-300 border border-gray-300 rounded-md text-center text-gray-700 text-sm py-1"
                      value={question.timeEstimate}
                      onChange={(e) =>
                        setQuizData((prev) =>
                          prev.map((q) =>
                            q.id === question.id
                              ? { ...q, timeEstimate: Number(e.target.value) }
                              : q
                          )
                        )
                      }
                    />
                    <span className="text-sm text-gray-600">Mins</span>
                    <div className="rounded-full p-1">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-blue-500 text-sm p-2 rounded-md text-white"
                      onClick={() => handleUpdate(question)}
                    >
                      Create Question
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalCategory
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        quizId={quizId}
      />
    </div>
  );
};

export default EditQuiz;
