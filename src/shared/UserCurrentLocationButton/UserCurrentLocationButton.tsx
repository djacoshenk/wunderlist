import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { setLocationUrl } from 'reducers/locationUrlReducer';

import styles from './UserCurrentLocationButton.module.scss';

interface IProps {
  setLocationSearchParam: (text: string) => void;
}

interface CurrentLocation {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export default function UserCurrentLocationButton({
  setLocationSearchParam,
}: IProps): JSX.Element {
  const dispatch = useDispatch();
  const [asyncErrorMessage, setAsyncErrorMessage] = useState('');

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
        localStorage.setItem('locationParam', JSON.stringify(location));

        // update the location search param to be the current location
        setLocationSearchParam(locationUrl);

        // change the cards url link to be the current location
        dispatch(setLocationUrl(locationUrl));
      } catch (err) {
        setAsyncErrorMessage(err.message);
      }
    }

    function error(err) {
      setAsyncErrorMessage(err.message);
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
