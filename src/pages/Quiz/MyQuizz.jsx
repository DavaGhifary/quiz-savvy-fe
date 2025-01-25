import React from "react";
import CardMyQuizz from "../../components/Card/CardMyQuizz";

const MyQuizz = () => {
  return (
    <div>
      <div className="my-[1rem]">
        <p className="text-lg font-semibold">My Quiz</p>
      </div>
      <div>
        <CardMyQuizz />
      </div>
    </div>
  );
};

export default MyQuizz;
