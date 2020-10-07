import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { RestaurantProfileContext } from '../_Context/RestaurantProfileContext';

import './RestaurantProfileStars.scss';

RestaurantProfileStars.propTypes = {
  rating: PropTypes.number,
};

export default function RestaurantProfileStars() {
  const {
    state: { place },
  } = useContext(RestaurantProfileContext);

  const STARS = [0, 1, 2, 3, 4];

  const totalRating = STARS.map((n) => {
    let starRating = 'far fa-star';

    if (place.rating - n === 0.5) {
      starRating = 'fas fa-star-half-alt';
    } else if (place.rating > n) {
      starRating = 'fas fa-star';
    }

    return <i className={starRating} key={n}></i>;
  });

  return totalRating;
}
