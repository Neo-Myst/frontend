import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LinearRegression from "./LinearRegression";

// 👇 Mock the precomputed_results module itself with inline mock data

// Mock ResizeObserver for Recharts and MUI components
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

vi.mock(
  "../../../components/GameModules/GameModule2/precomputed_results.json",
  () => {
    return {
      default: [
        {
          features: ["Hours Played", "VIP Status_encoded"],
          train_split: 0.8,
          rmse: 420,
          predictions: [10000, 11000, 12000],
          actuals: [10200, 11200, 11900],
        },
      ],
    };
  }
);

// Properly typed props for mocked components
interface SliderProps {
  value: number;
  onChange: (val: number) => void;
}

interface FeatureSelectorProps {
  selectedFeatures: string[];
  onChange: (features: string[]) => void;
}

// 👇 Mock TrainTestSplitSlider
vi.mock(
  "../../../components/GameModules/GameModule2/TrainTestSplitSlider",
  () => ({
    default: ({ value, onChange }: SliderProps) => (
      <input
        type="range"
        min={0.6}
        max={0.9}
        step={0.1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        data-testid="train-test-slider"
      />
    ),
  })
);

// 👇 Mock FeatureSelector
vi.mock("../../../components/GameModules/GameModule2/FeatureSelector", () => ({
  default: ({ selectedFeatures, onChange }: FeatureSelectorProps) => (
    <div>
      <label>
        <input
          type="checkbox"
          checked={selectedFeatures.includes("Hours Played")}
          onChange={() => {
            if (selectedFeatures.includes("Hours Played")) {
              onChange(selectedFeatures.filter((f) => f !== "Hours Played"));
            } else {
              onChange([...selectedFeatures, "Hours Played"]);
            }
          }}
        />
        Hours Played
      </label>
      <label>
        <input
          type="checkbox"
          checked={selectedFeatures.includes("VIP Status_encoded")}
          onChange={() => {
            if (selectedFeatures.includes("VIP Status_encoded")) {
              onChange(
                selectedFeatures.filter((f) => f !== "VIP Status_encoded")
              );
            } else {
              onChange([...selectedFeatures, "VIP Status_encoded"]);
            }
          }}
        />
        VIP Status_encoded
      </label>
    </div>
  ),
}));

describe("LinearRegression Game Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<LinearRegression />);
    expect(
      screen.getByText(/Predict Player Spending in NeoVerse/i)
    ).toBeInTheDocument();
  });

  it("shows prompt when trying to train with no features", async () => {
    render(<LinearRegression />);
    const button = screen.getByRole("button", { name: /Train & Predict/i });

    fireEvent.click(button);

    expect(
      await screen.findByText(/Select features and train your model/i)
    ).toBeInTheDocument();
  });

  it("renders prediction result when valid match is found", async () => {
    render(<LinearRegression />);
    fireEvent.click(screen.getByLabelText("Hours Played"));
    fireEvent.click(screen.getByLabelText("VIP Status_encoded"));

    fireEvent.click(screen.getByRole("button", { name: /Train & Predict/i }));

    expect(
      await screen.findByText(/Root Mean Squared Error/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/\$420.00/)).toBeInTheDocument();
  });

  it("displays warning when no matching result exists", async () => {
    render(<LinearRegression />);
    fireEvent.click(screen.getByLabelText("Hours Played")); // Only one feature
    fireEvent.click(screen.getByRole("button", { name: /Train & Predict/i }));

    expect(
      await screen.findByText(/No precomputed result found/i)
    ).toBeInTheDocument();
  });
});
