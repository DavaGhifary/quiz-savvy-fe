import React, { useState, useEffect } from "react";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Checkbox from "../../components/Checbox/Checbox";

const Quiztes = () => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (quizId) {
      console.log("Using quizId:", quizId);
    }
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

      alert("Quiz created successfully!");
    } catch (error) {
      console.error(
        "Error creating quiz:",
        error.response?.data || error.message
      );
      alert("Error creating quiz.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="w-full h-12 flex items-center justify-between fixed top-0 left-0 bg-white border-b px-4 z-10">
        <Link to="/Dashboard">
          <div className="bg-[#D9D9D9] rounded-sm">
            <ChevronLeft />
          </div>
        </Link>
        <button
          className="bg-blue-500 text-sm p-2 rounded-md text-white"
          onClick={handleCreateQuiz}
        >
          Save Quiz
        </button>
      </div>

      {/* Sidebar */}
      <div className="flex">
        <div className="bg-[#F6F6F6] w-[20%] h-screen fixed left-0 top-12 border-r p-4">
          <div className="flex justify-between">
            <p>Questions ({questions.length})</p>
            <button
              className="bg-white p-1 rounded-full cursor-pointer"
              onClick={handleAddQuestion}
            >
              <Plus />
            </button>
          </div>
          <div className="mt-4">
            {questions.map((question) => (
              <div
                key={question.id}
                className="w-full h-20 border border-[#D9D9D9] rounded-lg mb-2 p-2 flex items-center justify-between"
              >
                <p>{question.title}</p>
                <Trash2
                  className="text-red-600 cursor-pointer"
                  onClick={() => handleDeleteQuestion(question.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-[20%] mt-12 p-6 w-full">
          {questions.map((question) => (
            <div key={question.id} className="mb-6">
              <div className="border p-4 rounded-md">
                {/* Input for Question Content */}
                <div className="flex flex-col">
                  <textarea
                    className={`bg-[#D9D9D9] w-full border p-2 mb-1 rounded-md ${
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
                            ? { ...q, content: e.target.value }
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
                {/* Input for Time Estimate */}
                <div className="flex items-center gap-2 mt-2">
                  <label htmlFor={`time-${question.id}`} className="text-sm">
                    Time Estimate (minutes):
                  </label>
                  <input
                    id={`time-${question.id}`}
                    type="number"
                    min="1"
                    className="bg-[#D9D9D9] border p-2 rounded-md w-20"
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
                </div>

                {/* Inputs for Answers */}
                {question.answers.map((answer, index) => (
                  <div
                    className="flex items-center gap-4 mb-2 mt-2"
                    key={index}
                  >
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
                    <Trash2
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleRemoveAnswer(question.id, index)}
                    />
                  </div>
                ))}
                {isSubmitting &&
                  !question.answers.every((a) => a.jawaban_pilihan.trim()) && (
                    <p className="text-red-500 text-sm">
                      All answer fields are required.
                    </p>
                  )}
                {question.answers.length < 4 && (
                  <button
                    className="mt-2 flex items-center gap-2 text-blue-600"
                    onClick={() => handleAddAnswer(question.id)}
                  >
                    <Plus /> Add Answer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiztes;
