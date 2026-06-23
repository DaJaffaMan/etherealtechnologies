import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Jack Jefferies heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Jack Jefferies/i);
  expect(headingElement).toBeDefined();
});
