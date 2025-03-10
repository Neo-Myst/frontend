import React from "react";

interface CategoricalEncodingStepProps {
  selectedCategorical: string | null;
  onSelect: (option: string) => void;
}

const beforeData = [
  { playerId: "P1001", level: "Beginner" },
  { playerId: "P1002", level: "Advanced" },
  { playerId: "P1003", level: "Intermediate" },
];

const CategoricalEncodingStep: React.FC<CategoricalEncodingStepProps> = ({ selectedCategorical, onSelect }) => {
  const options = Object.keys({
    Label: true,
    OneHot: true,
  });

  // For the after table, we update the "Player Level" column based on the selected option.
  const getAfterData = () => {
    return beforeData.map((row) => {
      let newLevel = row.level;
      if (selectedCategorical === "Label") {
        // For Label encoding, we assign numbers (example mapping)
        if (row.level === "Beginner") newLevel = "0";
        else if (row.level === "Advanced") newLevel = "2";
        else if (row.level === "Intermediate") newLevel = "1";
      } else if (selectedCategorical === "OneHot") {
        // For OneHot encoding, we assign array-like strings (example mapping)
        if (row.level === "Beginner") newLevel = "[1,0,0]";
        else if (row.level === "Advanced") newLevel = "[0,1,0]";
        else if (row.level === "Intermediate") newLevel = "[0,0,1]";
      }
      return { ...row, level: newLevel };
    });
  };

  const afterData = getAfterData();

  return (
    <div className="mb-6">
      <h3 className="font-bold text-xl mb-2">2) Categorical Encoding</h3>
      {/* Before Table */}
      <div>
        <h4 className="font-semibold text-lg text-yellow-400">Before Categorical Encoding</h4>
        <table className="min-w-full text-sm text-left text-gray-300 mt-2 border">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-2 py-1 border">Player ID</th>
              <th className="px-2 py-1 border">Player Level</th>
            </tr>
          </thead>
          <tbody>
            {beforeData.map((row, idx) => (
              <tr key={idx} className="bg-gray-700">
                <td className="px-2 py-1 border">{row.playerId}</td>
                <td className="px-2 py-1 border">{row.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Options */}
      <div className="flex space-x-4 mt-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-4 py-2 border rounded transition transform duration-300 ${
              selectedCategorical === option ? "bg-yellow-500 text-black scale-105" : "bg-gray-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {/* After Table */}
      {selectedCategorical && (
        <div className="mt-4">
          <h4 className="font-semibold text-lg text-yellow-400">After Categorical Encoding</h4>
          <table className="min-w-full text-sm text-left text-gray-300 mt-2 border">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-2 py-1 border">Player ID</th>
                <th className="px-2 py-1 border">Player Level</th>
              </tr>
            </thead>
            <tbody>
              {afterData.map((row, idx) => (
                <tr key={idx} className="bg-gray-700">
                  <td className="px-2 py-1 border">{row.playerId}</td>
                  <td className="px-2 py-1 border">{row.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 italic text-gray-400">
            {selectedCategorical === "Label"
              ? "Label encoding assigns numeric values to categories, which can imply order."
              : "One-hot encoding represents each category with a binary vector, avoiding any implicit order."}
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoricalEncodingStep;
