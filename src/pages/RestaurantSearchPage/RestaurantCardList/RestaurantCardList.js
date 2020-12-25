import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import RestaurantCard from '../RestaurantCard/RestaurantCard';
import RestaurantLoaderBubbles from 'shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './RestaurantCardList.module.scss';

RestaurantCardList.propTypes = {
  places: PropTypes.array,
  fetchMorePlaces: PropTypes.func,
};

function RestaurantCardList({ places, fetchMorePlaces }) {
  const params = useParams();
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
    <div className={styles['card-list-container']}>
      {places.map((place, index) => {
        return <RestaurantCard key={place.id} place={place} index={index} />;
      })}
      <div ref={setLoadRef} className={styles['card-list-bubble-loader']}>
        <RestaurantLoaderBubbles />
      </div>
    </div>
  );
}

export default RestaurantCardList;
