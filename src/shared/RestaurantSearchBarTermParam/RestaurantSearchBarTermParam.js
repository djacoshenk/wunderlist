import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';
import axios from 'axios';

import styles from './RestaurantSearchBarTermParam.module.scss';

RestaurantSearchBarTermParam.propTypes = {
  termSearchParam: PropTypes.string,
  setTermSearchParam: PropTypes.func,
};

let searchId;

export default function RestaurantSearchBarTermParam({
  termSearchParam,
  setTermSearchParam,
}) {
  const [termSuggestions, setTermSuggestions] = useState([]);

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

  async function fetchTermSuggestions(text) {
    try {
      if (text) {
        const { data } = await axios.get(
          `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/autocomplete?text=${text}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
            },
          }
        );

        setTermSuggestions(data.categories.map((cat) => cat.title));
      } else {
        return;
      }
    } catch (err) {
      throw new Error('COULD NOT FETCH TERM SUGGESTIONS');
    }
  }

  function onInputChange(value) {
    setTermSearchParam(value);

    clearTimeout(searchId);

    searchId = setTimeout(() => {
      fetchTermSuggestions(value);
    }, 200);
  }

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
