import * as Sentry from '@sentry/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { setLocationUrl } from 'reducers/locationUrlReducer';
import styles from 'shared/UserCurrentLocationButton/UserCurrentLocationButton.module.scss';

type Props = {
  setLocationSearchParam: (text: string) => void;
};

type CurrentLocation = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

type Error = {
  code: number;
  message: string;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
};

export default function UserCurrentLocationButton({
  setLocationSearchParam,
}: Props) {
  const dispatch = useDispatch();

  function fetchUserCurrentLocation() {
    let currentUserLocation: string;

    async function success(pos: CurrentLocation) {
      const latitude = pos.coords.latitude.toFixed(3);
      const longitude = pos.coords.longitude.toFixed(3);

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

        const locationUrl = `${data.data[0].city}, ${data.data[0].regionCode}`;

        // set the current location in storage
        localStorage.setItem('locationParam', JSON.stringify(locationUrl));

        // update the location search param to be the current location
        setLocationSearchParam(locationUrl);

        // change the cards url link to be the current location
        dispatch(setLocationUrl(locationUrl));
      } catch (err) {
        Sentry.captureException(err);
      }
    }

    function error(err: Error) {
      Sentry.captureException(err);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  return (
    <button
      aria-label='current location'
      className={styles['restaurant-search-bar-current-location-btn']}
      type='button'
      onClick={fetchUserCurrentLocation}
    >
      <i className='fas fa-location-arrow'></i>
    </button>
  );
}
