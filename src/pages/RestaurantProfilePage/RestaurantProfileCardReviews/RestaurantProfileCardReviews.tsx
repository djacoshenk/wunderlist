import { Fragment } from 'react';

import styles from 'pages/RestaurantProfilePage/RestaurantProfileCardReviews/RestaurantProfileCardReviews.module.scss';
import RestaurantRatingStars from 'shared/RestaurantRatingStars/RestaurantRatingStars';

type Props = {
  reviews: {
    reviews: Review[];
  };
};

type Review = {
  user: {
    name: string;
  };
  rating: number;
  text: string;
};

export default function RestaurantProfileCardReviews({ reviews }: Props) {
  return (
    <Fragment>
      {reviews.reviews.map((review, index) => {
        return (
          <div className={styles['restaurant-prof-reviews-card']} key={index}>
            <div className={styles['restaurant-reviews-name']}>
              <p>{review.user.name}</p>
            </div>
            <div className={styles['restaurant-reviews-rating']}>
              <RestaurantRatingStars rating={review.rating} />
            </div>
            <div className={styles['restaurant-reviews-text']}>
              {review.text}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}
