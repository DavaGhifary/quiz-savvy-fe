import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
import {
  Gauge,
  SwatchBook,
  Copy,
  ChevronLeft,
  LogOut,
  BookUser,
} from "lucide-react";
import UserAvatar from "../UserAvatar";
import { showToast } from "../ToastNotification";
import { getSession } from "../../utils/session";
import axios from "axios";

const NavLinks = [
  {
    name: "Dashboard",
    path: "/Dashboard",
    Icon: Gauge,
  },
  {
    name: "Category",
    path: "/Dashboard/Category",
    Icon: SwatchBook,
  },
  {
    name: "Templates",
    path: "/Dashboard/Templates",
    Icon: Copy,
  },
];

const NavigationBar = ({ onToggleSidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [roleName, setRoleName] = useState("Unknown Role"); // State untuk nama role
  const location = useLocation();
  const navigate = useNavigate();
  const popupRef = useRef(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedUser = getSession("userDetails");
    if (storedUser) {
      setUser(storedUser);
      fetchRoleName(storedUser.roles_id);
    } else {
      axios
        .get(`${apiUrl}/users`)
        .then((response) => {
          setUser(response.data);
          fetchRoleName(response.data.roles_id);
        })
        .catch((error) => console.error("Failed to fetch user data:", error));
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

  const removeSession = (key) => {
    localStorage.removeItem(key);
  };

  const handleLogout = () => {
    removeSession("authToken");
    removeSession("userDetails");
    showToast("success", "Logout successful!");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsLogoutPopupOpen(false);
      }
    };

    if (isLogoutPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLogoutPopupOpen]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (onToggleSidebar) {
      onToggleSidebar(!isSidebarOpen);
    }
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-primary border-r h-screen p-5 pt-8 relative duration-300 flex flex-col justify-between`}
    >
      <ChevronLeft
        className={`absolute cursor-pointer -right-3 top-9 w-6 bg-Tertiary text-white rounded-full ${
          !isSidebarOpen && "rotate-180"
        }`}
        onClick={handleSidebarToggle}
      />

      <div>
        <Link to="/">
          <div className="flex gap-x-4 items-center">
            <img src={Logo} width={40} alt="Logo" className="cursor-pointer" />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !isSidebarOpen && "scale-0"
              }`}
            >
              Savvy
            </h1>
          </div>
        </Link>

        <ul className="pt-6">
          {NavLinks.map((menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 items-center gap-x-4 text-sm mt-2 ${
                location.pathname === menu.path
                  ? "bg-Tertiary text-white"
                  : "text-gray-300 hover:bg-Tertiary hover:text-white"
              }`}
            >
              <Link
                to={menu.path}
                className="flex items-center gap-x-4 w-full h-full"
              >
                <menu.Icon className="text-white" />
                <span
                  className={`${
                    !isSidebarOpen && "hidden"
                  } origin-left duration-200`}
                >
                  {menu.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div
          className={`relative bg-[#BABEC6] bg-opacity-[31%] flex rounded-md mt-[7.5rem] -mx-3 p-2 cursor-pointer`}
          onClick={() => setIsLogoutPopupOpen(true)}
        >
          <div className="px-1">
            <UserAvatar name={user?.nama} />
          </div>

          {isSidebarOpen && (
            <div className="px-3">
              <p className="text-md font-semibold">
                {user?.nama || "Unknown User"}
              </p>
              <p className="text-sm text-white">{roleName}</p>
            </div>
          )}
        </div>

        {isLogoutPopupOpen && (
          <div
            ref={popupRef}
            className={`absolute bottom-16 ${
              isSidebarOpen ? "left-5 right-5" : "left-3 right-3"
            } bg-[#BABEC6] bg-opacity-[31%] cursor-pointer rounded-md shadow-lg`}
            style={{ zIndex: 1000 }}
          >
            <Link to="/Dashboard/MyQuiz">
              <button
                className={`flex items-center justify-center ${
                  isSidebarOpen ? "px-3 py-2 gap-3" : "p-3"
                } text-white rounded-lg`}
              >
                <BookUser />
                {isSidebarOpen && "My Quiz"}
              </button>
            </Link>
            <button
              className={`flex items-center justify-center ${
                isSidebarOpen ? "px-3 py-2 gap-3" : "p-3"
              } text-white rounded-lg`}
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
            >
              <LogOut />
              {isSidebarOpen && "Logout"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
