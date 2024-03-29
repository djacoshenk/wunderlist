import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import burger from 'assets/burger.png';
import chili from 'assets/chili.png';
import pizza from 'assets/pizza-slice.png';
import rice from 'assets/rice-bowl.png';
import sushi from 'assets/sushi.png';
import taco from 'assets/taco.png';
import styles from 'pages/HomePage/RestaurantTypeCards/RestaurantTypeCards.module.scss';
import { setLocationUrl } from 'reducers/locationUrlReducer';
import { RootState } from 'store/store';

export default function RestaurantTypeCards() {
  const { locationUrl } = useSelector((state: RootState) => state.location);
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const restaurantTypes = [
    {
      name: 'Burgers',
      icon: burger,
      alt: 'black-white-cheeseburger',
    },
    {
      name: 'Japanese',
      icon: sushi,
      alt: 'black-white-sushi-roll',
    },
    {
      name: 'Italian',
      icon: pizza,
      alt: 'black-white-pizza-slice',
    },
    {
      name: 'Chinese',
      icon: rice,
      alt: 'black-white-rice-bowl',
    },
    {
      name: 'Mexican',
      icon: taco,
      alt: 'black-white-taco',
    },
    {
      name: 'Thai',
      icon: chili,
      alt: 'black-white-chili-pepper',
    },
  ];

  useEffect(() => {
    const persistedLocationParam = localStorage.getItem('locationParam');

    // persist the location param on renders
    if (persistedLocationParam) {
      dispatch(setLocationUrl(JSON.parse(persistedLocationParam)));
    }
  }, [dispatch]);

  function handleOnClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (locationUrl) {
      setError('');

      // set the location url local storage in order to persist
      localStorage.setItem('locationParam', JSON.stringify(locationUrl));
    } else {
      e.preventDefault();

      setError('Please first provide a location');
    }
  }

  return (
    <div className={styles['restaurant-type-cards-main-container']}>
      <div className={styles['restaurant-type-cards-grid-container']}>
        {restaurantTypes.map((type) => {
          return (
            <Link
              to={{
                pathname: `/search/${type.name}/${locationUrl}`,
              }}
              className={styles['restaurant-type-card-link']}
              key={uuidv4()}
              onClick={handleOnClick}
            >
              <div className={styles['restaurant-type-card']}>
                <img src={type.icon} alt={type.alt} />
                <p>{type.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className={styles['restaurant-type-cards-error-container']}>
        {error && (
          <p aria-label={error} role='alert'>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
