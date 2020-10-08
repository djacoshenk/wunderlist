import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import block from 'bem-cn';

import RestaurantCardStars from '../RestaurantCardStars/RestaurantCardStars';

import './RestaurantCard.scss';

RestaurantCard.propTypes = {
  place: PropTypes.shape({
    alias: PropTypes.string,
    image: PropTypes.string,
    rank: PropTypes.number,
    title: PropTypes.string,
    rating: PropTypes.number,
    review_count: PropTypes.number,
    price: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    phone: PropTypes.string,
    address: PropTypes.arrayOf(PropTypes.string),
  }),
  index: PropTypes.number,
};

const b = block('RestaurantSearchPage');

export default function RestaurantCard({ place, index }) {
  return (
    <Link
      to={{
        pathname: `/business/${place.alias}`,
      }}
      className={b('card-container-link')}
    >
      <div className={b('card-container')}>
        <div className={b('image-container')}>
          <img src={place.image_url} alt='' />
        </div>
        <div className={b('content-container')}>
          <div className={b('title-row')}>
            <h3>
              {index + 1}. {place.name}
            </h3>
          </div>
          <div className={b('ratings-row')}>
            <div className={b('stars-container')}>
              <RestaurantCardStars rating={place.rating} />
            </div>
            <p>{place.review_count}</p>
          </div>
          <div className={b('price-category-row')}>
            <p>
              {place.price != null ? `${place.price} \u2022` : null}{' '}
              {place.categories[0].title}
            </p>
          </div>
          {place.phone !== '' ? (
            <div className={b('phone-number-row')}>
              <p>{place.display_phone}</p>
            </div>
          ) : null}
          <div className={b('address-row')}>
            {place.location.display_address.map((adrs, index) => {
              return <p key={index}>{adrs}</p>;
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
