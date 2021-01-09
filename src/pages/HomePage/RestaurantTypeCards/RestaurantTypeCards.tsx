import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { setLocationUrl } from 'reducers/locationUrlReducer';
import { RootState } from 'store/index';

import burger from 'assets/burger.png';
import sushi from 'assets/sushi.png';
import rice from 'assets/rice-bowl.png';
import taco from 'assets/taco.png';
import pizza from 'assets/pizza-slice.png';
import chili from 'assets/chili.png';

import styles from './RestaurantTypeCards.module.scss';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function RestaurantTypeCards(): JSX.Element {
  const { locationUrl } = useTypedSelector((state) => state.location);
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
    const persistedLocationParam = JSON.parse(
      localStorage.getItem('locationParam')
    );

    // persist the location param on renders
    if (persistedLocationParam) {
      dispatch(setLocationUrl(persistedLocationParam));
    }
  }, [dispatch]);

  return (
    <div className={styles['restaurant-type-cards-main-container']}>
      <div className={styles['restaurant-type-cards-grid-container']}>
        {restaurantTypes.map((type) => {
          if (locationUrl) {
            return (
              <Link
                to={{
                  pathname: `/search/${type.name}/${locationUrl}`,
                }}
                className={styles['restaurant-type-card-link']}
                key={uuidv4()}
                onClick={() => {
                  setError('');
                }}
              >
                <div className={styles['restaurant-type-card']}>
                  <img src={type.icon} alt={type.alt} />
                  <p>{type.name}</p>
                </div>
              </Link>
            );
          } else {
            return (
              <Link
                to={{
                  pathname: `/search/${type.name.toLowerCase()}/${locationUrl}`,
                }}
                className={styles['restaurant-type-card-link']}
                key={uuidv4()}
                onClick={(
                  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                ) => {
                  e.preventDefault();

                  setError('Please first provide a location');
                }}
              >
                <div className={styles['restaurant-type-card']}>
                  <img src={type.icon} alt={type.alt} />
                  <p>{type.name}</p>
                </div>
              </Link>
            );
          }
        })}
      </div>
      <div className={styles['restaurant-type-cards-error-container']}>
        <p>{error}</p>
      </div>
    </div>
  );
}
