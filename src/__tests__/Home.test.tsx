import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from '../pages/Home';

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </HelmetProvider>
);

describe('Home Page', () => {
  it('renders the hero section', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    // Check if main heading is present
    expect(screen.getByText(/Welcome to the party/i)).toBeInTheDocument();
  });

  it('displays the main call-to-action text', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    // Check for main description
    expect(screen.getByText(/Connect with talented ladies at Mary Stuart Hall/i)).toBeInTheDocument();
  });

  it('shows trust indicators section', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    // Check for trust section
    expect(screen.getByText(/Trusted by Makerere Students/i)).toBeInTheDocument();
  });
});
