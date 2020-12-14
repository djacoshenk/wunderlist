import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import UserLogoutLoader from './UserLogoutLoader';

test('the component displays the heading', () => {
  render(<UserLogoutLoader />);

  expect(
    screen.getByRole('heading', { name: /logging out/i })
  ).toBeInTheDocument();
});
