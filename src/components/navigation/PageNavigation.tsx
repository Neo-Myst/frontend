import React from 'react';
import { useNavigate } from "react-router-dom";

interface PageNavigationProps {
  goBackRoute: string;
  investigateRoute: string;
  checkInvestigate?: boolean; // if true, perform quiz status checks before navigation
}

const PageNavigation: React.FC<PageNavigationProps> = ({ goBackRoute, investigateRoute, checkInvestigate = false }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(goBackRoute);
  };

  const handleInvestigate = () => {
    if (checkInvestigate) {
      const status = localStorage.getItem("quizStatus");
      if (!status || status === "locked" || status === "unlocked") {
        alert("Please unlock the quiz and select the correct answer before proceeding.");
        return;
      } else if (status === "wrong") {
        alert("Your answer is incorrect. Please select the correct answer before proceeding.");
        return;
      }
    }
    navigate(investigateRoute);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <button
        onClick={handleGoBack}
        className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-gray-500 rounded-full relative transition duration-300 hover:bg-gray-700 hover:scale-105 hover:shadow-lg"
      >
        <span className="text-xl">&laquo;</span>
        <span>Go Back</span>
      </button>
      <button
        onClick={handleInvestigate}
        className="flex items-center space-x-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full relative transition duration-300 
          hover:bg-yellow-400 hover:scale-105 hover:shadow-lg"
      >
        <span>Investigate Further</span>
        <span className="text-xl">&raquo;</span>
      </button>
    </div>
  );
};

export default PageNavigation;
