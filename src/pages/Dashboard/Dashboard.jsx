import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex justify-between">
      <div>
        <p>Dashboard</p>
      </div>
      <div className="flex gap-10">
        <div className="w-60">
          <div className="relative">
            <input
              type="text"
              name="search"
              className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-60 rounded-md sm:text-sm focus:ring-1"
              placeholder="Search"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute right-3 top-2.5 text-slate-300"
            />
          </div>
        </div>
        <div>
          <Link to="/CreateQuiz" className="bg-primary p-2 rounded-md text-sm text-white">Create Quiz</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
