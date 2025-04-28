import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import PageNavigation from '../../../components/navigation/PageNavigation';
import { useNavigate } from 'react-router-dom';

// Calculate split sizes based on ratio
const getSplitSizes = (splitRatio: '80-20' | '70-30' | '60-40') => {
  switch (splitRatio) {
    case '80-20':
      return { train: 80, test: 20 };
    case '70-30':
      return { train: 70, test: 30 };
    case '60-40':
      return { train: 60, test: 40 };
  }
};

const DataSplittingPage: React.FC = () => {
  const navigate = useNavigate();
  const [splitRatio, setSplitRatio] = useState<'80-20' | '70-30' | '60-40'>('80-20');
  
  const splitSizes = getSplitSizes(splitRatio);
  
  // Split visualization data
  const splitData = [
    { name: 'Training Data', value: splitSizes.train, color: '#4CAF50' },
    { name: 'Testing Data', value: splitSizes.test, color: '#2196F3' }
  ];

  // Model performance data (simulated)
  const getPerformanceData = () => {
    let trainAccuracy, testAccuracy;
    switch (splitRatio) {
      case '80-20':
        trainAccuracy = 92;
        testAccuracy = 88;
        break;
      case '70-30':
        trainAccuracy = 89;
        testAccuracy = 86;
        break;
      case '60-40':
        trainAccuracy = 85;
        testAccuracy = 84;
        break;
    }
    return [
      { name: 'Training Accuracy', value: trainAccuracy, color: '#4CAF50' },
      { name: 'Testing Accuracy', value: testAccuracy, color: '#2196F3' }
    ];
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-4 md:px-20 py-12 w-full">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <div className="space-y-16">
          {/* NEOMYST Logo */}
          <button
            onClick={() => navigate("/")}
            className="text-3xl font-bold text-[#66c0f4] relative hover:text-[#4fa3e3] transition duration-300 mb-8 font-mono"
          >
            NeoMyst
            <span className="absolute inset-0 blur-lg opacity-75 text-[#66c0f4]">
              NeoMyst
            </span>
          </button>

          {/* Title */}
          <div className="text-left">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-[#ff6b00] mb-4 relative"
            >
              <span className="relative z-10">Data Splitting</span>
              <span className="absolute inset-0 blur-sm opacity-50 text-[#ff6b00] z-0">Data Splitting</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[#66c0f4] text-lg mb-2"
            >
              Balancing Knowledge and Adaptability in the Digital War
            </motion.p>
            <p className="text-gray-300">
              In the NeoVerse, Riley faces the challenge of predicting the Shadow Collective's next moves using player data. 
              Proper data splitting is crucial to avoid <span className="text-[#FF5252] font-semibold">overfitting</span> (when a model memorizes training data but fails on new data) 
              and <span className="text-[#FFD740] font-semibold">underfitting</span> (when a model is too simple to capture important patterns).
            </p>
            <p className="text-gray-300 mt-2">
              The right balance ensures Riley's model can recognize genuine patterns in player behavior while remaining flexible enough 
              to adapt to the Shadow Collective's evolving strategies. Finding this balance is part of the <span className="text-[#64FFDA] font-semibold">bias-variance tradeoff</span> - 
              a fundamental concept in machine learning.
            </p>
          </div>

          {/* Split Selection */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setSplitRatio('80-20')}
              className={`px-4 py-2 rounded ${
                splitRatio === '80-20'
                  ? 'bg-[#4CAF50] text-white'
                  : 'bg-gray-800 text-gray-300'
              }`}
            >
              80-20 Split
            </button>
            <button
              onClick={() => setSplitRatio('70-30')}
              className={`px-4 py-2 rounded ${
                splitRatio === '70-30'
                  ? 'bg-[#4CAF50] text-white'
                  : 'bg-gray-800 text-gray-300'
              }`}
            >
              70-30 Split
            </button>
            <button
              onClick={() => setSplitRatio('60-40')}
              className={`px-4 py-2 rounded ${
                splitRatio === '60-40'
                  ? 'bg-[#4CAF50] text-white'
                  : 'bg-gray-800 text-gray-300'
              }`}
            >
              60-40 Split
            </button>
          </div>

          {/* Visualizations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Split Ratio Visualization */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-center text-[#66c0f4]">
                Neural Grid: Data Distribution
              </h2>
              <div className="h-[300px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={splitData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {splitData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Visualization */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-center text-[#66c0f4]">
                Shadow Detection Accuracy
              </h2>
              <div className="h-[300px]">
                <ResponsiveContainer>
                  <BarChart data={getPerformanceData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#66c0f4" />
                    <YAxis stroke="#66c0f4" domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #66c0f4',
                        color: '#fff'
                      }}
                      formatter={(value) => [
                        <span style={{ color: '#fff' }}>{value}</span>,
                        <span style={{ color: '#fff' }}>Accuracy</span>
                      ]}
                      labelFormatter={(label) => <span style={{ color: '#fff' }}>{label}</span>}
                    />
                    <Legend 
                      content={() => (
                        <div style={{ color: '#fff', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: '#fff', marginRight: '4px' }}>■</span>
                          <span>Accuracy</span>
                        </div>
                      )}
                    />
                    <Bar dataKey="value" name="Accuracy">
                      {getPerformanceData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#66c0f4]">Riley's Strategic Data Division</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-[#4CAF50]">Training Data ({splitSizes.train}%):</strong> This
                portion of the data is used to train your model. The model learns patterns and
                relationships from this data.
              </p>
              <p>
                <strong className="text-[#2196F3]">Testing Data ({splitSizes.test}%):</strong> This
                portion is used to evaluate how well your model performs on unseen data. It helps
                measure the model's ability to generalize.
              </p>
              {splitRatio === '80-20' && (
                <p>
                  The 80-20 split is the most common choice as it provides a good balance between
                  having enough data for training while still maintaining a representative test set.
                </p>
              )}
              {splitRatio === '70-30' && (
                <p>
                  The 70-30 split is often used when you have a moderate amount of data and want a
                  larger test set to ensure more reliable performance evaluation.
                </p>
              )}
              {splitRatio === '60-40' && (
                <p>
                  The 60-40 split is used when you want to be extra cautious about overfitting and
                  want to validate your model's performance on a larger test set.
                </p>
              )}
            </div>
          </div>
          

        </div>

        {/* Navigation Buttons */}
        <div className="mt-16">
          <PageNavigation
            goBackRoute="/modules/game-module1/outro"
            investigateRoute="/module3/intro"
          />
        </div>
      </div>
    </div>
  );
};

export default DataSplittingPage;
