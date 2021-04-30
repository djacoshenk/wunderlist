import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { Link } from 'react-router-dom';

import { setMapId } from 'reducers/mapIdReducer';
import { RootState } from 'store/index';

import './GoogleMapMarker.scss';

type Props = {
  id: number;
  place: {
    alias: string;
    name: string;
  };
};

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const mapIdIconStyles = {
  color: '#333',
  transform: 'translateY(-7px)',
};

const mapIdTextStyles = {
  color: '#38b2ac',
};

export default function GoogleMapMarker({ id, place }: Props): JSX.Element {
  const { mapId } = useTypedSelector((state) => state.mapId);
  const dispatch = useDispatch();

  return (
    <Link
      className={`map-marker-link-${id}`}
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
        style={mapId === id ? mapIdIconStyles : undefined}
        onMouseEnter={() => dispatch(setMapId(id))}
        onMouseLeave={() => dispatch(setMapId(0))}
      >
        <p style={mapId === id ? mapIdTextStyles : undefined}>{id}</p>
      </i>
    </Link>
  );
}
