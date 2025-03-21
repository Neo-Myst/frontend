import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OutlierDetection from "./OutlierDetection";
import { ReactNode } from "react";

// Mock dependencies
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Use a simplified mock for framer-motion to avoid animation-related issues
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ className, children, ...props }: Record<string, unknown>) => (
      <div data-testid="motion-div" className={className} {...props}>
        {children}
      </div>
    ),
    button: ({
      className,
      onClick,
      children,
      ...props
    }: Record<string, unknown>) => (
      <button
        data-testid="motion-button"
        className={className}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    ),
    span: ({ className, children, ...props }: Record<string, unknown>) => (
      <span data-testid="motion-span" className={className} {...props}>
        {children}
      </span>
    ),
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => (
    <div data-testid="animate-presence">{children}</div>
  ),
}));

// Mock navigate function
const mockNavigate = vi.fn();

// Helper function to find elements by text content
const getByTextContent = (text: string) => {
  return screen.getByText((content) => {
    return content.includes(text);
  });
};

describe("OutlierDetection Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <OutlierDetection />
      </MemoryRouter>
    );
  };

  it("selects a column from dropdown and displays its box plot", async () => {
    renderComponent();

    // Open dropdown
    const dropdownButton = getByTextContent("VIEW:");
    fireEvent.click(dropdownButton);

    // Wait for dropdown to appear and select a column
    await waitFor(() => {
      // Find all buttons in the dropdown
      const dropdownButtons = screen
        .getAllByRole("button")
        .filter(
          (button) =>
            button.textContent?.includes("Quest Exploit Score") &&
            !button.textContent?.includes("VIEW")
        );

      // Click the first dropdown option button
      fireEvent.click(dropdownButtons[0]);
    });

    // Verify selected column appears in the button
    await waitFor(() => {
      expect(getByTextContent("VIEW: Quest Exploit Score")).toBeInTheDocument();
    });

    // Check for the alt text of the image
    await waitFor(() => {
      const boxplotImage = screen.getByAltText(
        /Box plot for Quest Exploit Score/i
      );
      expect(boxplotImage).toBeInTheDocument();
    });
  });

  it("selects and deselects columns for outlier removal", async () => {
    renderComponent();

    // Find all checkboxes
    const checkboxes = screen.getAllByRole("checkbox");

    // Find Quest Exploit Score checkbox (index 2)
    const questExploitCheckbox = checkboxes[2];

    // Find Money Spent checkbox (index 4)
    const moneySpentCheckbox = checkboxes[4];

    // Select checkboxes
    fireEvent.click(questExploitCheckbox);
    fireEvent.click(moneySpentCheckbox);

    // Verify checkboxes are checked
    expect(questExploitCheckbox).toBeChecked();
    expect(moneySpentCheckbox).toBeChecked();

    // Deselect first checkbox
    fireEvent.click(questExploitCheckbox);

    // Verify it's unchecked
    expect(questExploitCheckbox).not.toBeChecked();
    expect(moneySpentCheckbox).toBeChecked();
  });

  it("shows correct message based on selected columns", async () => {
    renderComponent();

    // Find all checkboxes
    const checkboxes = screen.getAllByRole("checkbox");

    // Find Quest Exploit Score checkbox (index 2)
    const questExploitCheckbox = checkboxes[2];

    // Find Money Spent checkbox (index 4)
    const moneySpentCheckbox = checkboxes[4];

    // Check that initial message is present
    expect(
      screen.getByText("Select columns to remove outliers")
    ).toBeInTheDocument();

    // Select first column
    fireEvent.click(questExploitCheckbox);

    // Check for updated message - singular
    await waitFor(() => {
      expect(
        screen.getByText(/Ready to remove outliers from 1 column/)
      ).toBeInTheDocument();
    });

    // Select second column
    fireEvent.click(moneySpentCheckbox);

    // Check for updated message - plural
    await waitFor(() => {
      expect(
        screen.getByText(/Ready to remove outliers from 2 columns/)
      ).toBeInTheDocument();
    });
  });

  it("shows error popup when trying to continue without removing outliers", async () => {
    renderComponent();

    // Select some columns
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[2]); // Quest Exploit Score

    // Try to continue without removing outliers
    const continueButton = screen.getByText("Continue »");
    fireEvent.click(continueButton);

    // Check for error popup
    await waitFor(() => {
      expect(
        screen.getByText(/You must remove outliers before continuing/i)
      ).toBeInTheDocument();
    });
  });

  it("shows error message when removing outliers with incorrect selection", async () => {
    renderComponent();

    // Select columns incorrectly (including one without outliers)
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[2]); // Quest Exploit Score
    fireEvent.click(checkboxes[6]); // Hours Played (no outliers)

    // Click Remove Outliers button
    const removeOutliersButton = screen.getByText("Remove Outliers");
    fireEvent.click(removeOutliersButton);

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/Incorrect selection/i)).toBeInTheDocument();
    });
  });

  it("correctly identifies and removes outliers with perfect selection", async () => {
    renderComponent();

    // Select all columns with outliers
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[2]); // Quest Exploit Score
    fireEvent.click(checkboxes[4]); // Money Spent
    fireEvent.click(checkboxes[5]); // Missions Completed

    // Click Remove Outliers
    const removeOutliersButton = screen.getByText("Remove Outliers");
    fireEvent.click(removeOutliersButton);

    // Check for success message
    await waitFor(() => {
      expect(
        screen.getByText(
          /Success! Outliers removed from all affected columns!/i
        )
      ).toBeInTheDocument();
    });

    // Click continue
    const continueButton = screen.getByText("Continue »");
    fireEvent.click(continueButton);

    // Check that navigation was called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        "/modules/game-module1/heatmaps"
      );
    });
  });

  it("resets outlier removal state when selection changes", async () => {
    renderComponent();

    // Select all columns with outliers
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[2]); // Quest Exploit Score
    fireEvent.click(checkboxes[4]); // Money Spent
    fireEvent.click(checkboxes[5]); // Missions Completed

    // Remove outliers
    const removeOutliersButton = screen.getByText("Remove Outliers");
    fireEvent.click(removeOutliersButton);

    // Verify success message
    await waitFor(() => {
      expect(
        screen.getByText(
          /Success! Outliers removed from all affected columns!/i
        )
      ).toBeInTheDocument();
    });

    // Change selection
    fireEvent.click(checkboxes[6]); // Hours Played

    // Verify message has updated
    await waitFor(() => {
      expect(
        screen.getByText(/Ready to remove outliers from 4 columns/i)
      ).toBeInTheDocument();
    });

    // Verify remove outliers button is enabled again
    expect(screen.getByText("Remove Outliers")).not.toBeDisabled();
  });
});
