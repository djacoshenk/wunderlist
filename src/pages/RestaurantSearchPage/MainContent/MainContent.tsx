import GoogleMap from '../GoogleMap/GoogleMap';
import RestaurantCardList from '../RestaurantCardList/RestaurantCardList';

import styles from './MainContent.module.scss';

type Props = {
  places: Place[];
  sortByParam: SortByParam;
  mapKey: number;
  fetchMorePlaces: (params: ParamsState, sortByParam: SortByParam) => void;
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

type Categories = {
  title: string;
};

type SortByParam = 'best_match' | 'rating' | 'review_count' | 'distance';

type ParamsState = {
  term: string;
  location: string;
};

export default function MainContent({
  places,
  sortByParam,
  mapKey,
  fetchMorePlaces,
}: Props) {
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
