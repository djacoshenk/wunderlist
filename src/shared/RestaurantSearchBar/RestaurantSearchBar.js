import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import { RestaurantSearchBarContext } from './RestaurantSearchBarContext';

import styles from './RestaurantSearchBar.module.scss';

RestaurantSearchBar.propTypes = {
  searchParams: PropTypes.shape({
    term: PropTypes.string,
    location: PropTypes.string,
  }),
  handleInputChange: PropTypes.func,
  handleFormSubmit: PropTypes.func,
};

let searchId;

function RestaurantSearchBar() {
  const history = useHistory();
  const { searchSuggestions, fetchSearchSuggestions } = useContext(
    RestaurantSearchBarContext
  );
  const [searchParams, setSearchParams] = useState({
    term: '',
    location: 'Los Angeles, CA',
  });

  function onInputChange(e) {
    const { name, value } = e.target;

    setSearchParams((prevState) => {
      return { ...prevState, [name]: value };
    });

    if (name === 'term') {
      handleSearchDebounce(value);
    }
  }

  function handleSearchDebounce(value) {
    clearTimeout(searchId);

    searchId = setTimeout(() => {
      fetchSearchSuggestions(value);
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
      <form className={styles['search-bar-form']} onSubmit={onFormSubmit}>
        <label htmlFor='term'>
          <div>Find</div>
          <input
            type='text'
            id='term'
            name='term'
            placeholder='pizza, sushi, cocktail bar...'
            value={searchParams.term}
            onChange={onInputChange}
            list='term-search'
          />
          {searchParams.term && (
            <datalist id='term-search'>
              {searchSuggestions.map((val) => {
                return (
                  <option key={uuidv4()} value={val.title} name='term'></option>
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
            value={searchParams.location}
            onChange={onInputChange}
            list='location-search'
          />
        </label>
        <button>
          <i className={'fas fa-search'}></i>
        </button>
      </form>
    </div>
  );
}

export default React.memo(RestaurantSearchBar);
