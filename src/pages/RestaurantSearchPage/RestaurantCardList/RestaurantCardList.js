import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import RestaurantCard from '../RestaurantCard/RestaurantCard';
import RestaurantSearchLoaderBubbles from '../RestaurantSearchLoaderBubbles/RestaurantSearchLoaderBubbles';

import './RestaurantCardList.scss';

RestaurantCardList.propTypes = {
  places: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  params: PropTypes.objectOf(PropTypes.string),
  fetchMorePlaces: PropTypes.func,
};

const b = block('RestaurantSearchPage');

export default function RestaurantCardList({
  places,
  params,
  fetchMorePlaces,
}) {
  const obs = new IntersectionObserver(
    (entries) => {
      const first = entries[0];

      if (first.isIntersecting) {
        fetchMorePlaces(params);
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
    <div className={b('card-list-container')}>
      {places.map((place, index) => {
        return (
          <RestaurantCard
            key={place.id}
            alias={place.alias}
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
      <div ref={setLoadRef} className={b('card-list-bubble-loader')}>
        <RestaurantSearchLoaderBubbles />
      </div>
    </div>
  );
}
