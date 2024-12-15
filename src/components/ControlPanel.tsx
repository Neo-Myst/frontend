import "../css/ControlPanel.css"
import React from "react";

export interface ControlPanelProps {
  sunlight: number;
  water: number;
  growth: number;
  trainSplit: number;
  xAxis: string;
  yAxis: string;
  graphType: string;
  onUpdate: (params: Partial<ControlPanelProps>) => void;
  onReset: () => void;
  onPredict: () => void; // New prop for prediction handler
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  sunlight,
  water,
  growth,
  trainSplit,
  xAxis,
  yAxis,
  graphType,
  onUpdate,
  onReset,
  onPredict,
}) => {
  return (
    <div className="control-panel">
      {/* Column 1 */}
      <div className="panel-group">
        <h3 className="panel-header">Sunlight (hours)</h3>
        <div className="control">
          <input
            className="slider"
            type="range"
            min="0"
            max="12"
            step="1"
            value={sunlight}
            onChange={(e) => onUpdate({ sunlight: parseInt(e.target.value, 10) })}
          />
          <input
            className="number-input"
            type="number"
            min="0"
            max="12"
            step="1"
            value={sunlight}
            onChange={(e) => onUpdate({ sunlight: parseInt(e.target.value, 10) })}
          />
        </div>
        <h3 className="panel-header">Water (liters)</h3>
        <div className="control">
          <input
            className="slider"
            type="range"
            min="0"
            max="10"
            step="1"
            value={water}
            onChange={(e) => onUpdate({ water: parseInt(e.target.value, 10) })}
          />
          <input
            className="number-input"
            type="number"
            min="0"
            max="10"
            step="1"
            value={water}
            onChange={(e) => onUpdate({ water: parseInt(e.target.value, 10) })}
          />
        </div>
      </div>

      {/* Column 2 */}
      <div className="panel-group">
        <h3 className="panel-header">Growth (cm)</h3>
        <div className="control">
          <input
            className="slider"
            type="range"
            min="0"
            max="100"
            step="1"
            value={growth}
            disabled // Disable manual editing of growth
          />
          <input
            className="number-input"
            type="number"
            min="0"
            max="100"
            step="1"
            value={growth}
            disabled // Disable manual editing of growth
          />
        </div>
        <h3 className="panel-header">Train/Test Split</h3>
        <div className="control">
          <input
            className="number-input"
            type="number"
            min="10"
            max="90"
            step="10"
            value={trainSplit}
            onChange={(e) => onUpdate({ trainSplit: parseInt(e.target.value, 10) })}
          />
          <span className="train-label">% Training</span>
        </div>
      </div>

      {/* Column 3 */}
      <div className="panel-group">
        <h3 className="panel-header">Graph Type</h3>
        <div className="control">
          <select
            className="dropdown"
            value={graphType}
            onChange={(e) => onUpdate({ graphType: e.target.value })}
          >
            <option value="scatter">Scatter</option>
            <option value="bar">Bar</option>
            <option value="line">Line</option>
          </select>
        </div>
        <h3 className="panel-header">Visualization Axes</h3>
        <div className="control">
          <label className="axis-label">X-Axis:</label>
          <select
            className="dropdown"
            value={xAxis}
            onChange={(e) => onUpdate({ xAxis: e.target.value })}
          >
            <option value="sunlight">Sunlight</option>
            <option value="water">Water</option>
          </select>
          <label className="axis-label">Y-Axis:</label>
          <select
            className="dropdown"
            value={yAxis}
            onChange={(e) => onUpdate({ yAxis: e.target.value })}
          >
            <option value="growth">Growth</option>
          </select>
        </div>
        <button className="reset-button" onClick={onReset}>
          Reset
        </button>
        <button className="submit-button" onClick={onPredict}>
          Submit
        </button> 
      </div>
    </div>
  );
};

export default ControlPanel;
