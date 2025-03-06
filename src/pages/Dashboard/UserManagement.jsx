import React, { useState } from "react";
import UserTab from "../../components/UserRolesTab/UserTab";
import RolesTab from "../../components/UserRolesTab/RolesTab";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div className="bg-white h-full rounded-xl p-6">
      <div className="w-full">
        {/* Tabs */}
        <div className="pb-8 border-b border-gray-300">
          <div className="flex gap-6">
            <button
              className={`w-20 py-2 text-center text-lg font-semibold transition-all ${
                activeTab === "user"
                  ? "border-2 border-secondary text-secondary rounded-lg"
                  : "text-gray-300 border-2 border-gray-300 rounded-lg"
              }`}
              onClick={() => setActiveTab("user")}
            >
              Users
            </button>
            <button
              className={`w-20 py-2 text-center text-lg font-semibold transition-all ${
                activeTab === "roles"
                  ? "border-2 border-secondary text-secondary rounded-lg"
                  : "text-gray-300 border-2 border-gray-300 rounded-lg"
              }`}
              onClick={() => setActiveTab("roles")}
            >
              Roles
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="">
          {activeTab === "user" && <UserTab />}
          {activeTab === "roles" && <RolesTab />}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
