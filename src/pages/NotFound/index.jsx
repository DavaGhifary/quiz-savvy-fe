import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-secondary w-full h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg px-8 py-12">
        <img src="/404.png" className="w-64" alt="" />
        <p className="text-center text-lg font-bold text-secondary pt-12">
          Page Not Found
        </p>
        <div className="flex justify-center pt-6">
          <Link to="/Dashboard">
            <button className="bg-secondary text-white font-semibold rounded-md py-1 px-14">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
