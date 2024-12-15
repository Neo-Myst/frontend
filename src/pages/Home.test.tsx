import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./Home";

describe("Home Component", () => {
  it("renders the hero section", () => {
    render(<Home />);
    expect(screen.getByText(/Learn Machine Learning/i)).toBeTruthy();
    expect(
      screen.getByText(/hands-on experiments and real-time visualizations/i)
    ).toBeTruthy();
  });

  it("renders two CTA buttons", () => {
    render(<Home />);
    expect(screen.getByText("Start Learning")).toBeTruthy();
    expect(screen.getByText("Watch Demo")).toBeTruthy();
  });

  it("renders the FeatureCards with correct titles", () => {
    render(<Home />);
    expect(screen.getByText("Interactive Learning")).toBeTruthy();
    expect(screen.getByText("Guided Modules")).toBeTruthy();
  });

  it("renders the DotGrid", () => {
    render(<Home />);
    const dots = screen.getAllByRole("gridcell");
    expect(dots.length).toBeGreaterThan(0);
  });
});
