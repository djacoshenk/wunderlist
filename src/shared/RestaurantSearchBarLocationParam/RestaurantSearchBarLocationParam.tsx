import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/react';
import axios from 'axios';
import { useCombobox } from 'downshift';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { setLocationUrl } from 'reducers/locationUrlReducer';
import styles from 'shared/RestaurantSearchBarLocationParam/RestaurantSearchBarLocationParam.module.scss';
import UserCurrentLocationButton from 'shared/UserCurrentLocationButton/UserCurrentLocationButton';

type Props = {
  locationSearchParam: LocationParam;
  setLocationSearchParam: (text: LocationParam) => void;
  errorLocationParam: string;
};

type LocationParam = string | undefined;

type Place = {
  city: string;
  regionCode: string;
};

let searchId: ReturnType<typeof setTimeout>;

export default function RestaurantSearchBarLocationParam({
  locationSearchParam,
  setLocationSearchParam,
  errorLocationParam,
}: Props) {
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
    if (text) {
      dispatch(setLocationUrl(text));

      try {
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
          data.data.map((place: Place) => {
            return `${place.city}, ${place.regionCode}`;
          })
        );
      } catch (err) {
        Sentry.captureException(err);
      }
    }
  }

  function onInputChange(text: LocationParam) {
    setLocationSearchParam(text);

    clearTimeout(searchId);

    searchId = setTimeout(() => {
      fetchLocationSuggestions(text);
    }, 1000);
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
        {errorLocationParam && (
          <p aria-label={errorLocationParam} role='alert'>
            {errorLocationParam}
          </p>
        )}
      </div>
    </div>
  );
}
