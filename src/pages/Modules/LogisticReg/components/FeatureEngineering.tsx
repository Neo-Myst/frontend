import React from "react";

const FeatureEngineering: React.FC = () => {
  return (
    <div className="border border-[#06384f] p-6 my-5 bg-gradient-to-b from-[#052740] to-[#031520] rounded-lg shadow-lg">
      <h3 className="text-xl text-[#F2B138] mb-6 font-mono tracking-wide flex items-center">
        <span className="text-teal-400 mr-2">⚙️</span>
        FEATURE ENGINEERING
      </h3>

      <div className="space-y-6">
        {/* Feature 1: money_per_hour */}
        <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-teal-400 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)] transition-all duration-300">
          <div className="flex items-center mb-3">
            <code className="bg-[#052740] px-3 py-1 rounded-md text-teal-300 font-mono">
              money_per_hour
            </code>
            <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-teal-300">
              Economic Pattern
            </div>
          </div>
          <p className="leading-7 text-gray-300">
            Riley's eyes narrowed at a data point on his screen.{" "}
            <span className="italic text-teal-300">
              "Look at this player—they've spent 50,000 credits in just three hours of gameplay."
            </span>{" "}
            He created a ratio dividing total spending by hours played, revealing suspicious economic patterns.
          </p>
        </div>

        {/* Feature 2: quest_efficiency */}
        <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-[#F2B138] hover:shadow-[0_0_15px_rgba(242,177,56,0.3)] transition-all duration-300">
          <div className="flex items-center mb-3">
            <code className="bg-[#052740] px-3 py-1 rounded-md text-[#F2B138] font-mono">
              quest_efficiency
            </code>
            <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-[#F2B138]">
              Gameplay Anomaly
            </div>
          </div>
          <p className="leading-7 text-gray-300">
            <span className="italic text-[#F2B138]">
              "This player completed the Dragon's Lair quest in two minutes,"
            </span>{" "}
            Riley noted—this was physically impossible without code manipulation. By dividing quest completion scores by time played, he highlighted players moving through content at superhuman speeds.
          </p>
        </div>

        {/* Feature 3: crime_ratio */}
        <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-teal-400 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)] transition-all duration-300">
          <div className="flex items-center mb-3">
            <code className="bg-[#052740] px-3 py-1 rounded-md text-teal-300 font-mono">
              crime_ratio
            </code>
            <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-teal-300">
              Behavioral Indicator
            </div>
          </div>
          <p className="leading-7 text-gray-300">
            By calculating the ratio of reported crimes to gameplay hours, Riley exposed players with disproportionately high criminal activity.
          </p>
        </div>

        {/* Feature 4: login_pattern_variation */}
        <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-[#F2B138] hover:shadow-[0_0_15px_rgba(242,177,56,0.3)] transition-all duration-300">
          <div className="flex items-center mb-3">
            <code className="bg-[#052740] px-3 py-1 rounded-md text-[#F2B138] font-mono">
              login_pattern_variation
            </code>
            <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-[#F2B138]">
              Pattern Anomaly
            </div>
          </div>
          <p className="leading-7 text-gray-300">
            Analyzing login times and IP changes, Riley detected irregular login patterns that signaled suspicious behavior.
          </p>
        </div>

        {/* Feature 5: ip_change_frequency */}
        <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-teal-400 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)] transition-all duration-300">
          <div className="flex items-center mb-3">
            <code className="bg-[#052740] px-3 py-1 rounded-md text-teal-300 font-mono">
              ip_change_frequency
            </code>
            <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-teal-300">
              Security Indicator
            </div>
          </div>
          <p className="leading-7 text-gray-300">
            Frequent IP changes in a short time alerted Riley to the use of VPNs or proxies to disguise true locations.
          </p>
        </div>

        {/* Feature 6: suspicious_behavior_index */}
        <div className="bg-[#021722] bg-opacity-60 p-4 rounded-lg border-l-4 border-[#F2B138] hover:shadow-[0_0_15px_rgba(242,177,56,0.3)] transition-all duration-300">
          <div className="flex items-center mb-3">
            <code className="bg-[#052740] px-3 py-1 rounded-md text-[#F2B138] font-mono">
              suspicious_behavior_index
            </code>
            <div className="ml-auto bg-[#06384f] text-xs px-2 py-1 rounded-full text-[#F2B138]">
              Composite Metric
            </div>
          </div>
          <p className="leading-7 text-gray-300">
            Combining multiple signals, Riley engineered an index that quantifies overall suspicious behavior, simplifying the prioritization of potential hackers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureEngineering;
