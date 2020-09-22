import React from 'react';
import PropTypes from 'prop-types';

import RestaurantCardStars from '../RestaurantCardStars/RestaurantCardStars';

import './RestaurantCard.scss';

RestaurantCard.propTypes = {
  handleHover: PropTypes.func,
  id: PropTypes.string,
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

export default function RestaurantCard({
  handleHover,
  id,
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
  function hover(e) {
    const { id } = e.target;

    handleHover(e, id);
  }

  return (
    <div
      className='card-container'
      id={id}
      onMouseEnter={hover}
      onMouseLeave={hover}
    >
      <div className='image-container'>
        <img src={image} alt='' />
      </div>
      <div className='content-container'>
        <div className='title-row'>
          <h3>
            {rank}. {title}
          </h3>
        </div>
        <div className='ratings-row'>
          <div className='stars-container'>
            <RestaurantCardStars rating={rating} />
          </div>
          <p>{review_count}</p>
        </div>
        <div className='price-category-row'>
          <p>
            {price != null ? `${price} \u2022` : null} {tags[0].title}
          </p>
        </div>
        <div className='address-row'>
          <p>{phone}</p>
          <p>{address[0]}</p>
          <p>{address[1]}</p>
        </div>
      </div>
    </div>
  );
}
