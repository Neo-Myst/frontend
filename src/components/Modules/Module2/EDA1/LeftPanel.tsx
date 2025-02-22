import React from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Plot from "react-plotly.js";

const LeftPanel: React.FC = () => {
  const navigate = useNavigate();

  const scatterPlotData = [
    { HoursPlayed: 5, MoneySpent: 10 },
    { HoursPlayed: 10, MoneySpent: 20 },
    { HoursPlayed: 15, MoneySpent: 30 },
    { HoursPlayed: 20, MoneySpent: 35 },
    { HoursPlayed: 25, MoneySpent: 40 },
    { HoursPlayed: 30, MoneySpent: 45 },
    { HoursPlayed: 35, MoneySpent: 55 },
    { HoursPlayed: 40, MoneySpent: 65 },
  ];

  const lineChartData = [
    { name: "Day 1", value: 25 },
    { name: "Day 2", value: 55 },
    { name: "Day 3", value: 80 },
    { name: "Day 4", value: 95 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black text-white p-2 border border-gray-500 rounded">
          <p className="text-white">{label}</p>
          <p className="text-white">{payload[0].name} : {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full md:w-1/2 p-12 bg-black text-white relative flex flex-col min-h-screen font-oxanium overflow-y-auto max-h-screen">
      <div className="flex-grow space-y-8">
        <button
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-blue-400 relative hover:text-blue-300 transition duration-300"
        >
          NeoMyst
          <span className="absolute inset-0 blur-lg opacity-75 text-blue-500">NeoMyst</span>
        </button>

        <div className="flex justify-between items-center text-lg text-gray-400 italic">
          <span>| Visualizing the Data: <span>Exploring Insights</span></span>
          <span className="text-blue-400 underline italic">Archive 2.1</span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
          After all the preprocessing, Riley's unified dataset is now ready for
          exploration through visuals. With a clean slate, Riley sets out to let the data
          tell its story through various plots that highlight different aspects of the information.
        </h2>

        <hr className="border-gray-500 w-full" />

        <div className="space-y-8">
          <div>
            <h2 className="text-yellow-400 font-semibold text-2xl">Boxplot</h2>
            <p className="text-lg text-gray-300">
              Riley begins by creating boxplots for features such as Hours Played, Transaction Amounts, and Neural Link Stability.
              These boxplots reveal feature distributions and help identify outliers.
            </p>
            <Plot
  data={[
    {
      y: [10, 20, 15, 30, 40],
      type: "box",
      name: "Transaction Amounts",
      marker: { color: "yellow" },
      boxpoints: "all"
    }
  ]}
  layout={{
    title: "Box Plot Example",
    paper_bgcolor: "black",
    plot_bgcolor: "black",
    font: { color: "white" },
    showlegend: false
  }}
  config={{ displayModeBar: false }} // Correct way to hide the mode bar
/>
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold text-2xl">Scatterplot</h3>
            <p className="text-lg text-gray-300">
              Riley uses scatterplots to explore relationships between variables like Hours Played vs. Money Spent.
              These plots help identify trends and correlations between key dataset attributes.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="HoursPlayed" name="HoursPlayed Value" stroke="white" />
                <YAxis type="number" dataKey="MoneySpent" name="MoneySpent Value" stroke="white" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperClassName="text-black" />
                <Scatter data={scatterPlotData} fill="yellow" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold text-2xl">Line Chart</h3>
            <p className="text-lg text-gray-300">
              Riley uses line charts to track changes over time, such as variations in Sync Stability.
              These visualizations are key in identifying trends and making predictions.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="yellow" strokeWidth={2} dot={{ fill: "yellow", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex items-center justify-between mt-auto mb-0">
        {/* Go Back Button */}
        <button
          onClick={() => navigate("/pages/EdaIntro")}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-gray-500 rounded-full relative transition duration-300 
          hover:bg-gray-700 hover:scale-105 hover:shadow-lg"
        >
          <span className="text-xl">&laquo;</span>
          <span>Go Back</span>
          <span className="absolute inset-0 blur-lg opacity-50 bg-gray-500 rounded-full"></span>
        </button>

        {/* Investigate Further Button */}
        <button
          onClick={() => navigate("/pages/Eda2")}
          className="flex items-center space-x-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full relative transition duration-300 
          hover:bg-yellow-400 hover:scale-105 hover:shadow-lg"
        >
          <span>Investigate Further</span>
          <span className="text-xl">&raquo;</span>
          <span className="absolute inset-0 blur-lg opacity-50 bg-yellow-500 rounded-full"></span>
        </button>
      </div>
      </div>
    </div>
  );
};

export default LeftPanel;


