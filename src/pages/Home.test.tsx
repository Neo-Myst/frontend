import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Home from "./Home";
import UserProvider from "../contexts/UserProvider";
import React from "react";
import "@testing-library/jest-dom";

describe("Home Component", () => {
  const renderWithProviders = (ui: React.ReactNode) => {
    return render(
      <MemoryRouter>
        <UserProvider>{ui}</UserProvider>
      </MemoryRouter>
    );
  };

  it("renders the hero section", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Learn Machine Learning/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Master ML concepts through hands-on experiments and real-time visualizations/i
      )
    ).toBeInTheDocument();
  });

  it("renders two CTA buttons", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Start Learning")).toBeInTheDocument();
    expect(screen.getByText("Watch Demo")).toBeInTheDocument();
  });

  it("renders the FeatureCards with correct titles", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Interactive Learning")).toBeInTheDocument();
    expect(screen.getByText("Guided Modules")).toBeInTheDocument();
  });

  it("renders the DotGrid", () => {
    renderWithProviders(<Home />);
    const dots = screen.getAllByRole("gridcell");
    expect(dots.length).toBe(9); // Assuming a 3x3 grid
  });
});
