import React from "react";

interface MissingValueStepProps {
  selectedMissing: string | null;
  onSelect: (option: string) => void;
}

interface MissingRow {
  playerId: string;
  hours: number;
  quest: string;
}

const beforeData: MissingRow[] = [
  { playerId: "P1001", hours: 100, quest: "50" },
  { playerId: "P1002", hours: 200, quest: "70" },
  { playerId: "P1003", hours: 150, quest: "--" },
  { playerId: "P1004", hours: 180, quest: "--" },
];

const medianAfterData: MissingRow[] = [
  { playerId: "P1001", hours: 100, quest: "50" },
  { playerId: "P1002", hours: 200, quest: "70" },
  { playerId: "P1003", hours: 150, quest: "60" },
  { playerId: "P1004", hours: 180, quest: "60" },
];

const removeAfterData: MissingRow[] = [
  { playerId: "P1001", hours: 100, quest: "50" },
  { playerId: "P1002", hours: 200, quest: "70" },
];

const MissingValueStep: React.FC<MissingValueStepProps> = ({ selectedMissing, onSelect }) => {
  const options = Object.keys({
    Median: true,
    Remove: true,
  });

  return (
    <div className="mb-6">
      <h3 className="font-bold text-xl mb-2">1) Missing Value Handling</h3>
      <div>
        <h4 className="font-semibold text-lg text-yellow-400">Before Missing Value Handling</h4>
        <table className="min-w-full text-sm text-left text-gray-300 mt-2 border">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-2 py-1 border">Player ID</th>
              <th className="px-2 py-1 border">Hours Played</th>
              <th className="px-2 py-1 border">Quest Exploit Score</th>
            </tr>
          </thead>
          <tbody>
            {beforeData.map((row, idx) => (
              <tr key={idx} className="bg-gray-700">
                <td className="px-2 py-1 border">{row.playerId}</td>
                <td className="px-2 py-1 border">{row.hours}</td>
                <td className="px-2 py-1 border">{row.quest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex space-x-4 mt-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-4 py-2 border rounded transition transform duration-300 ${
              selectedMissing === option ? "bg-yellow-500 text-black scale-105" : "bg-gray-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedMissing && (
        <div className="mt-4">
          <h4 className="font-semibold text-lg text-yellow-400">After Missing Value Handling</h4>
          <table className="min-w-full text-sm text-left text-gray-300 mt-2 border">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-2 py-1 border">Player ID</th>
                <th className="px-2 py-1 border">Hours Played</th>
                <th className="px-2 py-1 border">Quest Exploit Score</th>
              </tr>
            </thead>
            <tbody>
              {(selectedMissing === "Median" ? medianAfterData : removeAfterData).map((row, idx) => (
                <tr key={idx} className="bg-gray-700">
                  <td className="px-2 py-1 border">{row.playerId}</td>
                  <td className="px-2 py-1 border">{row.hours}</td>
                  <td className="px-2 py-1 border">{row.quest}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 italic text-gray-400">
            {selectedMissing === "Median"
              ? "Median imputation fills missing quest scores with 60."
              : "Rows with missing quest scores are removed, reducing overall data."}
          </p>
        </div>
      )}
    </div>
  );
};

export default MissingValueStep;
