import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { RestaurantSearchBarContext } from './RestaurantSearchBarContext';

import styles from './RestaurantSearchBar.module.scss';

let searchId;
const defaultSearchParams = {
  term: '',
  location: '',
};

function RestaurantSearchBar() {
  const history = useHistory();
  const [searchParams, setSearchParams] = useState(defaultSearchParams);
  const {
    state: { termSuggestions, locationSuggestions },
    fetchTermSuggestions,
    fetchLocationSuggestions,
    clearSearchSuggestions,
  } = useContext(RestaurantSearchBarContext);

  function onInputChange(e) {
    const { name, value } = e.target;

    setSearchParams((prevState) => {
      return { ...prevState, [name]: value };
    });

    handleSearchDebounce(name, value);
  }

  function handleSearchDebounce(name, value) {
    clearSearchSuggestions(name);

    clearTimeout(searchId);

    searchId = setTimeout(() => {
      if (name === 'term') {
        fetchTermSuggestions(value);
      } else if (name === 'location') {
        fetchLocationSuggestions(value);
      }
    }, 1000);
  }

  function onFormSubmit(e) {
    e.preventDefault();

    let { term, location } = searchParams;

    if (term && location) {
      history.push(`/search/${term}/${location}`);
    }
  }

  return (
    <div className={styles['search-bar-container']}>
      <form
        className={styles['search-bar-form']}
        aria-label='form'
        onSubmit={onFormSubmit}
      >
        <label htmlFor='term'>
          <div>Find</div>
          <input
            type='text'
            id='term'
            name='term'
            placeholder='pizza, sushi, cocktail bar...'
            list='term-search'
            value={searchParams.term}
            onChange={onInputChange}
          />
          {termSuggestions.length > 0 && (
            <datalist id='term-search'>
              {termSuggestions.map((val) => {
                return (
                  <option key={uuidv4()} name='term'>
                    {val}
                  </option>
                );
              })}
            </datalist>
          )}
        </label>
        <label htmlFor='location'>
          <div>Near</div>
          <input
            type='text'
            id='location'
            name='location'
            placeholder='Los Angeles, CA'
            list='location-search'
            value={searchParams.location}
            onChange={onInputChange}
          />
          {locationSuggestions.length > 0 && (
            <datalist id='location-search'>
              {locationSuggestions.map((val) => {
                return (
                  <option key={uuidv4()} name='term'>
                    {val.city}, {val.state}
                  </option>
                );
              })}
            </datalist>
          )}
        </label>
        <button type='submit'>
          <i className={'fas fa-search'}></i>
        </button>
      </form>
    </div>
  );
}

export default React.memo(RestaurantSearchBar);
