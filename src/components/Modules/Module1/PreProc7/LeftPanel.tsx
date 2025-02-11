import React from "react";
import { useNavigate } from "react-router-dom";

const LeftPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full md:w-1/2 p-12 bg-black text-white relative flex flex-col min-h-screen font-oxanium">
      {/* Main content wrapper */}
      <div className="flex-grow space-y-8">
        {/* NeoMyst Logo with Blue Glow */}
        <button
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-blue-400 relative hover:text-blue-300 transition duration-300"
        >
          NeoMyst
          <span className="absolute inset-0 blur-lg opacity-75 text-blue-500">
            NeoMyst
          </span>
        </button>

        {/* Section Subtitle & Archive Label */}
        <div className="flex justify-between items-center text-lg text-gray-400 italic">
          <span>
            | Splitting the Timeline: <span>Data Splitting</span>
          </span>
          <span className="text-blue-400 underline italic">Archive 1.7</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
          Riley has cleaned and organized the data but realizes that not all of
          it is
          <span className="text-yellow-400"> relevant</span> to the
          investigation. Some logs are
          <span className="text-yellow-400"> outdated</span>, and some user
          profiles are
          <span className="text-yellow-400"> inactive</span>.
        </h2>

        <hr className="border-gray-500 w-full" />

        {/* Story Content */}
        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          Before building a machine learning model, you need to split your data
          into:
        </p>

        <ul className="list-disc pl-6 text-lg md:text-xl text-gray-300 space-y-2">
          <li>Training set (to train the model). </li>
          <li>Validation set (to tune the model).</li>
          <li>Test set (to evaluate the model).</li>
        </ul>
      </div>

      {/* Buttons Section - Fixed at bottom with margin */}
      <div className="flex items-center justify-between mt-auto mb-0">
        {/* Go Back Button */}
        <button
          onClick={() => navigate("/pages/PreProc6")}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-gray-500 rounded-full relative transition duration-300 
          hover:bg-gray-700 hover:scale-105 hover:shadow-lg"
        >
          <span className="text-xl">&laquo;</span>
          <span>Go Back</span>
          <span className="absolute inset-0 blur-lg opacity-50 bg-gray-500 rounded-full"></span>
        </button>

        {/* Investigate Further Button */}
        <button
          onClick={() => navigate("/pages/PreProc8")}
          className="flex items-center space-x-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full relative transition duration-300 
          hover:bg-yellow-400 hover:scale-105 hover:shadow-lg"
        >
          <span>Investigate Further</span>
          <span className="text-xl">&raquo;</span>
          <span className="absolute inset-0 blur-lg opacity-50 bg-yellow-500 rounded-full"></span>
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;
