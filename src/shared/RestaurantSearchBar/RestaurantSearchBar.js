import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import RestaurantSearchBarTermParam from 'shared/RestaurantSearchBarTermParam/RestaurantSearchBarTermParam';
import RestaurantSearchBarLocationParam from 'shared/RestaurantSearchBarLocationParam/RestaurantSearchBarLocationParam';
import { RestaurantSearchBarContext } from './RestaurantSearchBarContext';

import styles from './RestaurantSearchBar.module.scss';

let searchId;

function RestaurantSearchBar() {
  const [termSearchParam, setTermSearchParam] = useState('');
  const [locationSearchParam, setLocationSearchParam] = useState('');

  const {
    state: { currentLocation },
    fetchTermSuggestions,
    fetchLocationSuggestions,
  } = useContext(RestaurantSearchBarContext);
  const history = useHistory();

  function handleTermSearchParamChange(value) {
    setTermSearchParam(value);

    clearTimeout(searchId);

    searchId = setTimeout(() => {
      fetchTermSuggestions(value);
    }, 1000);
  }

  function handleLocationSearchParamChange(value) {
    setLocationSearchParam(value);

    clearTimeout(searchId);

    searchId = setTimeout(() => {
      fetchLocationSuggestions(value);
    }, 1000);
  }

  function onFormSubmit(e) {
    e.preventDefault();

    if (termSearchParam && locationSearchParam) {
      history.push(`/search/${termSearchParam}/${locationSearchParam}`);
    }
  }

  useEffect(() => {
    if (currentLocation) {
      setLocationSearchParam(currentLocation);
    }
  }, [currentLocation]);

  return (
    <div className={styles['search-bar-container']}>
      <form
        className={styles['search-bar-form']}
        aria-label='form'
        onSubmit={onFormSubmit}
      >
        <RestaurantSearchBarTermParam
          termSearchParam={termSearchParam}
          onInputChange={handleTermSearchParamChange}
        />
        <RestaurantSearchBarLocationParam
          locationSearchParam={locationSearchParam}
          onInputChange={handleLocationSearchParamChange}
        />
        <button className={styles['search-bar-search-button']} type='submit'>
          <i className={'fas fa-search'}></i>
        </button>
      </form>
    </div>
  );
}

export default React.memo(RestaurantSearchBar);
