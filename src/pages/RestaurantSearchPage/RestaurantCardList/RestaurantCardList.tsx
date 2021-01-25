import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import RestaurantCard from '../RestaurantCard/RestaurantCard';
import RestaurantLoaderBubbles from 'shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './RestaurantCardList.module.scss';

type Categories = {
  title: string;
};

type Place = {
  id: string;
  alias: string;
  image_url: string;
  name: string;
  rating: number;
  review_count: number;
  price: string;
  categories: Categories[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  display_phone: string;
  location: {
    display_address: string[];
  };
};

type ParamsState = {
  term: string;
  location: string;
};

type SortByParam = 'best_match' | 'rating' | 'review_count' | 'distance';

type Props = {
  places: Place[];
  sortByParam: SortByParam;
  fetchMorePlaces: (params: ParamsState, sortByParam: SortByParam) => void;
};

export default function RestaurantCardList({
  places,
  sortByParam,
  fetchMorePlaces,
}: Props) {
  const params = useParams<ParamsState>();
  const obs = new IntersectionObserver(
    (entries) => {
      const first = entries[0];

      if (first.isIntersecting) {
        fetchMorePlaces(params, sortByParam);
      }
    },
    { threshold: 0 }
  );
  const observer = useRef(obs);
  const [loadRef, setLoadRef] = useState<Element | null>(null);

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
        return (
          <RestaurantCard key={place.id} place={place} index={index + 1} />
        );
      })}
      <div ref={setLoadRef} className={styles['card-list-bubble-loader']}>
        <RestaurantLoaderBubbles />
      </div>
    </div>
  );
}
