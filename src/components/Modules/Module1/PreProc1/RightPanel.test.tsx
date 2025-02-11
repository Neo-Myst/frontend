// RightPanel.test.tsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import RightPanel from "./RightPanel";

// Mock quiz data matching what the component expects (it uses data[0])
const mockQuizData = [
  {
    id: 1,
    chapter_id: 1,
    question: "What is test question?",
    option_a: "Option A",
    option_b: "Option B",
    option_c: "Option C",
    correct_option: "A",
    hint_a: "Hint A",
    hint_b: "Hint B",
    hint_c: "Hint C",
  },
];

describe("RightPanel Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Setup fetch mock to resolve immediately
    global.fetch = vi.fn().mockImplementation((url) =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(
            url.includes("/quiz/validate")
              ? { result: "correct" }
              : mockQuizData
          ),
      })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("initially renders in locked state with overlay", () => {
    render(<RightPanel />);
    expect(screen.getByText("Quiz Locked")).toBeInTheDocument();
  });

  it("unlocks quiz when unlock button is clicked", async () => {
    render(<RightPanel />);
    const unlockButton = screen.getByRole("button", { name: /Unlock Quiz/i });
    fireEvent.click(unlockButton);
    await waitFor(() => {
      expect(screen.queryByText("Quiz Locked")).not.toBeInTheDocument();
    });
  });

  it("renders quiz content after loading", async () => {
    render(<RightPanel />);

    // Unlock the quiz
    const unlockButton = screen.getByRole("button", { name: /Unlock Quiz/i });
    fireEvent.click(unlockButton);

    // Wait for the quiz content to load
    await waitFor(() => {
      expect(screen.getByText("What is test question?")).toBeInTheDocument();
    });
  });

  it("enables options after unlocking", async () => {
    render(<RightPanel />);

    // Unlock the quiz
    const unlockButton = screen.getByRole("button", { name: /Unlock Quiz/i });
    fireEvent.click(unlockButton);

    // Wait for content to load
    await waitFor(() => {
      const optionA = screen.getByRole("button", { name: "Option A" });
      const optionB = screen.getByRole("button", { name: "Option B" });
      const optionC = screen.getByRole("button", { name: "Option C" });

      expect(optionA).toBeInTheDocument();
      expect(optionB).toBeInTheDocument();
      expect(optionC).toBeInTheDocument();

      expect(optionA).not.toBeDisabled();
      expect(optionB).not.toBeDisabled();
      expect(optionC).not.toBeDisabled();
    });
  });

  it("shows feedback when answer is submitted", async () => {
    render(<RightPanel />);

    // Unlock the quiz
    const unlockButton = screen.getByRole("button", { name: /Unlock Quiz/i });
    fireEvent.click(unlockButton);

    // Wait for content to load
    await waitFor(async () => {
      const optionA = screen.getByRole("button", { name: "Option A" });
      fireEvent.click(optionA);

      const checkButton = screen.getByRole("button", {
        name: /Check your knowledge/i,
      });
      fireEvent.click(checkButton);

      // Wait for the feedback to appear
      await waitFor(() => {
        expect(screen.getByText(/✅/)).toBeInTheDocument();
      });
    });
  });

  it("disables interaction when locked", async () => {
    render(<RightPanel />);

    // Wait for the quiz to load (while still locked)
    await waitFor(() => {
      const optionA = screen.getByRole("button", { name: "Option A" });
      const optionB = screen.getByRole("button", { name: "Option B" });
      const optionC = screen.getByRole("button", { name: "Option C" });
      const checkButton = screen.getByRole("button", {
        name: /Check your knowledge/i,
      });

      expect(optionA).toBeDisabled();
      expect(optionB).toBeDisabled();
      expect(optionC).toBeDisabled();
      expect(checkButton).toBeDisabled();
    });
  });

  it("preserves footer text", () => {
    render(<RightPanel />);
    expect(
      screen.getByText(/Data Preprocessing - Riley's Digital Toolkit/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Introduction")).toBeInTheDocument();
  });
});
