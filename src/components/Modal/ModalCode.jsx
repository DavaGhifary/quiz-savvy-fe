import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getSession } from "../../utils/session";

const ModalCode = ({ isOpen, onClose }) => {
  const quiz = localStorage.getItem("createdQuizzes");
  const data = quiz ? JSON.parse(quiz) : [];
  const navigate = useNavigate();

  const handleCloseCode = () => {
    navigate("/Dashboard");
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold text-center">Quiz Code</h2>
        <h1 className="text-2xl font-bold mb-4 text-center">{data[0].code}</h1>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleCloseCode}
          >
            Oke
          </button>
          {/* <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button> */}
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalCode;
