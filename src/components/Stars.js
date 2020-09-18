import React from 'react';
import PropTypes from 'prop-types';

Stars.propTypes = {
  rating: PropTypes.number,
};

export default function Stars({ rating }) {
  const STARS = [0, 1, 2, 3, 4];

  const totalRating = STARS.map((n) => {
    let starRating = 'far fa-star';

    if (rating - n === 0.5) {
      starRating = 'fas fa-star-half-alt';
    } else if (rating > n) {
      starRating = 'fas fa-star';
    }

    return <i className={starRating} key={n}></i>;
  });

  return totalRating;
}
