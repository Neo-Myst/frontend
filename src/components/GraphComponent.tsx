import React from "react";
import { Line, Scatter, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface GraphProps {
  sunlight: number;
  water: number;
  xAxis: string;
  yAxis: string;
  graphType: string;
  trainSplit: number; // Added trainSplit
}

const Graph: React.FC<GraphProps> = ({
  sunlight,
  water,
  xAxis,
  yAxis,
  graphType,
  trainSplit,
}) => {
  // Dataset for one type of plant
  const dataset = [
    { sunlight: 2, water: 1, growth: 15 },
    { sunlight: 4, water: 2, growth: 30 },
    { sunlight: 6, water: 3, growth: 50 },
    { sunlight: 8, water: 4, growth: 70 },
    { sunlight: 10, water: 5, growth: 60 },
    { sunlight: 12, water: 6, growth: 40 },
    { sunlight: 3, water: 1, growth: 20 },
    { sunlight: 5, water: 4, growth: 45 },
    { sunlight: 9, water: 5, growth: 65 },
    { sunlight: 7, water: 3, growth: 55 },
    { sunlight: 4, water: 5, growth: 35 },
    { sunlight: 11, water: 4, growth: 50 },
    { sunlight: 6, water: 2, growth: 40 },
    { sunlight: 8, water: 6, growth: 60 },
    { sunlight: 10, water: 7, growth: 50 },
    { sunlight: 9, water: 3, growth: 55 },
    { sunlight: 3, water: 2, growth: 25 },
    { sunlight: 5, water: 1, growth: 20 },
    { sunlight: 12, water: 8, growth: 45 },
    { sunlight: 8, water: 5, growth: 65 },
    { sunlight: 7, water: 4, growth: 55 },
    { sunlight: 6, water: 3, growth: 50 },
    { sunlight: 4, water: 2, growth: 30 },
    { sunlight: 2, water: 1, growth: 10 },
  ];

  // Filter the data based on sunlight and water values
  const filteredData = dataset.filter(
    (d) => d.sunlight >= sunlight && d.water >= water
  );

  // Split data into training and testing based on trainSplit
  const splitIndex = Math.floor((trainSplit / 100) * filteredData.length);
  const trainingData = filteredData.slice(0, splitIndex);
  const testingData = filteredData.slice(splitIndex);

  // Use training data for graph visualization
  const xValues = trainingData.map((d) => d[xAxis as keyof typeof d]);
  const yValues = trainingData.map((d) => d[yAxis as keyof typeof d]);
  const pointColors = trainingData.map((d) => {
    if (d.growth < 30) return "red"; // Short plants
    if (d.growth >= 30 && d.growth <= 50) return "yellow"; // Medium plants
    return "green"; // Tall plants
  });

  const data = {
    labels: xValues.map((value) => Number(value).toFixed(2)), // Format to 2 decimal places
    datasets: [
      {
        label: "Training Data",
        data: yValues,
        borderColor: pointColors,
        backgroundColor: pointColors,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          callback: function (value: any) {
            return parseFloat(value).toFixed(2); // Limit to 2 decimal places
          },
        },
        title: {
          display: true,
          text: xAxis,
        },
      },
      y: {
        title: {
          display: true,
          text: yAxis,
        },
      },
    },
  };

  switch (graphType) {
    case "bar":
      return <Bar data={data} options={options} />;
    case "scatter":
      return <Scatter data={data} options={options} />;
    default:
      return <Line data={data} options={options} />;
  }
};

export default Graph;
