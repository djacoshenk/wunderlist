import React, { Fragment } from 'react';

export default function Stars({ rating }) {
  const stars = Math.floor(rating);

  const starsContainer = [];

  for (let i = 0; i < stars; i++) {
    const filledStar = React.createElement('i', {
      className: 'fas fa-star',
    });

    starsContainer.push(filledStar);
  }

  for (let i = 0; i < 5 - stars; i++) {
    const emptyStar = React.createElement('i', {
      className: 'far fa-star',
    });

    starsContainer.push(emptyStar);
  }

  return <Fragment>{starsContainer}</Fragment>;
}
