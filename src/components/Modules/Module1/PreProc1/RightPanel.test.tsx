import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import RightPanel from "./RightPanel";

// Mock the Lucide React icons
vi.mock("lucide-react", () => ({
  Lock: () => <div data-testid="lock-icon">Lock Icon</div>,
  Unlock: () => <div data-testid="unlock-icon">Unlock Icon</div>,
}));

// Mock quiz data
const mockQuizData = [
  {
    id: 1,
    chapter_id: 1,
    question: "What is test question?",
    option_a: "Option A",
    option_b: "Option B",
    option_c: "Option C",
    correct_option: "A",
    hint_a: "Hint for A",
    hint_b: "Hint for B",
    hint_c: "Hint for C",
  },
];

describe("RightPanel Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup fetch mock with different responses based on the endpoint
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes("/quiz/validate")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              result: url.includes("user_answer=A") ? "correct" : "incorrect",
            }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockQuizData),
      });
    });
  });

  it("should render loading state initially", () => {
    render(<RightPanel />);
    expect(screen.getByText(/Loading quiz/i)).toBeInTheDocument();
  });

  it("should render quiz locked state by default", async () => {
    render(<RightPanel />);

    expect(screen.getByText("Quiz Locked")).toBeInTheDocument();
    expect(screen.getByTestId("lock-icon")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /unlock quiz/i })
    ).toBeInTheDocument();
  });

  it("should unlock quiz when unlock button is clicked", async () => {
    render(<RightPanel />);

    const unlockButton = screen.getByRole("button", { name: /unlock quiz/i });
    fireEvent.click(unlockButton);

    expect(screen.queryByText("Quiz Locked")).not.toBeInTheDocument();
    expect(screen.queryByTestId("lock-icon")).not.toBeInTheDocument();
  });

  it("should load and display quiz content after fetching", async () => {
    render(<RightPanel />);

    await waitFor(() => {
      expect(screen.getByText("What is test question?")).toBeInTheDocument();
      expect(screen.getByText("Option A")).toBeInTheDocument();
      expect(screen.getByText("Option B")).toBeInTheDocument();
      expect(screen.getByText("Option C")).toBeInTheDocument();
    });
  });

  it("should handle correct answer submission", async () => {
    render(<RightPanel />);

    // Unlock the quiz
    fireEvent.click(screen.getByRole("button", { name: /unlock quiz/i }));

    await waitFor(() => {
      expect(screen.getByText("What is test question?")).toBeInTheDocument();
    });

    // Select correct answer (A)
    fireEvent.click(screen.getByText("Option A"));
    fireEvent.click(screen.getByText(/check your knowledge/i));

    await waitFor(() => {
      expect(screen.getByText(/✅/)).toBeInTheDocument();
    });
  });

  it("should handle incorrect answer submission", async () => {
    render(<RightPanel />);

    // Unlock the quiz
    fireEvent.click(screen.getByRole("button", { name: /unlock quiz/i }));

    await waitFor(() => {
      expect(screen.getByText("What is test question?")).toBeInTheDocument();
    });

    // Select incorrect answer (B)
    fireEvent.click(screen.getByText("Option B"));
    fireEvent.click(screen.getByText(/check your knowledge/i));

    await waitFor(() => {
      expect(screen.getByText(/❌/)).toBeInTheDocument();
    });
  });

  it("should show appropriate styling for selected answer", async () => {
    render(<RightPanel />);

    // Unlock the quiz
    fireEvent.click(screen.getByRole("button", { name: /unlock quiz/i }));

    await waitFor(() => {
      expect(screen.getByText("What is test question?")).toBeInTheDocument();
    });

    const optionA = screen.getByText("Option A");
    fireEvent.click(optionA);

    expect(optionA.closest("button")).toHaveClass("bg-orange-500");
  });

  it("should keep options disabled when quiz is locked", async () => {
    render(<RightPanel />);

    await waitFor(() => {
      const options = screen
        .getAllByRole("button")
        .filter((button) =>
          ["Option A", "Option B", "Option C"].includes(
            button.textContent || ""
          )
        );

      options.forEach((option) => {
        expect(option).toBeDisabled();
      });

      expect(screen.getByText(/check your knowledge/i)).toBeDisabled();
    });
  });

  it("should display footer information correctly", () => {
    render(<RightPanel />);

    expect(
      screen.getByText(/Data Preprocessing - Riley's Digital Toolkit/i)
    ).toBeInTheDocument();
    expect(screen.getByText("INTRODUCTION")).toBeInTheDocument();
  });

  it("should handle fetch errors gracefully", async () => {
    // Mock a failed fetch
    global.fetch = vi.fn().mockRejectedValue(new Error("Fetch failed"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<RightPanel />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching quiz data:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
