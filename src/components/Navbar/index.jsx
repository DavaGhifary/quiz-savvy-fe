import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/img/Logo.png";
import UserAvatar from "../UserAvatar";

const Navbar = ({ onSignInClick }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in and fetch the user data from localStorage or API
    const storedUser = JSON.parse(localStorage.getItem("userDetails")); // Adjust this based on your data storage method
    if (storedUser) {
      setUser(storedUser); // Assuming the user details are stored in localStorage
    }
  }, []);

  return (
    <div className="w-full fixed bg-white z-10">
      <div className="flex justify-between items-center h-16 mx-[4rem]">
        <div className="flex items-center">
          <img src={Logo} width={60} />
          <p className="font-semibold text-lg">Savvy</p>
        </div>
        <div className="flex items-center gap-20">
          <div className="relative">
            <input
              type="email"
              name="email"
              className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-60 rounded-full sm:text-sm focus:ring-1"
              placeholder="Search Quiz"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute right-3 top-2 text-slate-300"
            />
          </div>

          {/* If user is logged in, display their avatar, otherwise show Sign In button */}
          {user ? (
            <div className="flex items-center gap-2">
              <UserAvatar name={user.nama} />
              {/* <p className="text-lg">{user?.email || "Unknow"}</p> */}
            </div>
          ) : (
            <div>
              <button
                type="submit"
                className="bg-[#6D9773] text-white py-2 px-3 text-sm rounded-lg"
                onClick={onSignInClick}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
