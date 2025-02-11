import React, { useState } from "react";
import { useTypewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";

const LeftPanel: React.FC = () => {
  const navigate = useNavigate();
  const [doneTyping, setDoneTyping] = useState(false);

  const [text] = useTypewriter({
    // words: [
    //   `In the year 2045, the world is obsessed with NeoVerse, a hyper-immersive virtual reality game where players can live out their wildest dreams. NeoVerse isn’t just a game - it’s a second reality, a thriving digital universe with its  own economy, politics, and culture.

    //   But one day, disaster strikes. NeoVerse goes offline without warning, leaving millions of players stranded and confused. The developers are baffled, and rumors of a cyberattack begin to spread.

    //   Enter Riley Carter, a brilliant young data scientist and amateur hacker. Riley is recruited by the creators  of NeoVerse to investigate the shutdown. The only clues are fragmented server logs, corrupted user data, and cryptic error messages. To solve the mystery, Riley must dive deep into the data, clean it, organize it, and uncover the truth behind the disappearance of NeoVerse.`,
    // ],
    words: [
      `In the year 2045, the world is obsessed with NeoVerse, a hyper-immersive virtual reality game where players can live out their wildest dreams. NeoVerse isn't just a game - it's a second reality, a thriving digital universe with its own economy, politics, and culture.

But one day, disaster strikes. NeoVerse goes offline without warning, leaving millions of players stranded and confused. The developers are baffled, and rumors of a cyberattack begin to spread.

Enter Riley Carter, a brilliant young data scientist and amateur hacker. Riley is recruited by the creators of NeoVerse to investigate the shutdown. The only clues are fragmented server logs, corrupted user data, and cryptic error messages. To solve the mystery, Riley must dive deep into the data, clean it, organize it, and uncover the truth behind the disappearance of NeoVerse.`,
    ],
    // words: [
    //   `In the year 2045, the world is obsessed with NeoVerse, a hyper-immersive virtual reality game where players can live out their wildest dreams. NeoVerse isn't just a game - it's a second reality, a thriving digital universe with its own economy, politics, and culture.

    //   But one day, disaster strikes. NeoVerse goes offline without warning, leaving millions of players stranded and confused. The developers are baffled, and rumors of a cyberattack begin to spread.

    //   Enter Riley Carter, a brilliant young data scientist and amateur hacker. Riley is recruited by the creators of NeoVerse to investigate the shutdown. The only clues are fragmented server logs, corrupted user data, and cryptic error messages. To solve the mystery, Riley must dive deep into the data, clean it, organize it, and uncover the truth behind the disappearance of NeoVerse.`,
    // ],
    loop: 1, // Type only once
    typeSpeed: 20,
    deleteSpeed: 0,
    delaySpeed: 1000,
    onType: () => setDoneTyping(true),
  });

  return (
    <div className="w-full md:w-1/2 p-12 bg-black text-white relative flex flex-col min-h-screen font-oxanium">
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
        <p className="whitespace-pre-wrap text-lg md:text-2xl leading-relaxed text-justify w-full">
          {text} {!doneTyping && <span className="animate-blink">|</span>}
        </p>
      </div>

      {/* Buttons Section - Fixed at bottom with margin */}
      <div className="flex items-center justify-between mt-auto mb-0 font-oxanium font-medium">
        {/* Go Back Button - Left Aligned */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-gray-500 rounded-full relative transition duration-300 
          hover:bg-gray-700 hover:scale-105 hover:shadow-lg"
        >
          <span className="text-xl">&laquo;</span>
          <span>Go Back</span>
          <span className="absolute inset-0 blur-lg opacity-50 bg-gray-500 rounded-full"></span>
        </button>

        {/* Investigate Further Button - Right Aligned */}
        <button
          onClick={() => navigate("/pages/PreProc1")}
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
