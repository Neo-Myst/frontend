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
} from "recharts";

interface PredictionChartProps {
  actuals: number[];
  predictions: number[];
}

// Custom tooltip component
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: { id: string; actual: number; predicted: number };
  }>;
}

interface PlayerDataPoint {
  id: string;
  actual: number;
  predicted: number;
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
            ${data.actual}
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
          <span style={{ color: "#f97316", fontWeight: "bold" }}>
            ${data.predicted}
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
              color: diff > data.actual * 0.2 ? "#f87171" : "#4ade80",
              fontWeight: "bold",
            }}
          >
            {percentage}%
          </span>
        </Typography>
      </StyledTooltip>
    );
  }

  return null;
};

// Chart container
const ChartContainer = styled(Paper)({
  backgroundColor: "#15202c",
  padding: "20px",
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
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
      <LegendItem>
        <LegendColor color="#4ec9ff" />
        <Typography variant="caption" sx={{ color: "#e6eeff" }}>
          Actual
        </Typography>
      </LegendItem>
      <LegendItem>
        <LegendColor color="#f97316" />
        <Typography variant="caption" sx={{ color: "#e6eeff" }}>
          Predicted
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
    </Box>
  );
};

// Chart visualization component
const PredictionChart: React.FC<PredictionChartProps> = ({
  actuals,
  predictions,
}) => {
  // Combine data points
  const data: PlayerDataPoint[] = actuals.map((actual, index) => ({
    id: `P${index + 1}`,
    actual,
    predicted: predictions[index],
  }));

  // Find min and max values for chart axes
  const allValues = [...actuals, ...predictions];
  const minValue = Math.min(...allValues) * 0.8;
  const maxValue = Math.max(...allValues) * 1.2;

  // Animation toggle state
  const [animated, setAnimated] = useState(false);

  // Set animation after component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Here is the fix - use a class-based approach with proper error handling
  class CustomDot extends React.Component<RechartsDotProps> {
    render() {
      const { cx, cy, fill } = this.props;
      if (!cx || !cy || !fill) return null;

      return (
        <g>
          <circle cx={cx} cy={cy} r={8} fill={fill} opacity={0.7} />
          <circle cx={cx} cy={cy} r={4} fill="#15202c" />
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
          mb: 2,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Actual vs. Predicted Spending
      </Typography>

      <Box
        sx={{
          height: 400,
          opacity: animated ? 1 : 0,
          transition: "opacity 0.5s ease-in",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1c2431"
              vertical={false}
            />
            <XAxis
              type="number"
              dataKey="actual"
              name="Actual"
              domain={[minValue, maxValue]}
              tick={{ fill: "#8599b9" }}
              tickFormatter={(value) => `$${value}`}
              label={{
                value: "Actual Spending ($)",
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
              tickFormatter={(value) => `$${value}`}
              label={{
                value: "Predicted Spending ($)",
                angle: -90,
                position: "insideLeft",
                fill: "#8599b9",
              }}
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

            {/* Scatter plot */}
            <Scatter
              name="Actual vs Predicted"
              data={data}
              fill="#4ec9ff"
              shape={<CustomDot />}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </Box>

      <CustomLegend />

      <Typography
        variant="caption"
        sx={{ color: "#8599b9", display: "block", textAlign: "center", mt: 1 }}
      >
        Points closer to the dashed line indicate more accurate predictions
      </Typography>
    </ChartContainer>
  );
};

export default PredictionChart;
