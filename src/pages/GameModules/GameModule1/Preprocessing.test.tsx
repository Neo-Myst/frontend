import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Preprocessing from "./Preprocessing";
import { ReactNode } from "react";

// Define interface types for mocked components
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

interface PreprocessingPopupProps {
  type: string;
  onSelect: () => void;
  isSelected?: boolean;
}

interface MotionProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  [key: string]: any;
}

// Mock dependencies
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../../components/GameModules/DataPreviewTable", () => ({
  default: () => (
    <div data-testid="data-preview-table">Mock Data Preview Table</div>
  ),
}));

vi.mock("../../../components/Modal", () => ({
  default: ({ isOpen, onClose, title, children }: ModalProps) =>
    isOpen ? (
      <div data-testid="modal">
        <h2>{title}</h2>
        <div>{children}</div>
        <button onClick={onClose} data-testid="close-modal">
          Close
        </button>
      </div>
    ) : null,
}));

vi.mock("../../../components/PreprocessingPopups", () => ({
  default: ({ type, onSelect }: PreprocessingPopupProps) => (
    <div data-testid={`preprocessing-popup-${type}`}>
      <p>Mock Preprocessing Popup for {type}</p>
      <button onClick={onSelect} data-testid={`select-${type}`}>
        Select
      </button>
    </div>
  ),
  preprocessingPopups: {
    median: { title: "Median Imputation" },
    remove: { title: "Remove Missing Values" },
    labelEncoding: { title: "Label Encoding" },
    oneHot: { title: "One-Hot Encoding" },
    normalized: { title: "Normalization" },
    standardized: { title: "Standardization" },
  },
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ className, children, ...props }: MotionProps) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    button: ({ className, onClick, children, ...props }: MotionProps) => (
      <button className={className} onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

// Mock navigate function
const mockNavigate = vi.fn();

describe("Preprocessing Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <Preprocessing />
      </MemoryRouter>
    );
  };

  it("shows modal when a preprocessing option is clicked", () => {
    renderComponent();

    // Click on MEDIAN option
    fireEvent.click(screen.getByText("MEDIAN"));

    // Modal should be shown
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Median Imputation")).toBeInTheDocument();
    expect(
      screen.getByTestId("preprocessing-popup-median")
    ).toBeInTheDocument();
  });

  it("selects an option when confirmed in modal", async () => {
    renderComponent();

    // Initial state - no options should be selected
    expect(screen.getByText("Submit Path")).toBeDisabled();

    // Click on MEDIAN option to open modal
    fireEvent.click(screen.getByText("MEDIAN"));

    // Confirm the selection in the modal
    fireEvent.click(screen.getByTestId("select-median"));

    // Submit button should be enabled now
    await waitFor(() => {
      expect(screen.getByText("Submit Path")).not.toBeDisabled();
    });
  });

  it("can reset selected options", async () => {
    renderComponent();

    // Select MEDIAN option
    fireEvent.click(screen.getByText("MEDIAN"));
    fireEvent.click(screen.getByTestId("select-median"));

    // Submit button should be enabled
    await waitFor(() => {
      expect(screen.getByText("Submit Path")).not.toBeDisabled();
    });

    // Click reset button
    fireEvent.click(screen.getByText("Reset"));

    // Submit button should be disabled again
    await waitFor(() => {
      expect(screen.getByText("Submit Path")).toBeDisabled();
    });
  });

  it('shows results when "Submit Path" is clicked', async () => {
    renderComponent();

    // Select all correct options (median, labelEncoding, normalized)
    fireEvent.click(screen.getByText("MEDIAN"));
    fireEvent.click(screen.getByTestId("select-median"));

    fireEvent.click(screen.getByText("LABEL ENCODING"));
    fireEvent.click(screen.getByTestId("select-labelEncoding"));

    fireEvent.click(screen.getByText("NORMALIZED"));
    fireEvent.click(screen.getByTestId("select-normalized"));

    // Click submit
    fireEvent.click(screen.getByText("Submit Path"));

    // Results should be shown
    await waitFor(() => {
      expect(screen.getByText(/Selected Path:/)).toBeInTheDocument();
      expect(
        screen.getByText(
          /Perfect! You've chosen the optimal preprocessing path/
        )
      ).toBeInTheDocument();
    });
  });

  it("shows error message for incorrect path", async () => {
    renderComponent();

    // Select incorrect options (remove, oneHot, standardized)
    fireEvent.click(screen.getByText("REMOVE"));
    fireEvent.click(screen.getByTestId("select-remove"));

    fireEvent.click(screen.getByText("ONE-HOT ENCODING"));
    fireEvent.click(screen.getByTestId("select-oneHot"));

    fireEvent.click(screen.getByText("STANDARDIZED"));
    fireEvent.click(screen.getByTestId("select-standardized"));

    // Click submit
    fireEvent.click(screen.getByText("Submit Path"));

    // Error message should be shown
    await waitFor(() => {
      expect(
        screen.getByText(/Not quite right. Consider how each step affects/)
      ).toBeInTheDocument();
    });
  });

  it("shows popup when trying to continue without submitting", async () => {
    renderComponent();

    // Select an option but don't submit
    fireEvent.click(screen.getByText("MEDIAN"));
    fireEvent.click(screen.getByTestId("select-median"));

    // Try to continue
    fireEvent.click(screen.getByText("Engage Data Core »"));

    // Error popup should appear
    await waitFor(() => {
      expect(
        screen.getByText("Submit your preprocessing path before continuing!")
      ).toBeInTheDocument();
    });
  });

  it("navigates to next page when correct path is selected and submitted", async () => {
    renderComponent();

    // Select all correct options
    fireEvent.click(screen.getByText("MEDIAN"));
    fireEvent.click(screen.getByTestId("select-median"));

    fireEvent.click(screen.getByText("LABEL ENCODING"));
    fireEvent.click(screen.getByTestId("select-labelEncoding"));

    fireEvent.click(screen.getByText("NORMALIZED"));
    fireEvent.click(screen.getByTestId("select-normalized"));

    // Submit path
    fireEvent.click(screen.getByText("Submit Path"));

    // Click continue
    fireEvent.click(screen.getByText("Engage Data Core »"));

    // Wait for navigation
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        "/modules/game-module1/outliers"
      );
    });
  });

  it("shows popup when trying to continue with incorrect path", async () => {
    renderComponent();

    // Select incorrect options
    fireEvent.click(screen.getByText("REMOVE"));
    fireEvent.click(screen.getByTestId("select-remove"));

    // Submit path
    fireEvent.click(screen.getByText("Submit Path"));

    // Try to continue
    fireEvent.click(screen.getByText("Engage Data Core »"));

    // Error popup should appear
    await waitFor(() => {
      expect(
        screen.getByText(
          "Select Median, Label Encoding, and Normalized to optimize your preprocessing!"
        )
      ).toBeInTheDocument();
    });
  });

  it("handles mutual exclusivity for option categories", async () => {
    renderComponent();

    // Select MEDIAN
    fireEvent.click(screen.getByText("MEDIAN"));
    fireEvent.click(screen.getByTestId("select-median"));

    // Then select REMOVE, which should deselect MEDIAN
    fireEvent.click(screen.getByText("REMOVE"));
    fireEvent.click(screen.getByTestId("select-remove"));

    // Submit path
    fireEvent.click(screen.getByText("Submit Path"));

    // Check that path only includes REMOVE
    await waitFor(() => {
      expect(screen.getByText(/Selected Path:/)).toBeInTheDocument();
      expect(screen.getByText(/Remove/)).toBeInTheDocument();
      expect(screen.queryByText(/Median/)).not.toBeInTheDocument();
    });
  });
});
