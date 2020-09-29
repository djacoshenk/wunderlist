import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import GoogleMap from '../GoogleMap/GoogleMap';
import RestaurantCardList from '../RestaurantCardList/RestaurantCardList';

import './MainContent.scss';

MainContent.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object),
  mapKey: PropTypes.number,
  searchParams: PropTypes.objectOf(PropTypes.string),
  fetchMorePlaces: PropTypes.func,
};

const b = block('RestaurantSearchPage');

export default function MainContent({
  places,
  mapKey,
  searchParams,
  fetchMorePlaces,
}) {
  return (
    <div className={b('main-container')}>
      <GoogleMap places={places} mapKey={mapKey} />
      <RestaurantCardList
        places={places}
        searchParams={searchParams}
        fetchMorePlaces={fetchMorePlaces}
      />
    </div>
  );
}
