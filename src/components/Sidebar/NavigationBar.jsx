import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
import { Gauge, SwatchBook, Copy, ChevronLeft, LogOut } from "lucide-react";
import UserAvatar from "../UserAvatar";
import { showToast } from "../ToastNotification";
import { getSession } from "../../utils/session";

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
  const location = useLocation();
  const navigate = useNavigate();
  const popupRef = useRef(null); // Reference for popup

  useEffect(() => {
    const storedUser = getSession("userDetails"); // Retrieve user data from session
    if (storedUser) {
      setUser(storedUser); // Set user data if available
    }
  }, []);

  const removeSession = (key) => {
    localStorage.removeItem(key); // Assuming removeSession is removing items from localStorage
  };

  const handleLogout = () => {
    removeSession("authToken");
    removeSession("userDetails");
    showToast("success", "Logout successful!");
    navigate("/"); // Redirect after logout
  };

  // Handle clicks outside the popup
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
      onToggleSidebar(!isSidebarOpen); // Pass the new state to parent component
    }
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-primary border-r h-screen p-5 pt-8 relative duration-300 flex flex-col justify-between`}
    >
      {/* Sidebar toggle button */}
      <ChevronLeft
        className={`absolute cursor-pointer -right-3 top-9 w-6 bg-Tertiary text-white rounded-full ${
          !isSidebarOpen && "rotate-180"
        }`}
        onClick={handleSidebarToggle} // Toggle the sidebar
      />

      <div>
        {/* Logo Section */}
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

        {/* Navigation Links */}
        <ul className="pt-6">
          {NavLinks.map((menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 items-center gap-x-4 text-sm mt-2
            ${
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
        {/* Account Section */}
        <div
          className={`relative bg-[#BABEC6] bg-opacity-[31%] flex rounded-md mt-[7.5rem] -mx-3 p-2 cursor-pointer ${
            isSidebarOpen
              ? "bg-[#BABEC6] bg-opacity-[31%] p-2 cursor-pointer"
              : ""
          }`}
          onClick={() => setIsLogoutPopupOpen(true)}
        >
          <div className="px-1">
            {/* Use UserAvatar component */}
            <UserAvatar name={user?.nama} />
          </div>

          {isSidebarOpen && (
            <div className="px-3">
              <p className="text-md font-semibold">{user?.nama || "Unknown"}</p>
              <p className="text-sm text-white">{user?.role || "User"}</p>
            </div>
          )}
        </div>

        {/* Logout Popup */}
        {isLogoutPopupOpen && (
          <div
            ref={popupRef}
            className={`absolute bottom-16 ${
              isSidebarOpen ? "left-5 right-5" : "left-3 right-3"
            } bg-[#BABEC6] bg-opacity-[31%] cursor-pointer rounded-md shadow-lg`}
            style={{ zIndex: 1000 }}
          >
            <button
              className={`flex items-center justify-center ${
                isSidebarOpen ? "px-3 py-2 gap-3" : "p-3"
              } text-white rounded-lg`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent the click from closing the popup
                handleLogout(); // Logout action
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
