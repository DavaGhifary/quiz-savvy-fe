import React, { useState } from "react";

const SwitchRequired = () => {
  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div
      className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer ${
        isOn ? "bg-blue-500" : "bg-gray-300"
      }`}
      onClick={toggleSwitch}
    >
      <div
        className={`h-4 w-4 bg-white rounded-full shadow-md transform duration-300 ${
          isOn ? "translate-x-4" : ""
        }`}
      ></div>
    </div>
  );
};

export default SwitchRequired;
