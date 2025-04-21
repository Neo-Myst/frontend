import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NextButtonProps {
  to: string;
  label?: string;
}

const NextButton: React.FC<NextButtonProps> = ({ to, label = "NEXT MISSION" }) => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const handleClick = () => {
    setIsClicking(true);
    // Add a small delay for the animation to complete before navigation
    setTimeout(() => {
      navigate(to);
    }, 600);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsClicking(false);
      }}
      className={`relative overflow-hidden group px-8 py-3 rounded-md font-mono tracking-wider text-lg transition-all duration-300 
        ${isClicking ? "scale-95 bg-teal-500" : isHovering ? "bg-[#052740]" : "bg-[#031520]"}
        border border-teal-400/30 shadow-lg hover:shadow-teal-400/20 hover:border-teal-400/50`}
    >
      {/* Background effects */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/10 to-teal-400/0 
          ${isHovering ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}></div>
        
        {/* Scanning line effect */}
        <div 
          className={`absolute h-full w-1 bg-teal-400/60 blur-[2px] transform -skew-x-12 
            ${isHovering ? "animate-[scanline_1.5s_ease-in-out_infinite]" : "opacity-0"}`}
          style={{ 
            left: "-10%", 
            boxShadow: "0 0 15px rgba(45,212,191,0.7)"
          }}
        ></div>
      </div>

      {/* Button content */}
      <div className="relative flex items-center justify-center">
        <span className={`mr-2 transition-transform duration-300 ${isHovering ? "translate-x-0" : "-translate-x-1"}`}>
          {label}
        </span>
        
        {/* Arrow icon with animation */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 transition-all duration-300 ${isHovering ? "translate-x-1 opacity-100" : "opacity-70"}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 7l5 5m0 0l-5 5m5-5H6" 
          />
        </svg>
      </div>

      {/* Click effect - ripple */}
      {isClicking && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-full bg-teal-400/20 animate-ping rounded-md"></div>
          <div className="absolute w-0 h-0 bg-teal-400/40 rounded-full animate-[ripple_0.6s_ease-out_forwards]"></div>
        </div>
      )}
    </button>
  );
};

export default NextButton;