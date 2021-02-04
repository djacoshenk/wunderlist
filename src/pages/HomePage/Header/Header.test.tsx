import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import Header from './Header';

test('component is accessible', async () => {
  const { container } = render(<Header />);
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

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
