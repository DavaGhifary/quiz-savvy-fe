const QuestionQuiz = () => {
  return (
    <div className="min-h-screen bg-[#224C57] flex flex-col items-center py-10 px-5 border-2 shadow-inner-corect">
      {/* Progress bar */}
      <div className="w-full max-w-lg flex items-center relative mt-[3rem]">
        <div className="">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#153833] bg-white text-md font-bold text-black">
            60
          </div>
        </div>
        <div className="w-full">
          <span className="text-white absolute right-0 -top-2">10/20</span>
          <div className="w-full bg-gray-300 h-2 rounded-full">
            <div className="bg-[#153833] h-full rounded-full w-[50%]"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <p className="text-center text-white mt-12 mb-6 text-lg">
        Body text for whatever you’d like to say. Add main takeaway points,
        quotes, anecdotes, or even a very very short story.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[60rem]">
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
