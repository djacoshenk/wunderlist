import React from 'react';
import PropTypes from 'prop-types';
import { block } from 'bem-cn';

import RestaurantProfileStars from '../RestaurantProfileStars/RestaurantProfileStars';

import './RestaurantProfileCardReviews.scss';

RestaurantProfileCardReviews.propTypes = {
  reviews: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
    rating: PropTypes.number,
    text: PropTypes.string,
  }),
};

const b = block('RestaurantProfilePage');

export default function RestaurantProfileCardReviews({ reviews }) {
  return reviews.map((review, index) => {
    return (
      <div className={b('restaurant-prof-reviews-card')} key={index}>
        <div className={b('restaurant-reviews-image-name')}>
          <p>{review.user.name}</p>
        </div>
        <div className={b('restaurant-reviews-rating')}>
          <RestaurantProfileStars rating={review.rating} />
        </div>
        <div className={b('restaurant-reviews-text')}>{review.text}</div>
      </div>
    );
  });
}
