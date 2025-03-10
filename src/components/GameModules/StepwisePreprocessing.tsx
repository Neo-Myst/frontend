import React, { useState } from "react";
import MissingValueStep from "./StepWise/MissingValueStep";
import CategoricalEncodingStep from "./StepWise/CategoricalEncodingStep";
import NumericalScalingStep from "./StepWise/NumericalScalingStep";

const StepwisePreprocessing: React.FC = () => {
  // Global states for selected options
  const [selectedMissing, setSelectedMissing] = useState<string | null>(null);
  const [selectedCategorical, setSelectedCategorical] = useState<string | null>(null);
  const [selectedScaling, setSelectedScaling] = useState<string | null>(null);
  const [hintUsed, setHintUsed] = useState<boolean>(false);
  const [displayedHint, setDisplayedHint] = useState<string>("");

  // "Correct" path for this dataset
  const correctMissing = "Median";
  const correctCategorical = "OneHot";
  const correctScaling = "Normalized";

  const allChosen = selectedMissing && selectedCategorical && selectedScaling;
  const isCorrect =
    selectedMissing === correctMissing &&
    selectedCategorical === correctCategorical &&
    selectedScaling === correctScaling;

  const correctPathExplanation = `Great job! Riley's selections—using ${correctMissing} for missing values, ${correctCategorical} for encoding, and ${correctScaling} for scaling—are ideal for this dataset.`;
  const incorrectPathExplanation = `Your selections might lead to suboptimal performance. Removing rows or using label encoding might result in data loss or misleading interpretations.`;

  let currentStepHint = "";
  if (!selectedMissing) {
    currentStepHint = "Hint: Using the median often preserves the data distribution.";
  } else if (!selectedCategorical) {
    currentStepHint = "Hint: One-hot encoding avoids imposing an order.";
  } else if (!selectedScaling) {
    currentStepHint = "Hint: Normalization scales data uniformly.";
  }

  return (
    <div className="p-4 bg-gradient-to-b from-gray-800 to-black text-white max-w-2xl mx-auto space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-bold mb-4 text-yellow-400">Data Preprocessing Adventure</h2>
      <p className="leading-relaxed">
        Riley is on a mission to transform raw NeoVerse data into a refined dataset ready for predictive modeling.
        In this challenge, you'll decide how to handle missing values, encode categorical variables, and scale numerical features.
        Review the "Before" tables for each step to understand the current state of the data, then choose an option to see how it transforms the data.
        Hover over each option for a brief explanation. Once all steps are complete, you'll receive feedback on your final path.
      </p>
      <MissingValueStep selectedMissing={selectedMissing} onSelect={(opt) => {
        setSelectedMissing(opt);
        setSelectedCategorical(null);
        setSelectedScaling(null);
      }} />
      {selectedMissing && (
        <CategoricalEncodingStep
          selectedCategorical={selectedCategorical}
          onSelect={(opt) => {
            setSelectedCategorical(opt);
            setSelectedScaling(null);
          }}
        />
      )}
      {selectedCategorical && (
        <NumericalScalingStep
          selectedScaling={selectedScaling}
          onSelect={(opt) => setSelectedScaling(opt)}
        />
      )}

      {/* Global Hint Button */}
      {(!selectedMissing || !selectedCategorical || !selectedScaling) && (
        <div className="mt-4">
          <button
            onClick={() => {
              if (!hintUsed) {
                setDisplayedHint(currentStepHint);
                setHintUsed(true);
              } else {
                alert("You have already used your available hint.");
              }
            }}
            title={!hintUsed ? "You can only use hint once" : "You have already used your 1 available hint"}
            className="px-4 py-2 border rounded bg-blue-500 text-white transition transform duration-300 hover:scale-105"
          >
            Show Hint
          </button>
          {displayedHint && (
            <p className="mt-2 text-sm italic text-gray-400">{displayedHint}</p>
          )}
        </div>
      )}

      {allChosen && (
        <div className="mt-6 border-t border-gray-700 pt-4">
          <p className="mb-2 text-lg">
            Final Path:{" "}
            <span className="text-yellow-400">
              {selectedMissing} → {selectedCategorical} → {selectedScaling}
            </span>
          </p>
          {isCorrect ? (
            <p className="bg-green-800 p-3 rounded text-sm leading-relaxed">
              {correctPathExplanation}
            </p>
          ) : (
            <p className="bg-red-800 p-3 rounded text-sm leading-relaxed">
              {incorrectPathExplanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default StepwisePreprocessing;
