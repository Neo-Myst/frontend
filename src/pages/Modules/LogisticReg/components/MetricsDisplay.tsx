import React from "react";

const MetricsDisplay: React.FC = () => {
  return (
    <section className="mb-12">
      <h3 className="text-xl text-[#F2B138] mb-6 relative overflow-hidden pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-400 before:shadow-[0_0_10px_rgba(45,212,191,0.7)]">
        <span className="font-mono tracking-wider text-2xl">
          HOW WELL DID IT WORK
        </span>
      </h3>

      {/* Confusion Matrix Section */}
      <div className="bg-gradient-to-b from-[#052740] to-[#031520] p-6 rounded-lg shadow-lg border border-[#06384f] mb-4 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {/* Left column: Actual Class Labels */}
          <div className="flex flex-col justify-between">
            <div className="flex items-center justify-end pr-4">
              <span className="text-blue-300 text-sm">Normal</span>
            </div>
            <div className="flex items-center justify-end pr-4">
              <span className="text-red-300 text-sm">Hacker</span>
            </div>
          </div>

          {/* Confusion Matrix Content */}
          <div className="flex-1 flex flex-col">
            {/* Top Header Row */}
            <div className="flex mb-2">
              <div className="flex-1 text-center text-blue-300 text-sm">Normal</div>
              <div className="flex-1 text-center text-red-300 text-sm">Hacker</div>
            </div>

            {/* Matrix Cells */}
            <div className="flex flex-col gap-2">
              {/* First Row */}
              <div className="flex gap-2">
                {/* True Negative */}
                <div className="flex-1 bg-[#052740] border border-blue-700/30 rounded-md flex flex-col items-center justify-center p-3">
                  <div className="text-3xl font-bold text-blue-400">9,981</div>
                  <div className="text-xs text-blue-300 uppercase tracking-wider">
                    True Negative
                  </div>
                  <div className="text-xs text-gray-400 mt-1 text-center">
                    Normal players correctly identified
                  </div>
                </div>
                {/* False Positive */}
                <div className="flex-1 bg-[#3A2A22] border border-orange-700/30 rounded-md flex flex-col items-center justify-center p-3">
                  <div className="text-3xl font-bold text-orange-400">1</div>
                  <div className="text-xs text-orange-300 uppercase tracking-wider">
                    False Positive
                  </div>
                  <div className="text-xs text-gray-400 mt-1 text-center">
                    Normal player wrongly flagged
                  </div>
                </div>
              </div>
              {/* Second Row */}
              <div className="flex gap-2">
                {/* False Negative */}
                <div className="flex-1 bg-[#2D1E1E] border border-red-700/30 rounded-md flex flex-col items-center justify-center p-3">
                  <div className="text-3xl font-bold text-red-400">6</div>
                  <div className="text-xs text-red-300 uppercase tracking-wider">
                    False Negative
                  </div>
                  <div className="text-xs text-gray-400 mt-1 text-center">
                    Hackers we missed
                  </div>
                </div>
                {/* True Positive */}
                <div className="flex-1 bg-[#1A2A1A] border border-green-700/30 rounded-md flex flex-col items-center justify-center p-3">
                  <div className="text-3xl font-bold text-green-400">9</div>
                  <div className="text-xs text-green-300 uppercase tracking-wider">
                    True Positive
                  </div>
                  <div className="text-xs text-gray-400 mt-1 text-center">
                    Hackers successfully caught
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom Label */}
            <div className="text-center text-xs text-gray-400 mt-2">
              Predicted Class
            </div>
          </div>

          {/* Right Column: Actual Class Rotated Label */}
          <div className="flex items-center">
            <div className="text-xs text-gray-400 transform rotate-90 origin-center whitespace-nowrap">
              Actual Class
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        <div className="bg-gradient-to-br from-[#052740] to-[#021722] py-4 px-3 rounded-lg shadow-lg border border-[#06384f] text-center">
          <div className="text-sm text-gray-400 mb-1">Accuracy</div>
          <div className="text-teal-400 font-bold text-2xl">99.91%</div>
        </div>
        <div className="bg-gradient-to-br from-[#052740] to-[#021722] py-4 px-3 rounded-lg shadow-lg border border-[#06384f] text-center">
          <div className="text-sm text-gray-400 mb-1">Precision</div>
          <div className="text-teal-400 font-bold text-2xl">90%</div>
        </div>
        <div className="bg-gradient-to-br from-[#052740] to-[#021722] py-4 px-3 rounded-lg shadow-lg border border-[#06384f] text-center">
          <div className="text-sm text-gray-400 mb-1">Recall</div>
          <div className="text-teal-400 font-bold text-2xl">60%</div>
        </div>
        <div className="bg-gradient-to-br from-[#052740] to-[#021722] py-4 px-3 rounded-lg shadow-lg border border-[#06384f] text-center">
          <div className="text-sm text-gray-400 mb-1">AUC</div>
          <div className="text-teal-400 font-bold text-2xl">0.9996</div>
        </div>
      </div>
    </section>
  );
};

export default MetricsDisplay;
