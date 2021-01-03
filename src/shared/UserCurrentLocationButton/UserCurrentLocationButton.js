import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import { setLocationUrl } from 'reducers/locationUrlReducer';

import styles from './UserCurrentLocationButton.module.scss';

UserCurrentLocationButton.propTypes = {
  setLocationSearchParam: PropTypes.func,
};

export default function UserCurrentLocationButton({ setLocationSearchParam }) {
  const dispatch = useDispatch();

  function fetchUserCurrentLocation() {
    let currentUserLocation;

    async function success(pos) {
      let latitude = pos.coords.latitude.toFixed(3);
      let longitude = pos.coords.longitude.toFixed(3);

      currentUserLocation = `${latitude}${longitude}`;

      try {
        const { data } = await axios.get(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1&location=${currentUserLocation}&radius=5`,
          {
            headers: {
              'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
              'x-rapidapi-key': process.env.REACT_APP_GEODB_CITIES,
            },
          }
        );

        const location = `${data.data[0].city}, ${data.data[0].regionCode}`;

        // set the current location in storage
        localStorage.setItem('locationParam', JSON.stringify(location));

        // update the location search param to be the current location
        setLocationSearchParam(location);

        // change the cards url link to be the current location
        dispatch(setLocationUrl(location));
      } catch (err) {
        throw new Error('COULD NOT FETCH USER CURRENT LOCATION');
      }
    }

    function error() {
      throw new Error('COULD NOT FETCH USER CURRENT LOCATION');
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  return (
    <button
      className={styles['restaurant-search-bar-current-location']}
      type='button'
      onClick={fetchUserCurrentLocation}
    >
      <i className='fas fa-location-arrow'></i>
    </button>
  );
}
