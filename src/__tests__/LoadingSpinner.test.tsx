import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../components/LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    render(<LoadingSpinner text="Please wait..." />);
    
    expect(screen.getByText(/Please wait.../i)).toBeInTheDocument();
  });

  it('renders in fullscreen mode', () => {
    const { container } = render(<LoadingSpinner fullScreen />);
    
    const fullScreenDiv = container.querySelector('.fixed.inset-0');
    expect(fullScreenDiv).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />);
    expect(document.querySelector('.h-4.w-4')).toBeInTheDocument();

    rerender(<LoadingSpinner size="lg" />);
    expect(document.querySelector('.h-12.w-12')).toBeInTheDocument();
  });
});
