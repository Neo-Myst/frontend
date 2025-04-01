import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LinearRegression from "./LinearRegression";

// 🧠 Same mock for ResizeObserver
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

interface SliderProps {
  value: number;
  onChange: (val: number) => void;
}

interface FeatureSelectorProps {
  selectedFeatures: string[];
  onChange: (features: string[]) => void;
}

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

describe("UI Tests - LinearRegression Game", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows performance panel and chart after successful training", async () => {
    render(<LinearRegression />);

    // Check feature checkboxes
    fireEvent.click(screen.getByLabelText("Hours Played"));
    fireEvent.click(screen.getByLabelText("VIP Status_encoded"));

    // Click train button
    fireEvent.click(screen.getByRole("button", { name: /Train & Predict/i }));

    // Wait for result UI to appear
    expect(
      await screen.findByText(/Root Mean Squared Error/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/\$420.00/)).toBeInTheDocument();
    expect(
      screen.getByText(/Player Spending Prediction Accuracy/i)
    ).toBeInTheDocument();
  });

  it("resets model and clears output when clicking Reset", async () => {
    render(<LinearRegression />);

    fireEvent.click(screen.getByLabelText("Hours Played"));
    fireEvent.click(screen.getByLabelText("VIP Status_encoded"));
    fireEvent.click(screen.getByRole("button", { name: /Train & Predict/i }));

    // Wait for result UI
    await screen.findByText(/Root Mean Squared Error/i);

    // Click reset button
    fireEvent.click(screen.getByRole("button", { name: /Reset/i }));

    // Expect prompt again
    expect(
      await screen.findByText(/Select features and train your model/i)
    ).toBeInTheDocument();
  });

  it("responds to different train/test splits", async () => {
    render(<LinearRegression />);

    // Check features
    fireEvent.click(screen.getByLabelText("Hours Played"));
    fireEvent.click(screen.getByLabelText("VIP Status_encoded"));

    // Change split
    const slider = screen.getByTestId("train-test-slider");
    fireEvent.change(slider, { target: { value: "0.9" } });

    // This combo (features + 0.9) won't exist in precomputed, so expect warning
    fireEvent.click(screen.getByRole("button", { name: /Train & Predict/i }));

    expect(
      await screen.findByText(/No precomputed result found/i)
    ).toBeInTheDocument();
  });
});
