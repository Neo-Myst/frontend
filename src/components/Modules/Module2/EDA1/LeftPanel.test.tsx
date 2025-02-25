// LeftPanel.test.tsx
import ResizeObserver from "resize-observer-polyfill";
global.ResizeObserver = ResizeObserver;

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LeftPanel from './LeftPanel';

describe('LeftPanel Component', () => {
  it('renders correctly and displays key elements', () => {
    render(
      <MemoryRouter>
        <LeftPanel />
      </MemoryRouter>
    );
    
    // Check for "NeoMyst" text. It appears in multiple elements, so we use getAllByText.
    const neoMystElements = screen.getAllByText(/NeoMyst/i);
    expect(neoMystElements.length).toBeGreaterThan(0);
    
    // Check that the "Archive 2.1" text appears
    expect(screen.getByText(/Archive 2.1/i)).toBeInTheDocument();

    // Check for "Boxplot" heading (allow multiple occurrences)
    const boxplotElements = screen.getAllByText(/Boxplot/i);
    expect(boxplotElements.length).toBeGreaterThanOrEqual(1);

    // Check for "Scatterplot" heading
    const scatterplotElements = screen.getAllByText(/Scatterplot/i);
    expect(scatterplotElements.length).toBeGreaterThanOrEqual(1);

    // Check for "Line Chart" heading
    const lineChartElements = screen.getAllByText(/Line Chart/i);
    expect(lineChartElements.length).toBeGreaterThanOrEqual(1);

    // Check for navigation buttons
    expect(screen.getByText(/Go Back/i)).toBeInTheDocument();
    expect(screen.getByText(/Investigate Further/i)).toBeInTheDocument();
  });
});
