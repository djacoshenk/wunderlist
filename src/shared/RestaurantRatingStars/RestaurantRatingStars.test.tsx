import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import RestaurantRatingStars from './RestaurantRatingStars';

test('component renders with props', () => {
  const fakeProps = {
    rating: 3.5,
  };

  render(<RestaurantRatingStars rating={fakeProps.rating} />);

  // five stars should be rendered
  expect(screen.getAllByTestId('restaurant-rating-star')).toHaveLength(5);
});

test('component is accessible', async () => {
  const fakeProps = {
    rating: 3.5,
  };

  const { container } = render(
    <RestaurantRatingStars rating={fakeProps.rating} />
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
