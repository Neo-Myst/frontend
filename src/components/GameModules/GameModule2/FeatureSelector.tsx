// components/GameModule2/FeatureSelector.tsx
import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Tooltip,
  Typography,
  styled,
  Chip,
} from "@mui/material";

interface FeatureSelectorProps {
  selectedFeatures: string[];
  onChange: (features: string[]) => void;
}
// Define all available features with descriptions for tooltips
const ALL_FEATURES = [
  {
    name: "Hours Played",
    description:
      "Total time a player has spent in the Neoverse, reflecting dedication and gameplay frequency.",
    icon: "⏱️",
  },
  {
    name: "Quest Exploit Score",
    description:
      "Indicates how aggressively the player uses exploits or shortcuts during missions and quests.",
    icon: "🎯",
  },
  {
    name: "Criminal Score",
    description:
      "A metric of how often the player engages in illegal or grey-area activities within the Neoverse.",
    icon: "🚨",
  },
  {
    name: "VIP Status_encoded",
    description:
      "Whether the player holds VIP privileges in the game, affecting access to exclusive areas and rewards.",
    icon: "👑",
  },
  {
    name: "Team Affiliation_encoded",
    description:
      "Encoded representation of a player’s allegiance or team in the Neoverse world.",
    icon: "🛡️",
  },
  {
    name: "Dark Market Transactions_encoded",
    description:
      "Encoded count of player interactions with the in-game black market, hinting at underground purchases.",
    icon: "🕵️‍♂️",
  },
];

const StyledFormControlLabel = styled(FormControlLabel)({
  marginLeft: "-8px",
  marginBottom: "8px",
  "& .MuiFormControlLabel-label": {
    fontSize: "16px",
    color: "#e6eeff",
    transition: "color 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
});

const FeatureIcon = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  borderRadius: "4px",
  backgroundColor: "rgba(78, 201, 255, 0.1)",
  marginRight: "4px",
});

const NeoCheckbox = styled(Checkbox)({
  color: "#304060",
  padding: "9px",
  "&.Mui-checked": {
    color: "#4ec9ff",
  },
  "&:hover": {
    backgroundColor: "rgba(78, 201, 255, 0.08)",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.3rem",
  },
});

const StyledTooltip = styled(Tooltip)({
  "& .MuiTooltip-tooltip": {
    backgroundColor: "#0f172a",
    color: "#4ec9ff",
    border: "1px solid #304060",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
    fontSize: "0.75rem",
  },
});

const FeatureSelector: React.FC<FeatureSelectorProps> = ({
  selectedFeatures,
  onChange,
}) => {
  const handleCheckboxChange = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      onChange(selectedFeatures.filter((f) => f !== feature));
    } else {
      onChange([...selectedFeatures, feature]);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ color: "#8599b9" }}>
          Selected features: {selectedFeatures.length}/6
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          {selectedFeatures.length > 0 ? (
            selectedFeatures.map((feature) => {
              const featureInfo = ALL_FEATURES.find((f) => f.name === feature);
              return (
                <Chip
                  key={feature}
                  label={`${featureInfo?.icon || ""} ${feature}`}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(78, 201, 255, 0.15)",
                    color: "#4ec9ff",
                    border: "1px solid rgba(78, 201, 255, 0.3)",
                    borderRadius: "4px",
                    "& .MuiChip-label": {
                      px: 1,
                    },
                  }}
                  onDelete={() => handleCheckboxChange(feature)}
                />
              );
            })
          ) : (
            <Typography
              variant="caption"
              sx={{ color: "#8599b9", fontStyle: "italic" }}
            >
              No features selected
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mb: 1 }}>
        {ALL_FEATURES.map((feature) => (
          <StyledTooltip
            key={feature.name}
            title={feature.description}
            placement="right"
            arrow
          >
            <StyledFormControlLabel
              control={
                <NeoCheckbox
                  checked={selectedFeatures.includes(feature.name)}
                  onChange={() => handleCheckboxChange(feature.name)}
                  checkedIcon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="3"
                        fill="#4ec9ff"
                      />
                      <path
                        d="M9 12L11 14L15 10"
                        stroke="#171e2e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="3"
                        stroke="#304060"
                        strokeWidth="2"
                      />
                    </svg>
                  }
                />
              }
              label={
                <>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  {feature.name}
                </>
              }
              sx={{
                opacity: selectedFeatures.includes(feature.name) ? 1 : 0.7,
                "&:hover": {
                  opacity: 1,
                },
              }}
            />
          </StyledTooltip>
        ))}
      </Box>
    </Box>
  );
};

export default FeatureSelector;
