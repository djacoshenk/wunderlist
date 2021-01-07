import React, { Fragment } from 'react';

import './RestaurantRatingStars.scss';

interface IProps {
  rating: number;
}

export default function RestaurantRatingStars({ rating }: IProps): JSX.Element {
  const STARS = [0, 1, 2, 3, 4];

  const totalRating = STARS.map((n) => {
    let starRating = 'far fa-star';

    if (rating - n === 0.5) {
      starRating = 'fas fa-star-half-alt';
    } else if (rating > n) {
      starRating = 'fas fa-star';
    }

    return <i className={starRating} aria-hidden='true' key={n}></i>;
  });

  return <Fragment>{totalRating}</Fragment>;
}
