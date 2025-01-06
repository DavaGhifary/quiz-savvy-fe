const SwitchRequired = ({ isRequired, onToggle }) => {
  return (
    <div
      className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer ${
        isRequired ? "bg-blue-500" : "bg-gray-300"
      }`}
      onClick={onToggle}
    >
      <div
        className={`h-4 w-4 bg-white rounded-full shadow-md transform duration-300 ${
          isRequired ? "translate-x-4" : ""
        }`}
      ></div>
    </div>
  );
};

export default SwitchRequired;
