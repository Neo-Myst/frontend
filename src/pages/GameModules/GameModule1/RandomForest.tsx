import { FC, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const targetVariables = [
  'Target 1',
  'Target 2',
  'Target 3',
  'Target 4',
  'Target 5'
];

const features = Array.from({ length: 17 }, (_, i) => `Feature ${i + 1}`);

const RandomForest: FC = () => {
  const navigate = useNavigate();
  const [selectedTarget, setSelectedTarget] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [chartGenerated, setChartGenerated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const targetDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (targetDropdownRef.current && !targetDropdownRef.current.contains(event.target as Node)) {
        setIsTargetDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFeatureClick = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : prev.length < 5 ? [...prev, feature] : prev
    );
    setChartGenerated(false);
  };

  const removeFeature = (feature: string) => {
    setSelectedFeatures(prev => prev.filter(f => f !== feature));
    setChartGenerated(false);
  };

  return (
    <div className="min-h-screen bg-[#001219] p-6">
      {/* Logo */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center gap-3">
          <span className="text-[#66c0f4] text-3xl font-bold tracking-wide">NeoMyst</span>
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <div className="bg-[#0A2533] rounded-lg py-3 px-6 text-center max-w-6xl mx-auto border border-[#66c0f4]/50">
          <h2 className="text-[#F1CC75] text-2xl font-bold tracking-wide uppercase">DETECT OUTLIERS</h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex gap-8">
        {/* Left Panel */}
        <div className="w-[70%]">
          <div className="bg-[#0A2533] rounded-lg p-6 border border-[#66c0f4]/20 h-[700px] flex flex-col">
            {/* Target Variable Selection */}
            <div className="mb-4">
              <label className="block text-[#F1CC75] mb-2 text-lg">VIEW: Select Data Column</label>
              <div className="relative" ref={targetDropdownRef}>
                <button
                  onClick={() => setIsTargetDropdownOpen(!isTargetDropdownOpen)}
                  className="w-full bg-[#0A2533] rounded-lg p-2.5 border border-[#66c0f4]/20 text-left flex justify-between items-center hover:bg-[#1B465D] transition-colors duration-200"
                >
                  <div className="flex-1 flex items-center gap-2 overflow-x-auto py-0.5">
                    {selectedTarget ? (
                      <div className="bg-[#1B465D] text-[#F1CC75] px-3 py-1 rounded text-lg whitespace-nowrap">
                        {selectedTarget}
                      </div>
                    ) : (
                      <span className="text-[#F1CC75] text-lg">Select Target Variable</span>
                    )}
                  </div>
                  <span className="text-[#F1CC75] transform transition-transform duration-200 ml-2 text-lg">
                    {isTargetDropdownOpen ? '▲' : '▼'}
                  </span>
                </button>

                {isTargetDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-[#0A2533] rounded-lg border border-[#66c0f4]/20 shadow-lg">
                    <div className="max-h-[200px] overflow-y-auto py-1">
                      {targetVariables.map(target => (
                        <button
                          key={target}
                          onClick={() => {
                            setSelectedTarget(target);
                            setIsTargetDropdownOpen(false);
                            setChartGenerated(false);
                          }}
                          className={`
                            w-full text-left px-4 py-2.5 hover:bg-[#1B465D] flex items-center justify-between text-lg transition-colors duration-200
                            ${selectedTarget === target ? 'bg-[#1B465D] text-[#F1CC75]' : 'text-[#F1CC75]'}
                          `}
                        >
                          <span>{target}</span>
                          {selectedTarget === target && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTarget('');
                                setChartGenerated(false);
                              }}
                              className="hover:text-[#F1CC75]/80 font-medium ml-2"
                              aria-label={`Remove ${target}`}
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
            </div>

            {/* VS Text */}
            <div className="text-center mb-4">
              <span className="text-[#F1CC75] text-xl font-bold tracking-widest">VS</span>
            </div>

            {/* Feature Selection */}
            <div className="mb-4">
              <label className="block text-[#F1CC75] mb-2 text-lg">Select Features (max 5):</label>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-[#0A2533] rounded-lg p-2.5 border border-[#66c0f4]/20 text-left flex justify-between items-center hover:bg-[#1B465D] transition-colors duration-200"
                >
                  <div className="flex-1 flex items-center gap-2 overflow-x-auto py-0.5">
                    {selectedFeatures.length === 0 ? (
                      <span className="text-[#F1CC75] text-lg">Select features</span>
                    ) : (
                      selectedFeatures.map(feature => (
                        <div 
                          key={feature}
                          className="bg-[#1B465D] text-[#F1CC75] px-3 py-1 rounded text-lg whitespace-nowrap"
                        >
                          {feature}
                        </div>
                      ))
                    )}
                  </div>
                  <span className="text-[#F1CC75] transform transition-transform duration-200 ml-2 text-lg">
                    {isDropdownOpen ? '▲' : '▼'}
                  </span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-[#0A2533] rounded-lg border border-[#66c0f4]/20 shadow-lg">
                    <div className="max-h-[200px] overflow-y-auto py-1">
                      {features.map(feature => (
                        <button
                          key={feature}
                          onClick={() => handleFeatureClick(feature)}
                          disabled={!selectedFeatures.includes(feature) && selectedFeatures.length >= 5}
                          className={`
                            w-full text-left px-4 py-2.5 hover:bg-[#1B465D] flex items-center justify-between text-lg transition-colors duration-200
                            ${selectedFeatures.includes(feature) 
                              ? 'bg-[#1B465D] text-[#F1CC75]' 
                              : selectedFeatures.length >= 5
                                ? 'opacity-50 cursor-not-allowed text-[#F1CC75]/50'
                                : 'text-[#F1CC75]'}
                          `}
                        >
                          <span>{feature}</span>
                          {selectedFeatures.includes(feature) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFeature(feature);
                              }}
                              className="hover:text-[#F1CC75]/80 font-medium ml-2"
                              aria-label={`Remove ${feature}`}
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
            </div>

            {/* Chart Area */}
            <div className="flex-1 bg-[#0A2533] rounded-lg border border-[#66c0f4]/20 flex items-center justify-center">
              {chartGenerated ? (
                <div className="text-[#F1CC75] text-lg">
                  Chart showing importance of {selectedFeatures.join(', ')} for predicting {selectedTarget}
                </div>
              ) : (
                <div className="text-[#F1CC75]/70 text-lg">
                  Select features and generate chart
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  if (selectedTarget && selectedFeatures.length > 0) {
                    setChartGenerated(true);
                    setMessage('');
                  } else {
                    setMessage('Please select both target variable and features');
                  }
                }}
                className={`
                  px-6 py-2.5 rounded text-lg font-medium transition-all duration-300
                  ${selectedTarget && selectedFeatures.length > 0
                    ? 'bg-[#F1CC75] text-[#0A2533] hover:bg-[#F1CC75]/90 shadow-lg hover:shadow-[#F1CC75]/50'
                    : 'bg-[#F1CC75]/50 text-[#0A2533]/70 cursor-not-allowed'}
                `}
              >
                Generate Chart
              </button>
            </div>

            {message && (
              <div className="mt-2 text-red-500">{message}</div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-[30%]">
          <div className="bg-[#0A2533] rounded-lg p-6 border border-[#66c0f4]/20 h-[700px] flex flex-col">
            <h3 className="text-[#F1CC75] text-lg mb-4">Select Columns to Remove Outliers</h3>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {features.map(feature => (
                <label
                  key={feature}
                  className={`
                    flex items-center gap-3 text-lg cursor-pointer
                    ${selectedColumns.includes(feature) ? 'text-[#F1CC75]' : 'text-[#F1CC75]/70'}
                  `}
                >
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(feature)}
                    onChange={() => {
                      setSelectedColumns(prev =>
                        prev.includes(feature)
                          ? prev.filter(f => f !== feature)
                          : [...prev, feature]
                      );
                    }}
                    className="w-5 h-5 rounded border-[#66c0f4]/20 text-[#F1CC75] focus:ring-[#F1CC75] bg-[#1B465D]"
                  />
                  {feature}
                </label>
              ))}
            </div>
            <button
              onClick={() => {
                if (selectedColumns.length > 0) {
                  setMessage('Outliers removed successfully!');
                } else {
                  setMessage('Please select columns to remove outliers');
                }
              }}
              className={`
                w-full mt-4 px-6 py-2.5 rounded text-lg font-medium transition-all duration-300
                ${selectedColumns.length > 0
                  ? 'bg-[#F1CC75] text-[#0A2533] hover:bg-[#F1CC75]/90 shadow-lg hover:shadow-[#F1CC75]/50'
                  : 'bg-[#F1CC75]/50 text-[#0A2533]/70 cursor-not-allowed'}
              `}
            >
              Remove Outliers
            </button>
          </div>
        </div>
      </div>

      {/* Finish Button */}
      <div className="max-w-6xl mx-auto mt-6 flex justify-end">
        <button 
          onClick={() => navigate('/modules/game-module1/Outro')}
          className="bg-[#F1CC75] text-[#0A2533] px-10 py-2.5 rounded text-lg font-medium transition-all duration-300 hover:bg-[#F1CC75]/90 shadow-lg hover:shadow-[#F1CC75]/50"
        >
          FINISH
        </button>
      </div>
    </div>
  );
};

export default RandomForest;
