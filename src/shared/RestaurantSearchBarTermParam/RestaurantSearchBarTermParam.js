import React from 'react';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';

import styles from './RestaurantSearchBarTermParam.module.scss';

RestaurantSearchBarTermParam.propTypes = {
  termSuggestions: PropTypes.arrayOf(PropTypes.string),
  termSearchParam: PropTypes.string,
  onInputChange: PropTypes.func,
};

function RestaurantSearchBarTermParam({
  termSuggestions,
  termSearchParam,
  onInputChange,
}) {
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

export default React.memo(RestaurantSearchBarTermParam);
