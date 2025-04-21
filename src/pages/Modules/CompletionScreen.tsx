import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const CompletionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(true);
  const [particlesCreated, setParticlesCreated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Final message that summarizes the journey
  const finalMessage =
    "MISSION COMPLETE: The Shadow Collective has been exposed. Through your mastery of data science techniques, you've uncovered the truth behind NeoVerse's collapse.\n\n" +
    "SKILLS MASTERED:\n" +
    "• Data Preprocessing & Cleaning\n" +
    "• Exploratory Data Analysis (EDA)\n" +
    "• Outlier Detection\n" +
    "• Feature Selection with Random Forest\n" +
    "• Linear Regression\n" +
    "• Logistic Regression\n" +
    "• Model Evaluation & Metrics\n\n" +
    "The digital world is now ready for restoration.\n\n" +
    "CREDITS:\n" +
    "Developed by Dhruv Vaghasiya, Vedant Mhatre and Shubam Khantwal";

  // Memoize the createParticles function to avoid dependency issues
  // IMPORTANT: Define this BEFORE any useEffect that calls it
  const createParticles = useCallback(() => {
    // Only create particles once
    if (!containerRef.current || particlesCreated) return;

    setParticlesCreated(true);
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    // Data science terms to display as particles
    const terms = [
      "Preprocessing",
      "EDA",
      "Outliers",
      "Heatmaps",
      "Random Forest",
      "Linear Regression",
      "Logistic Regression",
      "Feature Selection",
      "Data Cleaning",
      "Normalization",
      "Prediction",
      "Classification",
      "NeoVerse",
      "Shadow Collective",
    ];

    // Create fewer particles (15 instead of 30)
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div");

      // Random term
      const term = terms[Math.floor(Math.random() * terms.length)];
      particle.innerText = term;

      // Styling
      particle.style.position = "absolute";
      particle.style.color = `rgba(${Math.random() * 100 + 155}, ${
        Math.random() * 100 + 155
      }, ${Math.random() * 155 + 100}, ${Math.random() * 0.3 + 0.3})`; // More transparent
      particle.style.fontSize = `${Math.random() * 8 + 8}px`;
      particle.style.fontFamily = "monospace";
      particle.style.whiteSpace = "nowrap";
      particle.style.zIndex = "5"; // Lower z-index so they don't interfere with reading

      // Random position - keep away from the center terminal area
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      let x = Math.random() * containerRect.width;
      let y = Math.random() * containerRect.height;

      // Ensure particles don't overlap with the central terminal
      const centerWidth = 600; // Approximate width of terminal
      const centerHeight = 400; // Approximate height of terminal

      // If particle would be in the center area, move it to the edges
      if (
        Math.abs(x - centerX) < centerWidth / 2 &&
        Math.abs(y - centerY) < centerHeight / 2
      ) {
        if (Math.random() > 0.5) {
          x =
            Math.random() > 0.5
              ? centerX + centerWidth / 2 + Math.random() * 100
              : centerX - centerWidth / 2 - Math.random() * 100;
        } else {
          y =
            Math.random() > 0.5
              ? centerY + centerHeight / 2 + Math.random() * 100
              : centerY - centerHeight / 2 - Math.random() * 100;
        }
      }

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      // Animation - slower and less distracting
      particle.style.animation = `float ${
        Math.random() * 15 + 15
      }s linear infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;

      container.appendChild(particle);
    }
  }, [particlesCreated]);

  // Add styles for the scrollbar directly in the component
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement("style");
    // Define scrollbar styles
    const scrollbarStyles = `
      /* Webkit browsers (Chrome, Safari, Edge) */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(0, 30, 60, 0.5);
        border-radius: 4px;
        box-shadow: inset 0 0 5px rgba(0, 200, 255, 0.1);
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, rgba(0, 210, 255, 0.7), rgba(0, 100, 200, 0.7));
        border-radius: 4px;
        border: 1px solid rgba(0, 255, 255, 0.3);
        animation: scrollbarGlow 2s infinite;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, rgba(0, 255, 255, 0.8), rgba(0, 150, 255, 0.8));
        box-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
      }
      
      @keyframes scrollbarGlow {
        0% { box-shadow: 0 0 2px rgba(0, 255, 255, 0.3); }
        50% { box-shadow: 0 0 6px rgba(0, 255, 255, 0.6); }
        100% { box-shadow: 0 0 2px rgba(0, 255, 255, 0.3); }
      }
    `;

    styleEl.innerHTML = scrollbarStyles;
    document.head.appendChild(styleEl);

    // Cleanup function
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // Split the initialization effect from the phase-dependent effects
  useEffect(() => {
    // This effect should only run once when the component mounts
    const timers: NodeJS.Timeout[] = [];

    // Initial delay
    const timer1 = setTimeout(() => setPhase(1), 800);
    timers.push(timer1);

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle phase transitions separately
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    if (phase === 1) {
      // Transition from phase 1 to 2
      const timer2 = setTimeout(() => setPhase(2), 1000);
      timers.push(timer2);
    } else if (phase === 2) {
      // Start typing animation
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index <= finalMessage.length) {
          setTypedText(finalMessage.substring(0, index));
          index += 2; // Type faster by incrementing by 2
        } else {
          clearInterval(typingInterval);
          const timer3 = setTimeout(() => setPhase(3), 500);
          timers.push(timer3);
        }
      }, 15); // Faster typing speed

      // Cleanup for typing interval
      return () => {
        clearInterval(typingInterval);
        timers.forEach((timer) => clearTimeout(timer));
      };
    } else if (phase === 3) {
      // Handle phase 3 animations
      const timer4 = setTimeout(() => {
        setGlitchEffect(true);
        const timer5 = setTimeout(() => {
          setGlitchEffect(false);
          // Hide the scanner line when the glitch effect completes
          setScannerVisible(false);
        }, 200);
        timers.push(timer5);
      }, 300);
      timers.push(timer4);

      // Create particles only once when we reach phase 3
      if (containerRef.current) {
        // Use setTimeout to ensure this runs after the DOM has updated
        const particleTimer = setTimeout(() => createParticles(), 300);
        timers.push(particleTimer);
      }
    }

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [phase, finalMessage, createParticles]);

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden
        ${glitchEffect ? "animate-glitch" : ""}`}
    >
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Animated scanner line - only appears once */}
      {scannerVisible && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-teal-400 to-transparent absolute animate-scanner"></div>
        </div>
      )}

      {/* Central content */}
      <div className="z-10 max-w-4xl w-full mx-auto px-6 py-12">
        {phase >= 1 && (
          <div className="text-center mb-8 animate-fadeIn">
            <h1 className="text-5xl font-bold text-teal-400 mb-4 font-mono relative inline-block">
              MISSION ACCOMPLISHED
              <span className="absolute -inset-1 opacity-30 blur-md text-teal-300">
                MISSION ACCOMPLISHED
              </span>
            </h1>
          </div>
        )}

        {/* Terminal - always visible when phase >= 2 */}
        {phase >= 2 && (
          <div className="bg-[#011A27] border border-teal-900 rounded-lg p-6 mb-8 shadow-lg shadow-teal-900/20 animate-fadeIn">
            <div className="flex items-center mb-4 border-b border-teal-900 pb-2">
              {/* Just display the dots without click handler */}
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-teal-400 font-mono text-sm">
                terminal@neomyst ~ riley_secure_connection
              </span>
            </div>

            {/* Added custom sci-fi scrollbar styling with Tailwind and inline CSS */}
            <div
              className="font-mono text-sm text-teal-300 whitespace-pre-line leading-relaxed max-h-[400px] overflow-y-auto p-2 relative"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 210, 255, 0.7) rgba(0, 30, 60, 0.5)",
              }}
            >
              {/* Scanline overlay effect */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%)",
                  backgroundSize: "100% 4px",
                }}
              ></div>

              {/* Terminal content */}
              <div className="relative z-0">
                <span className="text-green-400">riley@neomyst:~$</span>{" "}
                <span className="text-white">decrypt final_analysis.dat</span>
                <br />
                <span className="text-yellow-400">[DECRYPTION COMPLETE]</span>
                <br />
                <span className="text-white">{typedText}</span>
                <span
                  className={`inline-block w-2 h-4 bg-white ml-1 ${
                    phase >= 3 ? "animate-blink" : ""
                  }`}
                ></span>
              </div>
            </div>
          </div>
        )}

        {phase >= 3 && (
          <div className="animate-fadeIn">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-[#052740] p-4 rounded-lg border border-teal-900 text-center w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]">
                <div className="text-4xl font-bold text-teal-400 mb-2">
                  100%
                </div>
                <div className="text-xs text-teal-300 uppercase tracking-wider">
                  Mission Success
                </div>
              </div>

              <div className="bg-[#052740] p-4 rounded-lg border border-teal-900 text-center w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]">
                <div className="text-4xl font-bold text-[#F2B138] mb-2">7</div>
                <div className="text-xs text-[#F2B138] uppercase tracking-wider">
                  ML Techniques Mastered
                </div>
              </div>

              <div className="bg-[#052740] p-4 rounded-lg border border-teal-900 text-center w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]">
                <div className="text-4xl font-bold text-purple-400 mb-2">1</div>
                <div className="text-xs text-purple-400 uppercase tracking-wider">
                  Digital World Saved
                </div>
              </div>

              <div className="bg-[#052740] p-4 rounded-lg border border-teal-900 text-center w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]">
                <div className="text-4xl font-bold text-green-400 mb-2">
                  99.9%
                </div>
                <div className="text-xs text-green-400 uppercase tracking-wider">
                  Model Accuracy
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate("/")}
                className="group relative px-8 py-3 bg-[#031520] border border-teal-400/30 rounded-md font-mono text-teal-300 hover:bg-[#052740] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/10 to-teal-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="relative">RETURN TO MAIN TERMINAL</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-400/10 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#F2B138]/10 to-transparent rounded-tr-full"></div>
    </div>
  );
};

export default CompletionScreen;
