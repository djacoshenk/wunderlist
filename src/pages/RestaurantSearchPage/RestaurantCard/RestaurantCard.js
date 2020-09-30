import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import block from 'bem-cn';

import RestaurantCardStars from '../RestaurantCardStars/RestaurantCardStars';

import './RestaurantCard.scss';

RestaurantCard.propTypes = {
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
};

const b = block('RestaurantSearchPage');

export default function RestaurantCard({
  alias,
  image,
  rank,
  title,
  rating,
  review_count,
  price,
  tags,
  phone,
  address,
}) {
  return (
    <div className={b('card-container')}>
      <div className={b('image-container')}>
        <img src={image} alt='' />
      </div>
      <div className={b('content-container')}>
        <div className={b('title-row')}>
          <h3>
            {rank}.{' '}
            <Link
              to={{ pathname: `/business/${alias}`, state: { title: title } }}
              className={b('card-title-link')}
            >
              {title}
            </Link>
          </h3>
        </div>
        <div className={b('ratings-row')}>
          <div className={b('stars-container')}>
            <RestaurantCardStars rating={rating} />
          </div>
          <p>{review_count}</p>
        </div>
        <div className={b('price-category-row')}>
          <p>
            {price != null ? `${price} \u2022` : null} {tags[0].title}
          </p>
        </div>
        <div className={b('phone-number-row')}>
          <p>{phone}</p>
        </div>
        <div className={b('address-row')}>
          {address.map((adrs, index) => {
            return <p key={index}>{adrs}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
