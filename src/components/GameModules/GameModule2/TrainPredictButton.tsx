// components/GameModule2/TrainPredictButton.tsx
import React from "react";
import { Button, Box, CircularProgress, styled, Tooltip } from "@mui/material";

interface TrainPredictButtonProps {
  disabled?: boolean;
  onClick: () => void;
  isLoading?: boolean;
  variant?: "contained" | "outlined";
  label?: string;
  icon?: "train" | "reset";
}

// Styled button with neo sci-fi theme
const NeoButton = styled(Button)({
  fontWeight: "bold",
  borderRadius: "6px",
  padding: "10px 20px",
  fontSize: "14px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  position: "relative",
  transition: "all 0.3s",
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    top: "-2px",
    left: "-2px",
    right: "-2px",
    bottom: "-2px",
    borderRadius: "8px",
    background: "linear-gradient(45deg, #4ec9ff, #0f4d92)",
    zIndex: -1,
    opacity: 0,
    transition: "opacity 0.3s",
  },
  "&:hover:before": {
    opacity: 0.5,
  },
  "&:hover": {
    boxShadow: "0 0 15px rgba(78, 201, 255, 0.3)",
  },
  "&:disabled": {
    backgroundColor: "#1c2431",
    color: "#8599b9",
    boxShadow: "none",
  },
});

// Hover effect for button
const ButtonAnimatedBorder = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: "6px",
  padding: "2px",
  background: "linear-gradient(90deg, transparent, #4ec9ff, transparent)",
  backgroundSize: "200% 100%",
  animation: "neoButtonBorder 2s infinite",
  opacity: 0,
  transition: "opacity 0.3s",
  zIndex: 0,
  ".MuiButton-root:hover &": {
    opacity: 1,
  },
  "@keyframes neoButtonBorder": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },
});

// Icon components
const TrainIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 8V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 12H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ResetIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C8.22876 2 4.94351 3.91554 3.13088 6.75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 5V9H12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrainPredictButton: React.FC<TrainPredictButtonProps> = ({
  disabled = false,
  onClick,
  isLoading = false,
  variant = "contained",
  label = "Train & Predict",
  icon = "train",
}) => {
  const buttonStyles =
    variant === "contained"
      ? {
          backgroundColor: "#0f4d92",
          color: "#e6eeff",
          "&:hover": { backgroundColor: "#1a6bb5" },
          border: "1px solid transparent",
        }
      : {
          backgroundColor: "transparent",
          color: "#4ec9ff",
          border: "1px solid #4ec9ff",
          "&:hover": {
            backgroundColor: "rgba(78, 201, 255, 0.08)",
            borderColor: "#4ec9ff",
          },
        };

  const tooltipTitle = disabled
    ? "Select at least one feature first"
    : isLoading
    ? "Training model..."
    : "Train the model with selected configuration";

  return (
    <Tooltip title={tooltipTitle} arrow placement="top">
      <Box sx={{ position: "relative" }}>
        <ButtonAnimatedBorder
          sx={{ opacity: !disabled && !isLoading ? 0 : 1 }}
        />
        <NeoButton
          variant={variant}
          disabled={disabled || isLoading}
          onClick={onClick}
          sx={{
            ...buttonStyles,
            minWidth: "140px",
          }}
          startIcon={
            isLoading ? (
              <CircularProgress
                size={20}
                thickness={4}
                sx={{ color: "inherit" }}
              />
            ) : icon === "train" ? (
              <TrainIcon />
            ) : (
              <ResetIcon />
            )
          }
        >
          {label}
        </NeoButton>
      </Box>
    </Tooltip>
  );
};

export default TrainPredictButton;
