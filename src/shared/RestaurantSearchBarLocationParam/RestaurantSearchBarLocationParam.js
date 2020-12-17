import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';
import { v4 as uuidv4 } from 'uuid';

import { RestaurantSearchBarContext } from 'shared/RestaurantSearchBar/RestaurantSearchBarContext';

import styles from './RestaurantSearchBarLocationParam.module.scss';

RestaurantSearchBarLocationParam.propTypes = {
  onInputChange: PropTypes.func,
};

export default function RestaurantSearchBarLocationParam({
  onInputChange,
  searchParams,
  onSetUserCurrentLocation,
}) {
  const {
    state: { locationSuggestions },
  } = useContext(RestaurantSearchBarContext);
  const locationRef = useRef(null);

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: locationSuggestions,
    onInputValueChange: () => {
      onInputChange(locationRef.current);
    },
  });

  return (
    <div className={styles['restaurant-search-bar-location-param-container']}>
      <label htmlFor='location' {...getLabelProps()}>
        Near
      </label>
      <div {...getComboboxProps()}>
        <input
          type='text'
          id='location'
          name='location'
          placeholder='Los Angeles, CA'
          value={searchParams.location}
          {...getInputProps({ ref: locationRef })}
        />
        <button
          className={styles['restaurant-search-bar-current-location']}
          type='button'
          onClick={onSetUserCurrentLocation}
        >
          <i className='fas fa-location-arrow'></i>
        </button>
        <ul {...getMenuProps()}>
          {isOpen &&
            locationSuggestions.length > 0 &&
            locationSuggestions.map((item, index) => (
              <li
                style={
                  highlightedIndex === index
                    ? { backgroundColor: '#e0e7ff' }
                    : {}
                }
                key={uuidv4()}
                {...getItemProps({ item, index })}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
