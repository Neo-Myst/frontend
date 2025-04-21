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
    expect(screen.getByText(/Welcome to NeoMyst/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Your interactive learning platform for mastering machine learning concepts/i
      )
    ).toBeInTheDocument();
  });

  it("renders the CTA button", () => {
    renderWithProviders(<Home />);
    const button = screen.getByRole('button', { 
      name: /Start Learning|Login to Begin/i 
    });
    expect(button).toBeInTheDocument();
  });

  it("renders the FeatureCards with correct titles", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Interactive Learning")).toBeInTheDocument();
    expect(screen.getByText("Practical Applications")).toBeInTheDocument();
    expect(screen.getByText("Progress Tracking")).toBeInTheDocument();
  });

  it("renders the DotGrid", () => {
    renderWithProviders(<Home />);
    const dots = screen.getAllByRole("gridcell");
    expect(dots.length).toBe(9); // Assuming a 3x3 grid
  });
});
