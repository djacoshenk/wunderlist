import { useState } from 'react';
import { useCombobox } from 'downshift';
import axios from 'axios';
import * as Sentry from '@sentry/react';

import styles from './RestaurantSearchBarTermParam.module.scss';

type Props = {
  termSearchParam: TermParam;
  setTermSearchParam: (text: TermParam) => void;
  errorTermParam: string;
};

type TermParam = string | undefined;

type Categories = {
  title: string;
};

let searchId: ReturnType<typeof setTimeout>;

export default function RestaurantSearchBarTermParam({
  termSearchParam,
  setTermSearchParam,
  errorTermParam,
}: Props) {
  const [termSuggestions, setTermSuggestions] = useState<string[]>([]);

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

  async function fetchTermSuggestions(text: TermParam) {
    if (text) {
      try {
        const { data } = await axios.get(
          `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/autocomplete?text=${text}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
            },
          }
        );

        setTermSuggestions(data.categories.map((cat: Categories) => cat.title));
      } catch (err) {
        Sentry.captureException(err);
      }
    }
  }

  function onInputChange(text: TermParam) {
    setTermSearchParam(text);

    clearTimeout(searchId);

    searchId = setTimeout(() => {
      fetchTermSuggestions(text);
    }, 200);
  }

  return (
    <div className={styles['restaurant-search-bar-term-param-main-container']}>
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

      <div
        className={styles['restaurant-search-bar-term-param-error-container']}
      >
        {errorTermParam && (
          <p aria-label={errorTermParam} role='alert'>
            {errorTermParam}
          </p>
        )}
      </div>
    </div>
  );
}
