import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-[#ff6b00] mb-4 relative"
          >
            <span className="relative z-10">Predictive Protocol – Echoes of the Future</span>
            <span className="absolute inset-0 blur-sm opacity-50 text-[#ff6b00] z-0">Predictive Protocol</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-[#66c0f4] font-semibold"
          >
            Mission: Forecast Player Spending to Disrupt the Shadow Collective's Economic Network
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gray-300 mt-3 max-w-3xl mx-auto"
          >
            The Shadow Collective is no longer hiding—they're manipulating spending behavior across NeoVerse to destabilize the economy. 
            Riley must build a regression model sharp enough to forecast player behavior—even when the Collective tries to throw it off course.
          </motion.p>
        </div>

        <div className="space-y-16">
          {/* Section 1 - Introduction */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#66c0f4]">
              1. The Digital War of Deception
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Riley stared at the neural grid as streams of prediction data flowed across the screen. The numbers seemed random at first - hours played, money spent, quests completed - but the Shadow Collective's manipulation was hidden in plain sight.
              </p>
              <p className="text-yellow-400 italic">
                "Player P3021 was predicted to spend $3,200, but their actual spending was only $1,200. That's not random—it's deliberate distortion," Riley muttered, fingers flying across the holographic interface.
              </p>
              <p>
                Linear regression would be Riley's weapon in this digital war—a tool to find the true relationship between variables and expose the Shadow Collective's attempts to throw the model off course. Riley loaded the player data into the Forecasting Core.
              </p>
            </div>
          </div>

          {/* Section 2 - Scatter Plot */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#66c0f4]">
              2. Mapping the Distortion Patterns
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                "Something's off..." Riley muttered, creating a scatter plot to visualize the manipulation. Each point represented a player caught in the Shadow Collective's web:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>X-axis (horizontal):</strong> Hours played in the NeoVerse</li>
                <li><strong>Y-axis (vertical):</strong> Credits spent on digital assets</li>
                <li><strong>Each dot:</strong> A player potentially influenced by the Collective</li>
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
                        backgroundColor: '#ffffff', // White background
                        border: '1px solid #66c0f4',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: '#000000' // Black text for better visibility
                      }}
                      formatter={(value: any, name: string) => [
                        name === 'spent' ? `$${Number(value).toFixed(2)}` : `${Number(value).toFixed(1)} hrs`,
                        name === 'spent' ? 'Money Spent' : 'Hours Played'
                      ]}
                      labelFormatter={() => ''}
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
                <div className="text-center mt-4">
                  <p className="text-[#4CAF50] font-mono text-xl bg-black/30 p-3 rounded-lg inline-block font-semibold">
                    y = {regressionCoefficients.slope.toFixed(2)}x + {regressionCoefficients.intercept.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
           
          

          {/* Section 3 - The Equation */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#66c0f4]">
              3. Decoding the Pattern
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Riley's fingers flew across the neural interface, extracting the mathematical signature of normal player behavior:
              </p>
              <p className="text-yellow-400 font-mono text-2xl bg-black/30 p-4 rounded-lg backdrop-blur-sm inline-block font-semibold">
                y = mx + b
              </p>
              <p>Translated to the NeoVerse economy:</p>
              <p className="text-yellow-400 font-mono text-xl bg-black/30 p-4 rounded-lg backdrop-blur-sm font-semibold">
                Money Spent = (Engagement Factor × Hours in NeoVerse) + Base Spending
              </p>
              <p>
                Riley analyzed the components of this digital fingerprint:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Base Spending (b):</strong> ${regressionCoefficients.intercept.toFixed(2)} - The minimum credits players invest even before engaging with the NeoVerse</li>
                <li><strong>Engagement Factor (m):</strong> {regressionCoefficients.slope.toFixed(2)} - How rapidly spending increases with each hour in the digital realm</li>
              </ul>
              <p className="text-yellow-400 italic">
                Riley highlighted an anomaly on the holographic display. "Player B's data shows a critical deviation. With 3.2 hours logged, our model predicts ${(1.75 * 3.2 + 1.50).toFixed(2)} credits spent, but they actually spent $4.99. That ${(4.99 - (1.75 * 3.2 + 1.50)).toFixed(2)} gap isn't random—it's the Shadow Collective's fingerprint."
              </p>
            </div>
          </div>

          {/* Section 4 - Model Evaluation */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#66c0f4]">
              4. Uncovering the Deception
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Riley examined two key metrics to see through the Shadow Collective's distortion attempts:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl text-[#4CAF50]">R² Score: 0.67</h3>
                  <p>
                    This reveals what percentage of the spending variation can be explained by hours played. 
                    At 67%, it's good—but the missing 33% could be where the Shadow Collective is operating.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl text-[#4fa3e3]">RMSE: $3.24</h3>
                  <p>
                    Root Mean Square Error shows the average prediction gap. A $3.24 error in a $3-$25 range is significant—large enough for the Collective to hide their manipulations within these gaps.
                  </p>
                </div>
              </div>
              
              <p className="text-yellow-400 italic">
                "Something's off... these gaps aren't random noise. The Shadow Collective is deliberately creating these prediction errors to mask their activities. They're distorting patterns to fool our models."
              </p>
            </div>
          </div>


          {/* Section 6 - Final Steps */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#66c0f4]">
              5. The Digital War Continues
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Riley prepared the model for the ongoing battle against the Shadow Collective:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Training Set (80%):</strong> Historical data to build the prediction engine</li>
                <li><strong>Test Set (20%):</strong> Recent data to verify the model can detect new manipulation tactics</li>
              </ul>
{/*               
              <p className="text-yellow-400 italic">
                "This isn't just about behavior prediction anymore. It's a digital war of deception. The only way to fight back is to anticipate their next move."
              </p> */}
            
              
              <p className="text-yellow-400 italic">
                Riley stared at the final model output, a grim determination setting in. "The Collective thinks they can hide in the noise of our data. But with this regression model, we're not just reacting to their moves—we're forecasting their next steps. The economic stability of the NeoVerse depends on it."
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