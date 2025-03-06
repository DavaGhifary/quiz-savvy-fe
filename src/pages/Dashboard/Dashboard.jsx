import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import CardQuizzes from "../../components/Card/CardQuizzes";
import { getSession, removeSession } from "../../utils/session";
import ModalAddTitle from "../../components/Modal/ModalAddTitle";
import CreateQuiz from "../Quiz/CreateQuiz";
import ModalEnterCode from "../../components/Modal/ModalEnterCode";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnterCodeModalOpen, setIsEnterCodeModalOpen] = useState(false); // State untuk modal enter code
  const [quizId, setQuizId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEnterCodeModal = () => setIsEnterCodeModalOpen(true);
  const closeEnterCodeModal = () => setIsEnterCodeModalOpen(false);

  const handleQuizCreated = (createdQuizId) => {
    setQuizId(createdQuizId);
  };

  useEffect(() => {
    const token = getSession("authToken");
    if (!token) {
      removeSession("userDetails");
      window.location.href = "/";
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="h-full">
      <div className="flex justify-between">
        {/* Input Search */}
        <div className="w-60">
          <div className="relative">
            <input
              type="text"
              name="search"
              className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-secondary focus:ring-secondary w-60 rounded-md sm:text-sm focus:ring-1"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute right-3 top-2.5 text-slate-300"
            />
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <div>
            <button
              className="bg-primary p-2 rounded-md text-sm text-white"
              onClick={openEnterCodeModal} // Buka modal enter code
            >
              Enter Code
            </button>
            <ModalEnterCode
              isOpen={isEnterCodeModalOpen}
              closeModal={closeEnterCodeModal}
            />
          </div>
          <div>
            <button
              onClick={openModal}
              className="bg-primary p-2 rounded-md text-sm text-white"
            >
              Create Quiz
            </button>
            {quizId && <CreateQuiz quizId={quizId} />}
            <ModalAddTitle
              isOpen={isModalOpen}
              closeModal={closeModal}
              onQuizCreated={handleQuizCreated}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 w-full">
        <div className="py-3">
          <CardQuizzes searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
