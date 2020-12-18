import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';

import { RestaurantSearchBarContext } from 'shared/RestaurantSearchBar/RestaurantSearchBarContext';

import styles from './RestaurantSearchBarTermParam.module.scss';

RestaurantSearchBarTermParam.propTypes = {
  termSearchParam: PropTypes.string,
  onInputChange: PropTypes.func,
};

export default function RestaurantSearchBarTermParam({
  termSearchParam,
  onInputChange,
}) {
  const {
    state: { termSuggestions },
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
    items: termSuggestions,
    inputValue: termSearchParam,
    onInputValueChange: ({ inputValue }) => {
      onInputChange(inputValue);
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
          {...getInputProps()}
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
