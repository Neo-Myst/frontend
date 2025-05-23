import { FC, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../../../contexts/UserContext";

const darkMarketTransactionsUrl = "/images/outliers/feature_importance_Dark_Market_Transactions_encoded.png";
const questExploitScoreUrl = "/images/outliers/feature_importance_Quest_Exploit_Score.png";
const transactionAmountUrl = "/images/outliers/feature_importance_Transaction_Amount_$.png";

const targetVariables = [
  "Dark Market Transactions",
  "Quest Exploit Score",
  "Transaction Amount ($)",
];

const correctFeaturesByTarget: { [key: string]: string[] } = {
  "Dark Market Transactions": [
    "Transaction Amount ($)",
    "Cash on Hand ($)",
    "Quest Exploit Score",
  ],
  "Quest Exploit Score": ["Missions Completed", "Criminal Score"],
  "Transaction Amount ($)": [
    "Cash on Hand ($)",
    "Neural Link Stability (%)",
    "Money Spent ($)",
  ],
};

const features = [
  { id: 1, name: "Hours Played" },
  { id: 2, name: "Money Spent ($)" },
  { id: 3, name: "Criminal Score" },
  { id: 4, name: "Missions Completed" },
  { id: 5, name: "Cash on Hand ($)" },
  { id: 6, name: "Sync Stability (%)" },
  { id: 7, name: "Quest Exploit Score" },
  { id: 8, name: "Transaction Amount ($)" },
  { id: 9, name: "Neural Link Stability (%)" },
  { id: 10, name: "Day" },
  { id: 11, name: "Month" },
  { id: 12, name: "Hour" },
  { id: 13, name: "Weekday" },
  { id: 14, name: "Player Rank_encoded" },
  { id: 15, name: "Team Affiliation_encoded" },
  { id: 16, name: "VIP Status_encoded" },
  { id: 17, name: "Player Level_encoded" },
  { id: 18, name: "Dark Market Transactions_encoded" },
];

const LOCAL_STORAGE_KEY = "randomForestState";

const RandomForest: FC = () => {
  // We're using window.location.href for navigation instead of useNavigate
  const { user } = useUser();
  
  const [selectedTarget, setSelectedTarget] = useState("");
  const [message, setMessage] = useState("");
  const [chartGenerated, setChartGenerated] = useState(false);
  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const targetDropdownRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [completedTargets, setCompletedTargets] = useState<{
    [key: string]: boolean;
  }>({
    "Dark Market Transactions": false,
    "Quest Exploit Score": false,
    "Transaction Amount ($)": false,
  });

  const [chartImagePath, setChartImagePath] = useState("");
  const [relevanceFeedback, setRelevanceFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const allTargetsCompleted = Object.values(completedTargets).every(
    (status) => status === true
  );

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const state = JSON.parse(stored);
        setSelectedTarget(state.selectedTarget || "");
        setSelectedColumns(state.selectedColumns || []);
        setCompletedTargets(state.completedTargets || {
          "Dark Market Transactions": false,
          "Quest Exploit Score": false,
          "Transaction Amount ($)": false,
        });
        setChartGenerated(state.chartGenerated || false);
        setChartImagePath(state.chartImagePath || "");
        setRelevanceFeedback(state.relevanceFeedback || "");
        setShowFeedback(state.showFeedback || false);
      } catch (e) {
        console.error("Error parsing stored state", e);
      }
    }
  }, []);

  // Save state to localStorage on any relevant state change
  useEffect(() => {
    const stateToStore = {
      selectedTarget,
      selectedColumns,
      completedTargets,
      chartGenerated,
      chartImagePath,
      relevanceFeedback,
      showFeedback,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToStore));
  }, [
    selectedTarget,
    selectedColumns,
    completedTargets,
    chartGenerated,
    chartImagePath,
    relevanceFeedback,
    showFeedback,
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        targetDropdownRef.current &&
        !targetDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTargetDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedColumns([]);
    setShowFeedback(false);
    setRelevanceFeedback("");
  }, [selectedTarget]);

  const handleCheckRelevance = () => {
    if (selectedColumns.length === 0 || !selectedTarget) {
      if (!selectedTarget) {
        setMessage("Please select a target variable first.");
      } else {
        setMessage("Please select at least one feature to check relevance.");
      }
      return;
    }

    setShowFeedback(true);
    setMessage("");

    const correctFeatures = correctFeaturesByTarget[selectedTarget] || [];
    const hasAllCorrect = correctFeatures.every((feature: string) =>
      selectedColumns.includes(feature)
    );
    const noExtraFeatures = selectedColumns.length === correctFeatures.length;
    const countCorrect = correctFeatures.filter((feature: string) =>
      selectedColumns.includes(feature)
    ).length;

    if (hasAllCorrect && noExtraFeatures) {
      setRelevanceFeedback(
        `Correct! You've identified the most important features for ${selectedTarget}.`
      );
      
      // Update completedTargets and log the update for debugging
      const updatedTargets = {
        ...completedTargets,
        [selectedTarget]: true
      };
      console.log('Updating completedTargets:', updatedTargets);
      setCompletedTargets(updatedTargets);
      
      // Force save to localStorage immediately
      const stateToStore = {
        selectedTarget,
        selectedColumns,
        completedTargets: updatedTargets,
        chartGenerated,
        chartImagePath,
        relevanceFeedback,
        showFeedback,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToStore));
    } else if (countCorrect > 0) {
      setRelevanceFeedback(
        `Partially correct. You've identified ${countCorrect} of the ${correctFeatures.length} most important features for ${selectedTarget}.`
      );
    } else {
      setRelevanceFeedback(
        `Incorrect. Look more carefully at the feature importance chart for ${selectedTarget}.`
      );
    }
  };

  const handleGenerateChart = () => {
    if (selectedTarget) {
      setChartGenerated(true);
      setMessage("");
      setShowFeedback(false);
      setRelevanceFeedback("");

      if (selectedTarget === "Dark Market Transactions") {
        setChartImagePath(darkMarketTransactionsUrl);
      } else if (selectedTarget === "Quest Exploit Score") {
        setChartImagePath(questExploitScoreUrl);
      } else if (selectedTarget === "Transaction Amount ($)") {
        setChartImagePath(transactionAmountUrl);
      }
    } else {
      setMessage("Please select a target variable");
    }
  };

  const handleFinish = async () => {
    // Log the current state of completedTargets for debugging
    console.log('Current completedTargets:', completedTargets);
    console.log('allTargetsCompleted value:', allTargetsCompleted);
    
    const completedCount = Object.values(completedTargets).filter(Boolean).length;
    console.log('Completed count:', completedCount, 'out of', targetVariables.length);
    
    // Force check all targets again to be sure
    const allCompleted = targetVariables.every(target => completedTargets[target] === true);
    console.log('Direct check allCompleted:', allCompleted);

    if (completedCount < targetVariables.length) {
      const remainingCount = targetVariables.length - completedCount;

      setPopupMessage(
        `You need to correctly identify the important features for ${remainingCount} more target variable${
          remainingCount > 1 ? "s" : ""
        } before proceeding.`
      );
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
      return;
    }

    // If we get here, all targets should be completed
    console.log('All targets are completed, proceeding to outro');

    // Fallback: get user from localStorage if context is not populated
    const currentUser = user || JSON.parse(localStorage.getItem("user") || "null");
    if (!currentUser || !currentUser.email) {
      console.error("User is not logged in or email is missing");
      return;
    }

    const progressData = {
      current_module: "gamemodule1/randomforest",
      current_chapter: 1,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/progress/update?user_email=${currentUser.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(progressData),
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error storing progress:", errorData);
        setPopupMessage("Error saving progress, please try again.");
        setShowPopup(true);
        return;
      }
    } catch (error) {
      console.error("Error storing progress:", error);
      setPopupMessage("Error saving progress, please try again.");
      setShowPopup(true);
      return;
    }

    setClicked(true);
    // Use window.location.href for direct navigation instead of React Router
    console.log('Attempting direct navigation to outro page');
    window.location.href = '/modules/game-module1/outro';
  };

  const getProgressMessage = () => {
    const completedCount =
      Object.values(completedTargets).filter(Boolean).length;
    return `Progress: ${completedCount}/${targetVariables.length} models analyzed`;
  };

  const getTargetCheckmark = (target: string) => {
    return completedTargets[target] ? (
      <span data-testid="targetCheckmark" className="text-green-400 ml-2">
        ✓
      </span>
    ) : null;
  };

  return (
    <div data-testid="randomForestPage" className="min-h-screen bg-[#001219] p-6">
      {/* Logo */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center gap-3">
          <span
            data-testid="neoMystLabel"
            className="text-[#66c0f4] text-3xl font-bold tracking-wide"
          >
            NeoMyst
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <div className="bg-[#0A2533] rounded-lg py-3 px-6 text-center max-w-6xl mx-auto border border-[#66c0f4]/50">
          <h2
            data-testid="randomForestHeading"
            className="text-[#F1CC75] text-2xl font-bold tracking-wide uppercase"
          >
            Feature Selection: Random Forest
          </h2>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="max-w-6xl mx-auto mb-4">
        <div
          data-testid="progressTracker"
          className="bg-[#0A2533] rounded-lg p-3 border border-[#66c0f4]/20"
        >
          <div className="flex justify-between items-center">
            <span data-testid="progressMessage" className="text-[#F1CC75]">
              {getProgressMessage()}
            </span>
            <div className="flex space-x-4">
              {targetVariables.map((target) => (
                <div
                  key={target}
                  data-testid={`progressBadge-${target}`}
                  className={`px-3 py-1 rounded-full text-sm ${
                    completedTargets[target]
                      ? "bg-green-900/50 border border-green-600 text-green-400"
                      : "bg-gray-800/50 border border-gray-600 text-gray-400"
                  }`}
                >
                  {target.split(" ")[0]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex gap-8">
        {/* Left Panel */}
        <div className="w-[70%]">
          <div
            data-testid="chartPanel"
            className="bg-[#0A2533] rounded-lg p-6 border border-[#66c0f4]/20 h-[700px] flex flex-col"
          >
            {/* Target Variable Selection */}
            <div className="mb-4">
              <label
                data-testid="targetVariableLabel"
                className="block text-[#F1CC75] mb-2 text-lg"
              >
                VIEW: Select Target Variable
              </label>
              <div
                data-testid="targetDropdownRef"
                className="relative"
                ref={targetDropdownRef}
              >
                <button
                  data-testid="targetDropdownButton"
                  onClick={() =>
                    setIsTargetDropdownOpen((prev) => !prev)
                  }
                  className="w-full bg-[#0A2533] rounded-lg p-2.5 border border-[#66c0f4]/20 text-left flex justify-between items-center hover:bg-[#1B465D] transition-colors duration-200"
                >
                  <div className="flex-1 flex items-center gap-2 overflow-x-auto py-0.5">
                    {selectedTarget ? (
                      <div className="bg-[#1B465D] text-[#F1CC75] px-3 py-1 rounded text-lg whitespace-nowrap flex items-center">
                        {selectedTarget}
                        {getTargetCheckmark(selectedTarget)}
                      </div>
                    ) : (
                      <span
                        data-testid="targetDropdownPlaceholder"
                        className="text-[#F1CC75] text-lg"
                      >
                        Select Target Variable
                      </span>
                    )}
                  </div>
                  <span className="text-[#F1CC75] transform transition-transform duration-200 ml-2 text-lg">
                    {isTargetDropdownOpen ? "▲" : "▼"}
                  </span>
                </button>

                {isTargetDropdownOpen && (
                  <div
                    data-testid="targetDropdownList"
                    className="absolute z-10 mt-1 w-full bg-[#0A2533] rounded-lg border border-[#66c0f4]/20 shadow-lg"
                  >
                    <div className="max-h-[200px] overflow-y-auto py-1">
                      {targetVariables.map((target) => (
                        <button
                          key={target}
                          data-testid={`targetOption-${target}`}
                          onClick={() => {
                            setSelectedTarget(target);
                            setIsTargetDropdownOpen(false);
                            setChartGenerated(false);
                          }}
                          className={`
                            w-full text-left px-4 py-2.5 hover:bg-[#1B465D] flex items-center justify-between text-lg transition-colors duration-200
                            ${
                              selectedTarget === target
                                ? "bg-[#1B465D] text-[#F1CC75]"
                                : "text-[#F1CC75]"
                            }
                          `}
                        >
                          <span className="flex items-center">
                            {target}
                            {getTargetCheckmark(target)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chart Area */}
            <div
              data-testid="chartArea"
              className="flex-1 bg-[#0A2533] rounded-lg border border-[#66c0f4]/20 flex items-center justify-center"
            >
              {chartGenerated ? (
                <div className="flex flex-col items-center">
                  <div
                    data-testid="chartTitle"
                    className="text-[#F1CC75] text-lg mb-4"
                  >
                    Chart showing importance of features for predicting{" "}
                    {selectedTarget}
                  </div>
                  {chartImagePath && (
                    <img
                      data-testid="chartImage"
                      src={chartImagePath}
                      alt={`Feature importance for ${selectedTarget}`}
                      className="max-w-full max-h-[400px] object-contain"
                    />
                  )}
                </div>
              ) : (
                <div data-testid="chartPlaceholder" className="text-[#F1CC75]/70 text-lg">
                  Select target variable and generate chart
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-end">
              <button
                data-testid="generateChartButton"
                onClick={handleGenerateChart}
                className={`
                  px-6 py-2.5 rounded text-lg font-medium transition-all duration-300
                  ${
                    selectedTarget
                      ? "bg-[#F1CC75] text-[#0A2533] hover:bg-[#F1CC75]/90 shadow-lg hover:shadow-[#F1CC75]/50"
                      : "bg-[#F1CC75]/50 text-[#0A2533]/70 cursor-not-allowed"
                  }
                `}
              >
                Generate Chart
              </button>
            </div>

            {message && (
              <div data-testid="errorMessage" className="mt-2 text-red-500">
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-[30%]">
          <div
            data-testid="featuresPanel"
            className="bg-[#0A2533] rounded-lg p-6 border border-[#66c0f4]/20 h-[700px] flex flex-col"
          >
            <h3 data-testid="featuresHeader" className="text-[#F1CC75] text-lg mb-4">
              Select Most Important Features
            </h3>

            {showFeedback && (
              <div
                data-testid="relevanceFeedback"
                className={`p-3 mb-4 rounded ${
                  relevanceFeedback.includes("Correct")
                    ? "bg-green-900/50 border border-green-600"
                    : relevanceFeedback.includes("Partially")
                    ? "bg-yellow-900/50 border border-yellow-600"
                    : "bg-red-900/50 border border-red-600"
                }`}
              >
                <p className="text-[#F1CC75] text-sm">{relevanceFeedback}</p>
              </div>
            )}

            <div
              data-testid="featuresList"
              className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar"
            >
              {features.map((feature) => (
                <label
                  key={feature.id}
                  data-testid={`featureOption-${feature.name}`}
                  className={`
                    flex items-center gap-3 text-md cursor-pointer p-1.5 rounded
                    ${
                      selectedColumns.includes(feature.name)
                        ? "bg-[#1B465D]/50 text-[#F1CC75]"
                        : "text-[#F1CC75]/70 hover:bg-[#1B465D]/20"
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(feature.name)}
                    onChange={() => {
                      setSelectedColumns((prev) =>
                        prev.includes(feature.name)
                          ? prev.filter((f) => f !== feature.name)
                          : [...prev, feature.name]
                      );
                      // Reset feedback when selection changes
                      setShowFeedback(false);
                    }}
                    data-testid={`featureCheckbox-${feature.name}`}
                    className="w-4 h-4 rounded border-[#66c0f4]/20 text-[#F1CC75] focus:ring-[#F1CC75] bg-[#1B465D]"
                  />
                  {feature.name}
                </label>
              ))}
            </div>
            <button
              data-testid="checkRelevanceButton"
              onClick={handleCheckRelevance}
              className={`
                w-full mt-4 px-6 py-2.5 rounded text-lg font-medium transition-all duration-300
                ${
                  selectedColumns.length > 0 && selectedTarget && chartGenerated
                    ? "bg-[#F1CC75] text-[#0A2533] hover:bg-[#F1CC75]/90 shadow-lg hover:shadow-[#F1CC75]/50"
                    : "bg-[#F1CC75]/50 text-[#0A2533]/70 cursor-not-allowed"
                }
              `}
              disabled={
                !(
                  selectedColumns.length > 0 &&
                  selectedTarget &&
                  chartGenerated
                )
              }
            >
              Check Relevance
            </button>
          </div>
        </div>
      </div>

      {/* Finish Button */}
      <div className="max-w-6xl mx-auto mt-6 flex justify-end">
        <motion.button
          data-testid="finishButton"
          onClick={() => {
            if (allTargetsCompleted) {
              // Force direct navigation to outro page
              window.location.href = '/modules/game-module1/outro';
            } else {
              handleFinish();
            }
          }}
          className={`
            px-10 py-2.5 rounded text-lg font-medium transition-all duration-300
            ${
              allTargetsCompleted
                ? "bg-[#F1CC75] text-[#0A2533] hover:bg-[#F1CC75]/90 shadow-lg hover:shadow-[#F1CC75]/50"
                : "bg-[#F1CC75]/50 text-[#0A2533]/70"
            }
          `}
          whileTap={{ scale: allTargetsCompleted ? 0.95 : 1 }}
        >
          {clicked ? (
            <div data-testid="finishAnimation" className="flex gap-1">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-[#0A2533] text-xl">
                    &raquo;
                  </span>
                ))}
            </div>
          ) : (
            "FINISH"
          )}
        </motion.button>
      </div>

      {/* Popup notification */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            data-testid="popupNotification"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-32 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-[#73282C] text-white rounded-lg border border-[#E34F4F] shadow-lg z-50"
          >
            <p className="font-mono text-center">{popupMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(102, 192, 244, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(102, 192, 244, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(102, 192, 244, 0.5);
        }
      `}</style>
    </div>
  );
};

export default RandomForest;
