import React from "react";

const Labeling: React.FC = () => {
  return (
    <div className="border border-[#06384f] p-6 my-5 bg-gradient-to-b from-[#052740] to-[#031520] rounded-lg shadow-lg">
      <h3 className="text-xl text-[#F2B138] mb-6 font-mono tracking-wide flex items-center">
        <span className="text-teal-400 mr-2">🏷️</span>
        LABELING
      </h3>

      <div className="bg-[#021722] bg-opacity-80 p-5 rounded-lg border border-[#06384f] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-400/10 to-transparent rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#F2B138]/10 to-transparent rounded-tr-full"></div>

        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Left side - Visualization with fixed threshold */}
          <div className="w-full md:w-1/3 bg-[#011A27] p-4 rounded-lg border border-[#06384f] shadow-inner">
            <div className="text-center mb-3 text-sm text-gray-400">
              SUSPICION THRESHOLD
            </div>
            <div className="h-40 relative bg-gradient-to-t from-[#021722] to-[#052740] rounded-md overflow-hidden">
              {/* Normal players area (99.8%) */}
              <div className="absolute bottom-0 left-0 right-0 h-[80%] bg-gradient-to-t from-[#021722] to-[#031520]"></div>

              {/* Threshold line */}
              <div className="absolute bottom-[80%] left-0 right-0 flex items-center">
                <div className="h-px w-full bg-red-500"></div>
                <div className="absolute right-2 bg-red-500 text-xs text-white px-1 py-0.5 rounded-sm">
                  99.8%
                </div>
              </div>

              {/* Suspicious area (0.2%) */}
              <div className="absolute top-0 left-0 right-0 h-[20%] bg-gradient-to-b from-red-500/10 to-transparent"></div>

              {/* Dots representing suspicious players */}
              <div className="absolute bottom-[85%] left-[20%] w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-[90%] left-[70%] w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-[87%] left-[40%] w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div className="mt-3 text-xs text-center text-gray-400">
              Top 0.2% flagged as potential hackers
            </div>
          </div>

          {/* Right side - Explanation */}
          <div className="w-full md:w-2/3">
            <p className="mb-4 text-left leading-7">
              In this labeling stage, the system assigns a suspicion threshold at the 99.8th percentile of player metrics.
              Players falling below this threshold are considered normal, while those above are flagged as potential hackers.
            </p>
            <p className="mb-4 text-left leading-7">
              By visualizing this threshold, Riley can quickly identify outliers.
              This labeled data helps train the detection model by clearly separating the "digital wheat" from the "chaff".
            </p>
            <p className="mb-4 text-left leading-7">
              The resulting target variable guides the model in learning the subtle differences between typical and suspicious behavior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labeling;
