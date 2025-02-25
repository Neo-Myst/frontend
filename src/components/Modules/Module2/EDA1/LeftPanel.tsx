import React, { useCallback, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import PageNavigation from "../../../navigation/PageNavigation";

// Dynamically import Plotly only where needed
const Plot = React.lazy(() => import("react-plotly.js"));

const LeftPanel: React.FC = () => {
  const navigate = useNavigate();

  const goHome = useCallback(() => navigate("/"), [navigate]);

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
          onClick={goHome}
          className="text-3xl font-bold text-blue-400 relative hover:text-blue-300 transition duration-300"
        >
          NeoMyst
          <span aria-hidden="true" className="absolute inset-0 blur-lg opacity-75 text-blue-500">
            NeoMyst
          </span>
        </button>

        <div className="flex justify-between items-center text-lg text-gray-400 italic">
          <span>| Visualizing the Data: <span>Exploring Insights</span></span>
          <span className="text-blue-400 underline italic">Archive 2.1</span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
          After all the preprocessing, Riley's unified dataset is now ready for
          exploration through visuals. With a clean slate, Riley sets out to let the
          data tell its story through various plots that highlight different aspects of the information.
        </h2>

        <hr className="border-gray-500 w-full" />

        <div className="space-y-8">
          <div>
            <h2 className="text-yellow-400 font-semibold text-2xl">Boxplot</h2>
            <p className="text-lg text-gray-300">
              Riley creates a boxplot for Transaction Amounts to reveal distributions and identify outliers.
            </p>
            <div className="max-w-lg mx-auto">
              <Suspense fallback={<div className="text-center text-white">Loading Plot...</div>}>
                <Plot
                  data={[
                    {
                      y: [10, 20, 15, 30, 40],
                      type: "box",
                      name: "Transaction Amounts",
                      marker: { color: "yellow" },
                      boxpoints: "all",
                    },
                  ]}
                  layout={{
                    title: "Box Plot Example",
                    paper_bgcolor: "black",
                    plot_bgcolor: "black",
                    font: { color: "white" },
                    showlegend: false,
                    autosize: true,
                  }}
                  useResizeHandler={true}
                  style={{ width: "100%", height: "300px" }}
                  config={{ displayModeBar: false }}
                />
              </Suspense>
            </div>
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
                <Tooltip cursor={{ strokeDasharray: "3 3" }} wrapperClassName="text-black" />
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
