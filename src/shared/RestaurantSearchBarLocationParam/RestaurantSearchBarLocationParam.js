import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { setLocationUrl } from 'reducers/locationUrlReducer';
import UserCurrentLocationButton from 'shared/UserCurrentLocationButton/UserCurrentLocationButton';

import styles from './RestaurantSearchBarLocationParam.module.scss';
import { connect } from 'react-redux';

RestaurantSearchBarLocationParam.propTypes = {
  setLocationUrl: PropTypes.func,
  locationSearchParam: PropTypes.string,
  setLocationSearchParam: PropTypes.func,
};

const mapDispatchToProps = {
  setLocationUrl,
};

let searchId;

export function RestaurantSearchBarLocationParam({
  locationSearchParam,
  setLocationSearchParam,
  setLocationUrl,
}) {
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
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
  }, [currentLocation, setLocationSearchParam]);

  async function fetchLocationSuggestions(text) {
    setCurrentLocation('');
    setLocationUrl(text);

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
        <UserCurrentLocationButton
          setCurrentLocation={setCurrentLocation}
          setLocationURL={setLocationUrl}
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

export default connect(
  null,
  mapDispatchToProps
)(RestaurantSearchBarLocationParam);
