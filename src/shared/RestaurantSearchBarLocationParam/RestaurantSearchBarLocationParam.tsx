import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCombobox } from 'downshift';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import * as Sentry from '@sentry/react';

import { setLocationUrl } from 'reducers/locationUrlReducer';
import UserCurrentLocationButton from 'shared/UserCurrentLocationButton/UserCurrentLocationButton';

import styles from './RestaurantSearchBarLocationParam.module.scss';

type LocationParam = string | undefined;

interface IProps {
  locationSearchParam: LocationParam;
  setLocationSearchParam: (text: LocationParam) => void;
  errorLocationParam: string;
}

let searchId: ReturnType<typeof setTimeout>;

export default function RestaurantSearchBarLocationParam({
  locationSearchParam,
  setLocationSearchParam,
  errorLocationParam,
}: IProps) {
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const dispatch = useDispatch();
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
    const persistedLocationParam = localStorage.getItem('locationParam');

    // persist the location param on renders
    if (persistedLocationParam) {
      const persistedLocationParamParse = JSON.parse(persistedLocationParam);

      setLocationSearchParam(persistedLocationParamParse);
    }
  }, [setLocationSearchParam]);

  async function fetchLocationSuggestions(text: LocationParam) {
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
          data.data.map((place: { city: string; regionCode: string }) => {
            return `${place.city}, ${place.regionCode}`;
          })
        );
      } else {
        return;
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  function onInputChange(text: LocationParam) {
    setLocationSearchParam(text);

    clearTimeout(searchId);

    searchId = setTimeout(() => {
      fetchLocationSuggestions(text);
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
          <UserCurrentLocationButton
            setLocationSearchParam={setLocationSearchParam}
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
      <div
        className={
          styles['restaurant-search-bar-location-param-error-container']
        }
      >
        <p>{errorLocationParam}</p>
      </div>
    </div>
  );
}
