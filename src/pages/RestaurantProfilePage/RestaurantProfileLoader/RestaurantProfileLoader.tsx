import { useLocation } from 'react-router-dom';

import RestaurantLoaderBubbles from 'shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './RestaurantProfileLoader.module.scss';

type Props = {
  name: string;
};

type LocationState = {
  place: string;
};

export default function RestaurantProfileLoader({ name }: Props) {
  const location = useLocation<LocationState>();

  let headerText: JSX.Element | null;

  if (location.state) {
    headerText = (
      <h3>Finding you more on {location.state.place.toUpperCase()}</h3>
    );
  } else if (name) {
    headerText = <h3>Finding you more on {name.toUpperCase()}</h3>;
  } else {
    headerText = null;
  }

  return (
    <div className={styles['restaurant-prof-loader']}>
      {headerText}
      <RestaurantLoaderBubbles />
    </div>
  );
}
