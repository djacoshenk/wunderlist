import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';
import { v4 as uuidv4 } from 'uuid';

import { RestaurantSearchBarContext } from 'shared/RestaurantSearchBar/RestaurantSearchBarContext';

import styles from './RestaurantSearchBarLocationParam.module.scss';

RestaurantSearchBarLocationParam.propTypes = {
  locationSearchParam: PropTypes.string,
  onInputChange: PropTypes.func,
};

function RestaurantSearchBarLocationParam({
  locationSearchParam,
  onInputChange,
}) {
  const {
    state: { locationSuggestions },
    fetchUserCurrentLocation,
  } = useContext(RestaurantSearchBarContext);

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
    inputValue: locationSearchParam,
    onInputValueChange: ({ inputValue }) => {
      onInputChange(inputValue);
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
          {...getInputProps()}
        />
        <button
          className={styles['restaurant-search-bar-current-location']}
          type='button'
          onClick={fetchUserCurrentLocation}
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

export default React.memo(RestaurantSearchBarLocationParam);
