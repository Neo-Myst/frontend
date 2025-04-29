import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataPreviewTable from "../../../components/GameModules/DataPreviewTable";
import Modal from "../../../components/Modal";
import PreprocessingPopup, {
  preprocessingPopups,
} from "../../../components/PreprocessingPopups";
import { motion, AnimatePresence } from "framer-motion";

type PreprocessingOption =
  | "median"
  | "remove"
  | "labelEncoding"
  | "oneHot"
  | "normalized"
  | "standardized";

interface PreprocessingState {
  [key: string]: boolean;
}

const initialState: PreprocessingState = {
  median: false,
  remove: false,
  labelEncoding: false,
  oneHot: false,
  normalized: false,
  standardized: false,
};

// Add global styles for hexagon shape
const globalStyles = `
  .clip-hexagon {
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }
  .shadow-glow {
    box-shadow: 0 0 20px currentColor;
  }
  @keyframes glow {
    0% { box-shadow: 0 0 5px #66c0f4, 0 0 10px #66c0f4, 0 0 15px #66c0f4; }
    50% { box-shadow: 0 0 10px #66c0f4, 0 0 20px #66c0f4, 0 0 30px #66c0f4; }
    100% { box-shadow: 0 0 5px #66c0f4, 0 0 10px #66c0f4, 0 0 15px #66c0f4; }
  }
  .animate-glow > div {
    animation: glow 2s ease-in-out infinite;
  }
`;

const Preprocessing: FC = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [selectedOptions, setSelectedOptions] =
    useState<PreprocessingState>(initialState);
  const [showResults, setShowResults] = useState(false);
  const [activeModal, setActiveModal] = useState<PreprocessingOption | null>(
    null
  );

  const correctAnswers = {
    median: true,
    remove: false,
    labelEncoding: true,
    oneHot: false,
    normalized: true,
    standardized: false,
  };

  const handleOptionClick = (option: PreprocessingOption) => {
    setActiveModal(option);
  };

  const handleModalConfirm = (option: PreprocessingOption) => {
    setSelectedOptions((prev: PreprocessingState) => {
      const newState = { ...prev };

      // Reset selections based on category
      if (option === "median" || option === "remove") {
        newState.median = false;
        newState.remove = false;
      } else if (option === "labelEncoding" || option === "oneHot") {
        newState.labelEncoding = false;
        newState.oneHot = false;
      } else if (option === "normalized" || option === "standardized") {
        newState.normalized = false;
        newState.standardized = false;
      }

      // Set the new selection
      newState[option] = true;
      return newState;
    });
    setActiveModal(null);
  };

  const handleReset = () => {
    setSelectedOptions(initialState);
    setShowResults(false);
  };

  const getOptionColor = (option: string) => {
    if (!showResults) {
      return selectedOptions[option] ? "text-[#66c0f4]" : "text-white";
    }
    if (correctAnswers[option as keyof typeof correctAnswers]) {
      return selectedOptions[option] ? "text-green-400" : "text-white";
    }
    return selectedOptions[option] ? "text-red-400" : "text-white";
  };

  const getHexagonColor = (option: string) => {
    if (!showResults) {
      return selectedOptions[option]
        ? "from-[#66c0f4] via-[#4fa3e3] to-[#3c8bbd]"
        : "from-[#1a2332] via-[#243647] to-[#2c4159]";
    }
    if (correctAnswers[option as keyof typeof correctAnswers]) {
      return selectedOptions[option]
        ? "from-green-500 via-green-600 to-green-700"
        : "from-[#1a2332] via-[#243647] to-[#2c4159]";
    }
    return selectedOptions[option]
      ? "from-red-500 via-red-600 to-red-700"
      : "from-[#1a2332] via-[#243647] to-[#2c4159]";
  };

  const hasAnySelection = () => {
    return Object.values(selectedOptions).some((value) => value);
  };

  const hasAllSelections = () => {
    // Check if user has selected one option from each category
    const hasMissingValue = selectedOptions.median || selectedOptions.remove;
    const hasCategorical =
      selectedOptions.labelEncoding || selectedOptions.oneHot;
    const hasScaling =
      selectedOptions.normalized || selectedOptions.standardized;

    return hasMissingValue && hasCategorical && hasScaling;
  };

  const getFinalPath = () => {
    const path = [];
    if (selectedOptions.median) path.push("Median");
    if (selectedOptions.remove) path.push("Remove");
    if (selectedOptions.labelEncoding) path.push("Label Encoding");
    if (selectedOptions.oneHot) path.push("One-Hot");
    if (selectedOptions.normalized) path.push("Normalized");
    if (selectedOptions.standardized) path.push("Standardized");
    return path.join(" → ");
  };

  const isCorrectPath = () => {
    return (
      selectedOptions.median &&
      selectedOptions.labelEncoding &&
      selectedOptions.normalized &&
      !selectedOptions.remove &&
      !selectedOptions.oneHot &&
      !selectedOptions.standardized
    );
  };

  const getIncorrectPathFeedback = () => {
    const feedback = [];

    // Add main heading
    feedback.push(
      "Consider how each step affects the data quality and model performance:"
    );

    // Missing Values feedback
    if (selectedOptions.remove) {
      feedback.push(
        "• Removing rows with missing values discards potentially valuable data points and reduces your training set size, which can lead to less robust models."
      );
    } else if (!selectedOptions.median && !selectedOptions.remove) {
      feedback.push(
        "• You need to handle missing values - without addressing them, your model will fail to process the data properly."
      );
    }

    // Categorical Features feedback
    if (selectedOptions.oneHot) {
      feedback.push(
        "• One-hot encoding creates separate columns for each category value, which increases dimensionality and can lead to sparse matrices that are computationally inefficient."
      );
    } else if (!selectedOptions.labelEncoding && !selectedOptions.oneHot) {
      feedback.push(
        "• Categorical features need encoding - machine learning algorithms cannot process text categories directly."
      );
    }

    // Scaling feedback
    if (selectedOptions.standardized) {
      feedback.push(
        "• Standardization assumes normal distribution and can be heavily influenced by outliers, which may distort your feature relationships in this dataset."
      );
    } else if (!selectedOptions.normalized && !selectedOptions.standardized) {
      feedback.push(
        "• Numerical features need scaling - without it, features with larger ranges will dominate the model training process."
      );
    }

    return feedback;
  };

  const handleContinue = () => {
    if (!hasAnySelection()) {
      setPopupMessage("Select preprocessing options before continuing!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }

    if (!showResults) {
      setPopupMessage("Submit your preprocessing path before continuing!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }

    if (!isCorrectPath()) {
      setPopupMessage(
        "Select Median, Label Encoding, and Normalized to optimize your preprocessing!"
      );
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }

    // All conditions met, proceed to next page
    setClicked(true);
    setTimeout(() => navigate("/modules/game-module1/outliers"), 500);
  };

  const SectionHeader = ({ title }: { title: string }) => {
    return (
      <div className="relative w-[600px] mx-auto">
        <h2 className="text-2xl font-bold text-[#F1CC75] mb-8 bg-[#1B465D] p-4 rounded-lg text-center border border-[#66c0f4]/30">
          {title}
        </h2>
      </div>
    );
  };

  const Hexagon = ({
    option,
    label,
  }: {
    option: PreprocessingOption;
    label: string;
  }) => (
    <button
      onClick={() => handleOptionClick(option)}
      className="relative transform hover:scale-105 transition-all duration-300"
    >
      <div
        className={`w-36 h-36 relative ${
          selectedOptions[option] ? "animate-glow" : ""
        }`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getHexagonColor(
            option
          )} 
          clip-hexagon shadow-xl transform transition-all duration-300 border-2 border-[#66c0f4]/30
          hover:border-[#66c0f4]/50`}
        >
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <span
              className={`text-lg font-bold ${getOptionColor(
                option
              )} text-center font-mono tracking-wider`}
            >
              {label}
            </span>
          </div>
        </div>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center px-20 py-12 w-full">
      <style>{globalStyles}</style>
      <div className="max-w-5xl mx-auto p-4">
        {/* Story Section */}
        <div className="mb-12">
          {/* Header Button */}
          <button
            onClick={() => navigate("/")}
            className="text-3xl font-bold text-[#66c0f4] relative hover:text-[#4fa3e3] transition duration-300 mb-8 font-mono"
          >
            NeoMyst
            <span className="absolute inset-0 blur-lg opacity-75 text-[#66c0f4]">
              NeoMyst
            </span>
          </button>

          {/* Narrative Text */}
          <div className="prose prose-invert space-y-4 font-mono">
            <p>
              Riley took a deep breath, their fingers hovering over the console.
              The system interface pulsed softly, waiting for the next command.
            </p>
            <p>
              For weeks, Riley had worked tirelessly—cleaning corrupted logs,
              filling in missing timestamps, normalizing values, and
              transforming scattered data into something structured and
              meaningful. Every inconsistency, outlier, and unexplained anomaly
              had been uncovered and addressed.
            </p>
            <p>
              Now, the system was ready to reveal the full dataset—the final
              form of NeoVerse's records, perfectly preprocessed and primed for
              deeper analysis.
            </p>
            <p>
              <strong className="text-[#66c0f4]">
                📊 NeoVerse Data Preview:
              </strong>
            </p>
          </div>

          {/* Data Preview Table */}
          <div className="mt-8">
            <DataPreviewTable />
          </div>

          {/* Bullet Points */}
          <div className="mt-8 text-lg text-gray-300 font-mono">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Some players have missing Sync Stability values ("--"). Why?
              </li>
              <li>
                Quest Exploit Scores are missing for some players. Could this be
                intentional?
              </li>
              <li>
                Certain Transaction Amounts are blank. Are they errors or
                deliberate omissions?
              </li>
            </ul>
          </div>
        </div>

        {/* Game Section */}
        <div className="space-y-16">
          <div className="w-[900px] h-px bg-[#32404e] mx-auto"></div>

          {/* Missing Values Section */}
          <div>
            <SectionHeader title="Handle Missing Values" />
            <div className="flex justify-center items-center gap-24">
              <Hexagon option="median" label="MEDIAN" />
              <Hexagon option="remove" label="REMOVE" />
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="w-[900px] h-px bg-[#32404e] mx-auto"></div>

          {/* Categorical Features Section */}
          <div>
            <SectionHeader title="Handle Categorical Features" />
            <div className="flex justify-center items-center gap-24">
              <Hexagon option="oneHot" label="ONE-HOT ENCODING" />
              <Hexagon option="labelEncoding" label="LABEL ENCODING" />
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="w-[900px] h-px bg-[#32404e] mx-auto"></div>

          {/* Scaling Features Section */}
          <div>
            <SectionHeader title="Scaling Numerical Features" />
            <div className="flex justify-center items-center gap-24">
              <Hexagon option="normalized" label="NORMALIZED" />
              <Hexagon option="standardized" label="STANDARDIZED" />
            </div>
          </div>

          {/* Results Section */}
          <div className="mt-12 text-center space-y-6">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  if (hasAllSelections()) {
                    setShowResults(true);
                  } else {
                    setPopupMessage(
                      "Select one option from each category before submitting!"
                    );
                    setShowPopup(true);
                    setTimeout(() => setShowPopup(false), 3000);
                  }
                }}
                disabled={!hasAnySelection()}
                className={`px-8 py-3 rounded-lg font-bold font-mono transition-all duration-300 ${
                  hasAnySelection()
                    ? "bg-[#66c0f4] text-[#1a2332] hover:bg-[#4fa3e3]"
                    : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
              >
                Submit Path
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-lg bg-[#2c4159] text-[#66c0f4] font-bold font-mono hover:bg-[#3c5169] transition-all duration-300"
              >
                Reset
              </button>
            </div>

            {showResults && (
              <div
                className={`p-6 rounded-lg ${
                  isCorrectPath()
                    ? "bg-[#2c4159] border-green-500/30"
                    : "bg-[#2c2332] border-red-500/30"
                } border-2 max-w-2xl mx-auto font-mono`}
              >
                <p className="text-xl mb-4">
                  Selected Path:{" "}
                  <span className="text-[#66c0f4]">{getFinalPath()}</span>
                </p>
                {isCorrectPath() ? (
                  <p className="text-lg text-green-400">
                    Perfect! You've chosen the optimal preprocessing path for
                    this dataset.
                  </p>
                ) : (
                  <div className="text-lg text-red-400">
                    <p className="mb-2">{getIncorrectPathFeedback()[0]}</p>
                    <ul className="space-y-2 pl-4">
                      {getIncorrectPathFeedback()
                        .slice(1)
                        .map((item, index) => (
                          <li key={index} className="list-none">
                            {item}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        title={activeModal ? preprocessingPopups[activeModal].title : ""}
      >
        {activeModal && (
          <PreprocessingPopup
            type={activeModal}
            onSelect={() => handleModalConfirm(activeModal)}
            isSelected={selectedOptions[activeModal]}
          />
        )}
      </Modal>
      <div className="max-w-7xl w-full mx-auto mt-10 flex justify-end">
        <motion.button
          className={`w-48 h-12 rounded-lg flex items-center justify-center text-lg font-semibold transition-all ${
            showResults && isCorrectPath()
              ? "bg-[#66c0f4] text-white hover:bg-[#4fa3e3]"
              : "bg-[#66c0f4]/50 text-white/70"
          }`}
          onClick={handleContinue}
          whileTap={{ scale: showResults && isCorrectPath() ? 0.9 : 1 }}
        >
          {clicked ? (
            <div className="flex gap-1">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-blue-800 text-xl">
                    &raquo;
                  </span>
                ))}
            </div>
          ) : (
            <span>Engage Data Core &raquo;</span>
          )}
        </motion.button>
      </div>

      {/* Popup notification */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-32 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-[#73282C] text-white rounded-lg border border-[#E34F4F] shadow-lg z-50"
          >
            <p className="font-mono text-center">{popupMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Preprocessing;
