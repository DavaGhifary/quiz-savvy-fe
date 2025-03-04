import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imagecheck from "../../assets/img/BadgeCheck.png";
import { Link } from "react-router-dom";

const Result = () => {
  const { resultId } = useParams();
  const [score, setScore] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const nilaiMaks = 100;
  const nilai = (score / totalQuestions) * nilaiMaks;

  useEffect(() => {
    const storedresultId = sessionStorage.getItem("resultId");
    const userScore = sessionStorage.getItem("score");
    const total = sessionStorage.getItem("totalQuestions");

    if (storedresultId === resultId) {
      setScore(Number(userScore) || 0); // Pastikan nilai angka
      setTotalQuestions(Number(total) || 0); // Pastikan nilai angka
    } else {
      console.error("Quiz ID mismatch.");
    }
  }, [resultId]);

  return (
    <div className="bg-[#224C57] h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-[5rem] text-white tracking-tighter">
            Congratulations
          </p>
          <p className="text-white font-semibold text-[3rem]">Nilai</p>
          <p className="text-white font-bold text-[3rem] tracking-tighter">
            {Math.ceil(nilai)}
          </p>
          {/* <p className="text-white">You Answered</p>
          <p className="text-white">
            {score}/{totalQuestions}
          </p> */}
          <div className="flex justify-center">
            <img src={imagecheck} alt="Badge" className="w-40" />
          </div>
          <div className="my-12">
            <Link
              to={`/RekapQuiz/${resultId}`}
              className="bg-white py-2 px-6 rounded-full text-[#224C57]"
            >
              Rekap Quiz
            </Link>
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
