import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RestaurantSearchBarTermParam from 'shared/RestaurantSearchBarTermParam/RestaurantSearchBarTermParam';
import RestaurantSearchBarLocationParam from 'shared/RestaurantSearchBarLocationParam/RestaurantSearchBarLocationParam';

import { setLocationURL } from 'reducers/locationURLReducer';

import styles from './RestaurantSearchBar.module.scss';

let searchId;

RestaurantSearchBar.propTypes = {
  setLocationURL: PropTypes.func,
};

const mapDispatchToProps = {
  setLocationURL,
};

function RestaurantSearchBar({ setLocationURL }) {
  const [termSuggestions, setTermSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
  const [termSearchParam, setTermSearchParam] = useState('');
  const [locationSearchParam, setLocationSearchParam] = useState('');
  const history = useHistory();

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

  async function fetchLocationSuggestions(text) {
    setLocationURL(text);
    setCurrentLocation('');

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

        setCurrentLocation(location);
        setLocationURL(location);
      } catch (err) {
        throw new Error('COULD NOT FETCH USER CURRENT LOCATION');
      }
    }

    function error() {
      throw new Error('COULD NOT FETCH USER CURRENT LOCATION');
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  function onFormSubmit(e) {
    e.preventDefault();

    if (termSearchParam && locationSearchParam) {
      history.push(`/search/${termSearchParam}/${locationSearchParam}`);
    }
  }

  function handleTermSearchParamChange(value) {
    setTermSearchParam(value);

    clearTimeout(searchId);

    searchId = setTimeout(() => {
      fetchTermSuggestions(value);
    }, 1000);
  }

  function handleLocationSearchParamChange(value) {
    setLocationSearchParam(value);

    clearTimeout(searchId);

    searchId = setTimeout(() => {
      fetchLocationSuggestions(value);
    }, 1000);
  }

  useEffect(() => {
    if (currentLocation) {
      setLocationSearchParam(currentLocation);
    }
  }, [currentLocation]);

  return (
    <div className={styles['search-bar-container']}>
      <form
        className={styles['search-bar-form']}
        aria-label='form'
        onSubmit={onFormSubmit}
      >
        <RestaurantSearchBarTermParam
          termSuggestions={termSuggestions}
          termSearchParam={termSearchParam}
          onInputChange={handleTermSearchParamChange}
        />
        <RestaurantSearchBarLocationParam
          locationSuggestions={locationSuggestions}
          locationSearchParam={locationSearchParam}
          onInputChange={handleLocationSearchParamChange}
          fetchUserCurrentLocation={fetchUserCurrentLocation}
        />
        <button className={styles['search-bar-search-button']} type='submit'>
          <i className={'fas fa-search'}></i>
        </button>
      </form>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(RestaurantSearchBar);
