import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

CardList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object),
  searchParams: PropTypes.objectOf(PropTypes.string),
  hover: PropTypes.func,
  fetchMorePlaces: PropTypes.func,
};

export default function CardList({
  places,
  searchParams,
  hover,
  fetchMorePlaces,
}) {
  const obs = new IntersectionObserver(
    (entries) => {
      const first = entries[0];

      if (first.isIntersecting) {
        fetchMorePlaces(searchParams);
      }
    },
    { threshold: 0 }
  );
  const observer = useRef(obs);
  const [loadRef, setLoadRef] = useState(null);

  useEffect(() => {
    const currentElement = loadRef;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [loadRef]);

  return (
    <div className='card-list-container'>
      {places.map((place, index) => {
        return (
          <Card
            key={place.id}
            hover={hover}
            id={place.id}
            image={place.image_url}
            rank={index + 1}
            title={place.name}
            rating={place.rating}
            review_count={place.review_count}
            price={place.price}
            tags={place.categories}
            phone={place.display_phone}
            address={place.location.display_address}
          />
        );
      })}
      <div ref={setLoadRef} className='card-list-loader'>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
      </div>
    </div>
  );
}
