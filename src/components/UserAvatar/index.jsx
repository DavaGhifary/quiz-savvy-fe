import React from "react";

// Utility function to get the first letter of the name or email
const getInitial = (nameOrEmail) => {
  return nameOrEmail ? nameOrEmail.charAt(0).toUpperCase() : "U"; // Default to "U" for unknown
};

const UserAvatar = ({ name, email }) => {
  // Use the name or email to get the initials
  const initials = getInitial(name || email);

  return (
    <div className="flex items-center space-x-3">
      {/* Avatar Circle */}
      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl">
        {initials}
      </div>
      {/* User Name */}
      {/* <p className="text-lg">{name || email}</p> */}
    </div>
  );
};

export default UserAvatar;
