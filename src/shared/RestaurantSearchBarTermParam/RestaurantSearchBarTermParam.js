import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';

import { RestaurantSearchBarContext } from 'shared/RestaurantSearchBar/RestaurantSearchBarContext';

import styles from './RestaurantSearchBarTermParam.module.scss';

RestaurantSearchBarTermParam.propTypes = {
  onInputChange: PropTypes.func,
};

export default function RestaurantSearchBarTermParam({
  onInputChange,
  searchParams,
}) {
  const {
    state: { termSuggestions },
  } = useContext(RestaurantSearchBarContext);
  const termRef = useRef(null);

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: termSuggestions,
    onInputValueChange: () => {
      onInputChange(termRef.current);
    },
  });

  return (
    <div className={styles['restaurant-search-bar-term-param-container']}>
      <label htmlFor='term' {...getLabelProps()}>
        Find
      </label>
      <div {...getComboboxProps()}>
        <input
          type='text'
          id='term'
          name='term'
          placeholder='pizza, sushi, cocktail bar...'
          value={searchParams.term}
          {...getInputProps({ ref: termRef })}
        />
        <ul {...getMenuProps()}>
          {isOpen &&
            termSuggestions.length > 0 &&
            termSuggestions.map((item, index) => (
              <li
                style={
                  highlightedIndex === index
                    ? { backgroundColor: '#e0e7ff' }
                    : {}
                }
                key={`${item}${index}`}
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
