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
    description: "Total time spent in-game by the player",
    icon: "⏱️",
  },
  {
    name: "Quest Exploit Score",
    description: "Indicates how much a player is exploiting game mechanics",
    icon: "🎯",
  },
  {
    name: "Player Level",
    description: "Current experience level of the player",
    icon: "⬆️",
  },
  {
    name: "Criminal Score",
    description: "Measure of in-game illegal activities",
    icon: "🚨",
  },
  {
    name: "Dark Market Transaction Amount",
    description: "Volume of trades in the game's black market",
    icon: "💰",
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
          Selected features: {selectedFeatures.length}/5
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
