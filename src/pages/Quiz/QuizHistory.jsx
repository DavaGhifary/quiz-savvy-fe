import React, { useEffect, useState } from "react";
import axios from "axios";
import { getSession } from "../../utils/session";

const QuizHistory = () => {
  const [quizHistory, setQuizHistory] = useState([]);
  const [user, setUser] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedUser = getSession("userDetails");
    if (storedUser && storedUser.id) {
      setUser(storedUser);
    } else {
      console.warn("User not found in session.");
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchQuizHistory(user.id);
    }
  }, [user?.id]);

  const fetchQuizHistory = async (userId) => {
    try {

      const response = await axios.get(`${apiUrl}/results`, {
        params: { user_id: userId },
      });


      if (!response.data || response.data.length === 0) {
        setQuizHistory([]);
        return;
      }

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const filteredHistory = response.data
        .filter((quiz) => quiz.user_id === userId) // Filter berdasarkan user ID
        .filter((quiz) => new Date(quiz.taken_at) >= sevenDaysAgo)
        .sort((a, b) => new Date(b.taken_at) - new Date(a.taken_at));

      if (filteredHistory.length === 0) {
        setQuizHistory([]);
        return;
      }

      const quizDetails = await Promise.all(
        filteredHistory.map(async (quiz) => {
          try {
            const quizResponse = await axios.get(`${apiUrl}/quiz/${quiz.quiz_id}`);
            return { ...quiz, title: quizResponse.data.title };
          } catch {
            return { ...quiz, title: "Unknown Quiz" };
          }
        })
      );

      setQuizHistory(quizDetails);
    } catch (error) {
      console.error("Failed to fetch quiz history:", error);
    }
  };

  return (
    <div className="mb-6">
      <p className="text-white">Last Quiz</p>
      {user ? (
        quizHistory.length > 0 ? (
          <ul className="pl-4 space-y-1">
            {quizHistory.map((quiz, index) => (
              <li key={index} className="text-white text-sm">
                {quiz.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm pl-4">No recent quizzes.</p>
        )
      ) : (
        <p className="text-gray-400 text-sm pl-4">Loading user data...</p>
      )}
    </div>
  );
};

export default QuizHistory;
