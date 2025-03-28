// components/GameModule2/PlayerInsightSummary.tsx
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Collapse,
  styled,
} from "@mui/material";

interface PlayerInsightSummaryProps {
  rmse: number;
}

// Generate random player data for storytelling
const generatePlayerStory = (rmse: number, index: number) => {
  // Player IDs with sci-fi naming convention
  const playerIds = ["P3021", "NX-5542", "V3R4-7", "Omega-9", "DK-2187"];

  // Predicted vs actual amounts based on RMSE quality
  const getAmounts = (rmse: number, index: number) => {
    const baseAmount = 1000 + index * 500;
    const difference = (rmse / 100) * (300 + index * 100);

    // Add some randomness to the difference
    const randomFactor = 0.7 + Math.random() * 0.6; // Between 0.7 and 1.3
    const adjustedDifference = difference * randomFactor;

    // Determine if prediction was over or under
    const isOver = index % 2 === 0;

    return {
      predicted: isOver ? baseAmount + adjustedDifference : baseAmount,
      actual: isOver ? baseAmount : baseAmount + adjustedDifference,
    };
  };

  // Narrative elements
  const narratives = [
    {
      context: "trading rare artifacts",
      faction: "Shadow Collective",
      reason: "artificially inflated market values",
    },
    {
      context: "purchasing ship upgrades",
      faction: "Quantum Brigade",
      reason: "secret technology discounts",
    },
    {
      context: "investing in planetary resources",
      faction: "Stellar Syndicate",
      reason: "manipulated resource scarcity",
    },
    {
      context: "funding guild operations",
      faction: "Nexus Assembly",
      reason: "covert financial networks",
    },
    {
      context: "acquiring rare schematics",
      faction: "Cipher Division",
      reason: "intellectual property theft",
    },
  ];

  const amounts = getAmounts(rmse, index);
  const narrative = narratives[index % narratives.length];
  const playerId = playerIds[index % playerIds.length];

  return {
    playerId,
    predicted: Math.round(amounts.predicted),
    actual: Math.round(amounts.actual),
    context: narrative.context,
    faction: narrative.faction,
    reason: narrative.reason,
  };
};

// Styled components
const InsightContainer = styled(Paper)({
  backgroundColor: "#172633",
  padding: "20px",
  borderRadius: "6px",
  border: "1px solid #3182ce",
  position: "relative",
  overflow: "hidden",
});

const GlowEffect = styled(Box)({
  position: "absolute",
  top: "-30%",
  left: "20%",
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  background: "#3182ce",
  opacity: 0.1,
  filter: "blur(40px)",
  zIndex: 0,
});

const InsightCard = styled(Box)({
  backgroundColor: "rgba(49, 130, 206, 0.1)",
  padding: "16px",
  borderRadius: "6px",
  marginBottom: "16px",
  borderLeft: "4px solid #3182ce",
});

const ShowMoreButton = styled(Button)({
  textTransform: "none",
  color: "#4ec9ff",
  borderColor: "#4ec9ff",
  padding: "8px 16px",
  fontSize: "14px",
  "&:hover": {
    backgroundColor: "rgba(78, 201, 255, 0.08)",
    borderColor: "#4ec9ff",
  },
});

const PlayerInsightSummary: React.FC<PlayerInsightSummaryProps> = ({
  rmse,
}) => {
  const [showMore, setShowMore] = useState(false);

  // Generate primary player story
  const primaryPlayer = generatePlayerStory(rmse, 0);

  // Generate additional players for the "show more" section
  const additionalPlayers = [1, 2, 3].map((index) =>
    generatePlayerStory(rmse, index)
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate difference and percentage
  const calculateDifference = (predicted: number, actual: number) => {
    const diff = Math.abs(predicted - actual);
    const percentage = Math.round((diff / actual) * 100);
    return {
      value: diff,
      percentage,
      direction: predicted > actual ? "overestimated" : "underestimated",
    };
  };

  const primaryDiff = calculateDifference(
    primaryPlayer.predicted,
    primaryPlayer.actual
  );

  return (
    <InsightContainer elevation={3}>
      <GlowEffect />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h6"
          sx={{ color: "#4ec9ff", mb: 2, fontWeight: "bold" }}
        >
          Player Insight Summary
        </Typography>

        {/* Primary insight */}
        <InsightCard>
          <Typography
            variant="subtitle1"
            sx={{ color: "#e6eeff", mb: 2, fontWeight: "bold" }}
          >
            Player {primaryPlayer.playerId} Analysis
          </Typography>

          <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ color: "#8599b9" }}>
                Predicted Spending
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#f97316", fontWeight: "bold" }}
              >
                {formatCurrency(primaryPlayer.predicted)}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: "#8599b9" }}>
                Actual Spending
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#4ec9ff", fontWeight: "bold" }}
              >
                {formatCurrency(primaryPlayer.actual)}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: "#8599b9" }}>
                Difference
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color:
                    primaryDiff.direction === "overestimated"
                      ? "#f97316"
                      : "#4ade80",
                  fontWeight: "bold",
                }}
              >
                {primaryDiff.percentage}%
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" sx={{ color: "#e6eeff" }}>
            Your model <strong>{primaryDiff.direction}</strong> the spending by{" "}
            {formatCurrency(primaryDiff.value)} while {primaryPlayer.context}.
            The{" "}
            <span style={{ color: "#f97316" }}>{primaryPlayer.faction}</span> is
            clearly distorting economic behavior through {primaryPlayer.reason}
            —your model must adapt faster!
          </Typography>
        </InsightCard>

        {/* Toggle button */}
        <ShowMoreButton
          variant="outlined"
          onClick={() => setShowMore(!showMore)}
          startIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={showMore ? "M19 15l-7-7-7 7" : "M19 9l-7 7-7-7"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          {showMore ? "Hide" : "Show"} more player insights
        </ShowMoreButton>

        {/* Additional insights (collapsed by default) */}
        <Collapse in={showMore}>
          <Box sx={{ mt: 2 }}>
            {additionalPlayers.map((player, index) => {
              const diff = calculateDifference(player.predicted, player.actual);

              return (
                <InsightCard key={index} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#e6eeff", fontWeight: "bold" }}
                    >
                      Player {player.playerId}
                    </Typography>

                    <Box
                      sx={{
                        backgroundColor:
                          diff.direction === "overestimated"
                            ? "rgba(249, 115, 22, 0.2)"
                            : "rgba(74, 222, 128, 0.2)",
                        px: 1,
                        py: 0.5,
                        borderRadius: "4px",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color:
                            diff.direction === "overestimated"
                              ? "#f97316"
                              : "#4ade80",
                          fontWeight: "bold",
                        }}
                      >
                        {diff.direction === "overestimated" ? "+" : "-"}
                        {diff.percentage}% {diff.direction}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ color: "#e6eeff", mb: 1 }}>
                    Predicted:{" "}
                    <strong style={{ color: "#f97316" }}>
                      {formatCurrency(player.predicted)}
                    </strong>{" "}
                    vs Actual:{" "}
                    <strong style={{ color: "#4ec9ff" }}>
                      {formatCurrency(player.actual)}
                    </strong>
                  </Typography>

                  <Typography variant="caption" sx={{ color: "#8599b9" }}>
                    Influenced by{" "}
                    <span style={{ color: "#f97316" }}>{player.faction}</span>{" "}
                    while {player.context}
                  </Typography>
                </InsightCard>
              );
            })}
          </Box>
        </Collapse>
      </Box>
    </InsightContainer>
  );
};

export default PlayerInsightSummary;
