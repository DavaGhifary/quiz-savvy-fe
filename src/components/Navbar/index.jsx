import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { LayoutDashboard, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
import UserAvatar from "../UserAvatar";
import { getSession, removeSession } from "../../utils/session";
import { showToast } from "../ToastNotification";
import axios from "axios";

const Navbar = ({ onSignInClick }) => {
  const [user, setUser] = useState(null);
  const [roleName, setRoleName] = useState("Unknown Role");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  // Definisikan fetchRoleName di luar useEffect
  const fetchRoleName = (rolesId) => {
    if (rolesId) {
      axios
        .get(`${apiUrl}/roles/${rolesId}`)
        .then((response) => setRoleName(response.data.nama))
        .catch((error) => console.error("Failed to fetch role name:", error));
    }
  };

  useEffect(() => {
    const storedUser = getSession("userDetails");
    console.log("Stored user:", storedUser);

    if (storedUser) {
      setUser(storedUser);
      fetchRoleName(storedUser.roles_id); // Panggil fetchRoleName setelah user tersedia
    }

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    removeSession("userDetails");
    setUser(null);
    setIsPopupOpen(false);
    showToast("success", "Logout successful!");
  };

  return (
    <div className="w-full fixed bg-white z-10">
      <div className="flex justify-center sm:flex sm:justify-between md:flex md:justify-between lg:flex lg:justify-between xl:flex xl:justify-between items-center h-16 mx-[4rem]">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} width={60} alt="Savvy Logo" />
          <p className="font-semibold text-lg">Savvy</p>
        </div>

        {/* Search & User Section */}
        <div className="flex items-center gap-5 sm:gap-20 md:gap-20 lg:gap-20 xl:gap-20">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-60 rounded-full sm:text-sm focus:ring-1"
              placeholder="Search Quiz"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute right-3 top-3 text-slate-300"
            />
          </div>

          {/* User Avatar & Popup */}
          {user ? (
            <div className="relative">
              <button onClick={() => setIsPopupOpen(!isPopupOpen)}>
                <UserAvatar name={user.nama} />
              </button>

              {isPopupOpen && (
                <div
                  ref={popupRef}
                  className="absolute top-12 right-0 w-48 bg-white border shadow-md rounded-md"
                >
                  {/* User Info */}
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

                  {/* Dashboard Link */}
                  <Link to="/Dashboard">
                    <button className="flex items-center gap-2 w-full text-left py-2 px-2 text-secondary hover:bg-gray-100">
                      <LayoutDashboard size={18} /> Dashboard
                    </button>
                  </Link>

                  {/* Logout Button */}
                  <button
                    className="flex items-center gap-2 w-full text-left py-2 px-2 text-secondary hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="submit"
              className="bg-[#6D9773] text-white py-2 px-3 text-sm rounded-lg"
              onClick={onSignInClick}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
