import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home page', () => {
  it('renders heading', () => {
    render(<Home />);
    const heading = screen.getByText(/AI Support Dashboard/i);
    expect(heading).toBeInTheDocument();
  });
});