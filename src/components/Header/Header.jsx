import { History, LogOut, NotebookPen, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { showToast } from "../ToastNotification";
import UserAvatar from "../UserAvatar";
import { getSession } from "../../utils/session";
import axios from "axios";
import { format, register } from "timeago.js";

const Header = ({ isSidebarOpen }) => {
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isHistoryPopupOpen, setIsHistoryPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const historyPopupRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [roleName, setRoleName] = useState("Unknown Role");
  const [quizHistory, setQuizHistory] = useState([]);

  const timeagoLocale = (number, index) => {
    const templates = [
      ["baru saja", "sebentar lagi"],
      [`${number} detik yang lalu`, `dalam ${number} detik`],
      ["1 menit yang lalu", "dalam 1 menit"],
      [`${number} menit yang lalu`, `dalam ${number} menit`],
      ["1 jam yang lalu", "dalam 1 jam"],
      [`${number} jam yang lalu`, `dalam ${number} jam`],
      ["1 hari yang lalu", "dalam 1 hari"],
      [`${number} hari yang lalu`, `dalam ${number} hari`],
      ["1 minggu yang lalu", "dalam 1 minggu"],
      [`${number} minggu yang lalu`, `dalam ${number} minggu`],
    ];
    return templates[index];
  };

  register("id_ID", timeagoLocale);

  const apiUrl = import.meta.env.VITE_API_URL;

  const pageTitles = {
    "/Dashboard": "Dashboard",
    "/Dashboard/User-Management": "User Management",
    "/Dashboard/Category": "Category",
    "/Dashboard/Templates": "Templates",
    "/Dashboard/MyQuiz": "My Quiz",
  };

  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
      if (
        historyPopupRef.current &&
        !historyPopupRef.current.contains(event.target)
      ) {
        setIsHistoryPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedUser = getSession("userDetails");
    if (storedUser) {
      setUser(storedUser);
      fetchRoleName(storedUser.roles_id);
      fetchQuizHistory(storedUser.id);
    }
  }, []);

  const fetchRoleName = (rolesId) => {
    if (rolesId) {
      axios
        .get(`${apiUrl}/roles/${rolesId}`)
        .then((response) => setRoleName(response.data.nama))
        .catch((error) => console.error("Failed to fetch role name:", error));
    }
  };

  const fetchQuizHistory = async (userId) => {
    if (!userId) return;

    try {
      const response = await axios.get(`${apiUrl}/results`, {
        params: { user_id: userId }, // Pastikan hanya mengambil hasil kuis user yang sedang login
      });

      const results = response.data || [];

      // Pastikan hanya mengambil hasil yang benar-benar milik user yang login
      const filteredResults = results.filter((quiz) => quiz.user_id === userId);

      if (filteredResults.length === 0) {
        setQuizHistory([]);
        return;
      }

      const now = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);

      const filteredHistory = filteredResults
        .map((quiz) => ({
          ...quiz,
          taken_at: new Date(quiz.taken_at),
        }))
        .filter((quiz) => quiz.taken_at >= sevenDaysAgo)
        .sort((a, b) => b.taken_at - a.taken_at);

      const quizDetails = await Promise.all(
        filteredHistory.map(async (quiz) => {
          try {
            const quizResponse = await axios.get(
              `${apiUrl}/quiz/${quiz.quiz_id}`
            );
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    showToast("success", "Logout successful!");
    navigate("/");
  };

  return (
    <div
      className={`bg-white shadow-md p-4 fixed top-1 right-4 left-4 z-10 h-14 flex justify-between items-center transition-all duration-300 rounded-full ${
        isSidebarOpen
          ? "w-[calc(100%-16rem-2rem)] ml-64"
          : "w-[calc(100%-85px-2rem)] ml-[85px]"
      }`}
    >
      <h1 className="text-xl font-semibold text-secondary">{pageTitle}</h1>
      <div className="flex items-center relative">
        <div
          className="pe-4 cursor-pointer relative"
          onClick={() => setIsHistoryPopupOpen(!isHistoryPopupOpen)}
        >
          <History className="text-secondary" />
          {isHistoryPopupOpen && (
            <div
              ref={historyPopupRef}
              className="absolute top-8 right-0 w-64 bg-white border shadow-md rounded-md"
            >
              <p className="text-md font-semibold p-2">Recent Quiz</p>
              <ul className="text-sm">
                {quizHistory.length > 0 ? (
                  quizHistory.map((quiz, index) => (
                    <li
                      key={index}
                      className="py-2 flex justify-between items-center border-t hover:bg-gray-100 px-2 cursor-pointer"
                    >
                      <p className="text-base font-semibold">{quiz.title}</p>
                      <p className="text-xs text-gray-400">
                        {format(quiz.taken_at, "id_ID")}
                      </p>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-400 p-2 text-sm">
                    No recent quizzes.
                  </p>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 border-s border-gray-400 ps-4 relative">
          <div
            className="cursor-pointer"
            onClick={() => setIsPopupOpen(!isPopupOpen)}
          >
            <UserAvatar name={user?.nama} />
          </div>
          {isPopupOpen && (
            <div
              ref={popupRef}
              className="absolute top-10 right-0 w-48 bg-white border shadow-md rounded-md"
            >
              <div className="flex p-2 gap-2 border-b">
                <div className="w-12 h-12 flex justify-center items-center rounded-full">
                  <UserAvatar name={user?.nama} />
                </div>
                <div>
                  <p className="text-md truncate w-20 font-semibold text-secondary">
                    {user?.nama || "Unknown User"}
                  </p>
                  <p className="text-md text-secondary">{roleName}</p>
                </div>
              </div>
              <Link to="/Dashboard/MyQuiz">
                <button className="flex gap-2 w-full text-left py-2 px-2 text-secondary hover:bg-gray-100">
                  <NotebookPen /> My Quiz
                </button>
              </Link>
              <button
                className="flex gap-2 w-full text-left py-2 px-2 text-secondary hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
