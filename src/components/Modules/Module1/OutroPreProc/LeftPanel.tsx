import React, { useState } from "react";
import { useTypewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";

const LeftPanel: React.FC = () => {
  const navigate = useNavigate();
  const [doneTyping, setDoneTyping] = useState(false);

  const [text] = useTypewriter({
    words: [
      `Cliffhanger: The Plot Thickens
      
With the data preprocessed, Riley is ready to analyze it and uncover the truth. But as they dig deeper, a new clue emerges: a mysterious user account that appeared just before the shutdown. Who is this user? And what role do they play in the disappearance of NeoVerse?  

To Be Continued...  


Next Module: Exploratory Data Analysis (EDA)  
In the next chapter, Riley will use visualizations and statistical techniques to uncover patterns in the data. The mystery deepens as the detective gets closer to the truth...  


This detailed, story-based approach not only teaches every concept of data preprocessing but also sets the stage for future modules, creating a cohesive and engaging learning experience for the 18-24 age group. The futuristic setting and relatable protagonist make the story both exciting and relevant.
`,
    ],
    loop: 1, // Type only once
    typeSpeed: 20,
    deleteSpeed: 0,
    delaySpeed: 1000,
    onType: () => setDoneTyping(true),
  });

  return (
    <div className="w-full md:w-1/2 p-12 bg-black text-white relative flex flex-col min-h-screen">
      {/* Main content wrapper */}
      <div className="flex-grow space-y-8">
        <button
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-blue-400 relative hover:text-blue-300 transition duration-300"
        >
          NeoMyst
          <span className="absolute inset-0 blur-lg opacity-75 text-blue-500">
            NeoMyst
          </span>
        </button>

        {/* Incoming Transmission Title */}
        <h2 className="text-2xl md:text-3xl font-semibold uppercase tracking-wide border-b border-gray-500 pb-2">
          Incoming Transmission
        </h2>

        {/* Typewriter Text */}
        <p className="whitespace-pre-wrap text-lg md:text-2xl leading-relaxed">
          {text} {!doneTyping && <span className="animate-blink">|</span>}
        </p>
      </div>

      {/* Buttons Section - Fixed at bottom with margin */}
      <div className="flex items-center justify-between mt-auto mb-0">
        {/* Go Back Button - Left Aligned */}
        <button
          onClick={() => navigate("/pages/PreProc8")}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-gray-500 rounded-full relative transition duration-300 
          hover:bg-gray-700 hover:scale-105 hover:shadow-lg"
        >
          <span className="text-xl">&laquo;</span>
          <span>Go Back</span>
          <span className="absolute inset-0 blur-lg opacity-50 bg-gray-500 rounded-full"></span>
        </button>

        {/* Investigate Further Button - Right Aligned */}
        <button
          onClick={() => navigate("/next-page")}
          className="flex items-center space-x-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full relative transition duration-300 
          hover:bg-yellow-400 hover:scale-105 hover:shadow-lg"
        >
          <span>Investigate Further</span>
          <span className="text-xl">&raquo;&raquo;</span>
          <span className="absolute inset-0 blur-lg opacity-50 bg-yellow-500 rounded-full"></span>
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;
