import { Fragment } from 'react';

import 'shared/RestaurantRatingStars/RestaurantRatingStars.scss';

type Props = {
  rating: number;
};

export default function RestaurantRatingStars({ rating }: Props) {
  const STARS = [0, 1, 2, 3, 4];

  const totalRating = STARS.map((n) => {
    let starRating = 'far fa-star';

    if (rating - n === 0.5) {
      starRating = 'fas fa-star-half-alt';
    } else if (rating > n) {
      starRating = 'fas fa-star';
    }

    return (
      <i
        aria-hidden='true'
        className={starRating}
        data-testid='restaurant-rating-star'
        key={n}
      ></i>
    );
  });

  return <Fragment>{totalRating}</Fragment>;
}
