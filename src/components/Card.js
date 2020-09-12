import React from 'react';
import Stars from './Stars';

export default function Card({
  image,
  rank,
  title,
  rating,
  review_count,
  price,
  phone,
  address,
  tags,
}) {
  return (
    <div className='card-container'>
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
            <Stars rating={rating} />
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
