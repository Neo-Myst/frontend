import React, { useState } from 'react';

const RightPanel: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  return (
    <div className="w-full md:w-1/2 p-10 bg-[#0d0f16] text-white min-h-screen flex flex-col justify-between">
      {/* Quiz Section (Now Positioned Lower) */}
      <div className="mt-10"> {/* Added margin-top to push the quiz lower */}
        {/* Quiz Title */}
        <h2 className="text-3xl font-bold mb-4">Quiz!</h2>
        
        {/* Quiz Question */}
        <p className="text-lg md:text-xl mb-6 text-gray-300">
          What’s the first thing Riley should do with the raw data?
        </p>

        {/* Quiz Options */}
        <div className="space-y-4">
          {["A) Start analyzing it immediately.", "B) Clean and organize it.", "C) Ignore it and rely on intuition."].map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              className={`block w-full text-left p-4 rounded-lg border border-gray-500 text-lg md:text-xl 
              ${selectedAnswer === option ? "bg-green-600 text-white" : "bg-gray-200 text-black hover:bg-gray-300 transition"}`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Check Your Knowledge Button */}
        <button 
          className="block w-full mt-6 py-4 bg-blue-600 text-lg font-bold text-white rounded-lg hover:bg-blue-500 transition duration-300"
        >
          Check your knowledge
        </button>
      </div>

      {/* Footer Text Below Quiz */}
      <p className="text-gray-400 text-sm border-t border-gray-500 pt-4 mt-6">
        Data Preprocessing - Riley’s Digital Toolkit | <span className="text-white font-bold">Introduction</span>
      </p>
    </div>
  );
};

export default RightPanel;
