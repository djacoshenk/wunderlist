import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setLocationUrl } from 'reducers/locationUrlReducer';
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
  const dispatch = useDispatch();
  const history = useHistory();

  function onFormSubmit(e) {
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
      dispatch(setLocationUrl(''));
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
          error={errors.term}
        />
        <RestaurantSearchBarLocationParam
          locationSearchParam={locationSearchParam}
          setLocationSearchParam={setLocationSearchParam}
          error={errors.location}
        />
        <button className={styles['search-bar-search-button']} type='submit'>
          <i className={'fas fa-search'}></i>
        </button>
      </form>
    </div>
  );
}
