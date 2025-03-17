import { useState, useRef, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Column {
  id: number;
  name: string;
}

const columns: Column[] = [
  { id: 1, name: "Column 1" },
  { id: 2, name: "Column 2" },
  { id: 3, name: "Column 3" },
  { id: 4, name: "Column 4" },
  { id: 5, name: "Column 5" },
  { id: 6, name: "Column 6" },
  { id: 7, name: "Column 7" },
  { id: 8, name: "Column 8" },
];

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selected: Column | null;
  setSelected: (column: Column | null) => void;
  placeholder: string;
}

const Dropdown: FC<DropdownProps> = ({ isOpen, setIsOpen, selected, setSelected, placeholder }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#0A2533] rounded-lg p-2.5 border border-[#66c0f4]/20 text-left flex justify-between items-center hover:bg-[#1B465D] transition-colors duration-200"
      >
        <div className="flex-1 flex items-center gap-2 overflow-x-auto py-0.5">
          {selected ? (
            <div className="bg-[#1B465D] text-[#F1CC75] px-3 py-1 rounded text-lg whitespace-nowrap">
              {selected.name}
            </div>
          ) : (
            <span className="text-[#F1CC75] text-lg">{placeholder}</span>
          )}
        </div>
        <span className="text-[#F1CC75] transform transition-transform duration-200 ml-2 text-lg">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-[#0A2533] rounded-lg border border-[#66c0f4]/20 shadow-lg">
          <div className="max-h-[200px] overflow-y-auto py-1">
            {columns.map((column) => (
              <button
                key={column.id}
                onClick={() => {
                  setSelected(column);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 hover:bg-[#1B465D] transition-colors duration-200 font-mono ${
                  selected === column ? "bg-[#1B465D] text-[#F1CC75]" : "text-[#F1CC75]"
                }`}
              >
                {column.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HeatMaps: FC = () => {
  const navigate = useNavigate();
  const [selectedColumn1, setSelectedColumn1] = useState<Column | null>(null);
  const [selectedColumn2, setSelectedColumn2] = useState<Column | null>(null);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [heatmapGenerated, setHeatmapGenerated] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleGenerateHeatmap = () => {
    setHeatmapGenerated(true);
  };

  const handleCheck = () => {
    if (!selectedColumn1 || !selectedColumn2) return;
    const correctPairs = [
      ["Income", "Credit Score"],
      ["Debt Amount", "Loan Amount"],
      ["Credit Score", "Interest Rate"],
      ["Payment History", "Credit Score"],
    ];
    const selected = [selectedColumn1.name, selectedColumn2.name];
    const isCorrectPair = correctPairs.some(
      ([col1, col2]) =>
        (selected[0] === col1 && selected[1] === col2) ||
        (selected[0] === col2 && selected[1] === col1)
    );
    setIsCorrect(isCorrectPair);
    setShowMessage(true);
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white pt-20 custom-scrollbar">
        {/* Header */}
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

        {/* Banner with HeatMaps Title and Explanatory Text */}
        <div className="w-full py-4 mb-12">
          <div className="max-w-6xl mx-auto px-12">
            <div className="bg-[#0A2533] rounded-lg border border-[#66c0f4]/30">
              <h2 className="text-2xl font-bold text-[#F1CC75] text-center py-4 font-mono uppercase">
                HeatMaps
              </h2>
              <p className="text-center text-lm text-gray-300 px-4 pb-4">
                After outlier removal, Riley now uses heatmaps to reveal the relationships between key features.
                By selecting two columns, the heatmap will display the correlation between these features.
                This insight will help Riley choose the most influential predictors for the regression model.
              </p>
              <p className="text-center text-lm text-gray-300 px-4 pb-4">
                In this step, you'll see a generated heatmap of all features, then select two columns that show a strong correlation.
                Your selection will guide the next phase of the analysis.
              </p>
            </div>
          </div>
        </div>

        {/* Generate Button for Heatmap */}
        <div className="max-w-6xl mx-auto px-12 mb-8">
          <button
            onClick={handleGenerateHeatmap}
            className="w-full p-3 rounded-lg bg-[#F1CC75] text-[#0A2533] hover:bg-[#F1CC75]/90 font-medium transition-all transform hover:scale-[1.02] font-mono shadow-lg hover:shadow-[#F1CC75]/50"
          >
            Generate Heatmap
          </button>
        </div>

        {/* Heatmap Display */}
        <div className="max-w-6xl mx-auto px-12 mb-8">
          <div className="h-[400px] bg-[#0A2533] rounded-lg border border-[#66c0f4]/20 flex items-center justify-center p-8 shadow-lg shadow-[#66c0f4]/10">
            {heatmapGenerated ? (
              <img
                src="/heatmap-example.png"
                alt="Correlation Heatmap"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-center text-xl text-[#F1CC75]/50 font-mono uppercase">
                Correlation Heatmap Will Appear Here
              </div>
            )}
          </div>
        </div>

        {/* Question Section */}
        <div className="max-w-6xl mx-auto px-12 space-y-8 mb-8">
          <p className="text-center text-[#F1CC75] font-mono">
            Based on the heatmap, which features appear to have a strong relationship? Select two columns:
          </p>
          <div className="space-y-4">
            <Dropdown
              isOpen={dropdownOpen1}
              setIsOpen={setDropdownOpen1}
              selected={selectedColumn1}
              setSelected={setSelectedColumn1}
              placeholder="Column 1"
            />
            <div className="flex justify-center">
              <span className="text-3xl text-[#F1CC75]">×</span>
            </div>
            <Dropdown
              isOpen={dropdownOpen2}
              setIsOpen={setDropdownOpen2}
              selected={selectedColumn2}
              setSelected={setSelectedColumn2}
              placeholder="Column 2"
            />
          </div>
          <button
            onClick={handleCheck}
            disabled={!selectedColumn1 || !selectedColumn2}
            className={`w-full p-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] font-mono ${
              !selectedColumn1 || !selectedColumn2
                ? "bg-[#F1CC75]/50 cursor-not-allowed text-[#0A2533]/70"
                : "bg-[#F1CC75] hover:bg-[#F1CC75]/90 text-[#0A2533] shadow-lg hover:shadow-[#F1CC75]/50"
            }`}
          >
            Check!
          </button>
          {showMessage && (
            <div
              className={`text-center font-mono border rounded-lg p-3 ${
                isCorrect
                  ? "text-green-400 border-green-400/30 bg-green-400/10"
                  : "text-[#FF6B4A] border-[#FF6B4A]/30 bg-[#FF6B4A]/10"
              }`}
            >
              {isCorrect
                ? "Excellent! These selected features show a strong correlation."
                : "Try again! Consider which financial metrics typically influence each other in financial data."}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="max-w-6xl mx-auto px-12 mt-10 flex justify-end">
          <motion.button
            className="w-48 h-12 rounded-lg flex items-center justify-center bg-[#F1CC75] text-[#0A2533] text-lg font-semibold transition-all hover:bg-[#F1CC75]/90 shadow-lg hover:shadow-[#F1CC75]/50"
            onClick={() => {
              setClicked(true);
              setTimeout(() => navigate("/modules/game-module1/randomforest"), 500);
            }}
            whileTap={{ scale: 0.9 }}
          >
            {clicked ? (
              <div className="flex gap-1">
                {Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-[#0A2533] text-xl">&raquo;</span>
                  ))}
              </div>
            ) : (
              <span>Continue &raquo;</span>
            )}
          </motion.button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1B465D;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #66c0f4;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4fa3e3;
        }
      `}</style>
    </>
  );
};

export default HeatMaps;
