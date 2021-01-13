import React from 'react';

import GoogleMap from '../GoogleMap/GoogleMap';
import RestaurantCardList from '../RestaurantCardList/RestaurantCardList';

import styles from './MainContent.module.scss';

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

type Props = {
  places: Place[];
  sortByParam: string;
  mapKey: number;
  fetchMorePlaces: (params: ParamsState, sortByParam: string) => void;
};

export default function MainContent({
  places,
  sortByParam,
  mapKey,
  fetchMorePlaces,
}: Props): JSX.Element {
  return (
    <div className={styles['main-content-container']}>
      <GoogleMap places={places} mapKey={mapKey} />
      <RestaurantCardList
        places={places}
        sortByParam={sortByParam}
        fetchMorePlaces={fetchMorePlaces}
      />
    </div>
  );
}
