import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';
import { v4 as uuidv4 } from 'uuid';

import { RestaurantSearchBarContext } from 'shared/RestaurantSearchBar/RestaurantSearchBarContext';

import styles from './RestaurantSearchBarLocationParam.module.scss';

RestaurantSearchBarLocationParam.propTypes = {
  searchParams: PropTypes.shape({ location: PropTypes.string }),
  onInputChange: PropTypes.func,
};

export default function RestaurantSearchBarLocationParam({ onInputChange }) {
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
          {...getInputProps({ ref: locationRef })}
        />
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
                {...getItemProps({ item })}
              >
                {`${item.city}, ${item.state}`}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
