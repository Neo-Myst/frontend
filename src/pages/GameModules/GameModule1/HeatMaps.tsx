import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Column {
  id: number;
  name: string;
}

const columns: Column[] = [
  { id: 1, name: 'Age' },
  { id: 2, name: 'Income' },
  { id: 3, name: 'Credit Score' },
  { id: 4, name: 'Employment Years' },
  { id: 5, name: 'Debt Amount' },
  { id: 6, name: 'Loan Amount' },
  { id: 7, name: 'Interest Rate' },
  { id: 8, name: 'Payment History' }
];

const HeatMaps = () => {
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
      ['Income', 'Credit Score'],
      ['Debt Amount', 'Loan Amount'],
      ['Credit Score', 'Interest Rate'],
      ['Payment History', 'Credit Score']
    ];

    const isCorrectPair = correctPairs.some(([col1, col2]) => {
      const selected = [selectedColumn1.name, selectedColumn2.name];
      return (
        (selected[0] === col1 && selected[1] === col2) ||
        (selected[0] === col2 && selected[1] === col1)
      );
    });

    setIsCorrect(isCorrectPair);
    setShowMessage(true);
  };

  interface DropdownProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    selected: Column | null;
    setSelected: (column: Column | null) => void;
    placeholder: string;
  }

  const Dropdown = ({ isOpen, setIsOpen, selected, setSelected, placeholder }: DropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
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
            {isOpen ? '▲' : '▼'}
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
                  className={`
                    w-full text-left px-4 py-2.5 hover:bg-[#1B465D] flex items-center justify-between text-lg transition-colors duration-200
                    ${selected === column ? 'bg-[#1B465D] text-[#F1CC75]' : 'text-[#F1CC75]'}
                  `}
                >
                  <span>{column.name}</span>
                  {selected === column && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(null);
                      }}
                      className="hover:text-[#F1CC75]/80 font-medium ml-2"
                      aria-label={`Remove ${column.name}`}
                    >
                      ×
                    </button>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white pt-20 custom-scrollbar">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-8 space-y-8">
          {/* Header */}
          <button
            onClick={() => navigate("/")}
            className="text-3xl font-bold text-[#66c0f4] relative hover:text-[#4fa3e3] transition duration-300 font-mono"
          >
            NeoMyst
            <span className="absolute inset-0 blur-lg opacity-75 text-[#66c0f4]">
              NeoMyst
            </span>
          </button>

          {/* Title */}
          <div className="bg-[#0A2533] rounded-lg border border-[#66c0f4]/50">
            <h2 className="text-[#F1CC75] text-2xl font-bold tracking-wide uppercase py-3 px-6 text-center font-mono">HeatMaps</h2>
          </div>
          {/* Instructions */}
          <p className="text-center text-[#F1CC75]/90 font-mono">
            Select Multiple Features to Generate Heatmap!
          </p>

          {/* Generate Button */}
          <button
            onClick={handleGenerateHeatmap}
            className="w-full p-3 rounded-lg bg-[#F1CC75] text-[#0A2533] hover:bg-[#F1CC75]/90 font-medium transition-all transform hover:scale-[1.02] font-mono shadow-lg hover:shadow-[#F1CC75]/50"
          >
            Generate Heatmap
          </button>

          {/* Heatmap Display */}
          <div className="h-[400px] bg-[#0A2533] rounded-lg border border-[#66c0f4]/20 flex items-center justify-center p-8 shadow-lg shadow-[#66c0f4]/10">
            {heatmapGenerated ? (
              <img 
                src="/heatmap-example.png" 
                alt="Correlation Heatmap" 
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-center text-xl text-[#F1CC75]/50 font-mono uppercase">
                Image of<br />
                Correlation<br />
                Heatmap<br />
                Generated of All<br />
                Features
              </div>
            )}
          </div>

          {/* Question Section */}
          <div className="space-y-6">
            <p className="text-[#F1CC75] font-mono">
              Based on the correlation heatmap, which features appear to have a strong relationship?
              Please select from the list below.
            </p>

            {/* Dropdowns */}
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

            {/* Message */}
            {showMessage && (
              <div className={`text-center font-mono border rounded-lg p-3 ${
                isCorrect 
                  ? 'text-green-400 border-green-400/30 bg-green-400/10' 
                  : 'text-[#FF6B4A] border-[#FF6B4A]/30 bg-[#FF6B4A]/10'
              }`}>
                {isCorrect 
                  ? 'Excellent! These financial metrics often show strong correlations in real-world data!' 
                  : 'Try again! Look for features that typically influence each other in financial data.'}
              </div>
            )}

            {/* Check Button */}
            <button
              onClick={handleCheck}
              disabled={!selectedColumn1 || !selectedColumn2}
              className={`w-full p-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] font-mono ${
                !selectedColumn1 || !selectedColumn2
                  ? 'bg-[#F1CC75]/50 cursor-not-allowed text-[#0A2533]/70'
                  : 'bg-[#F1CC75] hover:bg-[#F1CC75]/90 text-[#0A2533] shadow-lg hover:shadow-[#F1CC75]/50'
              }`}
            >
              Check!
            </button>
          </div>

          {/* Navigation */}
          <div className="max-w-7xl w-full mx-auto mt-10 flex justify-end">
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
