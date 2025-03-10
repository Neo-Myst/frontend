import { useNavigate } from "react-router-dom";
import DataPreviewTable from "../../../components/GameModules/DataPreviewTable";
import DecisionTree from "../../../components/GameModules/StepwisePreprocessing";

const GameModule1Preprocessing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white font-oxanium overflow-y-auto">
      {/* Main Content Wrapper */}
      <div className="p-12 space-y-8 max-w-2xl mx-auto">
        {/* Header Button */}
        <button
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-blue-400 relative hover:text-blue-300 transition duration-300"
        >
          NeoMyst
          <span className="absolute inset-0 blur-lg opacity-75 text-blue-500">
            NeoMyst
          </span>
        </button>

        {/* Narrative Text */}
        <div className="prose prose-invert space-y-4">
          <p>
            Riley took a deep breath, their fingers hovering over the console. The system interface pulsed softly, waiting for the next command.
          </p>
          <p>
            For weeks, Riley had worked tirelessly—cleaning corrupted logs, filling in missing timestamps, normalizing values, and transforming scattered data into something structured and meaningful. Every inconsistency, outlier, and unexplained anomaly had been uncovered and addressed.
          </p>
          <p>
            Now, the system was ready to reveal the full dataset—the final form of NeoVerse’s records, perfectly preprocessed and primed for deeper analysis.
          </p>
          <p>
            <strong className="text-yellow-400">📊 NeoVerse Data Preview:</strong>
          </p>
        </div>

        {/* Data Preview Table */}
        <DataPreviewTable />

        {/* Bullet Points */}
        <div className="mt-4 text-lg text-gray-300">
          <ul className="list-disc pl-6 space-y-2">
            <li>Some players have missing Sync Stability values ("--"). Why?</li>
            <li>Quest Exploit Scores are missing for some players. Could this be intentional?</li>
            <li>Certain Transaction Amounts are blank. Are they errors or deliberate omissions?</li>
          </ul>
        </div>
      </div>

      {/* Full-Width Decision Tree Section */}
      <div className="w-full p-4 bg-gray-900">
        <div className="max-w-2xl mx-auto">
          <DecisionTree />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between p-12 font-oxanium font-medium">
        <button
          onClick={() => navigate("/modules/game-module1/intro")}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-gray-500 rounded-full relative transition duration-300 hover:bg-gray-700 hover:scale-105 hover:shadow-lg"
        >
          <span className="text-xl">&laquo;</span>
          <span>Go Back</span>
          <span className="absolute inset-0 blur-lg opacity-50 bg-gray-500 rounded-full"></span>
        </button>
        <button
          onClick={() => navigate("/modules/game-module1/outliers")}
          className="flex items-center space-x-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full relative transition duration-300 hover:bg-yellow-400 hover:scale-105 hover:shadow-lg"
        >
          <span>Next</span>
          <span className="text-xl">&raquo;</span>
          <span className="absolute inset-0 blur-lg opacity-50 bg-yellow-500 rounded-full"></span>
        </button>
      </div>
    </div>
  );
};

export default GameModule1Preprocessing;
