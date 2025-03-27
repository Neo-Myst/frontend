// RandomForest.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import RandomForest from "./RandomForest";

// Mock framer-motion's AnimatePresence to skip animations
vi.mock("framer-motion", () => {
  const FakeAnimatePresence: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
  const motion = {
    div: (props: any) => <div {...props} />,
    button: (props: any) => <button {...props} />,
  };
  return { AnimatePresence: FakeAnimatePresence, motion };
});

describe("RandomForest Component", () => {
  test("renders page with heading and progress tracker", () => {
    render(
      <MemoryRouter>
        <RandomForest />
      </MemoryRouter>
    );
    // Verify main page elements
    expect(screen.getByTestId("randomForestPage")).toBeInTheDocument();
    expect(screen.getByTestId("neoMystLabel")).toHaveTextContent("NeoMyst");
    expect(screen.getByTestId("randomForestHeading")).toHaveTextContent("Feature Selection: Random Forest");
    expect(screen.getByTestId("progressMessage")).toBeInTheDocument();
  });

  test("selecting target variable and generating chart", async () => {
    render(
      <MemoryRouter>
        <RandomForest />
      </MemoryRouter>
    );

    // Open target dropdown
    fireEvent.click(screen.getByTestId("targetDropdownButton"));
    // Choose "Quest Exploit Score"
    const questOption = screen.getByTestId("targetOption-Quest Exploit Score");
    fireEvent.click(questOption);

    // Check generate chart is enabled
    const generateBtn = screen.getByTestId("generateChartButton");
    expect(generateBtn).not.toBeDisabled();
    fireEvent.click(generateBtn);

    // Wait for chart to appear
    await waitFor(() => {
      expect(screen.getByTestId("chartImage")).toBeInTheDocument();
    });
  });

  test("selecting features and checking partial correctness", async () => {
    render(
      <MemoryRouter>
        <RandomForest />
      </MemoryRouter>
    );
    // Pick "Transaction Amount ($)" as target
    fireEvent.click(screen.getByTestId("targetDropdownButton"));
    fireEvent.click(screen.getByTestId("targetOption-Transaction Amount ($)"));
    // Generate chart
    fireEvent.click(screen.getByTestId("generateChartButton"));
    await waitFor(() => {
      expect(screen.getByTestId("chartImage")).toBeInTheDocument();
    });

    // Select only one correct feature out of three
    fireEvent.click(screen.getByTestId("featureCheckbox-Cash on Hand ($)")); // correct
    // Check relevance
    const checkBtn = screen.getByTestId("checkRelevanceButton");
    fireEvent.click(checkBtn);

    // Should see partial correctness
    const feedback = await screen.findByTestId("relevanceFeedback");
    expect(feedback).toHaveTextContent("Partially correct");
  });

  test("can complete all targets and click finish", async () => {
    render(
      <MemoryRouter>
        <RandomForest />
      </MemoryRouter>
    );

    // Helper to pick a target, generate chart, select correct features, check
    const completeTarget = async (targetName: string, correctFeatures: string[]) => {
      // Select target
      fireEvent.click(screen.getByTestId("targetDropdownButton"));
      fireEvent.click(screen.getByTestId(`targetOption-${targetName}`));

      // Generate chart
      fireEvent.click(screen.getByTestId("generateChartButton"));
      await waitFor(() => {
        expect(screen.getByTestId("chartImage")).toBeInTheDocument();
      });

      // Select all correct features
      for (const feat of correctFeatures) {
        fireEvent.click(screen.getByTestId(`featureCheckbox-${feat}`));
      }
      // Check relevance
      fireEvent.click(screen.getByTestId("checkRelevanceButton"));
      await waitFor(() => {
        expect(screen.getByTestId("relevanceFeedback")).toHaveTextContent("Correct!");
      });
    };

    // Complete all three targets
    await completeTarget("Dark Market Transactions", [
      "Transaction Amount ($)",
      "Cash on Hand ($)",
      "Quest Exploit Score",
    ]);
    await completeTarget("Quest Exploit Score", [
      "Missions Completed",
      "Criminal Score",
    ]);
    await completeTarget("Transaction Amount ($)", [
      "Cash on Hand ($)",
      "Neural Link Stability (%)",
      "Money Spent ($)",
    ]);

    // Now finish should be enabled
    const finishBtn = screen.getByTestId("finishButton");
    fireEvent.click(finishBtn);

    // We see the clicked animation or next route logic in action
    // (You can do additional checks if you navigate to the next page)
  });
});
