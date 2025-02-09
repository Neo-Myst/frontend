// RightPanel.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import RightPanel from './RightPanel';

// Dummy quiz data to be returned by our fetch mock.
const dummyQuiz = [
  {
    id: 1,
    chapter_id: 1,
    question: 'What is test question?',
    option_a: 'Option A',
    option_b: 'Option B',
    option_c: 'Option C',
    correct_option: 'A',
    hint_a: 'Hint A',
    hint_b: 'Hint B',
    hint_c: 'Hint C',
  },
];

describe('RightPanel Component', () => {
  beforeEach(() => {
    // Mock the fetch call to return dummy quiz data.
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => dummyQuiz,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders and displays the quiz question', async () => {
    render(<RightPanel />);
    
    // Initially, the component should show a loading state.
    expect(screen.getByText(/Loading quiz/i)).toBeInTheDocument();
    
    // Wait for the quiz question to appear.
    await waitFor(() => {
      expect(screen.getByText(dummyQuiz[0].question)).toBeInTheDocument();
    });
  });

  it('renders all quiz option buttons', async () => {
    render(<RightPanel />);
    
    // Wait for the quiz data to load.
    await waitFor(() => {
      expect(screen.getByText(dummyQuiz[0].question)).toBeInTheDocument();
    });

    // Verify that all three option buttons are rendered.
    expect(screen.getByRole('button', { name: dummyQuiz[0].option_a })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: dummyQuiz[0].option_b })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: dummyQuiz[0].option_c })).toBeInTheDocument();
  });

  it('renders the "Check your knowledge" button', async () => {
    render(<RightPanel />);
    
    // Wait for the quiz data to load.
    await waitFor(() => {
      expect(screen.getByText(dummyQuiz[0].question)).toBeInTheDocument();
    });

    // Check that the "Check your knowledge" button is rendered.
    expect(screen.getByRole('button', { name: /Check your knowledge/i })).toBeInTheDocument();
  });
});
