import React, { useCallback, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import PageNavigation from "../../../navigation/PageNavigation";
import Plot from "../../../Plot";

const LeftPanel: React.FC = () => {
  const navigate = useNavigate();
  const goHome = useCallback(() => navigate("/"), [navigate]);
  
  // State for interactive features
  const [activeChart, setActiveChart] = useState<string>("all");
  const [highlightedPoint, setHighlightedPoint] = useState<number | null>(null);

  // Enhanced datasets with more realistic data
  const scatterPlotData = [
    { HoursPlayed: 5, MoneySpent: 10, UserID: "User001", Level: 2 },
    { HoursPlayed: 10, MoneySpent: 20, UserID: "User002", Level: 3 },
    { HoursPlayed: 15, MoneySpent: 30, UserID: "User003", Level: 5 },
    { HoursPlayed: 20, MoneySpent: 35, UserID: "User004", Level: 7 },
    { HoursPlayed: 25, MoneySpent: 40, UserID: "User005", Level: 8 },
    { HoursPlayed: 30, MoneySpent: 45, UserID: "User006", Level: 10 },
    { HoursPlayed: 35, MoneySpent: 55, UserID: "User007", Level: 12 },
    { HoursPlayed: 40, MoneySpent: 65, UserID: "User008", Level: 15 },
    { HoursPlayed: 45, MoneySpent: 75, UserID: "User009", Level: 18 },
    { HoursPlayed: 50, MoneySpent: 90, UserID: "User010", Level: 20 },
  ];

  const lineChartData = [
    { name: "Day 1", value: 25, users: 120 },
    { name: "Day 2", value: 55, users: 150 },
    { name: "Day 3", value: 80, users: 200 },
    { name: "Day 4", value: 95, users: 250 },
    { name: "Day 5", value: 85, users: 220 },
    { name: "Day 6", value: 105, users: 280 },
    { name: "Day 7", value: 120, users: 310 },
  ];
  
  // Bar chart data removed as requested
  
  // Function to handle chart selection
  const handleChartSelection = (chartType: string) => {
    setActiveChart(chartType === activeChart ? "all" : chartType);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white p-3 border border-blue-500 rounded-md shadow-lg">
          <p className="text-blue-400 font-bold mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color || '#fff' }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full md:w-1/2 p-12 bg-black text-white relative flex flex-col min-h-screen font-oxanium overflow-y-auto max-h-screen">
      <div className="flex-grow space-y-8">
        {/* Header */}
        <button
          onClick={goHome}
          className="text-3xl font-bold text-blue-400 relative hover:text-blue-300 transition duration-300"
        >
          NeoMyst
          <span
            aria-hidden="true"
            className="absolute inset-0 blur-lg opacity-75 text-blue-500"
          >
            NeoMyst
          </span>
        </button>

        <div className="flex justify-between items-center text-lg text-gray-400 italic">
          <span>
            | Visualizing the Data: <span>Exploring Insights</span>
          </span>
          <span className="text-blue-400 underline italic">Archive 2.1</span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
          After preprocessing the NeoMyst gaming data, Riley's unified dataset is now ready for
          visual exploration. With clean, structured data in hand, Riley begins to uncover patterns
          and relationships that will drive key insights about player behavior, spending habits,
          and system performance.
        </h2>

        <hr className="border-gray-500 w-full" />

        <div className="space-y-8">
          {/* Box Plot */}
          <div className={`transition-opacity duration-300 ${activeChart !== "all" && activeChart !== "box" ? "opacity-50" : "opacity-100"}`}>
            <h2 className="text-yellow-400 font-semibold text-2xl flex items-center">
              <button 
                onClick={() => handleChartSelection("box")} 
                className="mr-2 hover:text-yellow-300 transition-colors"
              >
                Boxplot
              </button>
              {activeChart === "box" && <span className="text-sm text-blue-400">(focused)</span>}
            </h2>
            <p className="text-lg text-gray-300">
              Riley creates a boxplot for Transaction Amounts to analyze the distribution of player spending.
              The visualization reveals that most transactions fall between $20-$40, with several outliers
              above $60 indicating premium purchases. The median spending (horizontal line in the box)
              suggests typical player investment, while the spread of points shows the diversity of transaction values.
            </p>
            <motion.div 
              className="max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Suspense fallback={<div className="text-center text-white p-4 bg-gray-800 rounded-md">Loading Plot...</div>}>
                <Plot
                  data={[
                    {
                      y: [10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 25, 30, 35],
                      type: "box",
                      name: "Transaction Amounts",
                      marker: { color: "#FFD700" },
                      boxpoints: "all",
                      jitter: 0.3,
                      pointpos: -1.8,
                      hoverinfo: "y",
                      hoverlabel: { bgcolor: "#333" },
                    },
                  ]}
                  layout={{
                    title: {
                      text: "Transaction Amounts Distribution",
                      font: { size: 18, color: "#FFD700" }
                    },
                    paper_bgcolor: "black",
                    plot_bgcolor: "black",
                    font: { color: "white" },
                    showlegend: false,
                    autosize: true,
                    margin: { t: 50, r: 20, b: 50, l: 50 },
                    yaxis: {
                      title: {
                        text: "Amount ($)",
                        font: { color: "#8884d8" }
                      },
                      gridcolor: "rgba(255,255,255,0.1)"
                    }
                  }}
                  useResizeHandler={true}
                  style={{ width: "100%", height: "300px" }}
                  config={{ displayModeBar: false, responsive: true }}
                />
              </Suspense>
            </motion.div>
          </div>

          {/* Scatter Plot */}
          <div className={`transition-opacity duration-300 ${activeChart !== "all" && activeChart !== "scatter" ? "opacity-50" : "opacity-100"}`}>
            <h3 className="text-yellow-400 font-semibold text-2xl flex items-center">
              <button 
                onClick={() => handleChartSelection("scatter")} 
                className="mr-2 hover:text-yellow-300 transition-colors"
              >
                Scatterplot
              </button>
              {activeChart === "scatter" && <span className="text-sm text-blue-400">(focused)</span>}
            </h3>
            <p className="text-lg text-gray-300">
              Riley's scatterplot reveals a strong positive correlation between Hours Played and Money Spent,
              suggesting that player engagement directly influences monetization. The data shows that players who invest
              more than 30 hours tend to spend significantly more ($45+), while casual players (under 15 hours)
              typically spend less than $30. This pattern helps identify player segments and potential monetization thresholds.
            </p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    type="number" 
                    dataKey="HoursPlayed" 
                    name="Hours Played" 
                    stroke="white" 
                    label={{ value: 'Hours Played', position: 'insideBottom', offset: -5, fill: '#8884d8' }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="MoneySpent" 
                    name="Money Spent" 
                    stroke="white"
                    label={{ value: 'Money Spent ($)', angle: -90, position: 'insideLeft', fill: '#8884d8' }}
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: "3 3" }} 
                    content={<CustomTooltip />} 
                  />
                  <Scatter 
                    name="Players" 
                    data={scatterPlotData} 
                    fill="#FFD700"
                  >
                    {scatterPlotData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={highlightedPoint === index ? "#FF4500" : "#FFD700"}
                        onClick={() => setHighlightedPoint(index === highlightedPoint ? null : index)}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Line Chart */}
          <div className={`transition-opacity duration-300 ${activeChart !== "all" && activeChart !== "line" ? "opacity-50" : "opacity-100"}`}>
            <h3 className="text-yellow-400 font-semibold text-2xl flex items-center">
              <button 
                onClick={() => handleChartSelection("line")} 
                className="mr-2 hover:text-yellow-300 transition-colors"
              >
                Line Chart
              </button>
              {activeChart === "line" && <span className="text-sm text-blue-400">(focused)</span>}
            </h3>
            <p className="text-lg text-gray-300">
              Riley's line chart tracks two critical metrics over a 7-day period: Stability Index and Active Users.
              The data reveals that as the Stability Index improved from 25 to 120, the active user count grew from 120 to 310,
              with a notable correlation between system performance and user engagement. The slight dip on Day 5 (stability 85)
              coincided with a drop in users (220), highlighting how technical performance directly impacts player retention.
            </p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="white" />
                  <YAxis stroke="white" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Stability Index"
                    stroke="#FFD700"
                    strokeWidth={3}
                    dot={{ fill: "#FFD700", r: 5 }}
                    activeDot={{ r: 8, fill: "#FF4500" }}
                    animationDuration={1500}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    name="Active Users"
                    stroke="#00BFFF"
                    strokeWidth={2}
                    dot={{ fill: "#00BFFF", r: 4 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Bar Chart removed as requested */}
        </div>

        {/* Reset View button removed as requested */}

        <PageNavigation
          goBackRoute="/pages/EdaIntro"
          investigateRoute="/pages/Eda2"
          checkInvestigate={true}
        />
      </div>
    </div>
  );
};

export default React.memo(LeftPanel);
