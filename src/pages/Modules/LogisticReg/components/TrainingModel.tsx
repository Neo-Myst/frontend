import React from "react";

const TrainingModel: React.FC = () => {
  return (
    <div className="border border-[#06384f] p-6 my-5 bg-gradient-to-b from-[#052740] to-[#031520] rounded-lg shadow-lg">
      <h3 className="text-xl text-[#F2B138] mb-6 font-mono tracking-wide flex items-center">
        <span className="text-teal-400 mr-2">🧠</span>
        TRAINING THE MODEL
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1: Feature Selection */}
        <div className="bg-[#021722] p-4 rounded-lg border border-[#06384f] hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold mr-2">
              1
            </div>
            <h4 className="text-teal-300 font-semibold">Feature Selection</h4>
          </div>
          <p className="text-sm leading-6 text-gray-300">
            Riley fed 12 carefully selected features into his logistic regression model—each chosen to highlight different aspects of suspicious behavior.
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            <span className="text-xs bg-[#052740] px-1 py-0.5 rounded text-teal-300">
              money_per_hour
            </span>
            <span className="text-xs bg-[#052740] px-1 py-0.5 rounded text-teal-300">
              quest_efficiency
            </span>
            <span className="text-xs bg-[#052740] px-1 py-0.5 rounded text-teal-300">
              has_dark_market
            </span>
            <span className="text-xs bg-[#052740] px-1 py-0.5 rounded text-teal-300">
              +9 more
            </span>
          </div>
        </div>

        {/* Step 2: Class Balancing */}
        <div className="bg-[#021722] p-4 rounded-lg border border-[#06384f] hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold mr-2">
              2
            </div>
            <h4 className="text-teal-300 font-semibold">Class Balancing</h4>
          </div>
          <p className="text-sm leading-6 text-gray-300">
            To tackle the rarity of hackers, Riley balanced class weights—giving the rare hacker class a higher impact during training.
          </p>
          <div className="mt-3 flex items-center">
            <span className="text-xs bg-[#052740] px-1 py-0.5 rounded text-teal-300">
              Weighted Loss
            </span>
          </div>
        </div>

        {/* Step 3: Threshold Setting */}
        <div className="bg-[#021722] p-4 rounded-lg border border-[#06384f] hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold mr-2">
              3
            </div>
            <h4 className="text-teal-300 font-semibold">Threshold Setting</h4>
          </div>
          <p className="text-sm leading-6 text-gray-300">
            Rather than an arbitrary cutoff, Riley set a dynamic threshold to minimize false positives while capturing as many potential hackers as possible.
          </p>
          <div className="mt-3 flex items-center">
            <span className="text-xs bg-[#052740] px-1 py-0.5 rounded text-teal-300">
              Dynamic Threshold
            </span>
          </div>
        </div>

        {/* Step 4: Model Validation */}
        <div className="bg-[#021722] p-4 rounded-lg border border-[#06384f] hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold mr-2">
              4
            </div>
            <h4 className="text-teal-300 font-semibold">Model Validation</h4>
          </div>
          <p className="text-sm leading-6 text-gray-300">
            Riley partitioned the dataset into training and testing sets to ensure the model generalizes well. Cross-validation confirmed consistent performance.
          </p>
          <div className="mt-3 flex items-center">
            <span className="text-xs bg-[#052740] px-1 py-0.5 rounded text-teal-300">
              Cross-Validation
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingModel;
