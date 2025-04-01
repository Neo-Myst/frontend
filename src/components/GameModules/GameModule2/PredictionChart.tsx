// // components/GameModule2/PredictionChart.tsx
// import React, { useState } from "react";
// import { Box, Paper, Typography, styled } from "@mui/material";
// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   ReferenceLine,
// } from "recharts";

// interface PredictionChartProps {
//   actuals: number[];
//   predictions: number[];
// }

// // Custom tooltip component
// interface CustomTooltipProps {
//   active?: boolean;
//   payload?: Array<{
//     payload: { id: string; actual: number; predicted: number };
//   }>;
// }

// interface PlayerDataPoint {
//   id: string;
//   actual: number;
//   predicted: number;
// }

// // Define a type for Recharts dot props
// interface RechartsDotProps {
//   cx?: number;
//   cy?: number;
//   r?: number;
//   fill?: string;
//   stroke?: string;
//   strokeWidth?: number;
//   opacity?: number;
//   key?: string | number;
//   className?: string;
//   [key: string]: unknown;
// }

// const StyledTooltip = styled(Box)({
//   backgroundColor: "#0f172a",
//   padding: "12px",
//   border: "1px solid #304060",
//   borderRadius: "6px",
//   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
// });

// const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     const data = payload[0].payload;
//     const diff = Math.abs(data.actual - data.predicted);
//     const percentage = ((diff / data.actual) * 100).toFixed(1);

//     return (
//       <StyledTooltip>
//         <Typography variant="subtitle2" sx={{ color: "#4ec9ff", mb: 1 }}>
//           Player {data.id}
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{
//             color: "#e6eeff",
//             display: "flex",
//             justifyContent: "space-between",
//             gap: 2,
//           }}
//         >
//           <span>Actual:</span>{" "}
//           <span style={{ color: "#4ec9ff", fontWeight: "bold" }}>
//             ${data.actual}
//           </span>
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{
//             color: "#e6eeff",
//             display: "flex",
//             justifyContent: "space-between",
//             gap: 2,
//           }}
//         >
//           <span>Predicted:</span>{" "}
//           <span style={{ color: "#f97316", fontWeight: "bold" }}>
//             ${data.predicted}
//           </span>
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{
//             color: "#e6eeff",
//             display: "flex",
//             justifyContent: "space-between",
//             gap: 2,
//             mt: 1,
//             pt: 1,
//             borderTop: "1px solid #304060",
//           }}
//         >
//           <span>Difference:</span>{" "}
//           <span
//             style={{
//               color: diff > data.actual * 0.2 ? "#f87171" : "#4ade80",
//               fontWeight: "bold",
//             }}
//           >
//             {percentage}%
//           </span>
//         </Typography>
//       </StyledTooltip>
//     );
//   }

//   return null;
// };

// // Chart container
// const ChartContainer = styled(Paper)({
//   backgroundColor: "#15202c",
//   padding: "20px",
//   borderRadius: "6px",
//   border: "1px solid #1c2431",
//   marginBottom: "20px",
// });

// // Legend item styles
// const LegendItem = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   marginRight: "16px",
// });

// const LegendColor = styled(Box, {
//   shouldForwardProp: (prop) => prop !== "color",
// })<{ color: string }>(({ color }) => ({
//   width: "12px",
//   height: "12px",
//   backgroundColor: color,
//   marginRight: "8px",
//   borderRadius: "2px",
// }));

// // Custom legend
// const CustomLegend = () => {
//   return (
//     <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
//       <LegendItem>
//         <LegendColor color="#4ec9ff" />
//         <Typography variant="caption" sx={{ color: "#e6eeff" }}>
//           Actual
//         </Typography>
//       </LegendItem>
//       <LegendItem>
//         <LegendColor color="#f97316" />
//         <Typography variant="caption" sx={{ color: "#e6eeff" }}>
//           Predicted
//         </Typography>
//       </LegendItem>
//       <LegendItem>
//         <Box
//           component="span"
//           sx={{
//             width: "36px",
//             borderTop: "1px dashed #f87171",
//             marginRight: "8px",
//             marginTop: "6px",
//           }}
//         />
//         <Typography variant="caption" sx={{ color: "#e6eeff" }}>
//           Perfect prediction line
//         </Typography>
//       </LegendItem>
//     </Box>
//   );
// };

// // Chart visualization component
// const PredictionChart: React.FC<PredictionChartProps> = ({
//   actuals,
//   predictions,
// }) => {
//   // Combine data points
//   const data: PlayerDataPoint[] = actuals.map((actual, index) => ({
//     id: `P${index + 1}`,
//     actual,
//     predicted: predictions[index],
//   }));

//   // Find min and max values for chart axes
//   const allValues = [...actuals, ...predictions];
//   const minValue = Math.min(...allValues) * 0.8;
//   const maxValue = Math.max(...allValues) * 1.2;

//   // Animation toggle state
//   const [animated, setAnimated] = useState(false);

//   // Set animation after component mounts
//   React.useEffect(() => {
//     const timer = setTimeout(() => {
//       setAnimated(true);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, []);

//   // Here is the fix - use a class-based approach with proper error handling
//   class CustomDot extends React.Component<RechartsDotProps> {
//     render() {
//       const { cx, cy, fill } = this.props;
//       if (!cx || !cy || !fill) return null;

//       return (
//         <g>
//           <circle cx={cx} cy={cy} r={8} fill={fill} opacity={0.7} />
//           <circle cx={cx} cy={cy} r={4} fill="#15202c" />
//         </g>
//       );
//     }
//   }

//   return (
//     <ChartContainer elevation={3}>
//       <Typography
//         variant="h6"
//         sx={{
//           color: "#4ec9ff",
//           mb: 2,
//           fontWeight: "bold",
//           textAlign: "center",
//         }}
//       >
//         Actual vs. Predicted Spending
//       </Typography>

//       <Box
//         sx={{
//           height: 400,
//           opacity: animated ? 1 : 0,
//           transition: "opacity 0.5s ease-in",
//         }}
//       >
//         <ResponsiveContainer width="100%" height="100%">
//           <ScatterChart
//             margin={{
//               top: 20,
//               right: 20,
//               bottom: 20,
//               left: 20,
//             }}
//           >
//             <CartesianGrid
//               strokeDasharray="3 3"
//               stroke="#1c2431"
//               vertical={false}
//             />
//             <XAxis
//               type="number"
//               dataKey="actual"
//               name="Actual"
//               domain={[minValue, maxValue]}
//               tick={{ fill: "#8599b9" }}
//               tickFormatter={(value) => `$${value}`}
//               label={{
//                 value: "Actual Spending ($)",
//                 position: "insideBottom",
//                 offset: -10,
//                 fill: "#8599b9",
//               }}
//             />
//             <YAxis
//               type="number"
//               dataKey="predicted"
//               name="Predicted"
//               domain={[minValue, maxValue]}
//               tick={{ fill: "#8599b9" }}
//               tickFormatter={(value) => `$${value}`}
//               label={{
//                 value: "Predicted Spending ($)",
//                 angle: -90,
//                 position: "insideLeft",
//                 fill: "#8599b9",
//               }}
//             />
//             <Tooltip content={<CustomTooltip />} />

//             {/* Perfect prediction line */}
//             <ReferenceLine
//               segment={[
//                 { x: minValue, y: minValue },
//                 { x: maxValue, y: maxValue },
//               ]}
//               stroke="#f87171"
//               strokeDasharray="3 3"
//               ifOverflow="extendDomain"
//             />

//             {/* Scatter plot */}
//             <Scatter
//               name="Actual vs Predicted"
//               data={data}
//               fill="#4ec9ff"
//               shape={<CustomDot />}
//             />
//           </ScatterChart>
//         </ResponsiveContainer>
//       </Box>

//       <CustomLegend />

//       <Typography
//         variant="caption"
//         sx={{ color: "#8599b9", display: "block", textAlign: "center", mt: 1 }}
//       >
//         Points closer to the dashed line indicate more accurate predictions
//       </Typography>
//     </ChartContainer>
//   );
// };

// export default PredictionChart;
// components/GameModule2/PredictionChart.tsx
// import React, { useState } from "react";
// import { Box, Paper, Typography, styled } from "@mui/material";
// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   ReferenceLine,
//   ZAxis,
// } from "recharts";

// interface PredictionChartProps {
//   actuals: number[];
//   predictions: number[];
// }

// // Custom tooltip component
// interface CustomTooltipProps {
//   active?: boolean;
//   payload?: Array<{
//     payload: { id: string; actual: number; predicted: number; error: number };
//   }>;
// }

// interface PlayerDataPoint {
//   id: string;
//   actual: number;
//   predicted: number;
//   error: number; // Added to track prediction error for each point
// }

// // Define a type for Recharts dot props
// interface RechartsDotProps {
//   cx?: number;
//   cy?: number;
//   r?: number;
//   fill?: string;
//   stroke?: string;
//   strokeWidth?: number;
//   opacity?: number;
//   key?: string | number;
//   className?: string;
//   payload?: PlayerDataPoint;
//   [key: string]: unknown;
// }

// const StyledTooltip = styled(Box)({
//   backgroundColor: "#0f172a",
//   padding: "12px",
//   border: "1px solid #304060",
//   borderRadius: "6px",
//   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
// });

// const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     const data = payload[0].payload;
//     const diff = Math.abs(data.actual - data.predicted);
//     const percentage = ((diff / data.actual) * 100).toFixed(1);

//     return (
//       <StyledTooltip>
//         <Typography variant="subtitle2" sx={{ color: "#4ec9ff", mb: 1 }}>
//           Player {data.id}
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{
//             color: "#e6eeff",
//             display: "flex",
//             justifyContent: "space-between",
//             gap: 2,
//           }}
//         >
//           <span>Actual:</span>{" "}
//           <span style={{ color: "#4ec9ff", fontWeight: "bold" }}>
//             ${data.actual.toFixed(0)}
//           </span>
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{
//             color: "#e6eeff",
//             display: "flex",
//             justifyContent: "space-between",
//             gap: 2,
//           }}
//         >
//           <span>Predicted:</span>{" "}
//           <span style={{ color: "#4ade80", fontWeight: "bold" }}>
//             ${data.predicted.toFixed(0)}
//           </span>
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{
//             color: "#e6eeff",
//             display: "flex",
//             justifyContent: "space-between",
//             gap: 2,
//             mt: 1,
//             pt: 1,
//             borderTop: "1px solid #304060",
//           }}
//         >
//           <span>Difference:</span>{" "}
//           <span
//             style={{
//               color: diff > data.actual * 0.1 ? "#f87171" : "#4ade80",
//               fontWeight: "bold",
//             }}
//           >
//             ${diff.toFixed(0)} ({percentage}%)
//           </span>
//         </Typography>
//       </StyledTooltip>
//     );
//   }

//   return null;
// };

// // Chart container
// const ChartContainer = styled(Paper)({
//   backgroundColor: "#15202c",
//   padding: "24px",
//   borderRadius: "6px",
//   border: "1px solid #1c2431",
//   marginBottom: "20px",
// });

// // Legend item styles
// const LegendItem = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   marginRight: "16px",
// });

// const LegendColor = styled(Box, {
//   shouldForwardProp: (prop) => prop !== "color",
// })<{ color: string }>(({ color }) => ({
//   width: "12px",
//   height: "12px",
//   backgroundColor: color,
//   marginRight: "8px",
//   borderRadius: "2px",
// }));

// // Custom legend
// const CustomLegend = () => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         marginTop: 2,
//         flexWrap: "wrap",
//         gap: 2,
//       }}
//     >
//       <LegendItem>
//         <LegendColor color="#4ade80" />
//         <Typography variant="caption" sx={{ color: "#e6eeff" }}>
//           Data Points
//         </Typography>
//       </LegendItem>
//       <LegendItem>
//         <Box
//           component="span"
//           sx={{
//             width: "36px",
//             borderTop: "1px dashed #f87171",
//             marginRight: "8px",
//             marginTop: "6px",
//           }}
//         />
//         <Typography variant="caption" sx={{ color: "#e6eeff" }}>
//           Perfect prediction line
//         </Typography>
//       </LegendItem>
//     </Box>
//   );
// };

// // Enhanced color mapping for data points based on prediction error
// const getColorByError = (error: number): string => {
//   // Perfect predictions are green, worse ones fade to red
//   if (error < 0.03) return "#4ade80"; // Green for very accurate
//   if (error < 0.05) return "#86efac"; // Light green
//   if (error < 0.08) return "#fcd34d"; // Yellow
//   if (error < 0.12) return "#fb923c"; // Orange
//   return "#f87171"; // Red for poor predictions
// };

// // Chart visualization component
// const PredictionChart: React.FC<PredictionChartProps> = ({
//   actuals,
//   predictions,
// }) => {
//   // Process and prepare data with error calculations
//   const data: PlayerDataPoint[] = actuals.map((actual, index) => {
//     const predicted = predictions[index];
//     const error = Math.abs(actual - predicted) / actual; // Relative error
//     return {
//       id: `P${index + 1}`,
//       actual,
//       predicted,
//       error,
//     };
//   });

//   // Find min and max values for chart axes with more appropriate padding
//   const allValues = [...actuals, ...predictions];
//   const minValue = Math.min(...allValues) * 0.9;
//   const maxValue = Math.max(...allValues) * 1.1;

//   // Format large numbers for better readability
//   const formatCurrency = (value: number) => {
//     if (value >= 10000) {
//       return `$${(value / 1000).toFixed(0)}K`;
//     }
//     return `$${value.toFixed(0)}`;
//   };

//   // Animation toggle state
//   const [animated, setAnimated] = useState(false);

//   // Set animation after component mounts
//   React.useEffect(() => {
//     const timer = setTimeout(() => {
//       setAnimated(true);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, []);

//   // Custom dot visualization with error-based coloring
//   class CustomDot extends React.Component<RechartsDotProps> {
//     render() {
//       const { cx, cy, payload } = this.props;
//       if (!cx || !cy || !payload) return null;

//       // Color based on prediction error
//       const fillColor = getColorByError(payload.error);

//       // Size based on value (larger values = larger dots)
//       const baseSize = 8;
//       const size =
//         payload.actual > 20000
//           ? baseSize * 1.5
//           : payload.actual > 10000
//           ? baseSize * 1.3
//           : baseSize;

//       return (
//         <g>
//           <circle
//             cx={cx}
//             cy={cy}
//             r={size}
//             fill={fillColor}
//             opacity={0.8}
//             stroke="#15202c"
//             strokeWidth={1}
//           />
//         </g>
//       );
//     }
//   }

//   return (
//     <ChartContainer elevation={3}>
//       <Typography
//         variant="h6"
//         sx={{
//           color: "#4ec9ff",
//           mb: 3,
//           fontWeight: "bold",
//           textAlign: "center",
//         }}
//       >
//         Player Spending Prediction Accuracy
//       </Typography>

//       <Box
//         sx={{
//           height: 450,
//           opacity: animated ? 1 : 0,
//           transition: "opacity 0.5s ease-in",
//         }}
//       >
//         <ResponsiveContainer width="100%" height="100%">
//           <ScatterChart
//             margin={{
//               top: 20,
//               right: 30,
//               bottom: 50,
//               left: 50,
//             }}
//           >
//             <CartesianGrid
//               strokeDasharray="3 3"
//               stroke="#1c2431"
//               opacity={0.6}
//             />
//             <XAxis
//               type="number"
//               dataKey="actual"
//               name="Actual"
//               domain={[minValue, maxValue]}
//               tick={{ fill: "#8599b9" }}
//               tickFormatter={formatCurrency}
//               label={{
//                 value: "Actual Spending",
//                 position: "insideBottom",
//                 offset: -10,
//                 fill: "#8599b9",
//               }}
//             />
//             <YAxis
//               type="number"
//               dataKey="predicted"
//               name="Predicted"
//               domain={[minValue, maxValue]}
//               tick={{ fill: "#8599b9" }}
//               tickFormatter={formatCurrency}
//               label={{
//                 value: "Predicted Spending",
//                 angle: -90,
//                 position: "insideLeft",
//                 offset: -10,
//                 fill: "#8599b9",
//               }}
//             />

//             {/* Color scale based on prediction error */}
//             <ZAxis
//               type="number"
//               dataKey="error"
//               range={[50, 500]}
//               name="Error"
//             />

//             <Tooltip content={<CustomTooltip />} />

//             {/* Perfect prediction line */}
//             <ReferenceLine
//               segment={[
//                 { x: minValue, y: minValue },
//                 { x: maxValue, y: maxValue },
//               ]}
//               stroke="#f87171"
//               strokeDasharray="3 3"
//               ifOverflow="extendDomain"
//             />

//             {/* Scatter plot */}
//             <Scatter
//               name="Actual vs Predicted"
//               data={data}
//               shape={<CustomDot />}
//             />
//           </ScatterChart>
//         </ResponsiveContainer>
//       </Box>

//       <CustomLegend />

//       <Box sx={{ mt: 2 }}>
//         <Typography
//           variant="body2"
//           sx={{ color: "#8599b9", display: "block", textAlign: "center" }}
//         >
//           The points show actual vs. predicted spending for each player.
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{ color: "#8599b9", display: "block", textAlign: "center" }}
//         >
//           Green dots indicate more accurate predictions, red dots show larger
//           errors.
//         </Typography>
//         <Typography
//           variant="caption"
//           sx={{
//             color: "#8599b9",
//             display: "block",
//             textAlign: "center",
//             mt: 1,
//           }}
//         >
//           Points closer to the dashed line indicate more accurate predictions
//         </Typography>
//       </Box>
//     </ChartContainer>
//   );
// };

// export default PredictionChart;

// components/GameModule2/PredictionChart.tsx

// components/GameModule2/PredictionChart.tsx
import React, { useState } from "react";
import { Box, Paper, Typography, styled } from "@mui/material";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ZAxis,
  Line,
} from "recharts";

interface PredictionChartProps {
  actuals: number[];
  predictions: number[];
}

// Custom tooltip component
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      id: string;
      actual: number;
      predicted: number;
      error: number;
      distance: number;
    };
  }>;
}

interface PlayerDataPoint {
  id: string;
  actual: number;
  predicted: number;
  error: number;
  distance: number; // Absolute distance from perfect prediction line
  // For distance lines
  perfectX?: number;
  perfectY?: number;
}

// Define a type for Recharts dot props
interface RechartsDotProps {
  cx?: number;
  cy?: number;
  r?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  key?: string | number;
  className?: string;
  payload?: PlayerDataPoint;
  [key: string]: unknown;
}

const StyledTooltip = styled(Box)({
  backgroundColor: "#0f172a",
  padding: "12px",
  border: "1px solid #304060",
  borderRadius: "6px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
});

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const diff = Math.abs(data.actual - data.predicted);
    const percentage = ((diff / data.actual) * 100).toFixed(1);

    return (
      <StyledTooltip>
        <Typography variant="subtitle2" sx={{ color: "#4ec9ff", mb: 1 }}>
          Player {data.id}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#e6eeff",
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <span>Actual:</span>{" "}
          <span style={{ color: "#4ec9ff", fontWeight: "bold" }}>
            ${data.actual.toFixed(0)}
          </span>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#e6eeff",
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <span>Predicted:</span>{" "}
          <span style={{ color: "#4ade80", fontWeight: "bold" }}>
            ${data.predicted.toFixed(0)}
          </span>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#e6eeff",
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mt: 1,
            pt: 1,
            borderTop: "1px solid #304060",
          }}
        >
          <span>Difference:</span>{" "}
          <span
            style={{
              color: diff > data.actual * 0.1 ? "#f87171" : "#4ade80",
              fontWeight: "bold",
            }}
          >
            ${diff.toFixed(0)} ({percentage}%)
          </span>
        </Typography>
        {data.distance > 1000 && (
          <Typography
            variant="body2"
            sx={{
              color: "#f87171",
              display: "block",
              mt: 1,
              fontStyle: "italic",
            }}
          >
            Significant deviation from expected
          </Typography>
        )}
      </StyledTooltip>
    );
  }

  return null;
};

// Chart container
const ChartContainer = styled(Paper)({
  backgroundColor: "#15202c",
  padding: "24px",
  borderRadius: "6px",
  border: "1px solid #1c2431",
  marginBottom: "20px",
});

// Legend item styles
const LegendItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginRight: "16px",
});

const LegendColor = styled(Box, {
  shouldForwardProp: (prop) => prop !== "color",
})<{ color: string }>(({ color }) => ({
  width: "12px",
  height: "12px",
  backgroundColor: color,
  marginRight: "8px",
  borderRadius: "2px",
}));

// Custom legend
const CustomLegend = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 2,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <LegendItem>
        <LegendColor color="#4ade80" />
        <Typography variant="caption" sx={{ color: "#e6eeff" }}>
          Accurate Predictions
        </Typography>
      </LegendItem>
      <LegendItem>
        <LegendColor color="#f87171" />
        <Typography variant="caption" sx={{ color: "#e6eeff" }}>
          Outlier Predictions
        </Typography>
      </LegendItem>
      <LegendItem>
        <Box
          component="span"
          sx={{
            width: "36px",
            borderTop: "1px dashed #f87171",
            marginRight: "8px",
            marginTop: "6px",
          }}
        />
        <Typography variant="caption" sx={{ color: "#e6eeff" }}>
          Perfect prediction line
        </Typography>
      </LegendItem>
      <LegendItem>
        <Box
          component="span"
          sx={{
            width: "30px",
            borderTop: "1px dotted #7c3aed",
            marginRight: "8px",
            marginTop: "6px",
          }}
        />
        <Typography variant="caption" sx={{ color: "#e6eeff" }}>
          Deviation lines
        </Typography>
      </LegendItem>
    </Box>
  );
};

// Enhanced color mapping for data points based on prediction error
const getColorByError = (error: number): string => {
  // Perfect predictions are green, worse ones fade to red
  if (error < 0.03) return "#4ade80"; // Green for very accurate
  if (error < 0.05) return "#86efac"; // Light green
  if (error < 0.08) return "#fcd34d"; // Yellow
  if (error < 0.12) return "#fb923c"; // Orange
  return "#f87171"; // Red for poor predictions
};

// Chart visualization component
const PredictionChart: React.FC<PredictionChartProps> = ({
  actuals,
  predictions,
}) => {
  // Process and prepare data with error calculations and distance from perfect line
  const data: PlayerDataPoint[] = actuals.map((actual, index) => {
    const predicted = predictions[index];
    const error = Math.abs(actual - predicted) / actual; // Relative error

    // Calculate the closest point on the perfect prediction line
    // For a line y=x, the closest point to (actual, predicted) is ((actual+predicted)/2, (actual+predicted)/2)
    const perfectPoint = (actual + predicted) / 2;

    // Calculate distance from perfect line (using Euclidean distance)
    const distance = Math.abs(predicted - actual) / Math.sqrt(2);

    return {
      id: `P${index + 1}`,
      actual,
      predicted,
      error,
      distance,
      // Add coordinates for the closest point on perfect line - will be used for distance lines
      perfectX: perfectPoint,
      perfectY: perfectPoint,
    };
  });

  // Find min and max values for chart axes with more appropriate padding
  const allValues = [...actuals, ...predictions];
  const minValue = Math.min(...allValues) * 0.9;
  const maxValue = Math.max(...allValues) * 1.1;

  // Format large numbers for better readability
  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  // Animation toggle state for fade-in only (no pulsing)
  const [animated, setAnimated] = useState(false);

  // Set animation after component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filter outliers (points with significant distance) to show distance lines
  const outlierThreshold = 2000; // Adjust this threshold as needed
  const outliers = data.filter((point) => point.distance > outlierThreshold);

  // Create distance line data
  const distanceLines = outliers.map((point) => [
    { x: point.actual, y: point.predicted, id: `${point.id}-start` },
    { x: point.perfectX, y: point.perfectY, id: `${point.id}-end` },
  ]);

  // Custom dot visualization with error-based coloring - no animation
  class CustomDot extends React.Component<RechartsDotProps> {
    render() {
      const { cx, cy, payload } = this.props;
      if (!cx || !cy || !payload) return null;

      // Color based on prediction error
      const fillColor = getColorByError(payload.error);

      // Size based on value and outlier status
      const baseSize = 8;
      const size =
        payload.distance > outlierThreshold
          ? baseSize * 1.4
          : payload.actual > 20000
          ? baseSize * 1.3
          : baseSize;

      // Add slightly thicker stroke for outliers
      const strokeWidth = payload.distance > outlierThreshold ? 1.5 : 1;

      return (
        <g>
          <circle
            cx={cx}
            cy={cy}
            r={size}
            fill={fillColor}
            opacity={0.8}
            stroke="#15202c"
            strokeWidth={strokeWidth}
          />

          {/* Add a highlight ring for outliers instead of animation */}
          {payload.distance > outlierThreshold && (
            <circle
              cx={cx}
              cy={cy}
              r={size + 4}
              fill="none"
              stroke={fillColor}
              strokeWidth={1}
              opacity={0.4}
            />
          )}
        </g>
      );
    }
  }

  return (
    <ChartContainer elevation={3}>
      <Typography
        variant="h6"
        sx={{
          color: "#4ec9ff",
          mb: 3,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Player Spending Prediction Accuracy
      </Typography>

      <Box
        sx={{
          height: 450,
          opacity: animated ? 1 : 0,
          transition: "opacity 0.5s ease-in",
          position: "relative",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 30,
              bottom: 50,
              left: 50,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1c2431"
              opacity={0.6}
            />
            <XAxis
              type="number"
              dataKey="actual"
              name="Actual"
              domain={[minValue, maxValue]}
              tick={{ fill: "#8599b9" }}
              tickFormatter={formatCurrency}
              label={{
                value: "Actual Spending",
                position: "insideBottom",
                offset: -10,
                fill: "#8599b9",
              }}
            />
            <YAxis
              type="number"
              dataKey="predicted"
              name="Predicted"
              domain={[minValue, maxValue]}
              tick={{ fill: "#8599b9" }}
              tickFormatter={formatCurrency}
              label={{
                value: "Predicted Spending",
                angle: -90,
                position: "insideLeft",
                offset: -10,
                fill: "#8599b9",
              }}
            />

            {/* Color scale based on prediction error */}
            <ZAxis
              type="number"
              dataKey="error"
              range={[50, 500]}
              name="Error"
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Perfect prediction line */}
            <ReferenceLine
              segment={[
                { x: minValue, y: minValue },
                { x: maxValue, y: maxValue },
              ]}
              stroke="#f87171"
              strokeDasharray="3 3"
              ifOverflow="extendDomain"
            />

            {/* Add distance lines for outliers */}
            {distanceLines.map((line, index) => (
              <Line
                key={`distance-${index}`}
                data={line}
                dataKey="y"
                xAxisId={0}
                yAxisId={0}
                stroke="#7c3aed" // Purple
                strokeWidth={1}
                strokeDasharray="2 2"
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />
            ))}

            {/* Scatter plot */}
            <Scatter
              name="Actual vs Predicted"
              data={data}
              shape={<CustomDot />}
              isAnimationActive={false}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </Box>

      <CustomLegend />

      <Box sx={{ mt: 2 }}>
        <Typography
          variant="body2"
          sx={{ color: "#8599b9", display: "block", textAlign: "center" }}
        >
          The points show actual vs. predicted spending for each player.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#8599b9", display: "block", textAlign: "center" }}
        >
          Green dots indicate accurate predictions, red dots with distance lines
          show significant outliers.
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "#8599b9",
            display: "block",
            textAlign: "center",
            mt: 1,
          }}
        >
          Dotted purple lines show the distance from perfect prediction
        </Typography>
      </Box>
    </ChartContainer>
  );
};

export default PredictionChart;
