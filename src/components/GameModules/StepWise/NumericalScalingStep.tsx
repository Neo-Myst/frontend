import React from "react";

interface NumericalScalingStepProps {
  selectedScaling: string | null;
  onSelect: (option: string) => void;
}

interface ScalingRow {
  playerId: string;
  hours: number;
  quest: number;
}

// Sample raw data before scaling for this step.
// This data is assumed to be "clean" (i.e. missing values handled already)
const scalingBeforeData: ScalingRow[] = [
  { playerId: "P1001", hours: 100, quest: 50 },
  { playerId: "P1002", hours: 200, quest: 70 },
  { playerId: "P1003", hours: 150, quest: 60 },
];

const NumericalScalingStep: React.FC<NumericalScalingStepProps> = ({ selectedScaling, onSelect }) => {
  const options = Object.keys({
    Normalized: true,
    Standardized: true,
  });

  // Compute after data based on selected scaling option.
  // For Normalized: assume max hours = 200, max quest = 70.
  // For Standardized: assume mean and std are (150, 50) for hours and (60, 10) for quest.
  const getAfterData = (): ScalingRow[] => {
    if (selectedScaling === "Normalized") {
      return scalingBeforeData.map((row) => ({
        playerId: row.playerId,
        hours: parseFloat((row.hours / 200).toFixed(2)),
        quest: parseFloat((row.quest / 70).toFixed(2)),
      }));
    } else if (selectedScaling === "Standardized") {
      return scalingBeforeData.map((row) => ({
        playerId: row.playerId,
        hours: parseFloat(((row.hours - 150) / 50).toFixed(2)),
        quest: parseFloat(((row.quest - 60) / 10).toFixed(2)),
      }));
    }
    return scalingBeforeData;
  };

  const afterData = getAfterData();

  return (
    <div className="mb-6">
      <h3 className="font-bold text-xl mb-2">3) Numerical Scaling</h3>
      {/* Before Table */}
      <div>
        <h4 className="font-semibold text-lg text-yellow-400">Before Numerical Scaling</h4>
        <table className="min-w-full text-sm text-left text-gray-300 mt-2 border">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-2 py-1 border">Player ID</th>
              <th className="px-2 py-1 border">Hours Played</th>
              <th className="px-2 py-1 border">Quest Exploit Score</th>
            </tr>
          </thead>
          <tbody>
            {scalingBeforeData.map((row, idx) => (
              <tr key={idx} className="bg-gray-700">
                <td className="px-2 py-1 border">{row.playerId}</td>
                <td className="px-2 py-1 border">{row.hours}</td>
                <td className="px-2 py-1 border">{row.quest}</td>
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
              selectedScaling === option ? "bg-yellow-500 text-black scale-105" : "bg-gray-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {/* After Table */}
      {selectedScaling && (
        <div className="mt-4">
          <h4 className="font-semibold text-lg text-yellow-400">After Numerical Scaling</h4>
          <table className="min-w-full text-sm text-left text-gray-300 mt-2 border">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-2 py-1 border">Player ID</th>
                <th className="px-2 py-1 border">Hours Played</th>
                <th className="px-2 py-1 border">Quest Exploit Score</th>
              </tr>
            </thead>
            <tbody>
              {afterData.map((row, idx) => (
                <tr key={idx} className="bg-gray-700">
                  <td className="px-2 py-1 border">{row.playerId}</td>
                  <td className="px-2 py-1 border">{row.hours}</td>
                  <td className="px-2 py-1 border">{row.quest}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 italic text-gray-400">
            {selectedScaling === "Normalized"
              ? "Normalization scales features to a [0,1] range, ensuring comparability."
              : "Standardization centers features around 0 with unit variance, which can aid in convergence."}
          </p>
        </div>
      )}
    </div>
  );
};

export default NumericalScalingStep;
