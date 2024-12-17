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
import dataset from "../data/dataset";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  // Filter the data based on sunlight and water values
  const filteredData = dataset.filter(
    (d) => d.sunlight >= sunlight && d.water >= water
  );

  // Split data into training and testing based on trainSplit
  const splitIndex = Math.floor((trainSplit / 100) * filteredData.length);
  const trainingData = filteredData.slice(0, splitIndex);
  // const testingData = filteredData.slice(splitIndex);

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

  // const options = {
  //   scales: {
  //     x: {
  //       min: 1, // Leave space before 0
  //       max: 10, // Leave space after 10
  //       ticks: {
  //         stepSize: 1, // Ticks at every integer (0, 1, 2, ..., 10)
  //         callback: function (value: number) {
  //           return value.toString(); // Ensure ticks display as whole numbers
  //         },
  //       },
  //       title: {
  //         display: true,
  //         text: xAxis,
  //       },
  //     },
  //     y: {
  //       min: 0, // Leave space below 0
  //       max: 100, // Leave space above 100
  //       ticks: {
  //         stepSize: 10, // Ticks at every 10 units (0, 10, 20, ..., 100)
  //         callback: function (value: number) {
  //           return value.toString(); // Ensure ticks display as whole numbers
  //         },
  //       },
  //       title: {
  //         display: true,
  //         text: yAxis,
  //       },
  //     },
  //   },
  // };

  const options = {
    scales: {
      x: {
        min: 1,
        max: 10,
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
        min: 0,
        max: 100,
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
