import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import RestaurantSearchBarTermParam from 'shared/RestaurantSearchBarTermParam/RestaurantSearchBarTermParam';
import RestaurantSearchBarLocationParam from 'shared/RestaurantSearchBarLocationParam/RestaurantSearchBarLocationParam';

import styles from './RestaurantSearchBar.module.scss';

export default function RestaurantSearchBar() {
  const [termSearchParam, setTermSearchParam] = useState('');
  const [locationSearchParam, setLocationSearchParam] = useState('');
  const [errors, setErrors] = useState({
    term: '',
    location: '',
  });
  const history = useHistory();

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!termSearchParam) {
      setErrors((prevState) => {
        return { ...prevState, term: 'Please provide a term' };
      });
    } else {
      setErrors((prevState) => {
        return { ...prevState, term: '' };
      });
    }

    if (!locationSearchParam) {
      setErrors((prevState) => {
        return { ...prevState, location: 'Please provide a location' };
      });
    } else {
      setErrors((prevState) => {
        return { ...prevState, location: '' };
      });
    }

    if (termSearchParam && locationSearchParam) {
      // do not persist the term param on searches
      setTermSearchParam('');

      // set the location param local storage in order to persist
      localStorage.setItem(
        'locationParam',
        JSON.stringify(locationSearchParam)
      );

      history.push(`/search/${termSearchParam}/${locationSearchParam}`);
    }
  }

  return (
    <div className={styles['search-bar-container']}>
      <form
        className={styles['search-bar-form']}
        aria-label='form'
        onSubmit={onFormSubmit}
      >
        <RestaurantSearchBarTermParam
          termSearchParam={termSearchParam}
          setTermSearchParam={setTermSearchParam}
          errorTermParam={errors.term}
        />
        <RestaurantSearchBarLocationParam
          locationSearchParam={locationSearchParam}
          setLocationSearchParam={setLocationSearchParam}
          errorLocationParam={errors.location}
        />
        <button className={styles['search-bar-search-button']} type='submit'>
          <i className={'fas fa-search'}></i>
        </button>
      </form>
    </div>
  );
}
