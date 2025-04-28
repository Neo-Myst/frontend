import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageNavigation from "../../../navigation/PageNavigation";

const LeftPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Correlation data from the heatmap
  const correlationData = [
    { feature1: 'Hours Played', feature2: 'Money Spent', correlation: 0.78, insight: 'Players who spend more time in-game tend to spend more money.' },
    { feature1: 'Hours Played', feature2: 'Quest Exploit Score', correlation: 0.56, insight: 'More playtime moderately increases quest completion rates.' },
    { feature1: 'Hours Played', feature2: 'Neural Link Stability', correlation: -0.32, insight: 'Longer play sessions slightly decrease neural link stability.' },
    { feature1: 'Money Spent', feature2: 'Quest Exploit Score', correlation: 0.45, insight: 'Spending has some positive effect on quest completion.' },
    { feature1: 'Quest Exploit Score', feature2: 'Neural Link Stability', correlation: -0.68, insight: 'Higher quest activity strongly correlates with reduced stability.' },
  ];

  const handleSectionClick = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

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
          <span>| Identifying Trends and Correlations</span>
          <span className="text-blue-400 underline italic">Archive 2.2</span>
        </div>

        <motion.h2 
          className="text-xl md:text-2xl font-bold text-white leading-relaxed"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Riley now explores the <span className="text-yellow-400">relationships between features</span> to uncover hidden patterns in the NeoMyst player data.
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
          <motion.div 
            className={`p-4 rounded-lg border border-gray-700 ${activeSection === 'heatmap' ? 'bg-gray-900 border-blue-500' : 'hover:bg-gray-900 hover:border-gray-600'} cursor-pointer transition-all duration-300`}
            onClick={() => handleSectionClick('heatmap')}
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-xl text-yellow-400 font-semibold mb-3 flex items-center">
              <span className="mr-2">Correlation Heatmap Analysis</span>
              <span className="text-sm text-blue-400">{activeSection === 'heatmap' ? '(expanded)' : '(click to expand)'}</span>
            </h3>
            
            <p className="text-lg leading-relaxed text-gray-300">
              Riley generates a correlation heatmap to visualize relationships between features. The heatmap reveals a strong positive correlation (0.78) between Hours Played and Money Spent, while Neural Link Stability shows negative correlations with other metrics, especially Quest Exploit Score (-0.68).
            </p>
            
            {activeSection === 'heatmap' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-4"
              >
                {/* Enhanced Heatmap Image with Caption */}
                <div className="w-full h-auto flex flex-col items-center">
                  <div className="relative group">
                    <img 
                      src="/src/assets/heatmap.png" 
                      alt="Correlation Heatmap Visualization" 
                      className="max-w-full h-auto rounded-lg shadow-lg border border-gray-700 hover:brightness-110 transition-all duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 rounded-lg">
                      <p className="text-white text-sm">Click on the heatmap to explore specific correlations</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2 italic">Figure 1: Correlation heatmap showing relationships between NeoMyst game features</p>
                </div>
                
                {/* Key Correlations Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs uppercase bg-gray-800 text-gray-400">
                      <tr>
                        <th className="px-4 py-2">Feature Pair</th>
                        <th className="px-4 py-2">Correlation</th>
                        <th className="px-4 py-2">Strength</th>
                        <th className="px-4 py-2">Insight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {correlationData.map((item, index) => (
                        <tr key={index} className="border-b border-gray-700 hover:bg-gray-800">
                          <td className="px-4 py-3">{item.feature1} & {item.feature2}</td>
                          <td className="px-4 py-3">
                            <span 
                              className={`px-2 py-1 rounded ${
                                item.correlation > 0.8 ? 'bg-green-900 text-green-200' : 
                                item.correlation > 0.6 ? 'bg-blue-900 text-blue-200' : 
                                'bg-yellow-900 text-yellow-200'
                              }`}
                            >
                              {item.correlation}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {item.correlation > 0.8 ? 'Strong' : item.correlation > 0.6 ? 'Moderate' : 'Weak'}
                          </td>
                          <td className="px-4 py-3 text-gray-400">{item.insight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </motion.div>
          

          

        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 mb-6">
          <h3 className="text-yellow-400 font-semibold mb-2">Key Findings:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>Strong correlation (0.78) between Hours Played and Money Spent shows engagement drives monetization</li>
            <li>Significant negative correlation (-0.68) between Quest Exploit Score and Neural Link Stability indicates technical challenges</li>
            <li>Moderate correlation (0.56) between Hours Played and Quest Exploit Score shows active players complete more quests</li>
            <li>The heatmap reveals that gameplay, spending, and technical stability are interconnected systems</li>
          </ul>
        </div>
        
        <PageNavigation 
          goBackRoute="/pages/Eda1" 
          investigateRoute="/pages/Eda3" 
          checkInvestigate={true}
        />
      </motion.div>
    </div>
  );
};

export default LeftPanel;
