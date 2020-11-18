import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import RestaurantRatingStars from './RestaurantRatingStars';

test('the component renders', () => {
  const mockRating = 3.5;
  render(<RestaurantRatingStars rating={mockRating} />);
});
