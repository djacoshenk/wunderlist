import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from 'shared/RestaurantSearchBar/RestaurantSearchBar.module.scss';
import RestaurantSearchBarLocationParam from 'shared/RestaurantSearchBarLocationParam/RestaurantSearchBarLocationParam';
import RestaurantSearchBarTermParam from 'shared/RestaurantSearchBarTermParam/RestaurantSearchBarTermParam';

type SearchBarParam = string | undefined;

export default function RestaurantSearchBar() {
  const [termSearchParam, setTermSearchParam] = useState<SearchBarParam>('');
  const [
    locationSearchParam,
    setLocationSearchParam,
  ] = useState<SearchBarParam>('');
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

    // prevents empty strings from passing
    if (termSearchParam && locationSearchParam) {
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
        aria-label='search bar'
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
        <button
          aria-label='search'
          className={styles['search-bar-search-button']}
          type='submit'
        >
          <i className={'fas fa-search'}></i>
        </button>
      </form>
    </div>
  );
}
