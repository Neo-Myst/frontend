import React from "react";
import { useNavigate } from "react-router-dom";
import PageNavigation from "../../../navigation/PageNavigation";

const LeftPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full md:w-1/2 p-12 bg-black text-white relative flex flex-col h-screen overflow-y-auto font-oxanium">
      <div className="flex-grow space-y-8">
        <button
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-blue-400 relative hover:text-blue-300 transition duration-300"
        >
          NeoMyst
          <span className="absolute inset-0 blur-lg opacity-75 text-blue-500">NeoMyst</span>
        </button>

        <div className="flex justify-between items-center text-lg text-gray-400 italic">
          <span>| Identifying Trends and Correlations</span>
          <span className="text-blue-400 underline italic">Archive 2.2</span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
          After visualizing the data, Riley’s next task is to uncover the hidden relationships between features.
        </h2>

        <hr className="border-gray-500 w-full" />

        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          Riley starts by generating a heatmap that displays the correlation coefficients between all pairs of features. This visual tool uses colors to indicate the strength of relationships: dark hues might indicate strong correlations, while lighter ones suggest weaker ties. For instance, if Hours Played and Money Spent show a dark color, it suggests a strong positive relationship between them.
        </p>

        {/* Heatmap Image Display with Updated Styling */}
        <div className="w-full h-auto flex justify-center items-center">
          <img src="/src/assets/heatmap.png" alt="Heatmap Visualization" className="max-w-full h-auto brightness-90 contrast-110" />
        </div>

        <p className="text-lg md:text-xl leading-relaxed text-gray-300 mt-4">
          Riley might also explore line charts if the data includes any time-series elements, to see how trends evolve over time. The combination of a heatmap and focused scatterplots gives a comprehensive picture of how the features interact, allowing Riley to pinpoint which variables are most interconnected and relevant to the investigation.
        </p>
      </div>

      <PageNavigation 
        goBackRoute="/pages/Eda1" 
        investigateRoute="/pages/Eda3" 
        checkInvestigate={true}
      />
    </div>
  );
};

export default LeftPanel;
