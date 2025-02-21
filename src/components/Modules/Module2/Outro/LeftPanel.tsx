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
            | From Exploration to Prediction: <span>Chapter 2 Outro</span>
          </span>
          <span className="text-blue-400 underline italic">Archive 2.8</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
          Riley took a sip of coffee and relaxed, a determined glint in their
          eyes as the pieces of the
          <span className="text-yellow-400"> NeoVerse puzzle</span> began to
          fall into place.
        </h2>

        <hr className="border-gray-500 w-full" />

        {/* Story Content */}
        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          With powerful visualizations unveiling hidden patterns, a heatmap
          spotlighting key correlations, and feature selection tools narrowing
          down the critical clues, the once-overwhelming data had transformed
          into a clear and focused narrative. The chaos of raw data had given
          way to a streamlined story—one that now held the essential elements
          needed to crack the mystery.
        </p>

        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          But Riley knew the journey was far from over. With the major clues in
          hand, it was time to shift gears from exploration to prediction. In
          the next module, Riley will dive into
          <span className="text-yellow-400"> Regression Analysis</span>—a
          technique that will allow them to build predictive models based on the
          key features identified.
        </p>
      </div>

      {/* Buttons Section - Fixed at bottom with margin */}
      <div className="flex items-center justify-between mt-auto mb-0">
        {/* Go Back Button */}
        <button
          onClick={() => navigate("/pages/EDA7")}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-gray-500 rounded-full relative transition duration-300 
          hover:bg-gray-700 hover:scale-105 hover:shadow-lg"
        >
          <span className="text-xl">&laquo;</span>
          <span>Go Back</span>
          <span className="absolute inset-0 blur-lg opacity-50 bg-gray-500 rounded-full"></span>
        </button>

        {/* Investigate Further Button */}
        <button
          onClick={() => navigate("/pages/Regression1")}
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
