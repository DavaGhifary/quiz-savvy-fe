const QuestionQuiz = () => {
  return (
    <div className="min-h-screen bg-[#224C57] flex flex-col items-center py-10 px-5 border-2 border-[#47EC1D] shadow-inner-custom">
      {/* Progress bar */}
      <div className="w-full max-w-lg flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-lg font-bold text-black">
          60
        </div>
        <div className="w-full bg-gray-300 h-2 rounded-full">
          <div
            className="bg-[#153833] h-full rounded-full"
            style={{ width: "50%" }}
          ></div>
        </div>
        <span className="text-white">10/20</span>
      </div>

      {/* Main Content */}
      <p className="text-center text-white mt-8 mb-6 text-lg">
        Body text for whatever you’d like to say. Add main takeaway points,
        quotes, anecdotes, or even a very very short story.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
        {["#99BC2E", "#356A64", "#356A64", "#356A64"].map((color, index) => (
          <div
            key={index}
            className="p-6 rounded-lg text-center text-white"
            style={{ backgroundColor: color }}
          >
            Body text for whatever you’d like to say. Add main takeaway points,
            quotes, anecdotes, or even a very very short story.
          </div>
        ))}
      </div>
    </div>
  );
};
export default QuestionQuiz;