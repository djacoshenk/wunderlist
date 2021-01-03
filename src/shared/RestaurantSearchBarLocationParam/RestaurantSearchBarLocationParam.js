import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { setLocationUrl } from 'reducers/locationUrlReducer';
import UserCurrentLocationButton from 'shared/UserCurrentLocationButton/UserCurrentLocationButton';

import styles from './RestaurantSearchBarLocationParam.module.scss';

RestaurantSearchBarLocationParam.propTypes = {
  locationSearchParam: PropTypes.string,
  setLocationSearchParam: PropTypes.func,
  error: PropTypes.string,
};

let searchId;

export default function RestaurantSearchBarLocationParam({
  locationSearchParam,
  setLocationSearchParam,
  error,
}) {
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
  const dispatch = useDispatch();
  const params = useParams();
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

  useEffect(() => {
    if (currentLocation) {
      setLocationSearchParam(currentLocation);
    }

    if (params.location) {
      setLocationSearchParam(params.location);
    }
  }, [currentLocation, params.location, setLocationSearchParam]);

  async function fetchLocationSuggestions(text) {
    setCurrentLocation('');
    dispatch(setLocationUrl(text));

    try {
      if (text) {
        const { data } = await axios.get(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=3&namePrefix=${text}&countryIds=US`,
          {
            headers: {
              'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
              'x-rapidapi-key': process.env.REACT_APP_GEODB_CITIES,
            },
          }
        );

        setLocationSuggestions(
          data.data.map((place) => {
            return `${place.city}, ${place.regionCode}`;
          })
        );
      } else {
        return;
      }
    } catch (err) {
      throw new Error('COULD NOT FETCH LOCATION SUGGESTIONS');
    }
  }

  function onInputChange(value) {
    setLocationSearchParam(value);

    clearTimeout(searchId);

    searchId = setTimeout(() => {
      fetchLocationSuggestions(value);
    }, 200);
  }

  return (
    <div
      className={styles['restaurant-search-bar-location-param-main-container']}
    >
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
          <UserCurrentLocationButton setCurrentLocation={setCurrentLocation} />
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
      <div
        className={
          styles['restaurant-search-bar-location-param-error-container']
        }
      >
        <p>{error}</p>
      </div>
    </div>
  );
}
