import React from "react";
import NavigationBar from "../components/Sidebar/NavigationBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="w-full flex">
      {/* Sidebar */}
      <NavigationBar />
      {/* Main Content */}
      <main className="flex-grow p-4">
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminLayout;
