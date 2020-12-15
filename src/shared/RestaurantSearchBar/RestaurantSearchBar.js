import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import RestaurantSearchBarTermParam from 'shared/RestaurantSearchBarTermParam/RestaurantSearchBarTermParam';
import RestaurantSearchBarLocationParam from 'shared/RestaurantSearchBarLocationParam/RestaurantSearchBarLocationParam';
import { RestaurantSearchBarContext } from './RestaurantSearchBarContext';

import styles from './RestaurantSearchBar.module.scss';

let searchId;
const defaultSearchParams = {
  term: '',
  location: 'Los Angeles, CA',
};

function RestaurantSearchBar() {
  const [searchParams, setSearchParams] = useState(defaultSearchParams);
  const {
    fetchTermSuggestions,
    fetchLocationSuggestions,
    clearSearchSuggestions,
  } = useContext(RestaurantSearchBarContext);
  const history = useHistory();

  function handleInputChange(text) {
    const { name, value } = text;

    setSearchParams((prevState) => {
      return { ...prevState, [name]: value };
    });

    // use the input value to generate autocomplete search results
    handleSearchDebounce(name, value);
  }

  // for autocomplete search results
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
        <RestaurantSearchBarTermParam onInputChange={handleInputChange} />
        <RestaurantSearchBarLocationParam onInputChange={handleInputChange} />
        <button type='submit'>
          <i className={'fas fa-search'}></i>
        </button>
      </form>
    </div>
  );
}

export default React.memo(RestaurantSearchBar);
