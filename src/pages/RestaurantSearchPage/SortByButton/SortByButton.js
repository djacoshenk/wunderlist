import React, { useEffect } from 'react';
import { useSelect } from 'downshift';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import styles from './SortByButton.module.scss';

SortByButton.propTypes = {
  setSortByParam: PropTypes.func,
  fetchPlacesSortBy: PropTypes.func,
};

export default function SortByButton({ setSortByParam, fetchPlacesSortBy }) {
  const items = ['Best Match', 'Rating', 'Review Count', 'Distance'];
  const params = useParams();

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items });

  useEffect(() => {
    if (selectedItem === 'Best Match') {
      setSortByParam('best_match');
      fetchPlacesSortBy(params, 'best_match');
    } else if (selectedItem === 'Rating') {
      setSortByParam('rating');
      fetchPlacesSortBy(params, 'rating');
    } else if (selectedItem === 'Review Count') {
      setSortByParam('review_count');
      fetchPlacesSortBy(params, 'review_count');
    } else if (selectedItem === 'Distance') {
      setSortByParam('distance');
      fetchPlacesSortBy(params, 'distance');
    } else {
      return;
    }
  }, [selectedItem, setSortByParam, params, fetchPlacesSortBy]);

  return (
    <div className={styles['sort-by-main-container']}>
      <div className={styles['search-results-ref-container']}>
        <p>
          Results for {params.term} in {params.location}
        </p>
      </div>
      <div className={styles['sort-by-label-btn-container']}>
        <label htmlFor='select' {...getLabelProps()}>
          Sort By:
        </label>
        <div className={styles['sort-by-btn-list-container']}>
          <button name='select' type='button' {...getToggleButtonProps()}>
            {selectedItem || 'Best Match'}
          </button>
          <ul {...getMenuProps()}>
            {isOpen &&
              items.map((item, index) => (
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
    </div>
  );
}