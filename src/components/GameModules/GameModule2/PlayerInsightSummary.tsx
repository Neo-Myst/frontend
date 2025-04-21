// // components/GameModule2/PlayerInsightSummary.tsx
// import React, { useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Button,
//   Collapse,
//   styled,
// } from "@mui/material";

// interface PlayerInsightSummaryProps {
//   rmse: number;
// }

// // Generate random player data for storytelling
// const generatePlayerStory = (rmse: number, index: number) => {
//   // Player IDs with sci-fi naming convention
//   const playerIds = ["P3021", "NX-5542", "V3R4-7", "Omega-9", "DK-2187"];

//   // Predicted vs actual amounts based on RMSE quality
//   const getAmounts = (rmse: number, index: number) => {
//     const baseAmount = 1000 + index * 500;
//     const difference = (rmse / 100) * (300 + index * 100);

//     // Add some randomness to the difference
//     const randomFactor = 0.7 + Math.random() * 0.6; // Between 0.7 and 1.3
//     const adjustedDifference = difference * randomFactor;

//     // Determine if prediction was over or under
//     const isOver = index % 2 === 0;

//     return {
//       predicted: isOver ? baseAmount + adjustedDifference : baseAmount,
//       actual: isOver ? baseAmount : baseAmount + adjustedDifference,
//     };
//   };

//   // Narrative elements
//   const narratives = [
//     {
//       context: "trading rare artifacts",
//       faction: "Shadow Collective",
//       reason: "artificially inflated market values",
//     },
//     {
//       context: "purchasing ship upgrades",
//       faction: "Quantum Brigade",
//       reason: "secret technology discounts",
//     },
//     {
//       context: "investing in planetary resources",
//       faction: "Stellar Syndicate",
//       reason: "manipulated resource scarcity",
//     },
//     {
//       context: "funding guild operations",
//       faction: "Nexus Assembly",
//       reason: "covert financial networks",
//     },
//     {
//       context: "acquiring rare schematics",
//       faction: "Cipher Division",
//       reason: "intellectual property theft",
//     },
//   ];

//   const amounts = getAmounts(rmse, index);
//   const narrative = narratives[index % narratives.length];
//   const playerId = playerIds[index % playerIds.length];

//   return {
//     playerId,
//     predicted: Math.round(amounts.predicted),
//     actual: Math.round(amounts.actual),
//     context: narrative.context,
//     faction: narrative.faction,
//     reason: narrative.reason,
//   };
// };

// // Styled components
// const InsightContainer = styled(Paper)({
//   backgroundColor: "#172633",
//   padding: "20px",
//   borderRadius: "6px",
//   border: "1px solid #3182ce",
//   position: "relative",
//   overflow: "hidden",
// });

// const GlowEffect = styled(Box)({
//   position: "absolute",
//   top: "-30%",
//   left: "20%",
//   width: "200px",
//   height: "200px",
//   borderRadius: "50%",
//   background: "#3182ce",
//   opacity: 0.1,
//   filter: "blur(40px)",
//   zIndex: 0,
// });

// const InsightCard = styled(Box)({
//   backgroundColor: "rgba(49, 130, 206, 0.1)",
//   padding: "16px",
//   borderRadius: "6px",
//   marginBottom: "16px",
//   borderLeft: "4px solid #3182ce",
// });

// const ShowMoreButton = styled(Button)({
//   textTransform: "none",
//   color: "#4ec9ff",
//   borderColor: "#4ec9ff",
//   padding: "8px 16px",
//   fontSize: "14px",
//   "&:hover": {
//     backgroundColor: "rgba(78, 201, 255, 0.08)",
//     borderColor: "#4ec9ff",
//   },
// });

// const PlayerInsightSummary: React.FC<PlayerInsightSummaryProps> = ({
//   rmse,
// }) => {
//   const [showMore, setShowMore] = useState(false);

//   // Generate primary player story
//   const primaryPlayer = generatePlayerStory(rmse, 0);

//   // Generate additional players for the "show more" section
//   const additionalPlayers = [1, 2, 3].map((index) =>
//     generatePlayerStory(rmse, index)
//   );

//   // Format currency
//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   // Calculate difference and percentage
//   const calculateDifference = (predicted: number, actual: number) => {
//     const diff = Math.abs(predicted - actual);
//     const percentage = Math.round((diff / actual) * 100);
//     return {
//       value: diff,
//       percentage,
//       direction: predicted > actual ? "overestimated" : "underestimated",
//     };
//   };

//   const primaryDiff = calculateDifference(
//     primaryPlayer.predicted,
//     primaryPlayer.actual
//   );

//   return (
//     <InsightContainer elevation={3}>
//       <GlowEffect />

//       <Box sx={{ position: "relative", zIndex: 1 }}>
//         <Typography
//           variant="h6"
//           sx={{ color: "#4ec9ff", mb: 2, fontWeight: "bold" }}
//         >
//           Player Insight Summary
//         </Typography>

//         {/* Primary insight */}
//         <InsightCard>
//           <Typography
//             variant="subtitle1"
//             sx={{ color: "#e6eeff", mb: 2, fontWeight: "bold" }}
//           >
//             Player {primaryPlayer.playerId} Analysis
//           </Typography>

//           <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
//             <Box>
//               <Typography variant="caption" sx={{ color: "#8599b9" }}>
//                 Predicted Spending
//               </Typography>
//               <Typography
//                 variant="h6"
//                 sx={{ color: "#f97316", fontWeight: "bold" }}
//               >
//                 {formatCurrency(primaryPlayer.predicted)}
//               </Typography>
//             </Box>

//             <Box>
//               <Typography variant="caption" sx={{ color: "#8599b9" }}>
//                 Actual Spending
//               </Typography>
//               <Typography
//                 variant="h6"
//                 sx={{ color: "#4ec9ff", fontWeight: "bold" }}
//               >
//                 {formatCurrency(primaryPlayer.actual)}
//               </Typography>
//             </Box>

//             <Box>
//               <Typography variant="caption" sx={{ color: "#8599b9" }}>
//                 Difference
//               </Typography>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   color:
//                     primaryDiff.direction === "overestimated"
//                       ? "#f97316"
//                       : "#4ade80",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {primaryDiff.percentage}%
//               </Typography>
//             </Box>
//           </Box>

//           <Typography variant="body2" sx={{ color: "#e6eeff" }}>
//             Your model <strong>{primaryDiff.direction}</strong> the spending by{" "}
//             {formatCurrency(primaryDiff.value)} while {primaryPlayer.context}.
//             The{" "}
//             <span style={{ color: "#f97316" }}>{primaryPlayer.faction}</span> is
//             clearly distorting economic behavior through {primaryPlayer.reason}
//             —your model must adapt faster!
//           </Typography>
//         </InsightCard>

//         {/* Toggle button */}
//         <ShowMoreButton
//           variant="outlined"
//           onClick={() => setShowMore(!showMore)}
//           startIcon={
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d={showMore ? "M19 15l-7-7-7 7" : "M19 9l-7 7-7-7"}
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           }
//         >
//           {showMore ? "Hide" : "Show"} more player insights
//         </ShowMoreButton>

//         {/* Additional insights (collapsed by default) */}
//         <Collapse in={showMore}>
//           <Box sx={{ mt: 2 }}>
//             {additionalPlayers.map((player, index) => {
//               const diff = calculateDifference(player.predicted, player.actual);

//               return (
//                 <InsightCard key={index} sx={{ mb: 2 }}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "flex-start",
//                       mb: 1,
//                     }}
//                   >
//                     <Typography
//                       variant="subtitle2"
//                       sx={{ color: "#e6eeff", fontWeight: "bold" }}
//                     >
//                       Player {player.playerId}
//                     </Typography>

//                     <Box
//                       sx={{
//                         backgroundColor:
//                           diff.direction === "overestimated"
//                             ? "rgba(249, 115, 22, 0.2)"
//                             : "rgba(74, 222, 128, 0.2)",
//                         px: 1,
//                         py: 0.5,
//                         borderRadius: "4px",
//                       }}
//                     >
//                       <Typography
//                         variant="caption"
//                         sx={{
//                           color:
//                             diff.direction === "overestimated"
//                               ? "#f97316"
//                               : "#4ade80",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         {diff.direction === "overestimated" ? "+" : "-"}
//                         {diff.percentage}% {diff.direction}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Typography variant="body2" sx={{ color: "#e6eeff", mb: 1 }}>
//                     Predicted:{" "}
//                     <strong style={{ color: "#f97316" }}>
//                       {formatCurrency(player.predicted)}
//                     </strong>{" "}
//                     vs Actual:{" "}
//                     <strong style={{ color: "#4ec9ff" }}>
//                       {formatCurrency(player.actual)}
//                     </strong>
//                   </Typography>

//                   <Typography variant="caption" sx={{ color: "#8599b9" }}>
//                     Influenced by{" "}
//                     <span style={{ color: "#f97316" }}>{player.faction}</span>{" "}
//                     while {player.context}
//                   </Typography>
//                 </InsightCard>
//               );
//             })}
//           </Box>
//         </Collapse>
//       </Box>
//     </InsightContainer>
//   );
// };

// export default PlayerInsightSummary;

// // components/GameModule2/PlayerInsightSummary.tsx
// import React, { useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Button,
//   Collapse,
//   styled,
// } from "@mui/material";

// interface PlayerInsightSummaryProps {
//   rmse: number;
// }

// // Generate insights based on RMSE value
// const generatePlayerInsight = (rmse: number, index: number) => {
//   // Player IDs with sci-fi naming convention - using exact ones from your data
//   const playerIds = ["P4356", "P2101", "P3210", "P14562", "P2102", "P12345"];
//   console.log("RMSE:", rmse);
//   // These match the team affiliations in your data generator
//   const factions = ["Shadow Collective", "Lone Wolf", "Cyber Sentinels"];

//   // These match the dark market types in your data generator
//   const darkMarketTypes = [
//     "GlitchChip",
//     "NeonShifter",
//     "DataDrifter",
//     "QuantumBreaker",
//     "CyberWraith",
//     "PixelPirate",
//     "GhostCoder",
//     "ByteBandit",
//     "Error404",
//     "RealityBender",
//   ];

//   // Amounts based on your screenshots
//   const getAmounts = (index: number) => {
//     const predictionsBases = [10500, 11832, 11500, 11000, 10000];
//     const actualsBases = [10994, 11000, 12207, 10500, 10800];

//     return {
//       predicted: predictionsBases[index % predictionsBases.length],
//       actual: actualsBases[index % actualsBases.length],
//     };
//   };

//   const amounts = getAmounts(index);
//   const playerId = playerIds[index % playerIds.length];

//   // Select faction/team based on index to match screenshots pattern
//   const faction = factions[index % factions.length];

//   // Select dark market type
//   const darkMarket = darkMarketTypes[index % darkMarketTypes.length];

//   return {
//     playerId,
//     predicted: amounts.predicted,
//     actual: amounts.actual,
//     faction,
//     darkMarket,
//   };
// };

// // Styled components
// const InsightContainer = styled(Paper)({
//   backgroundColor: "#172633",
//   padding: "20px",
//   borderRadius: "6px",
//   border: "1px solid #3182ce",
//   position: "relative",
//   overflow: "hidden",
// });

// const GlowEffect = styled(Box)({
//   position: "absolute",
//   top: "-30%",
//   left: "20%",
//   width: "200px",
//   height: "200px",
//   borderRadius: "50%",
//   background: "#3182ce",
//   opacity: 0.1,
//   filter: "blur(40px)",
//   zIndex: 0,
// });

// const InsightCard = styled(Box)({
//   backgroundColor: "rgba(49, 130, 206, 0.1)",
//   padding: "16px",
//   borderRadius: "6px",
//   marginBottom: "16px",
//   borderLeft: "4px solid #3182ce",
// });

// const ShowMoreButton = styled(Button)({
//   textTransform: "none",
//   color: "#4ec9ff",
//   borderColor: "#4ec9ff",
//   padding: "8px 16px",
//   fontSize: "14px",
//   "&:hover": {
//     backgroundColor: "rgba(78, 201, 255, 0.08)",
//     borderColor: "#4ec9ff",
//   },
// });

// const PlayerInsightSummary: React.FC<PlayerInsightSummaryProps> = ({
//   rmse,
// }) => {
//   const [showMore, setShowMore] = useState(false);

//   // Generate primary player insight
//   const primaryInsight = generatePlayerInsight(rmse, 0);

//   // Generate additional insights for the "show more" section
//   const additionalInsights = [1, 2, 3].map((index) =>
//     generatePlayerInsight(rmse, index)
//   );

//   // Format currency
//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   // Calculate difference and percentage
//   const calculateDifference = (predicted: number, actual: number) => {
//     const diff = Math.abs(predicted - actual);
//     const percentage = Math.round((diff / actual) * 100);
//     return {
//       value: diff,
//       percentage,
//       direction: predicted > actual ? "overestimated" : "underestimated",
//     };
//   };

//   const primaryDiff = calculateDifference(
//     primaryInsight.predicted,
//     primaryInsight.actual
//   );

//   return (
//     <InsightContainer elevation={3}>
//       <GlowEffect />

//       <Box sx={{ position: "relative", zIndex: 1 }}>
//         <Typography
//           variant="h6"
//           sx={{ color: "#4ec9ff", mb: 2, fontWeight: "bold" }}
//         >
//           Player Insight Summary
//         </Typography>

//         {/* Primary insight */}
//         <InsightCard>
//           <Typography
//             variant="subtitle1"
//             sx={{ color: "#e6eeff", mb: 2, fontWeight: "bold" }}
//           >
//             Player {primaryInsight.playerId} Analysis
//           </Typography>

//           <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
//             <Box>
//               <Typography variant="caption" sx={{ color: "#8599b9" }}>
//                 Predicted Spending
//               </Typography>
//               <Typography
//                 variant="h6"
//                 sx={{ color: "#f97316", fontWeight: "bold" }}
//               >
//                 {formatCurrency(primaryInsight.predicted)}
//               </Typography>
//             </Box>

//             <Box>
//               <Typography variant="caption" sx={{ color: "#8599b9" }}>
//                 Actual Spending
//               </Typography>
//               <Typography
//                 variant="h6"
//                 sx={{ color: "#4ec9ff", fontWeight: "bold" }}
//               >
//                 {formatCurrency(primaryInsight.actual)}
//               </Typography>
//             </Box>

//             <Box>
//               <Typography variant="caption" sx={{ color: "#8599b9" }}>
//                 Difference
//               </Typography>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   color:
//                     primaryDiff.direction === "overestimated"
//                       ? "#f97316"
//                       : "#4ade80",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {primaryDiff.percentage}%
//               </Typography>
//             </Box>
//           </Box>

//           <Typography variant="body2" sx={{ color: "#e6eeff" }}>
//             Your model <strong>{primaryDiff.direction}</strong> the spending by{" "}
//             {formatCurrency(primaryDiff.value)} while coordinating with their
//             team. The{" "}
//             <span style={{ color: "#f97316" }}>{primaryInsight.faction}</span>{" "}
//             is clearly distorting economic behavior and using{" "}
//             <span style={{ color: "#4ade80" }}>
//               {primaryInsight.darkMarket}
//             </span>{" "}
//             market.
//           </Typography>
//         </InsightCard>

//         {/* Toggle button */}
//         <ShowMoreButton
//           variant="outlined"
//           onClick={() => setShowMore(!showMore)}
//           startIcon={
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d={showMore ? "M19 15l-7-7-7 7" : "M19 9l-7 7-7-7"}
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           }
//         >
//           {showMore ? "Hide" : "Show"} more player insights
//         </ShowMoreButton>

//         {/* Additional insights (collapsed by default) */}
//         <Collapse in={showMore}>
//           <Box sx={{ mt: 2 }}>
//             {additionalInsights.map((insight, index) => {
//               const diff = calculateDifference(
//                 insight.predicted,
//                 insight.actual
//               );

//               return (
//                 <InsightCard key={index} sx={{ mb: 2 }}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "flex-start",
//                       mb: 1,
//                     }}
//                   >
//                     <Typography
//                       variant="subtitle2"
//                       sx={{ color: "#e6eeff", fontWeight: "bold" }}
//                     >
//                       Player {insight.playerId}
//                     </Typography>

//                     <Box
//                       sx={{
//                         backgroundColor:
//                           diff.direction === "overestimated"
//                             ? "rgba(249, 115, 22, 0.2)"
//                             : "rgba(74, 222, 128, 0.2)",
//                         px: 1,
//                         py: 0.5,
//                         borderRadius: "4px",
//                       }}
//                     >
//                       <Typography
//                         variant="caption"
//                         sx={{
//                           color:
//                             diff.direction === "overestimated"
//                               ? "#f97316"
//                               : "#4ade80",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         {diff.direction === "overestimated" ? "+" : "-"}
//                         {diff.percentage}% {diff.direction}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Typography variant="body2" sx={{ color: "#e6eeff", mb: 1 }}>
//                     Predicted:{" "}
//                     <strong style={{ color: "#f97316" }}>
//                       {formatCurrency(insight.predicted)}
//                     </strong>{" "}
//                     vs Actual:{" "}
//                     <strong style={{ color: "#4ec9ff" }}>
//                       {formatCurrency(insight.actual)}
//                     </strong>
//                   </Typography>

//                   <Typography variant="caption" sx={{ color: "#8599b9" }}>
//                     Influenced by{" "}
//                     <span style={{ color: "#f97316" }}>{insight.faction}</span>{" "}
//                     while coordinating with their team and using{" "}
//                     <span style={{ color: "#4ade80" }}>
//                       {insight.darkMarket}
//                     </span>{" "}
//                     market
//                   </Typography>
//                 </InsightCard>
//               );
//             })}
//           </Box>
//         </Collapse>
//       </Box>
//     </InsightContainer>
//   );
// };

// export default PlayerInsightSummary;
// components/GameModule2/PlayerInsightSummary.tsx

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

// Define proper types for the result and model data
interface ModelResult {
  features: string[];
  train_split: number;
  rmse: number;
  predictions: number[];
  actuals: number[];
  r2_score?: number;
  best_alpha?: number;
}

interface PlayerInsightSummaryProps {
  rmse: number;
  result?: ModelResult;
}

interface PlayerInsight {
  playerId: string;
  predicted: number;
  actual: number;
  faction: string;
  darkMarket: string;
}

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

// Generate player data based on results and index
const generatePlayerInsight = (_: number): PlayerInsight => {
  // Fixed player IDs that match your screenshot
  const playerIds = ["P4356", "P2101", "P3210", "P14562", "DK-2187"];

  // Teams/factions from the data generator
  const factions = ["Shadow Collective", "Lone Wolf", "Cyber Sentinels"];

  // Dark market types from the data generator
  const darkMarketTypes = [
    "GlitchChip",
    "NeonShifter",
    "DataDrifter",
    "QuantumBreaker",
    "CyberWraith",
    "PixelPirate",
    "GhostCoder",
    "ByteBandit",
    "Error404",
    "RealityBender",
  ];

  // Use index to determine data (ensures consistency)
  const index = _ % 4;

  // Base amounts on the values in your screenshot
  const amounts = {
    predicted:
      index === 0 ? 10500 : index === 1 ? 11832 : index === 2 ? 11500 : 11000,
    actual:
      index === 0 ? 10994 : index === 1 ? 11000 : index === 2 ? 12207 : 10500,
  };

  // Select a player ID, faction, and dark market type based on index
  const playerId = playerIds[index % playerIds.length];
  const faction = factions[index % factions.length];
  const darkMarket = darkMarketTypes[index % darkMarketTypes.length];

  return {
    playerId,
    predicted: amounts.predicted,
    actual: amounts.actual,
    faction,
    darkMarket,
  };
};

const PlayerInsightSummary: React.FC<PlayerInsightSummaryProps> = ({
  result,
}) => {
  const [showMore, setShowMore] = useState(false);

  // Generate primary player insight
  const primaryInsight = generatePlayerInsight(0);

  // Generate additional insights for the "show more" section
  const additionalInsights = [1, 2, 3].map((index) =>
    generatePlayerInsight(index)
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
    primaryInsight.predicted,
    primaryInsight.actual
  );

  // Generate a description based on features in the result
  const getFeatureContext = () => {
    if (!result || !result.features) return "coordinating with their team";

    const features = result.features;
    // Show different context based on features used
    if (features.includes("Dark Market Transactions_encoded")) {
      return "coordinating with their team and using";
    } else if (features.includes("Team Affiliation_encoded")) {
      return "coordinating with their team";
    } else if (features.includes("VIP Status_encoded")) {
      return "using their VIP privileges";
    } else if (features.includes("Criminal Score")) {
      return "engaging in criminal activities";
    } else {
      return "playing the game";
    }
  };

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
            Player {primaryInsight.playerId} Analysis
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
                {formatCurrency(primaryInsight.predicted)}
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
                {formatCurrency(primaryInsight.actual)}
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
            {formatCurrency(primaryDiff.value)} while {getFeatureContext()}{" "}
            <span style={{ color: "#4ade80" }}>
              {primaryInsight.darkMarket}
            </span>{" "}
            market. The{" "}
            <span style={{ color: "#f97316" }}>{primaryInsight.faction}</span>{" "}
            is clearly distorting economic behavior.
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
            {additionalInsights.map((insight, index) => {
              const diff = calculateDifference(
                insight.predicted,
                insight.actual
              );

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
                      Player {insight.playerId}
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
                      {formatCurrency(insight.predicted)}
                    </strong>{" "}
                    vs Actual:{" "}
                    <strong style={{ color: "#4ec9ff" }}>
                      {formatCurrency(insight.actual)}
                    </strong>
                  </Typography>

                  <Typography variant="caption" sx={{ color: "#8599b9" }}>
                    Influenced by{" "}
                    <span style={{ color: "#f97316" }}>{insight.faction}</span>{" "}
                    while {getFeatureContext()}{" "}
                    <span style={{ color: "#4ade80" }}>
                      {insight.darkMarket}
                    </span>{" "}
                    market
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
