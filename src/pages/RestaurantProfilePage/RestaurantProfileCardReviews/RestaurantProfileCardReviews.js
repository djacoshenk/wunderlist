import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import RestaurantProfileStars from 'shared/RestaurantRatingStars/RestaurantRatingStars';
import { RestaurantProfileContext } from '../_Context/RestaurantProfileContext';

import styles from './RestaurantProfileCardReviews.module.scss';

RestaurantProfileCardReviews.propTypes = {
  reviews: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
    rating: PropTypes.number,
    text: PropTypes.string,
  }),
};

function RestaurantProfileCardReviews() {
  const {
    state: { reviews },
  } = useContext(RestaurantProfileContext);

  return reviews.reviews.map((review, index) => {
    return (
      <div className={styles['restaurant-prof-reviews-card']} key={index}>
        <div className={styles['restaurant-reviews-image-name']}>
          <p>{review.user.name}</p>
        </div>
        <div className={styles['restaurant-reviews-rating']}>
          <RestaurantProfileStars rating={review.rating} />
        </div>
        <div className={styles['restaurant-reviews-text']}>{review.text}</div>
      </div>
    );
  });
}

export default RestaurantProfileCardReviews;
