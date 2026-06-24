import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Ethereal Technologies heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Ethereal Technologies/i);
  expect(headingElement).toBeDefined();
});
