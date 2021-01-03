import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setMapId } from 'reducers/mapIdReducer';

import './GoogleMapMarker.scss';

GoogleMapMarker.propTypes = {
  id: PropTypes.number,
  place: PropTypes.object,
};

const mapIdIconStyles = {
  color: '#333',
  transform: 'translateY(-7px)',
};

const mapIdTextStyles = {
  color: '#38b2ac',
};

export default function GoogleMapMarker({ id, place }) {
  const { mapId } = useSelector((state) => state.mapId);
  const dispatch = useDispatch();

  return (
    <Link
      className={'map-marker-link'}
      to={{
        pathname: `/business/${place.alias}`,
        state: {
          place: place.name,
        },
      }}
      onClick={() => dispatch(setMapId(0))}
    >
      <i
        className={'fas fa-map-marker'}
        style={mapId === id ? mapIdIconStyles : null}
        onMouseEnter={() => dispatch(setMapId(id))}
        onMouseLeave={() => dispatch(setMapId(0))}
      >
        <p style={mapId === id ? mapIdTextStyles : null}>{id}</p>
      </i>
    </Link>
  );
}
