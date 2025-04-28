import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageNavigation from "../../../navigation/PageNavigation";

const LeftPanel: React.FC = () => {
  const navigate = useNavigate();


  return (
    <div className="w-full md:w-1/2 p-12 bg-black text-white relative flex flex-col h-screen overflow-y-auto font-oxanium">
      <div className="flex-grow space-y-8">
        <motion.button
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-blue-400 relative hover:text-blue-300 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          NeoMyst
          <span className="absolute inset-0 blur-lg opacity-75 text-blue-500">NeoMyst</span>
        </motion.button>

        <div className="flex justify-between items-center text-lg text-gray-400 italic">
          <span>| Feature Selection: Uncovering the Key Clues</span>
          <span className="text-blue-400 underline italic">Archive 2.3</span>
        </div>

        <motion.h2 
          className="text-xl md:text-2xl font-bold text-white leading-relaxed"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Riley needs to identify which data features are most important. 
          <span className="text-yellow-400">"To solve this mystery, I need to focus on what truly matters."</span>
        </motion.h2>

        <motion.hr 
          className="border-gray-500 w-full" 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.7 }}
        />

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="space-y-4">
            <h3 className="text-xl text-yellow-400 font-semibold">The Challenge</h3>
            
            <p className="text-lg leading-relaxed text-gray-300">
              Not all data is equally valuable. Riley needs to identify which features matter most for solving the NeoVerse mystery.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-300">
              With hundreds of data points available, Riley needs to separate the critical information from the noise. 
              This is similar to a detective focusing on key evidence while ignoring red herrings.
            </p>
          </div>
          
          <div className="space-y-4 mt-8">
            <h3 className="text-xl text-yellow-400 font-semibold">Method 1: Principal Component Analysis (PCA)</h3>
            
            <p className="text-lg leading-relaxed text-gray-300">
              PCA condenses multiple features into a smaller set of components that capture most of the important information.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-300">
              <span className="text-blue-400 font-semibold">How it works:</span> PCA transforms the original data into "principal components" - new variables that:
            </p>
            
            <ul className="list-disc pl-8 space-y-2 text-gray-300 text-lg">
              <li>Are ordered by how much data variation they explain</li>
              <li>Are combinations of the original features</li>
              <li>Allow Riley to reduce dimensionality while keeping most of the information</li>
            </ul>
            
            <p className="text-lg leading-relaxed text-gray-300 italic">
              <span className="text-yellow-400">"The first few components capture most of the story,"</span> Riley observes. "I can focus on these instead of getting lost in every detail."
            </p>
          </div>
          
          <div className="space-y-4 mt-8">
            <h3 className="text-xl text-yellow-400 font-semibold">Method 2: Random Forest Feature Importance</h3>
            
            <p className="text-lg leading-relaxed text-gray-300">
              Random Forest ranks features by how much they contribute to predicting outcomes, creating a clear hierarchy of importance.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-300">
              <span className="text-blue-400 font-semibold">Key benefits:</span>
            </p>
            
            <ul className="list-disc pl-8 space-y-2 text-gray-300 text-lg">
              <li>Directly measures how each feature impacts prediction accuracy</li>
              <li>Produces a ranked list showing which features matter most</li>
              <li>Identified Hours Played, Transaction Amount, and Player Level as top contributors</li>
            </ul>
            
            <p className="text-lg leading-relaxed text-gray-300 italic">
              <span className="text-yellow-400">"Now I know which variables are the real game-changers,"</span> Riley notes, marking the top-ranked features for further analysis.
            </p>
          </div>
          
          <div className="space-y-4 mt-8">
            <h3 className="text-xl text-yellow-400 font-semibold">The Outcome</h3>
            
            <p className="text-lg leading-relaxed text-gray-300">
              By combining PCA and Random Forest, Riley identifies the most important features for solving the NeoVerse mystery.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-300">
              With a refined set of features, Riley can now:
            </p>
            
            <ul className="list-disc pl-8 space-y-2 text-gray-300 text-lg">
              <li>Build more accurate and efficient machine learning models</li>
              <li>Focus analysis on the most relevant data</li>
              <li>Avoid being misled by irrelevant information</li>
              <li>Gain clearer insights into what's causing the NeoVerse instability</li>
            </ul>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <PageNavigation 
          goBackRoute="/pages/Eda2" 
          investigateRoute="/pages/EdaOuter" 
          checkInvestigate={true}
        />
      </motion.div>
    </div>
  );
};

export default LeftPanel;
