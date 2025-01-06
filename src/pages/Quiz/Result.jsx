import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imagecheck from "../../assets/img/BadgeCheck.png";
import { Link } from "react-router-dom";

const Result = () => {
  const { quizId } = useParams();
  const [score, setScore] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(null);

  useEffect(() => {
    const storedQuizId = sessionStorage.getItem("quizId");
    const userScore = sessionStorage.getItem("score");
    const total = sessionStorage.getItem("totalQuestions");

    if (storedQuizId === quizId) {
      setScore(Number(userScore) || 0); // Pastikan nilai angka
      setTotalQuestions(Number(total) || 0); // Pastikan nilai angka
    } else {
      console.error("Quiz ID mismatch.");
    }
  }, [quizId]);

  return (
    <div className="bg-[#224C57] h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-[5rem] text-white">Congratulations</p>
          <p className="text-white">You Answered</p>
          <p className="text-white">
            {score}/{totalQuestions}
          </p>
          <div className="flex justify-center">
            <img src={imagecheck} alt="Badge" />
          </div>
          <div className="my-12">
            <Link
              to="/Dashboard"
              className="bg-white py-2 px-6 rounded-full text-[#224C57]"
            >
              Back To Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
