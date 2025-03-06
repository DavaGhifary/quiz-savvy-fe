import React, { useState } from "react";
import NavigationBar from "../components/Sidebar/NavigationBar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = (state) => {
    setIsSidebarOpen(state);
  };

  return (
    <div className="min-h-screen flex bg-[#F8F8FF]">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-[85px]"
        } fixed top-0 left-0 h-full`}
      >
        <NavigationBar onToggleSidebar={handleSidebarToggle} />
      </div>
      {/* Main Content */}
      <div
        className={`flex flex-col flex-grow w-full duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-[85px]"
        }`}
      >
        {/* Header */}
        <Header isSidebarOpen={isSidebarOpen} />

        {/* Page Content */}
        <main className="flex-grow p-6 mt-14 bg-[#F8F8FF]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
