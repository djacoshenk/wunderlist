import React, { Fragment } from 'react';

export default function Stars({ rating }) {
  const filledStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - filledStars);
  const emptyStars = 5 - filledStars - halfStars;

  const starsContainer = [];

  for (let i = 0; i < filledStars; i++) {
    const fullStar = React.createElement('i', {
      className: 'fas fa-star',
    });

    starsContainer.push(fullStar);
  }

  if (halfStars > 0) {
    const halfStar = React.createElement('i', {
      className: 'fas fa-star-half-alt',
    });

    starsContainer.push(halfStar);
  }

  for (let i = 0; i < emptyStars; i++) {
    const emptyStar = React.createElement('i', {
      className: 'far fa-star',
    });

    starsContainer.push(emptyStar);
  }

  return <Fragment>{starsContainer}</Fragment>;
}
