import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Define the component with explicit type
const GameModule1Outro: React.FC = () => {
  const navigate = useNavigate();
  
  // Log when the component mounts to verify it's being rendered
  useEffect(() => {
    console.log('GameModule1Outro component mounted');
  }, []);

  // Handler for the continue button
  const handleContinue = () => {
    console.log('Navigating to data-splitting page');
    navigate('/module3/data-splitting');
  };

  return (
    <div className="min-h-screen bg-black text-white font-oxanium flex flex-col items-center justify-center px-12">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-yellow-400">Module Complete!</h1>
        <p className="text-lg text-gray-300">
          Riley has successfully navigated the challenges of data preprocessing and outlier removal in NeoVerse.
          The dataset is now clean and structured—a strong foundation for predictive modeling.
        </p>
        <p className="text-lg text-gray-300">
          With outliers removed and key features identified through interactive analysis, Riley is ready to build regression models
          to forecast the next moves of the Shadow Collective.
        </p>
        <p className="text-lg text-gray-300">
          Your insights have shaped the journey so far. Press the button below to continue your adventure into Regression Analysis.
        </p>
      </div>
      <div className="mt-12">
        <motion.button
          onClick={handleContinue}
          whileTap={{ scale: 0.9 }}
          className="px-8 py-4 bg-yellow-500 text-black font-semibold rounded-full transition duration-300 hover:bg-yellow-400 shadow-lg"
        >
          Continue to Regression Analysis &raquo;
        </motion.button>
      </div>
    </div>
  );
};

// Make sure this is exported as default
export default GameModule1Outro;
