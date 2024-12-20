import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
import { Gauge, SwatchBook, Copy, ChevronLeft } from "lucide-react";

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

const NavigationBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div
      className={`${
        isSidebarOpen ? "w-72" : "w-20"
      } bg-primary border-r h-screen p-5 pt-8 relative duration-300`}
    >
      {/* Sidebar toggle button */}
      <ChevronLeft
        className={`absolute cursor-pointer -right-3 top-9 w-6 bg-Tertiary text-white rounded-full ${
          !isSidebarOpen && "rotate-180"
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Logo Section */}
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
  );
};

export default NavigationBar;
