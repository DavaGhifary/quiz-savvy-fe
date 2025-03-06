import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
import {
  SwatchBook,
  Copy,
  ChevronLeft,
  LogOut,
  BookUser,
  Users,
  LayoutDashboard,
  LogOutIcon,
} from "lucide-react";
import { showToast } from "../ToastNotification";
import { getSession, removeSession } from "../../utils/session";

const NavLinks = [
  {
    name: "Dashboard",
    path: "/Dashboard",
    Icon: LayoutDashboard,
  },
  {
    name: "User Management",
    path: "/Dashboard/User-Management",
    Icon: Users,
    roles: [1],
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
  const location = useLocation();
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = getSession("userDetails"); // Ambil dari sessionStorage
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const userRole = user?.roles_id || 2; // Default ke 2 jika tidak ada role


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
        isSidebarOpen ? "w-64" : "w-[85px]"
      } bg-secondary border-r h-screen rounded-e-[3rem] py-5 pt-8 relative duration-300 flex flex-col justify-between`}
    >
      <ChevronLeft
        className={`absolute cursor-pointer -right-3 top-[50%] w-6 bg-Tertiary text-white rounded-full ${
          !isSidebarOpen && "rotate-180"
        }`}
        onClick={handleSidebarToggle}
      />

      <div className={`${isSidebarOpen ? "" : "w-[40px]"}`}>
        <Link to="/">
          <div className="flex gap-x-4 items-center">
            <img
              src={Logo}
              width={40}
              alt="Logo"
              className="cursor-pointer ml-4"
            />
            <h1
              className={`text-white origin-left font-medium text-xl ${
                !isSidebarOpen && "hidden"
              }`}
            >
              Savvy
            </h1>
          </div>
        </Link>

        <ul className={`pt-8 ${isSidebarOpen ? "w-64" : "w-20"}`}>
          {NavLinks.filter(
            (menu) => !menu.roles || menu.roles.includes(userRole)
          ).map((menu, index) => {
            const isActive = location.pathname === menu.path;
            return (
              <li
                key={index}
                className={`group relative flex items-center gap-x-4 text-sm mt-2 px-6 py-2 transition-colors duration-200
      ${
        isActive
          ? "border-s-2 border-Tertiary text-Tertiary"
          : "text-white hover:text-Tertiary hover:border-s-2 hover:border-Tertiary"
      }`}
              >
                <Link
                  to={menu.path}
                  className="flex items-center gap-x-4 w-full h-full"
                >
                  <menu.Icon className="w-7 h-7" />
                  <span className={`${!isSidebarOpen && "hidden"}`}>
                    {menu.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="px-6 py-2 transition-colors duration-200">
        <button
          className="flex items-center gap-x-4 w-full h-full text-white hover:text-Tertiary"
          onClick={(e) => {
            e.stopPropagation();
            handleLogout();
          }}
        >
          <LogOutIcon className="w-7 h-7" />
          <span className={`${!isSidebarOpen && "hidden"} origin-left`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
