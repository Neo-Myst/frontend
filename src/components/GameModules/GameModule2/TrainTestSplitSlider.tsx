// // components/GameModule2/TrainTestSplitSlider.tsx
// import React from "react";
// import { Slider, Box, styled, Tooltip, Typography } from "@mui/material";

// interface TrainTestSplitSliderProps {
//   value: number;
//   onChange: (value: number) => void;
// }

// const StyledSlider = styled(Slider)({
//   color: "#4ec9ff",
//   height: 8,
//   "& .MuiSlider-track": {
//     border: "none",
//     backgroundColor: "#0f4d92",
//   },
//   "& .MuiSlider-thumb": {
//     height: 24,
//     width: 24,
//     backgroundColor: "#4ec9ff",
//     border: "2px solid #171e2e",
//     boxShadow: "0 0 8px rgba(78, 201, 255, 0.5)",
//     "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
//       boxShadow: "0 0 12px rgba(78, 201, 255, 0.8)",
//     },
//     "&:before": {
//       display: "none",
//     },
//   },
//   "& .MuiSlider-valueLabel": {
//     backgroundColor: "#0f172a",
//     color: "#4ec9ff",
//     border: "1px solid #304060",
//     fontSize: "0.75rem",
//   },
//   "& .MuiSlider-rail": {
//     opacity: 0.5,
//     backgroundColor: "#1c2431",
//   },
//   "& .MuiSlider-mark": {
//     backgroundColor: "#4ec9ff",
//     height: 8,
//     width: 2,
//     "&.MuiSlider-markActive": {
//       opacity: 1,
//       backgroundColor: "#0f4d92",
//     },
//   },
// });

// const NeoMarks = styled(Box)({
//   display: "flex",
//   justifyContent: "space-between",
//   marginTop: "10px",
// });

// const NeoMark = styled(Box)({
//   textAlign: "center",
// });

// const NeoTooltip = styled(Tooltip)({
//   "& .MuiTooltip-tooltip": {
//     backgroundColor: "#0f172a",
//     color: "#4ec9ff",
//     border: "1px solid #304060",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
//     fontSize: "0.75rem",
//   },
// });

// // Visual indicator for training-testing ratio
// const SplitVisualizer = ({ trainRatio }: { trainRatio: number }) => {
//   return (
//     <Box
//       sx={{
//         mt: 1,
//         mb: 2,
//         display: "flex",
//         height: "12px",
//         borderRadius: "6px",
//         overflow: "hidden",
//       }}
//     >
//       <Box
//         sx={{
//           width: `${trainRatio * 100}%`,
//           backgroundColor: "#0f4d92",
//           position: "relative",
//           "&::after": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             right: 0,
//             bottom: 0,
//             width: "3px",
//             backgroundColor: "#171e2e",
//           },
//         }}
//       />
//       <Box
//         sx={{
//           width: `${(1 - trainRatio) * 100}%`,
//           backgroundColor: "#4ec9ff",
//           opacity: 0.3,
//         }}
//       />
//     </Box>
//   );
// };

// // Value text with tooltip
// const ValueLabelComponent = (props: {
//   children: React.ReactElement;
//   value: number;
// }) => {
//   const { children, value } = props;
//   return (
//     <NeoTooltip
//       title={`Training: ${Math.round(value * 100)}% / Testing: ${Math.round(
//         (1 - value) * 100
//       )}%`}
//       placement="top"
//       arrow
//     >
//       {children}
//     </NeoTooltip>
//   );
// };

// const TrainTestSplitSlider: React.FC<TrainTestSplitSliderProps> = ({
//   value,
//   onChange,
// }) => {
//   // Define possible split ratios
//   const marks = [
//     { value: 0.6, label: "60%" },
//     { value: 0.7, label: "70%" },
//     { value: 0.8, label: "80%" },
//     { value: 0.9, label: "90%" },
//   ];

//   return (
//     <Box sx={{ px: 1 }}>
//       <SplitVisualizer trainRatio={value} />

//       <StyledSlider
//         value={value}
//         onChange={(_, newValue) => onChange(newValue as number)}
//         step={0.05}
//         min={0.6}
//         max={0.9}
//         marks={marks}
//         valueLabelDisplay="auto"
//         components={{ ValueLabel: ValueLabelComponent }}
//       />

//       <NeoMarks>
//         {marks.map((mark) => (
//           <NeoMark key={mark.value}>
//             <Typography
//               variant="caption"
//               sx={{
//                 color: value === mark.value ? "#4ec9ff" : "#8599b9",
//                 fontWeight: value === mark.value ? "bold" : "normal",
//               }}
//             >
//               {mark.label}
//             </Typography>
//           </NeoMark>
//         ))}
//       </NeoMarks>
//     </Box>
//   );
// };

// export default TrainTestSplitSlider;
// components/GameModule2/TrainTestSplitSlider.tsx

// components/GameModule2/TrainTestSplitSlider.tsx
import React from "react";
import { Slider, Box, styled, Typography } from "@mui/material";

interface TrainTestSplitSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const StyledSlider = styled(Slider)({
  color: "#4ec9ff",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
    backgroundColor: "#0f4d92",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#4ec9ff",
    border: "2px solid #171e2e",
    boxShadow: "0 0 8px rgba(78, 201, 255, 0.5)",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "0 0 12px rgba(78, 201, 255, 0.8)",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#1c2431",
  },
  "& .MuiSlider-markLabel": {
    fontSize: "14px",
    fontWeight: 500,
    marginTop: "8px",
    color: "#8599b9",
  },
  "& .MuiSlider-markLabelActive": {
    color: "#4ec9ff",
  },
});

// Visual indicator for training-testing ratio
const SplitVisualizer = ({ trainRatio }: { trainRatio: number }) => {
  const testRatio = 1 - trainRatio;

  return (
    <Box sx={{ mb: 3, mt: 2 }}>
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: "center",
          mb: 1,
          color: "#4ec9ff",
          fontWeight: "medium",
        }}
      >
        Training: {Math.round(trainRatio * 100)}% / Testing:{" "}
        {Math.round(testRatio * 100)}%
      </Typography>

      <Box
        sx={{
          display: "flex",
          height: "16px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          sx={{
            width: `${trainRatio * 100}%`,
            backgroundColor: "#0f4d92",
            transition: "width 0.3s ease-in-out",
          }}
        />
        <Box
          sx={{
            width: `${testRatio * 100}%`,
            backgroundColor: "#4ec9ff",
            opacity: 0.5,
            transition: "width 0.3s ease-in-out",
          }}
        />
      </Box>
    </Box>
  );
};

const TrainTestSplitSlider: React.FC<TrainTestSplitSliderProps> = ({
  value,
  onChange,
}) => {
  // Define the exact split ratios we want to allow
  const allowedValues = [0.6, 0.7, 0.8, 0.9];

  // Custom onChange handler to snap to allowed values
  const handleChange = (_: Event, newValue: number | number[]) => {
    const numValue = newValue as number;

    // Find the closest allowed value
    const closestValue = allowedValues.reduce((prev, curr) =>
      Math.abs(curr - numValue) < Math.abs(prev - numValue) ? curr : prev
    );

    onChange(closestValue);
  };

  // Define marks with labels
  const marks = allowedValues.map((value) => ({
    value,
    label: `${value * 100}%`,
  }));

  return (
    <Box sx={{ px: 2, pt: 1, pb: 4 }}>
      <SplitVisualizer trainRatio={value} />

      <StyledSlider
        value={value}
        onChange={handleChange}
        step={null} // Disable continuous steps
        marks={marks}
        min={0.6}
        max={0.9}
        valueLabelDisplay="off" // Hide default value label since we show it in the visualizer
      />
    </Box>
  );
};

export default TrainTestSplitSlider;
