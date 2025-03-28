// pages/GameModule2/LinearRegression.tsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Container, styled } from "@mui/material";
import Alert from "@mui/material/Alert";
import TrainTestSplitSlider from "../../../components/GameModules/GameModule2/TrainTestSplitSlider";
import FeatureSelector from "../../../components/GameModules/GameModule2/FeatureSelector";
import TrainPredictButton from "../../../components/GameModules/GameModule2/TrainPredictButton";
import ModelPerformancePanel from "../../../components/GameModules/GameModule2/ModelPerformancePanel";
import PredictionChart from "../../../components/GameModules/GameModule2/PredictionChart";
import PlayerInsightSummary from "../../../components/GameModules/GameModule2/PlayerInsightSummary";
import precomputedResults from "../../../components/GameModules/GameModule2/precomputed_results.json";

// Define result type to avoid 'any'
interface ModelResult {
  features: string[];
  train_split: number;
  rmse: number;
  predictions: number[];
  actuals: number[];
}

// Ensure precomputed results are properly typed
const typedPrecomputedResults: ModelResult[] = precomputedResults;

// Styled components for consistent theming
const NeoversePaper = styled(Paper)({
  backgroundColor: "#171e2e",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #304060",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  marginBottom: "20px",
});

const PageContainer = styled(Box)({
  backgroundColor: "#0d1117",
  minHeight: "100vh",
  padding: "30px 20px",
  color: "#e6eeff",
  fontFamily: "Arial, sans-serif",
  backgroundImage:
    "radial-gradient(circle at 10% 20%, rgba(78, 201, 255, 0.05) 0%, transparent 20%)",
});

const MainLayout = styled(Box)({
  display: "flex",
  gap: "24px",
  flexWrap: "wrap",
  width: "100%",

  "@media (min-width: 900px)": {
    flexWrap: "nowrap",
  },
});

const LeftPanel = styled(Box)({
  flex: "0 1 100%",
  width: "100%",

  "@media (min-width: 900px)": {
    flex: "0 1 32%",
  },
});

const RightPanel = styled(Box)({
  flex: "0 1 100%",
  width: "100%",

  "@media (min-width: 900px)": {
    flex: "0 1 68%",
  },
});

const NeoTitle = styled(Typography)({
  color: "#4ec9ff",
  fontWeight: "bold",
  marginBottom: "10px",
  position: "relative",
  display: "inline-block",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-5px",
    left: 0,
    width: "100%",
    height: "2px",
    backgroundColor: "#4ec9ff",
  },
});

const SubText = styled(Typography)({
  color: "#8599b9",
  marginBottom: "20px",
});

const CustomStyle = styled("style")({});

const LinearRegression: React.FC = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedSplit, setSelectedSplit] = useState<number>(0.8);
  const [result, setResult] = useState<ModelResult | null>(null);
  const [noResult, setNoResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Validate precomputed results on component mount
    if (!Array.isArray(typedPrecomputedResults)) {
      setError("Invalid precomputed results format");
      return;
    }

    // Validate each result
    const invalidResults = typedPrecomputedResults.filter((result) => {
      return (
        !result.features ||
        !result.train_split ||
        !result.rmse ||
        !result.predictions ||
        !result.actuals
      );
    });

    if (invalidResults.length > 0) {
      setError("Some precomputed results are invalid");
    }
  }, []);

  const handleTrainPredict = () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!selectedFeatures.length) {
        throw new Error("Please select at least one feature");
      }

      const selectedFeaturesSorted = [...selectedFeatures].sort();
      const foundResult = typedPrecomputedResults.find(
        (r) =>
          JSON.stringify(r.features.sort()) ===
            JSON.stringify(selectedFeaturesSorted) &&
          Math.abs(r.train_split - selectedSplit) < 0.0001
      );

      if (foundResult) {
        console.log("Found result:", foundResult);
        setResult(foundResult);
        setNoResult(false);
      } else {
        console.log(
          "No result found for",
          selectedFeaturesSorted,
          selectedSplit
        );
        setResult(null);
        setNoResult(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFeatures([]);
    setSelectedSplit(0.8);
    setResult(null);
    setNoResult(false);
    setError(null);
  };

  if (error) {
    return (
      <PageContainer>
        <Container maxWidth="xl">
          <NeoversePaper>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </NeoversePaper>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container maxWidth="xl">
        {/* Header */}
        <NeoversePaper elevation={3}>
          <NeoTitle variant="h4">Predict Player Spending in NeoVerse</NeoTitle>
          <SubText variant="subtitle1">
            Use linear regression to forecast player spending based on behavior
            data. Tune your split, pick features, and beat the system.
          </SubText>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              color: "#4ec9ff",
            }}
          >
            <Typography variant="caption">
              Chapter 4 &gt; Linear Regression &gt; Game
            </Typography>
          </Box>
        </NeoversePaper>

        {/* Main Layout */}
        <MainLayout>
          {/* Left Panel - Model Configuration */}
          <LeftPanel>
            <NeoversePaper sx={{ height: { md: result ? "100%" : "auto" } }}>
              <NeoTitle variant="h5">Model Configuration</NeoTitle>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#8599b9",
                    mb: 1,
                  }}
                >
                  Train-Test Split
                </Typography>
                <Box sx={{ px: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#4ec9ff",
                      mb: 1,
                      textAlign: "center",
                    }}
                  >
                    Training: {Math.round(selectedSplit * 100)}% / Testing:{" "}
                    {Math.round((1 - selectedSplit) * 100)}%
                  </Typography>
                  <TrainTestSplitSlider
                    value={selectedSplit}
                    onChange={setSelectedSplit}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#8599b9",
                    mb: 1,
                  }}
                >
                  Feature Selection
                </Typography>
                <Box sx={{ ml: 1 }}>
                  <FeatureSelector
                    selectedFeatures={selectedFeatures}
                    onChange={setSelectedFeatures}
                  />
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <TrainPredictButton
                  disabled={selectedFeatures.length === 0}
                  onClick={handleTrainPredict}
                  isLoading={isLoading}
                />

                {result && (
                  <TrainPredictButton
                    variant="outlined"
                    onClick={handleReset}
                    label="Reset"
                    icon="reset"
                  />
                )}
              </Box>
            </NeoversePaper>
          </LeftPanel>

          {/* Right Panel - Model Output */}
          <RightPanel>
            <NeoversePaper sx={{ height: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <NeoTitle variant="h5">Model Performance</NeoTitle>

                {noResult && (
                  <Alert
                    severity="warning"
                    sx={{
                      backgroundColor: "#2e1a1a",
                      color: "#f97316",
                      border: "1px solid #853e23",
                      marginY: 2,
                      "& .MuiAlert-icon": {
                        color: "#f97316",
                      },
                    }}
                  >
                    No precomputed result found for this combination. Please try
                    a different set of features or split.
                  </Alert>
                )}

                {isLoading && (
                  <Box
                    sx={{
                      py: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0.7,
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "#4ec9ff", mb: 2 }}>
                      Training model...
                    </Typography>
                    <Box className="neo-loading-indicator">
                      <Box className="neo-loading-circle"></Box>
                    </Box>
                  </Box>
                )}

                {result && !isLoading && (
                  <Box sx={{ flex: 1, overflowY: "auto" }}>
                    <Box sx={{ mb: 3 }}>
                      <ModelPerformancePanel rmse={result.rmse} />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <PredictionChart
                        actuals={result.actuals}
                        predictions={result.predictions}
                      />
                    </Box>

                    <Box>
                      <PlayerInsightSummary rmse={result.rmse} />
                    </Box>
                  </Box>
                )}

                {!result && !isLoading && !noResult && (
                  <Box
                    sx={{
                      py: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      opacity: 0.7,
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "#8599b9" }}>
                      Select features and train your model to see results
                    </Typography>
                  </Box>
                )}
              </Box>
            </NeoversePaper>
          </RightPanel>
        </MainLayout>
      </Container>

      {/* Custom CSS for loading animation - fixed jsx style issue */}
      <CustomStyle>{`
        .neo-loading-indicator {
          position: relative;
          width: 80px;
          height: 80px;
        }
        
        .neo-loading-circle {
          position: absolute;
          width: 64px;
          height: 64px;
          border: 4px solid transparent;
          border-top-color: #4ec9ff;
          border-radius: 50%;
          animation: neo-loading-spin 1.2s linear infinite;
        }
        
        .neo-loading-circle:before {
          content: '';
          position: absolute;
          top: 4px;
          left: 4px;
          right: 4px;
          bottom: 4px;
          border: 4px solid transparent;
          border-top-color: #3182ce;
          border-radius: 50%;
          animation: neo-loading-spin 1.8s linear infinite;
        }
        
        @keyframes neo-loading-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</CustomStyle>
    </PageContainer>
  );
};

export default LinearRegression;
