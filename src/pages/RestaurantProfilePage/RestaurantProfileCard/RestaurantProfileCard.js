import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import Header from '../Header/Header';
import RestaurantProfileStars from '../RestaurantProfileStars/RestaurantProfileStars';
import GoogleMap from '../GoogleMap/GoogleMap';
import RestaurantProfileCardReviews from '../RestaurantProfileCardReviews/RestaurantProfileCardReviews';

import './RestaurantProfileCard.scss';

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
  reviews: PropTypes.array,
};

const b = block('RestaurantProfilePage');

export default function RestaurantProfileCard({ place, reviews }) {
  const addressArray = place.location.display_address;
  const addressString = addressArray.join(' ').split(' ').join('+');

  return (
    <Fragment>
      <Header />
      <div className={b('restaurant-prof-card')}>
        <div className={b('restaurant-prof-images')}>
          {place.photos.map((photo, index) => {
            return <img src={photo} alt='restaurant' key={index} />;
          })}
        </div>
        <div className={b('restaurant-prof-main')}>
          <div className={b('restaurant-prof-title')}>
            <h3>{place.name}</h3>
          </div>
          <div className={b('restaurant-prof-stars-reviews')}>
            <RestaurantProfileStars rating={place.rating} />
            <p>{place.review_count} Reviews</p>
          </div>
          <div className={b('restaurant-prof-price-category')}>
            <p>
              {place.price != null ? `${place.price} \u2022` : null}{' '}
              {place.categories[0].title}
            </p>
          </div>
          {place.display_phone !== '' ? (
            <div className={b('restaurant-prof-phone')}>
              <p>{place.display_phone}</p>
            </div>
          ) : null}
          <div className={b('restaurant-prof-address')}>
            {place.location.display_address.map((adrs, index) => {
              return <p key={index}>{adrs}</p>;
            })}
          </div>
        </div>
        <div className={b('restaurant-prof-map-reviews')}>
          <div className={b('restaurant-prof-map-directions')}>
            <GoogleMap place={place} />
            <div className={b('restaurant-prof-directions-btn')}>
              <Link
                to={{
                  pathname: `https://www.google.com/maps/place/${addressString}`,
                }}
                target='_blank'
              >
                <button>Get Directions</button>
              </Link>
            </div>
          </div>
          <div className={b('restaurant-prof-reviews-container')}>
            <RestaurantProfileCardReviews reviews={reviews} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
