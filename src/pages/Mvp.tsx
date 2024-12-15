import React, { useState } from "react";
import "../css/Mvp.css";
import Header from "../components/Header.tsx";
import LearningCard from "../components/LearningCard.tsx";
import ControlPanel from "../components/ControlPanel.tsx";
import Graph from "../components/GraphComponent.tsx";

const App: React.FC = () => {
  const [state, setState] = useState({
    sunlight: 6,
    water: 4,
    growth: 0,
    trainSplit: 80,
    xAxis: "sunlight",
    yAxis: "growth",
    plantTypeFilter: "all",
    graphType: "scatter",
    resultMessage: "",
    showModal: false, // For controlling the modal visibility
  });

  const predictGrowth = (sunlight: number, water: number): number => {
    const optimalSunlight = 8; // Optimal sunlight for max growth
    const optimalWater = 4;   // Optimal water for max growth

    // Growth penalties for deviation from optimal conditions
    const sunlightEffect = Math.max(0, 70 - Math.pow(sunlight - optimalSunlight, 2) * 5);
    const waterEffect = Math.max(0, 70 - Math.pow(water - optimalWater, 2) * 10);

    return Math.min(100, (sunlightEffect + waterEffect) / 2); // Normalize to a max of 100
  };

  const handlePrediction = () => {
    const { sunlight, water } = state;
    const growth = predictGrowth(sunlight, water);
    const resultMessage = growth > 50 ? "You Won! 🎉" : "You Lost! 😢";
    setState((prev) => ({
      ...prev,
      growth,
      resultMessage,
      showModal: true, // Show the modal
    }));
  };

  const closeModal = () => {
    setState((prev) => ({
      ...prev,
      showModal: false, // Close the modal
    }));
  };

  const handleUpdate = (updatedParams: Partial<typeof state>) => {
    setState((prev) => ({ ...prev, ...updatedParams }));
  };

  const handleReset = () => {
    setState({
      sunlight: 6,
      water: 4,
      growth: 0,
      trainSplit: 20,
      xAxis: "sunlight",
      yAxis: "growth",
      plantTypeFilter: "all",
      graphType: "scatter",
      resultMessage: "",
      showModal: false,
    });
  };

  return (
    <div className="App">
      <Header />
      <div className="main-layout">
        <div className="left-section">
          <LearningCard />
        </div>
        <div className="visualization-section">
          <Graph {...state} />
        </div>
        <div className="control-section">
          <ControlPanel
            {...state}
            onUpdate={handleUpdate}
            onReset={handleReset}
            onPredict={handlePrediction} // Pass prediction handler
          />
        </div>
        {state.showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>{state.resultMessage}</h2>
              <p>Predicted Growth: {state.growth.toFixed(2)} cm</p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
