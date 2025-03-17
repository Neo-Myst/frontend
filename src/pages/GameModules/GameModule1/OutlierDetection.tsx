import { FC, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Column {
  id: number;
  name: string;
  image: string;
}

const columns: Column[] = [
  { id: 1, name: 'Column 1', image: '/images/outliers/column1.png' },
  { id: 2, name: 'Column 2', image: '/images/outliers/column2.png' },
  { id: 3, name: 'Column 3', image: '/images/outliers/column3.png' },
  { id: 4, name: 'Column 4', image: '/images/outliers/column4.png' },
  { id: 5, name: 'Column 5', image: '/images/outliers/column5.png' },
  { id: 6, name: 'Column 6', image: '/images/outliers/column6.png' },
  { id: 7, name: 'Column 7', image: '/images/outliers/column7.png' },
  { id: 8, name: 'Column 8', image: '/images/outliers/column8.png' }
];

const OutlierDetection: FC = () => {
  const navigate = useNavigate();
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<number[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [outliersRemoved, setOutliersRemoved] = useState(false);
  const [clicked, setClicked] = useState(false);

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

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Header Button */}
      <div className="max-w-4xl mx-auto px-8 mb-8">
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

      {/* Banner with DETECT OUTLIERS and explanatory text */}
      <div className="w-full py-4 mb-12">
        <div className="max-w-4xl mx-auto px-8">
          <div className="bg-[#1B465D] rounded-lg border border-[#66c0f4]/30">
            <h1 className="text-2xl font-bold text-[#F1CC75] text-center py-4 font-mono">
              DETECT OUTLIERS
            </h1>
            <p className="text-center text-sm text-gray-300 px-4 pb-4">
              Outliers are extreme values that can distort data analysis and predictions.
              In this module, you'll identify the columns with anomalous data and remove these outliers.
              Use the interactive tools to select the affected columns, then proceed to clean your dataset for better model accuracy.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 grid grid-cols-[2fr,1fr] gap-12">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full bg-[#0A2533] text-[#F1CC75] p-3 rounded-lg border border-[#66c0f4]/20 flex justify-between items-center hover:bg-[#1B465D] transition-colors font-mono shadow-lg shadow-[#66c0f4]/10"
            >
              <span className="text-lg">
                VIEW: {selectedColumn ? selectedColumn.name : "Select Data Column"}
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
                    <label className="text-[#F1CC75]/90 text-sm cursor-pointer font-mono">{column.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-3 space-y-2 border-t border-[#66c0f4]/20">
              <div className={`p-2 rounded-lg ${
                outliersRemoved ? "bg-[#2C5A73] border-[#66c0f4] shadow-lg shadow-[#66c0f4]/20" : "bg-[#1B465D] border-[#66c0f4]/30"
              } border text-sm`}>
                <p className="text-center text-[#F1CC75] font-mono">
                  {selectedColumns.length === 0 
                    ? "Select columns to remove outliers"
                    : outliersRemoved 
                      ? `Outliers removed from ${selectedColumns.length} column${selectedColumns.length > 1 ? "s" : ""}!`
                      : `Ready to remove outliers from ${selectedColumns.length} column${selectedColumns.length > 1 ? "s" : ""}`
                  }
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
      <div className="max-w-4xl mx-auto px-8 mt-10 flex justify-end">
        <motion.button
          className="w-48 h-12 rounded-lg flex items-center justify-center bg-[#F1CC75] text-[#0A2533] text-lg font-semibold transition-all hover:bg-[#F1CC75]/90 shadow-lg hover:shadow-[#F1CC75]/50"
          onClick={() => {
            setClicked(true);
            setTimeout(() => navigate("/modules/game-module1/heatmaps"), 500);
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
