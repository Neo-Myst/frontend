import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageNavigation from "../../../components/navigation/PageNavigation";

const IntroPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl w-full space-y-6"
        >
          <button
            onClick={() => navigate("/")}
            className="text-3xl font-bold text-[#66c0f4] relative hover:text-[#4fa3e3] transition duration-300 mb-8 font-mono"
          >
            NeoMyst
            <span className="absolute inset-0 blur-lg opacity-75 text-[#66c0f4]">
              NeoMyst
            </span>
          </button>
          <motion.h2 
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-semibold mb-4 text-green-400 hover:text-green-300 transition-colors"
          >
            Chapter 4 – Predictive Protocol: Echoes of the Future
          </motion.h2>
          <motion.h3
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-semibold mb-4 text-yellow-400"
          >
            Mission: Forecast Player Spending to Disrupt the Shadow Collective's Economic Network
          </motion.h3>
          <div className="text-lg space-y-4 font-mono text-gray-300">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hover:text-gray-100 transition-colors"
            >
              Riley stared at the screen as streams of prediction data flowed across the neural grid. 
              The Shadow Collective was no longer hiding—they were manipulating spending behavior 
              across NeoVerse to destabilize the economy.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              "Something's off… Player P3021 was predicted to spend $3,200, but their actual 
              spending was only $1,200. That's a massive gap," Riley muttered.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="hover:text-gray-100 transition-colors"
            >
              "They're distorting patterns to fool our models."
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="hover:text-gray-100 transition-colors"
            >
              This wasn't just about behavior prediction anymore. It was a digital war of deception. 
              The only way to fight back? Build a regression model sharp enough to forecast player 
              behavior—even when the Shadow Collective tries to throw it off course.
            </motion.p>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="w-full max-w-5xl mt-16">
          <PageNavigation
            goBackRoute="/module3/data-splitting"
            investigateRoute="/module3/regression"
          />
        </div>
      </div>
    </div>
  );
};

export default IntroPage;