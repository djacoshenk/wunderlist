import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { RestaurantSearchBarContext } from './RestaurantSearchBarContext';

import styles from './RestaurantSearchBar.module.scss';

export default function SearchRestaurantBar() {
  const history = useHistory();
  const { searchParams, setSearchParams } = useContext(
    RestaurantSearchBarContext
  );

  function onInputChange(e) {
    let { name, value } = e.target;

    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          />
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
          />
        </label>
        <button>
          <i className={'fas fa-search'}></i>
        </button>
      </form>
    </div>
  );
}
