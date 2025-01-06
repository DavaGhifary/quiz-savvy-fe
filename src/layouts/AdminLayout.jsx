import React, { useState } from "react";
import NavigationBar from "../components/Sidebar/NavigationBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = (state) => {
    setIsSidebarOpen(state);
  };

  return (
    <div className="h-screen bg-[#F8F8FF] flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } fixed top-0 left-0 h-full`}
      >
        <NavigationBar onToggleSidebar={handleSidebarToggle} />
      </div>

      {/* Main Content */}
      <main
        className={`flex-grow h-full overflow-y-auto p-8 duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
