import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import Header from './Header';

test('component renders image and headings', () => {
  render(<Header />);

  expect(screen.getByRole('img', { name: /globe/i })).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /wunderlist/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /favorite/i })
  ).toBeInTheDocument();
});

test('component is accessible', async () => {
  const { container } = render(<Header />);

  expect(await axe(container)).toHaveNoViolations();
});
