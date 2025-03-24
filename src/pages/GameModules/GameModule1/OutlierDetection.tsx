import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import boxPlot_Transaction_Amount_$ from "/images/outliers/boxplot_Transaction_Amount_$.png";
import boxPlot_Sync_Stability_pct from "/images/outliers/boxplot_Sync_Stability_pct.png";
import boxPlot_Quest_Exploit_Score from "/images/outliers/boxplot_Quest_Exploit_Score.png";
import boxPlot_Neural_Link_Stability_pct from "/images/outliers/boxplot_Neural_Link_Stability_pct.png";
import boxPlot_Money_Spent_$ from "/images/outliers/boxplot_Money_Spent_$.png";
import boxPlot_Missions_Completed from "/images/outliers/boxplot_Missions_Completed.png";
import boxplot_Hours_Played from "/images/outliers/boxplot_Hours_Played.png";
import boxplot_Criminal_Score from "/images/outliers/boxplot_Criminal_Score.png";
import boxplot_Cash_on_Hand_$ from "/images/outliers/boxplot_Cash_on_Hand_$.png";

interface Column {
  id: number;
  name: string;
  image: string;
  hasOutliers: boolean;
}

const columns: Column[] = [
  {
    id: 1,
    name: "Transaction Amount ($)",
    image: boxPlot_Transaction_Amount_$,
    hasOutliers: false,
  },
  {
    id: 2,
    name: "Sync Stability (%)",
    image: boxPlot_Sync_Stability_pct,
    hasOutliers: false,
  },
  {
    id: 3,
    name: "Quest Exploit Score",
    image: boxPlot_Quest_Exploit_Score,
    hasOutliers: true,
  },
  {
    id: 4,
    name: "Neural Link Stability",
    image: boxPlot_Neural_Link_Stability_pct,
    hasOutliers: false,
  },
  {
    id: 5,
    name: "Money Spent ($)",
    image: boxPlot_Money_Spent_$,
    hasOutliers: true,
  },
  {
    id: 6,
    name: "Missions Completed",
    image: boxPlot_Missions_Completed,
    hasOutliers: true,
  },
  {
    id: 7,
    name: "Hours Played",
    image: boxplot_Hours_Played,
    hasOutliers: false,
  },
  {
    id: 8,
    name: "Criminal Score",
    image: boxplot_Criminal_Score,
    hasOutliers: false,
  },
  {
    id: 9,
    name: "Cash on Hand ($)",
    image: boxplot_Cash_on_Hand_$,
    hasOutliers: false,
  },
];

const OutlierDetection: FC = () => {
  const navigate = useNavigate();
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<number[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [outliersRemoved, setOutliersRemoved] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [correctSelection, setCorrectSelection] = useState(false);

  const correctOutlierIds = columns
    .filter((column) => column.hasOutliers)
    .map((column) => column.id);

  useEffect(() => {
    // Check if the user has selected exactly the correct columns
    const isCorrect =
      selectedColumns.length === correctOutlierIds.length &&
      selectedColumns.every((id) => correctOutlierIds.includes(id)) &&
      correctOutlierIds.every((id) => selectedColumns.includes(id));

    setCorrectSelection(isCorrect);
  }, [selectedColumns]);

  const handleColumnSelection = (columnId: number) => {
    setSelectedColumns((prev) => {
      let newSelected: number[];
      if (prev.includes(columnId)) {
        newSelected = prev.filter((id) => id !== columnId);
      } else {
        newSelected = [...prev, columnId];
      }
      // Reset outliersRemoved state when selection changes.
      if (outliersRemoved) {
        setOutliersRemoved(false);
      }
      return newSelected;
    });
  };

  const handleContinue = () => {
    if (outliersRemoved && correctSelection) {
      setClicked(true);
      setTimeout(() => navigate("/modules/game-module1/heatmaps"), 500);
    } else {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Header Button */}
      <div className="max-w-6xl mx-auto px-12 mb-8">
        <button
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-[#66c0f4] relative hover:text-[#4fa3e3] transition duration-300 font-mono"
        >
          NeoMyst
          <span className="absolute inset-0 blur-lg opacity-75 text-[#66c0f4]">
            NeoMyst
          </span>
        </button>
      </div>

      {/* Banner Section */}
      <div className="w-full py-4 mb-12">
        <div className="max-w-6xl mx-auto px-12">
          <div className="bg-[#1B465D] rounded-lg border border-[#66c0f4]/30">
            <h1 className="text-2xl font-bold text-[#F1CC75] text-center py-4 font-mono">
              DETECT OUTLIERS
            </h1>
            <p className="text-center text-lm text-gray-300 px-4 pb-4">
              Outliers are extreme values that can distort data analysis and
              predictions. In this module, you'll identify the columns with
              anomalous data and remove these outliers. Use the interactive
              tools to select the affected columns, then proceed to clean your
              dataset for better model accuracy.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full bg-[#0A2533] text-[#F1CC75] p-3 rounded-lg border border-[#66c0f4]/20 flex justify-between items-center hover:bg-[#1B465D] transition-colors font-mono shadow-lg shadow-[#66c0f4]/10"
            >
              <span className="text-lg">
                VIEW:{" "}
                {selectedColumn ? selectedColumn.name : "Select Data Column"}
              </span>
              <motion.span
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                className="text-lg"
              >
                ▼
              </motion.span>
            </button>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute w-full mt-1 bg-[#0A2533] border border-[#66c0f4]/20 rounded-lg shadow-lg shadow-[#66c0f4]/10 z-50"
              >
                {columns.map((column) => (
                  <button
                    key={column.id}
                    onClick={() => {
                      setSelectedColumn(column);
                      setDropdownOpen(false);
                    }}
                    className="w-full p-2.5 text-left hover:bg-[#1B465D] text-[#F1CC75] text-lg transition-colors font-mono first:rounded-t-lg last:rounded-b-lg"
                  >
                    {column.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Box Plot Image */}
          <div className="bg-[#1B465D]/50 rounded-lg border border-[#66c0f4]/30 p-4 h-[452px] flex flex-col shadow-lg shadow-[#66c0f4]/10">
            {selectedColumn ? (
              <div className="flex-1 flex items-center justify-center bg-[#1B465D]/30 rounded-lg p-2">
                <img
                  src={selectedColumn.image}
                  alt={`Box plot for ${selectedColumn.name}`}
                  className="max-w-full max-h-full rounded-lg object-contain"
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-[#F1CC75]/50 font-mono">
                Select a column to view box plot
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Outlier Removal */}
        <div className="space-y-6">
          <div className="bg-[#1B465D]/50 rounded-lg border border-[#66c0f4]/30 p-4 h-[520px] flex flex-col shadow-lg shadow-[#66c0f4]/10">
            <h3 className="text-[#F1CC75] text-lg mb-2 font-mono">
              Select Columns to Remove Outliers
            </h3>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid gap-2">
                {columns.map((column) => (
                  <div
                    key={column.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg transition-all ${
                      selectedColumns.includes(column.id)
                        ? "bg-[#2C5A73] border border-[#66c0f4]/30 shadow-lg shadow-[#66c0f4]/10"
                        : "hover:bg-[#1B465D] border border-transparent hover:border-[#66c0f4]/20"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(column.id)}
                      onChange={() => handleColumnSelection(column.id)}
                      className="w-4 h-4 accent-[#F1CC75]"
                    />
                    <label className="text-[#F1CC75]/90 text-sm cursor-pointer font-mono">
                      {column.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-3 space-y-2 border-t border-[#66c0f4]/20">
              <div
                className={`p-2 rounded-lg ${
                  outliersRemoved
                    ? correctSelection
                      ? "bg-[#28735C] border-[#4FE3B0] shadow-lg shadow-[#4FE3B0]/20"
                      : "bg-[#73282C] border-[#E34F4F] shadow-lg shadow-[#E34F4F]/20"
                    : "bg-[#1B465D] border-[#66c0f4]/30"
                } border text-sm transition-all`}
              >
                <p className="text-center text-[#F1CC75] font-mono">
                  {selectedColumns.length === 0
                    ? "Select columns to remove outliers"
                    : outliersRemoved
                    ? correctSelection
                      ? `Success! Outliers removed from all affected columns!`
                      : `Incorrect selection. Some columns don't have outliers or some with outliers weren't selected.`
                    : `Ready to remove outliers from ${
                        selectedColumns.length
                      } column${selectedColumns.length > 1 ? "s" : ""}`}
                </p>
              </div>

              <button
                onClick={() => setOutliersRemoved(true)}
                disabled={selectedColumns.length === 0 || outliersRemoved}
                className={`w-full p-2 rounded-lg text-sm font-medium transition-all transform hover:scale-[1.02] font-mono ${
                  selectedColumns.length === 0
                    ? "bg-[#F1CC75]/30 text-[#0A2533]/50 cursor-not-allowed"
                    : outliersRemoved
                    ? "bg-[#F1CC75]/50 text-[#0A2533]/70 cursor-not-allowed shadow-lg shadow-[#F1CC75]/20"
                    : "bg-[#F1CC75] hover:bg-[#F1CC75]/90 text-[#0A2533] shadow-lg shadow-[#F1CC75]/20"
                }`}
              >
                {outliersRemoved ? "Outliers Removed" : "Remove Outliers"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Button */}
      <div className="max-w-6xl mx-auto px-12 mt-10 flex justify-end">
        <motion.button
          className={`w-48 h-12 rounded-lg flex items-center justify-center text-lg font-semibold transition-all shadow-lg ${
            outliersRemoved && correctSelection
              ? "bg-[#F1CC75] text-[#0A2533] hover:bg-[#F1CC75]/90 hover:shadow-[#F1CC75]/50"
              : "bg-[#F1CC75]/50 text-[#0A2533]/70"
          }`}
          onClick={handleContinue}
          whileTap={{ scale: outliersRemoved && correctSelection ? 0.9 : 1 }}
        >
          {clicked ? (
            <div className="flex gap-1">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-[#0A2533] text-xl">
                    &raquo;
                  </span>
                ))}
            </div>
          ) : (
            <span>Continue &raquo;</span>
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
            className="fixed top-12 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-[#73282C] text-white rounded-lg border border-[#E34F4F] shadow-lg z-50"
          >
            <p className="font-mono text-center">
              {!outliersRemoved
                ? "You must remove outliers before continuing"
                : "Incorrect selection. Identify all columns with outliers first!"}
            </p>
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

export default OutlierDetection;
