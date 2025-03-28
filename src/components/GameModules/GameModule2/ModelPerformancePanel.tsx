// components/GameModule2/ModelPerformancePanel.tsx
import React from "react";
import {
  Box,
  Paper,
  Typography,
  styled,
  LinearProgress,
  Tooltip,
} from "@mui/material";

interface ModelPerformancePanelProps {
  rmse: number;
}

// Styled components - removed unused theme parameters
const PerformanceContainer = styled(Paper)({
  backgroundColor: "#172b28",
  padding: "20px",
  borderRadius: "6px",
  border: "1px solid #2f855a",
  position: "relative",
  overflow: "hidden",
});

const AccuracyBar = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "accuracyLevel",
})<{ accuracyLevel: "high" | "medium" | "low" }>(({ accuracyLevel }) => ({
  height: "8px",
  borderRadius: "4px",
  marginTop: "8px",
  marginBottom: "16px",
  backgroundColor: "#1c2431",
  "& .MuiLinearProgress-bar": {
    backgroundColor:
      accuracyLevel === "high"
        ? "#4ade80"
        : accuracyLevel === "medium"
        ? "#fbbf24"
        : "#f87171",
    borderRadius: "4px",
  },
}));

const MetricBox = styled(Box)({
  backgroundColor: "rgba(74, 222, 128, 0.1)",
  padding: "12px",
  borderRadius: "6px",
  marginBottom: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const ScoreCircle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "accuracyLevel",
})<{ accuracyLevel: "high" | "medium" | "low" }>(({ accuracyLevel }) => ({
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `conic-gradient(
    ${
      accuracyLevel === "high"
        ? "#4ade80"
        : accuracyLevel === "medium"
        ? "#fbbf24"
        : "#f87171"
    } ${
    100 - (accuracyLevel === "high" ? 25 : accuracyLevel === "medium" ? 50 : 75)
  }%, 
    rgba(28, 36, 49, 0.2) 0
  )`,
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#172b28",
  },
}));

// Glowing background effect
const GlowEffect = styled(Box, {
  shouldForwardProp: (prop) => prop !== "color",
})<{ color: string }>(({ color }) => ({
  position: "absolute",
  top: "-50%",
  right: "-10%",
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  background: color,
  opacity: 0.1,
  filter: "blur(40px)",
  zIndex: 0,
}));

const ModelPerformancePanel: React.FC<ModelPerformancePanelProps> = ({
  rmse,
}) => {
  // Determine accuracy level and feedback based on RMSE
  const getAccuracyLevel = (rmse: number) => {
    if (rmse < 100) return "high";
    if (rmse < 200) return "medium";
    return "low";
  };

  const accuracyLevel = getAccuracyLevel(rmse);

  // Calculate a percentage score for visualization (inverse of RMSE, capped at reasonable values)
  const getAccuracyPercentage = (rmse: number) => {
    if (rmse < 50) return 95;
    if (rmse > 300) return 15;
    // Map RMSE 50-300 to percentage 95-15
    return 95 - ((rmse - 50) / 250) * 80;
  };

  const accuracyPercentage = getAccuracyPercentage(rmse);

  // Feedback messages
  const getFeedback = (level: "high" | "medium" | "low") => {
    switch (level) {
      case "high":
        return {
          message: "Excellent prediction accuracy!",
          tip: "Your model is performing exceptionally well. The Shadow Collective has minimal influence on these predictions.",
          color: "#4ade80",
        };
      case "medium":
        return {
          message: "Decent prediction accuracy",
          tip: "Try adjusting your features or increasing the training size to improve accuracy.",
          color: "#fbbf24",
        };
      case "low":
        return {
          message: "Prediction needs improvement",
          tip: "Consider a different combination of features. The Shadow Collective's influence is strong here.",
          color: "#f87171",
        };
    }
  };

  const feedback = getFeedback(accuracyLevel);

  return (
    <PerformanceContainer elevation={3}>
      {/* Background glow effect based on performance */}
      <GlowEffect color={feedback.color} />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h6"
          sx={{ color: feedback.color, mb: 1, fontWeight: "bold" }}
        >
          Model Performance
        </Typography>

        <MetricBox>
          <Box>
            <Typography variant="body2" sx={{ color: "#9ae6b4", mb: 1 }}>
              Root Mean Squared Error (RMSE)
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: feedback.color, fontWeight: "bold" }}
            >
              ${rmse.toFixed(2)}
            </Typography>
          </Box>

          <Tooltip
            title={`Prediction accuracy: ${Math.round(accuracyPercentage)}%`}
            placement="left"
            arrow
          >
            <ScoreCircle accuracyLevel={accuracyLevel}>
              <Typography
                variant="body2"
                sx={{
                  position: "relative",
                  fontWeight: "bold",
                  color: feedback.color,
                }}
              >
                {Math.round(accuracyPercentage)}%
              </Typography>
            </ScoreCircle>
          </Tooltip>
        </MetricBox>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: feedback.color,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {accuracyLevel === "high" && "🌟"}
            {accuracyLevel === "medium" && "⚠️"}
            {accuracyLevel === "low" && "❗"}
            {feedback.message}
          </Typography>
          <Typography variant="body2" sx={{ color: "#9ae6b4", mt: 1 }}>
            {feedback.tip}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            sx={{
              color: "#9ae6b4",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Better performance</span>
            <span>Worse performance</span>
          </Typography>
          <AccuracyBar
            variant="determinate"
            value={accuracyPercentage}
            accuracyLevel={accuracyLevel}
          />
        </Box>
      </Box>
    </PerformanceContainer>
  );
};

export default ModelPerformancePanel;
