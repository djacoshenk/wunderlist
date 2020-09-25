import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import GoogleMap from '../GoogleMap/GoogleMap';
import RestaurantCardList from '../RestaurantCardList/RestaurantCardList';

import './MainContent.scss';

MainContent.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object),
  hoverID: PropTypes.string,
  mapKey: PropTypes.number,
  handleHover: PropTypes.func,
  searchParams: PropTypes.objectOf(PropTypes.string),
  fetchMorePlaces: PropTypes.func,
};

const b = block('RestaurantSearchPage');

export default function MainContent({
  places,
  hoverID,
  handleHover,
  mapKey,
  searchParams,
  fetchMorePlaces,
}) {
  return (
    <div className={b('main-container')}>
      <GoogleMap
        places={places}
        hoverID={hoverID}
        handleHover={handleHover}
        mapKey={mapKey}
      />
      <RestaurantCardList
        places={places}
        searchParams={searchParams}
        fetchMorePlaces={fetchMorePlaces}
        handleHover={handleHover}
      />
    </div>
  );
}
