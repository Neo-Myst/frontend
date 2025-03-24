import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeatMaps from './HeatMaps';
import { vi } from 'vitest';

// Mock framer-motion's AnimatePresence to immediately render children
vi.mock('framer-motion', () => {
  const FakeAnimatePresence: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
  const motion = {
    div: (props: any) => <div {...props} />,
    button: (props: any) => <button {...props} />,
    span: (props: any) => <span {...props} />,
  };
  return { AnimatePresence: FakeAnimatePresence, motion };
});

describe('HeatMaps Component', () => {

  test('renders header, heading, and generate button', () => {
    render(
      <MemoryRouter>
        <HeatMaps />
      </MemoryRouter>
    );

    // 1) Check the unique data-testid for the NeoMyst nav button
    const navButton = screen.getByTestId('neoMystNavButton');
    expect(navButton).toBeInTheDocument();
    expect(navButton).toHaveTextContent('NeoMyst');

    // 2) Check the heading "HeatMaps" by data-testid
    const heading = screen.getByTestId('heatMapsHeading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('HeatMaps');

    // 3) Check the generate button
    const generateButton = screen.getByTestId('generateHeatmapButton');
    expect(generateButton).toBeInTheDocument();
    expect(generateButton).toHaveTextContent('Generate Heatmap');
  });

  test('generate heatmap button works (changes text on click)', async () => {
    render(
      <MemoryRouter>
        <HeatMaps />
      </MemoryRouter>
    );
    const generateButton = screen.getByTestId('generateHeatmapButton');
    expect(generateButton).toHaveTextContent('Generate Heatmap');

    fireEvent.click(generateButton);

    // Wait until the button text updates
    await waitFor(() => {
      expect(generateButton).toHaveTextContent('Heatmap Generated!');
    });
  });

  test('opens and closes full-screen modal when heatmap image is clicked', async () => {
    render(
      <MemoryRouter>
        <HeatMaps />
      </MemoryRouter>
    );

    // 1. Generate heatmap so the image appears
    const generateButton = screen.getByTestId('generateHeatmapButton');
    fireEvent.click(generateButton);

    // 2. Wait for text to change
    await waitFor(() => {
      expect(generateButton).toHaveTextContent('Heatmap Generated!');
    });

    // 3. Once generated, the heatmapImage testid is rendered
    const heatmapImg = await screen.findByTestId('heatmapImage');
    expect(heatmapImg).toBeInTheDocument();

    // 4. Click the container to open modal
    const heatmapContainer = screen.getByTestId('heatmapContainer');
    fireEvent.click(heatmapContainer);

    // 5. Wait for the close button in the modal
    const closeButton = await screen.findByTestId('closeModalButton');
    expect(closeButton).toBeInTheDocument();

    // 6. Click the close button
    fireEvent.click(closeButton);

    // 7. Wait for the modal backdrop to be removed
    await waitFor(() => {
      // If the modal is closed, we no longer find the backdrop
      expect(screen.queryByTestId('modalBackdrop')).not.toBeInTheDocument();
    });
  });

  test('dropdown interaction works correctly', async () => {
    render(
      <MemoryRouter>
        <HeatMaps />
      </MemoryRouter>
    );
    // Before generating the heatmap, let's just test the dropdown behavior
    // 1) The placeholder text "Column 1" is visible
    const placeholder1 = screen.getByText('Column 1');
    fireEvent.click(placeholder1);

    // 2) Select "Hours Played"
    const hoursPlayedOption = screen.getByText('Hours Played');
    fireEvent.click(hoursPlayedOption);

    // 3) Verify the first dropdown now shows "Hours Played"
    expect(screen.getByText('Hours Played')).toBeInTheDocument();
  });

  test('check button validation works with a correct pair', async () => {
    render(
      <MemoryRouter>
        <HeatMaps />
      </MemoryRouter>
    );

    // 1) Select Column 1 => "Hours Played"
    fireEvent.click(screen.getByText('Column 1'));
    fireEvent.click(screen.getByText('Hours Played'));

    // 2) Select Column 2 => "Money Spent ($)"
    fireEvent.click(screen.getByText('Column 2'));
    fireEvent.click(screen.getByText('Money Spent ($)'));

    // 3) Click the "Check!" button
    const checkButton = screen.getByTestId('checkButton');
    fireEvent.click(checkButton);

    // We expect an 'Excellent!' feedback for the correct pair
    const feedback = await screen.findByTestId('checkFeedback');
    expect(feedback).toBeInTheDocument();
    expect(feedback).toHaveTextContent('Excellent!');
  });
});
