import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import RestaurantProfileImageCarousel from '../RestaurantProfileImageCarousel/RestaurantProfileImageCarousel';
import RestaurantRatingStars from 'shared/RestaurantRatingStars/RestaurantRatingStars';
import GoogleMap from '../GoogleMap/GoogleMap';
import RestaurantProfileCardReviews from '../RestaurantProfileCardReviews/RestaurantProfileCardReviews';

import styles from './RestaurantProfileCard.module.scss';

RestaurantProfileCard.propTypes = {
  place: PropTypes.shape({
    photos: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    rating: PropTypes.number,
    review_count: PropTypes.number,
    price: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
      })
    ),
    display_phone: PropTypes.string,
    location: PropTypes.shape({
      display_address: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

function RestaurantProfileCard({ place, reviews }) {
  function formatNameForUrl() {
    return place.name.split(' ').join('+');
  }

  function formatAddressForUrl() {
    return place.location.display_address.join(' ').split(' ').join('+');
  }

  return (
    <div className={styles['restaurant-prof-card']}>
      <div className={styles['restaurant-prof-images']}>
        <RestaurantProfileImageCarousel photos={place.photos} />
      </div>
      <div className={styles['restaurant-prof-main']}>
        <div className={styles['restaurant-prof-title']}>
          <h3>{place.name}</h3>
        </div>
        <div className={styles['restaurant-prof-stars-reviews']}>
          <RestaurantRatingStars rating={place.rating} />
          <p>{place.review_count} Reviews</p>
        </div>
        <div className={styles['restaurant-prof-price-category']}>
          <p>
            {place.price != null ? `${place.price} \u2022` : null}{' '}
            {place.categories
              .map((tag) => {
                return tag.title;
              })
              .join(', ')}
          </p>
        </div>
        {place.display_phone !== '' ? (
          <div className={styles['restaurant-prof-phone']}>
            <p>{place.display_phone}</p>
          </div>
        ) : null}
        <div className={styles['restaurant-prof-address']}>
          {place.location.display_address.map((adrs, index) => {
            return <p key={index}>{adrs}</p>;
          })}
        </div>
      </div>
      <div className={styles['restaurant-prof-map-reviews']}>
        <div className={styles['restaurant-prof-map-directions']}>
          <GoogleMap place={place} />
          <div className={styles['restaurant-prof-directions-btn']}>
            <Link
              to={{
                pathname: `https://www.google.com/maps/search/?api=1&query=${formatNameForUrl()}%2C+${formatAddressForUrl()}`,
              }}
              target='_blank'
            >
              <button>DIRECTIONS</button>
            </Link>
          </div>
        </div>
        <div className={styles['restaurant-prof-reviews-container']}>
          <RestaurantProfileCardReviews reviews={reviews} />
        </div>
      </div>
    </div>
  );
}

export default RestaurantProfileCard;
