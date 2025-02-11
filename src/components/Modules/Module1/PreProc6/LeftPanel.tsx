import React from "react";
import { useNavigate } from "react-router-dom";

const LeftPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full md:w-1/2 p-12 space-y-8 bg-black text-white relative">
      {/* NeoMyst Logo with Blue Glow */}
      <button
        onClick={() => navigate("/")}
        className="text-3xl font-bold text-blue-400 relative hover:text-blue-300 transition duration-300"
      >
        NeoMyst
        <span className="absolute inset-0 blur-lg opacity-75 text-blue-500">
          NeoMyst
        </span>
      </button>

      {/* Section Subtitle & Archive Label */}
      <div className="flex justify-between items-center text-lg text-gray-400 italic">
        <span>
          | Mergin Realities:{" "}
          <span className="underline">Data Integration</span>
        </span>
        <span className="text-blue-400 underline italic">Archive 1.6</span>
      </div>

      {/* Main Heading */}
      <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
        Riley now has multiple datasets:
        <span className="text-yellow-400">server logs</span>,
        <span className="text-yellow-400">user profiles</span>, and
        <span className="text-yellow-400">transaction records</span>. To solve
        the mystery, these datasets need to be combined into a
        <span className="text-yellow-400">single, cohesive picture</span>.
      </h2>

      <hr className="border-gray-500 w-full" />

      {/* Story Content */}
      <p className="text-lg md:text-xl leading-relaxed text-gray-300">
        Data integration involves combining data from different sources. This
        can be done by:
      </p>

      <ul className="list-disc pl-6 text-lg md:text-xl text-gray-300 space-y-2">
        <li>Merging datasets based on common keys (e.g., user IDs).</li>
        <li>Concatenating datasets if they share the same structure. </li>
      </ul>

      {/* Buttons Section */}
      <div className="flex items-center justify-between pt-6">
        {/* Go Back Button */}
        <button
          onClick={() => navigate("/pages/PreProc5")}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-gray-500 rounded-full relative transition duration-300 
          hover:bg-gray-700 hover:scale-105 hover:shadow-lg"
        >
          <span className="text-xl">&laquo;&laquo;</span>
          <span>Go Back</span>
          <span className="absolute inset-0 blur-lg opacity-50 bg-gray-500 rounded-full"></span>
        </button>

        {/* Investigate Further Button */}
        <button
          onClick={() => navigate("/pages/PreProc7")}
          className="flex items-center space-x-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full relative transition duration-300 
          hover:bg-yellow-400 hover:scale-105 hover:shadow-lg"
        >
          <span>Investigate Further</span>
          <span className="text-xl">&raquo;&raquo;&raquo;</span>
          <span className="absolute inset-0 blur-lg opacity-50 bg-yellow-500 rounded-full"></span>
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;
