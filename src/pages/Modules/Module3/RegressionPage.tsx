import React from "react";
import { useNavigate } from "react-router-dom";
import PageNavigation from "../../../components/navigation/PageNavigation";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ReferenceLine,
  BarChart,
  Bar,
  Label
} from "recharts";

const playerData = [
  { id: 'A', hours: 1.5, spent: 2.99 },  // Casual player, small purchase
  { id: 'B', hours: 3.2, spent: 4.99 },  // More engaged, starter pack
  { id: 'C', hours: 5, spent: 9.99 },    // Regular player, mid-tier purchase
  { id: 'D', hours: 8.7, spent: 14.99 }, // Engaged player, larger purchase
  { id: 'E', hours: 6.8, spent: 7.99 },  // Regular player, smaller purchase
  { id: 'F', hours: 10.1, spent: 19.99 }, // Dedicated player, premium purchase
  { id: 'G', hours: 12.2, spent: 24.99 }  // Hardcore player, biggest purchase
];

const regressionCoefficients = {
  slope: 1.75,    // $1.75 more per hour played
  intercept: 1.50  // $1.50 base spending
};

const featureImportance = [
  { feature: 'Hours Played', importance: 0.8 },
  { feature: 'Quest Score', importance: 0.6 },
  { feature: 'Dark Market', importance: 0.4 },
  { feature: 'Other', importance: 0.2 }
];

const RegressionPage: React.FC = () => {
  const navigate = useNavigate();
  const [showRegression, setShowRegression] = React.useState(false);
  const [showResiduals, setShowResiduals] = React.useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-4 md:px-20 py-12 w-full">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-[#66c0f4] relative hover:text-[#4fa3e3] transition duration-300 mb-8 font-mono"
        >
          NeoMyst
          <span className="absolute inset-0 blur-lg opacity-75 text-[#66c0f4]">
            NeoMyst
          </span>
        </button>

        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-[#66c0f4] mb-4">
          Predictive Protocol – Linear Regression Deep Dive
          </h1>
          <p className="text-lg text-gray-300">
            Before Riley can predict the Shadow Collective's next move, they must master the tool that reveals the future: Linear Regression.
          </p>
        </div>

        <div className="space-y-16">
          {/* Section 1 - Introduction */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#66c0f4]">
              1. The Data Detective
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Riley stared at the streaming data from thousands of NeoVerse players. The numbers seemed random at first - hours played, money spent, quests completed. But as a data detective, Riley knew patterns hid beneath the surface.
              </p>
              <p className="text-yellow-400 italic">
                "Linear regression will help me find the relationship between these variables. It's like drawing the best straight line through scattered points to reveal the hidden trend."
              </p>
              <p>
                The technique would help predict how much money (dependent variable) players spend based on how many hours (independent variable) they play. Riley loaded the data into the Forecasting Core.
              </p>
            </div>
          </div>

          {/* Section 2 - Scatter Plot */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#66c0f4]">
              2. Visualizing the Relationship
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                The first step was creating a scatter plot. Each point represented one player:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>X-axis (horizontal):</strong> Hours played</li>
                <li><strong>Y-axis (vertical):</strong> Money spent</li>
                <li><strong>Each dot:</strong> One player's data</li>
              </ul>
              
              <div className="h-[400px] w-full bg-gray-900/30 backdrop-blur-sm rounded-lg p-6">
                <ResponsiveContainer>
                  <ScatterChart
                    margin={{ top: 40, right: 30, bottom: 40, left: 40 }}
                    data={playerData}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.5} />
                    <XAxis 
                      dataKey="hours" 
                      name="Hours Played"
                      stroke="#66c0f4"
                      type="number"
                      domain={[0, 14]}
                      tickCount={8}
                    >
                      <Label value="Hours Played" position="insideBottom" offset={-20} fill="#fff" />
                    </XAxis>
                    <YAxis 
                      dataKey="spent" 
                      stroke="#66c0f4"
                      domain={[0, 30]}
                      tickFormatter={(value) => `$${value}`}
                    >
                      <Label value="Money Spent" angle={-90} position="insideLeft" offset={10} fill="#fff" />
                    </YAxis>
                    <Tooltip
                      cursor={{ strokeDasharray: '3 3' }}
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #66c0f4',
                        borderRadius: '8px',
                        padding: '8px 12px'
                      }}
                      formatter={(value: any, name: string) => [
                        name === 'spent' ? `$${Number(value).toFixed(2)}` : `${Number(value).toFixed(1)} hrs`,
                        name === 'spent' ? 'Money Spent' : 'Hours Played'
                      ]}
                      labelFormatter={(label) => `Player ${label}`}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Scatter
                      name="Player Data"
                      data={playerData}
                      fill="#4fa3e3"
                      shape={(props: any) => {
                        const { cx, cy, payload } = props;
                        return (
                          <g>
                            <circle 
                              cx={cx} 
                              cy={cy} 
                              r={6} 
                              fill="#4fa3e3" 
                              stroke="#1a1a1a" 
                              strokeWidth={1.5}
                              style={{
                                filter: 'drop-shadow(0 0 2px #4fa3e3)'
                              }}
                            />
                            <text 
                              x={cx + 8} 
                              y={cy - 8} 
                              fill="#66c0f4" 
                              fontSize="11"
                              fontWeight="500"
                            >
                              {payload.id}
                            </text>
                          </g>
                        );
                      }}
                    />
                    
                    {showRegression && (
                      <ReferenceLine
                        segment={[
                          { x: 0, y: regressionCoefficients.intercept },
                          { x: 14, y: regressionCoefficients.slope * 14 + regressionCoefficients.intercept }
                        ]}
                        stroke="#4CAF50"
                        strokeWidth={1.5}
                        strokeDasharray="5 3"
                        label={{
                          value: "Prediction Line",
                          position: "top",
                          fill: "#4CAF50",
                          fontSize: 12
                        }}
                      />
                    )}
                    
                    {showRegression && showResiduals && playerData.map((point) => (
                      <ReferenceLine
                        key={`residual-${point.id}`}
                        segment={[
                          { x: point.hours, y: point.spent },
                          { x: point.hours, y: regressionCoefficients.slope * point.hours + regressionCoefficients.intercept }
                        ]}
                        stroke="#ff5252"
                        strokeDasharray="3 3"
                        strokeWidth={1}
                      />
                    ))}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => setShowRegression(!showRegression)}
                  className="px-4 py-2 bg-[#4CAF50] rounded hover:bg-[#45a049] transition-colors"
                >
                  {showRegression ? 'Hide Prediction' : 'Show Prediction'}
                </button>
                <button
                  onClick={() => setShowResiduals(!showResiduals)}
                  className="px-4 py-2 bg-[#66c0f4] rounded hover:bg-[#4fa3e3] transition-colors"
                >
                  {showResiduals ? 'Hide Residuals' : 'Show Residuals'}
                </button>
              </div>
              
              {showRegression && (
                <div className="text-center">
                  <p className="text-[#4CAF50] font-mono">
                    <strong>Regression Equation:</strong> y = {regressionCoefficients.slope.toFixed(2)}x + {regressionCoefficients.intercept.toFixed(2)}
                  </p>
                
                </div>
              )}
            </div>
          </div>
           
          

          {/* Section 3 - The Equation */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#66c0f4]">
              3. The Prediction Formula
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                The regression equation takes the form:
              </p>
              <p className="text-yellow-400 font-mono text-xl">
                y = mx + b
              </p>
              <p>Or in our case:</p>
              <p className="text-yellow-400 font-mono">
                Money Spent = (Slope × Hours Played) + Base Amount
              </p>
              <p>
                Breaking this down:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Base Amount (b):</strong> ${regressionCoefficients.intercept.toFixed(2)} - What players spend even with 0 hours played</li>
                <li><strong>Slope (m):</strong> {regressionCoefficients.slope.toFixed(2)} - The amount money spent increases per hour played</li>
              </ul>
              <p className="text-yellow-400 italic">
                "So for Player B who played 3.2 hours, we predict: (1.75 × 3.2) + 1.50 = ${(1.75 * 3.2 + 1.50).toFixed(2)}. They actually spent $4.99 - that ${(4.99 - (1.75 * 3.2 + 1.50)).toFixed(2)} difference is the residual."
              </p>
            </div>
          </div>

          {/* Section 4 - Model Evaluation */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#66c0f4]">
              4. Checking the Model's Accuracy
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Riley examined two key metrics to evaluate the model:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl text-[#4CAF50]">R² Score: 0.67</h3>
                  <p>
                    This tells us what percentage of the variation in money spent can be explained by hours played. 
                    67% is good - hours played is a strong predictor of spending.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl text-[#4fa3e3]">RMSE: $3.24</h3>
                  <p>
                    Root Mean Square Error - our average prediction error. For most players spending $3-$25, 
                    being off by $3.24 is reasonable but suggests room for improvement.
                  </p>
                </div>
              </div>
              
              <p className="text-yellow-400 italic">
                "The model explains much of the pattern, but not all. That's where the Shadow Collective might be hiding - in the unexplained variation."
              </p>
            </div>
          </div>

          {/* Section 5 - Feature Importance */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#66c0f4]">
              5. Identifying Key Factors
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Riley analyzed which factors best predict spending:
              </p>
              
              <div className="h-[300px]">
                <ResponsiveContainer>
                  <BarChart data={featureImportance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis 
                      dataKey="feature" 
                      stroke="#66c0f4"
                      tick={{ fill: '#66c0f4' }}
                    >
                      <Label value="Player Features" position="insideBottom" offset={-20} fill="#66c0f4" />
                    </XAxis>
                    <YAxis 
                      stroke="#66c0f4"
                      tick={{ fill: '#66c0f4' }}
                    >
                      <Label value="Importance Score" angle={-90} position="insideLeft" offset={10} fill="#66c0f4" />
                    </YAxis>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #66c0f4',
                        borderRadius: '4px'
                      }}
                    />
                    <Bar 
                      dataKey="importance" 
                      fill="#4fa3e3"
                      name="Importance"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <p className="text-yellow-400 italic">
                "Hours played (80%) and quest scores (60%) are our strongest predictors. Dark market activity (40%) might be noise or could reveal Collective activity - we'll investigate further."
              </p>
            </div>
          </div>

          {/* Section 6 - Final Steps */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#66c0f4]">
              6. Preparing for Deployment
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Riley split the data to validate the model:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Training Set (80%):</strong> Used to build the model</li>
                <li><strong>Test Set (20%):</strong> Unseen data to check real-world performance</li>
              </ul>
              
              <p className="text-yellow-400 italic">
                "The model performs similarly on both sets, so it's not just memorizing patterns. Now we can:"
              </p>
              
              <ol className="list-decimal list-inside ml-4 space-y-2">
                <li>Predict normal spending patterns</li>
                <li>Flag anomalies (like Player E spending less than expected)</li>
                <li>Investigate potential Shadow Collective activity</li>
              </ol>
              
              <p className="text-yellow-400 italic">
                "With this model, we're not just reacting to the Collective's moves - we're anticipating them. Let's see what secrets these residuals hold..."
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <PageNavigation
            goBackRoute="/module3/intro"
            investigateRoute="/modules/game-module2/regression"
          />
        </div>
      </div>
    </div>
  );
};

export default RegressionPage;