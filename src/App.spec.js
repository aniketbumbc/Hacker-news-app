import React from 'react';
import App from './App';
import { render, waitFor } from '@testing-library/react';

describe('App Component', () => {
  test('should render application correctly', async () => {
    const { getByText } = render(<App />);

    await waitFor(() => [expect(getByText('Hacker News')).toBeTruthy()]);
  });
});
