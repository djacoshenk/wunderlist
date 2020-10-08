import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import block from 'bem-cn';

import { RestaurantSearchContext } from '../_Context/RestaurantSearchContext';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import RestaurantSearchLoaderBubbles from '../RestaurantSearchLoaderBubbles/RestaurantSearchLoaderBubbles';

import './RestaurantCardList.scss';

const b = block('RestaurantSearchPage');

export default function RestaurantCardList() {
  const { state, fetchMorePlaces } = useContext(RestaurantSearchContext);
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
    <div className={b('card-list-container')}>
      {state.places.map((place, index) => {
        return <RestaurantCard key={place.id} place={place} index={index} />;
      })}
      <div ref={setLoadRef} className={b('card-list-bubble-loader')}>
        <RestaurantSearchLoaderBubbles />
      </div>
    </div>
  );
}
