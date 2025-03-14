import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";
import { getSession } from "../../utils/session";

const QuestionQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    console.log("Jawban", selectedAnswer);
    axios
      .get(`${apiUrl}/questions-with-answers/${quizId}`)
      .then((response) => {
        console.log("Questions fetced:", response.data);
        setQuestions(response.data);

        const user = getSession("userDetails");
        if (!user) {
          alert("User not found");
          return;
        }

        const recapRequests = response.data.map((question) =>
          axios.post(`${apiUrl}/recap-jawaban`, {
            user_id: user.id,
            quiz_id: quizId,
            question_id: question.id,
            jawaban_id: null,
          })
        );

        Promise.all(recapRequests)
          .then((recapRequests) => {
            console.log("Data recapRequests:", recapRequests.data);
            const recaps = recapRequests.map((res) => ({
              questionId: res.data.question_id,
              recapId: res.data.id,
              jawaban_id: null,
            }));
            setUserAnswers(recaps);
            console.log("Recap created:", recaps);
          })
          .catch((error) => console.error("Error fetching questions:", error));
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, [quizId]);

  useEffect(() => {
    if (hasSubmitted || currentQuestionIndex >= questions.length) {
      return;
    }

    if (timeLeft <= 0) {
      goToNextQuestion();
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, hasSubmitted, currentQuestionIndex, questions.length]);

  const clearTimerAndRedirect = (finalScore) => {
    if (hasSubmitted) return;

    setHasSubmitted(true);
    setTimeLeft(0);
    const user = getSession("userDetails");
    if (!user) {
      console.error("User not found in session");
      return;
    }

    const allAnswered = userAnswers.every(
      (answer) => answer && answer.answerId !== null
    );
    if (!allAnswered) {
      setHasSubmitted(false);
      return;
    }

    const now = new Date();
    now.setHours(now.getHours() + 7); // Tambah 7 jam untuk WIB
    const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");

    console.log("Submitting results with score:", finalScore);
    axios
      .post(`${apiUrl}/results`, {
        user_id: user.id,
        quiz_id: quizId,
        score: finalScore,
        taken_at: formattedDate,
      })
      .then((response) => {
        console.log("Recap submitted :", response.data);

        const resultId = response.data.result.id;
        if (!resultId) {
          console.error("No result ID");
          return;
        }

        const updateRecapRequest = userAnswers.map((answer) =>
          axios.patch(`${apiUrl}/recap-jawaban/${answer.recapId}`, {
            result_id: resultId,
          })
        );

        Promise.all(updateRecapRequest)
          .then(() => console.log("All recap updated with resultId"))
          .catch((error) =>
            console.error("Error updating recap with resultId:", error)
          );

        sessionStorage.setItem("resultId", resultId);
        sessionStorage.setItem("quizId", quizId);
        sessionStorage.setItem("score", finalScore);
        sessionStorage.setItem("totalQuestions", questions.length);
        navigate(`/Result/${resultId}`);
      })
      .catch((error) => {
        console.error(
          "Error saving data:",
          error.response?.data || error.message
        );
        alert("Error saving data");
        setHasSubmitted(false);
      });
  };

  const handleAnswerClick = async (answer) => {
    console.log("Answer clicked:", answer);
    const isValidAnswer = answer.jawaban_valid ?? false;
    setSelectedAnswer(answer.id);
    setIsAnswerCorrect(isValidAnswer);

    if (isValidAnswer) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        console.log("Correct answer! New score:", newScore);
        return newScore;
      });
    } else {
      console.log("Incorrect answer.");
    }

    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const recapEntry = updatedAnswers.find(
        (entry) => entry.questionId === questions[currentQuestionIndex].id
      );

      if (recapEntry) {
        recapEntry.answerId = answer.id;

        axios
          .patch(`${apiUrl}/recap-jawaban/${recapEntry.recapId}`, {
            jawaban_id: answer.id,
          })
          .then(() => console.log("Recap updated:", recapEntry))
          .catch((error) => console.error("Error updating recap:", error));
      }

      return updatedAnswers;
    });

    if (currentQuestionIndex === questions.length - 1) {
      console.log("Last question answered. Redirecting...");
      setTimeout(() => {
        setScore((finalScore) => {
          console.log("Final score before submitting:", finalScore);
          clearTimerAndRedirect(finalScore);
          return finalScore;
        });
      }, 2000);
    } else {
      setTimeout(() => {
        goToNextQuestion();
      }, 2000);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      console.log(
        "Moving to the next question. Current index:",
        currentQuestionIndex + 1
      );
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(60);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    } else {
      clearTimerAndRedirect();
      console.log("All questions completed. Submitting results.");
    }
  };

  if (questions.length === 0) {
    // console.log("Questions not loaded yet.");
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div
      className={clsx(
        "min-h-screen flex flex-col items-center py-10 px-5",
        {
          "shadow-inner-corect": isAnswerCorrect === 1,
          "shadow-inner-incorect": isAnswerCorrect === 0,
        },
        "bg-[#224C57]"
      )}
    >
      <div className="w-full max-w-lg flex items-center relative mt-[3rem]">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#153833] bg-white text-md font-bold text-black">
          {timeLeft}
        </div>
        <div className="w-full">
          <span className="text-white absolute right-0 -top-2">
            {currentQuestionIndex + 1}/{questions.length}
          </span>
          <div className="w-full bg-gray-300 h-2 rounded-full">
            <div
              className="bg-[#153833] h-full rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <p className="text-center text-white mt-12 mb-6 text-lg">
        {currentQuestion.question_text}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[25rem] md:w-[45rem] lg:w-[60rem]">
        {currentQuestion.answers.map((answer) => (
          <button
            key={answer.id}
            className={`p-6 rounded-lg text-center text-white ${
              selectedAnswer === answer.id ? "bg-[#99BC2E]" : "bg-[#356A64]"
            }`}
            onClick={() => handleAnswerClick(answer)}
            disabled={selectedAnswer !== null}
          >
            {answer.jawaban_pilihan}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionQuiz;
