import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GamePage1: React.FC = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center px-20 py-12 w-full">
      {/* Full-width Content Section */}
      <div className="max-w-7xl w-full mx-auto space-y-6 flex flex-col">
        <h1 className="text-4xl font-bold flex items-center">
          📖 Mission Briefing: The Test Begins
        </h1>
        <p className="text-gray-300 text-lg font-mono">
          Riley sat in front of the glowing interface, watching as lines of data scrolled across the screen. 
          The once chaotic and corrupted NeoVerse logs were now structured, clean, and ready for analysis. 
          Every missing value had been handled, every category encoded, and every scale adjusted. But now, the real challenge began.
        </p>
        <p className="text-gray-300 text-lg font-mono">
          This was no ordinary investigation. It was time to put everything learned so far to the test—
          not just to understand the data, but to use it to expose the truth hidden within NeoVerse’s virtual landscape.
        </p>
        <p className="text-gray-300 font-semibold text-lg font-mono">What was their next move?</p>
        <p className="text-gray-300 text-lg font-mono">
          The answer was in the data. It always had been.
        </p>
        <p className="text-gray-300 text-lg font-mono">
          But this time, there were no clear instructions. Riley wasn’t just following a process anymore—
          they were leading the investigation. The system’s guidance was there if needed, but every decision would be theirs to make.
        </p>
        <p className="text-gray-300 text-lg font-mono">
          The Shadow Collective had evolved, and so must Riley. The tools were all here—preprocessing techniques, 
          visualization insights, and feature selection strategies. Every graph, every heatmap, every anomaly flagged 
          would push the investigation forward.
        </p>
        <ul className="text-blue-400 list-disc pl-5 text-lg font-mono">
          <li>Can you spot the missing links?</li>
          <li>Can you uncover the hidden patterns in the data?</li>
          <li>Can you select the key features that will predict what happens next?</li>
        </ul>
        <p className="text-gray-300 font-semibold text-lg font-mono">
          💡 Welcome to Operation Quantum Veil. Your mission begins now.
        </p>
      </div>
      
      {/* Animated Button Positioned on the Right */}
      <div className="max-w-7xl w-full mx-auto mt-10 flex justify-end">
      <motion.button
          className="w-48 h-12 rounded-lg flex items-center justify-center bg-blue-400 text-white text-lg font-semibold transition-all hover:bg-blue-500"
          onClick={() => {
            setClicked(true);
            setTimeout(() => navigate("/modules/game-module1/preprocessing"), 500);
          }}
          whileTap={{ scale: 0.9 }}
        >
          {clicked ? (
            <div className="flex gap-1">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-blue-800 text-xl">&raquo;</span>
                ))}
            </div>
          ) : (
            <span>Engage Data Core &raquo;</span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default GamePage1;
