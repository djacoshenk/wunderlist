import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import RestaurantRatingStars from 'shared/RestaurantRatingStars/RestaurantRatingStars';

import styles from './RestaurantCard.module.scss';
import { setMapId } from 'reducers/mapIdReducer';

RestaurantCard.propTypes = {
  place: PropTypes.shape({
    alias: PropTypes.string,
    image_url: PropTypes.string,
    name: PropTypes.string,
    rating: PropTypes.number,
    review_count: PropTypes.number,
    price: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    display_phone: PropTypes.string,
    location: PropTypes.shape({
      display_address: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  index: PropTypes.number,
  setMapId: PropTypes.func,
};

const mapDispatchToProps = {
  setMapId,
};

export function RestaurantCard({ place, index, setMapId }) {
  return (
    <Link
      to={{
        pathname: `/business/${place.alias}`,
        state: {
          place: place.name,
        },
      }}
      className={styles['card-container-link']}
      onMouseEnter={() => setMapId(index)}
      onMouseLeave={() => setMapId(0)}
      onClick={() => setMapId(0)}
    >
      <div className={styles['card-container']}>
        <div className={styles['image-container']}>
          <img src={place.image_url} alt='' />
        </div>
        <div className={styles['content-container']}>
          <div className={styles['title-row']}>
            <h3>
              {index}. {place.name}
            </h3>
          </div>
          <div className={styles['ratings-row']}>
            <div className={styles['stars-container']}>
              <RestaurantRatingStars rating={place.rating} />
            </div>
            <p>{place.review_count}</p>
          </div>
          <div className={styles['price-category-row']}>
            <p>
              {place.price && `${place.price} \u2022`}
              {place.categories[0].title}
            </p>
          </div>
          {place.display_phone && (
            <div className={styles['phone-number-row']}>
              <p>{place.display_phone}</p>
            </div>
          )}
          <div className={styles['address-row']}>
            {place.location.display_address.map((adrs, index) => {
              return <p key={index}>{adrs}</p>;
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default connect(null, mapDispatchToProps)(RestaurantCard);
