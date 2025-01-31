import {
  ChevronLeft,
  CircleHelp,
  Ellipsis,
  Plus,
  Settings,
  Trash2,
  Clock,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Checkbox from "../../components/Checbox/Checbox";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ModalCategory from "../../components/Modal/ModalCategory";
import { showToast } from "../../components/ToastNotification";

const CreateQuiz = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "Question 1",
      content: "",
      timeEstimate: 1,
      answers: [
        { jawaban_pilihan: "", jawaban_valid: true },
        { jawaban_pilihan: "", jawaban_valid: true },
      ],
    },
  ]);

  const questionRefs = useRef({}); 

  const handleScrollToQuestion = (questionId) => {
    const questionElement = questionRefs.current[questionId];
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handlePopupToggle = (questionId, event) => {
    event.stopPropagation(); 
    setShowPopup((prev) => (prev === questionId ? null : questionId));
  };

  const handlePageClick = () => {
    setShowPopup(null); 
  };

  useEffect(() => {
    if (quizId) {
      console.log("Using quizId:", quizId);
    }

    document.addEventListener("click", handlePageClick);
    return () => {
      document.removeEventListener("click", handlePageClick);
    };
  }, [quizId]);

  const handleAddQuestion = () => {
    const newQuestionId =
      questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    setQuestions((prev) => [
      ...prev,
      {
        id: newQuestionId,
        title: `Question ${newQuestionId}`,
        content: "",
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
    setQuestions((prev) =>
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
    setQuestions((prev) =>
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
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, answers: q.answers.filter((_, i) => i !== index) }
          : q
      )
    );
  };

  const handleCreateQuiz = async () => {
    setIsSubmitting(true);

    for (const question of questions) {
      if (!question.content.trim()) {
        return;
      }

      for (const answer of question.answers) {
        if (!answer.jawaban_pilihan.trim()) {
          return;
        }
      }
    }

    try {
      if (!quizId) {
        console.error("Quiz ID is missing.");
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL;
      const currentQuizId = quizId;

      for (const question of questions) {
        const questionPayload = {
          quiz_id: currentQuizId,
          question_text: question.content.trim(),
          question_type: "multiple_choice",
        };

        const questionResponse = await axios.post(
          `${apiUrl}/questions`,
          questionPayload
        );

        const newQuestionId =
          questionResponse.data?.id || questionResponse.data?.question?.id;

        if (!newQuestionId) {
          console.error("Failed to save question:", questionResponse.data);
          throw new Error(`Failed to save question: ${question.title}`);
        }

        for (const answer of question.answers) {
          const answerPayload = {
            question_id: newQuestionId,
            jawaban_pilihan: answer.jawaban_pilihan.trim(),
            jawaban_valid: answer.jawaban_valid,
          };
          await axios.post(`${apiUrl}/answers`, answerPayload);
        }
      }

      saveTimeEstimateToLocalStorage();

      showToast("success", "Quiz created successfully!");
      setIsModalOpen(true);
    } catch (error) {
      console.error(
        "Error creating quiz:",
        error.response?.data || error.message
      );
      showToast("error", "Error creating quiz.");
    }
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
        <Link to="/Dashboard">
          <div className="bg-[#D9D9D9] rounded-sm">
            <ChevronLeft />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <button
            className="bg-blue-500 text-sm p-2 rounded-md text-white"
            onClick={handleCreateQuiz}
          >
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
              <p>Question ({questions.length})</p>
              <div
                className="bg-white p-1 rounded-full cursor-pointer"
                onClick={handleAddQuestion}
              >
                <Plus />
              </div>
            </div>
            <div className="mt-3">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className="w-full h-20 border border-[#D9D9D9] rounded-lg mb-2 cursor-pointer"
                  onClick={() => handleScrollToQuestion(question.id)}
                >
                  <div className="h-8 flex items-center mt-1">
                    <div className="bg-[#E4E4E7] w-6 h-6 flex items-center justify-center rounded-full m-2">
                      <p>{question.id}</p>
                    </div>
                    <div>
                      <p className="truncate w-[150px]">{question.title}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 mr-3 relative">
                    <Ellipsis
                      onClick={(event) => handlePopupToggle(question.id, event)} // Meneruskan event untuk menghentikan propagasi
                    />
                    {showPopup === question.id && (
                      <div className="popup-container absolute top-full right-0 mt-2 w-32 bg-white border border-[#D9D9D9] rounded-md shadow-md">
                        <ul className="p-2">
                          <li
                            onClick={() => handleDeleteQuestion(question.id)} // Menangani penghapusan pertanyaan
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
          {questions.map((question) => (
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
                      isSubmitting && !question.content.trim()
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Input Question"
                    value={question.content}
                    onChange={(e) =>
                      setQuestions((prev) =>
                        prev.map((q) =>
                          q.id === question.id
                            ? {
                                ...q,
                                content: e.target.value,
                                title: e.target.value || `Question ${q.id}`,
                              }
                            : q
                        )
                      )
                    }
                  />
                  {isSubmitting && !question.content.trim() && (
                    <p className="text-red-500 text-sm">
                      Question content is required.
                    </p>
                  )}
                </div>
              </div>
              <div className="mx-3 mt-4 border-b pb-2">
                {question.answers.map((answer, index) => (
                  <div
                    className="flex gap-3 items-center mt-2"
                    key={`${question.id}-${index}`}
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
                        setQuestions((prev) =>
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

export default CreateQuiz;
