import React from 'react';
import Card from './Card';

export default function CardList({ places }) {
  return (
    <div className='card-list-container'>
      {places.map((place) => {
        return (
          <Card
            key={place.id}
            image={place.image_url}
            title={place.name}
            rating={place.rating}
            review_count={place.review_count}
            price={place.price}
            phone={place.display_phone}
            address={place.location.display_address}
          />
        );
      })}
    </div>
  );
}
