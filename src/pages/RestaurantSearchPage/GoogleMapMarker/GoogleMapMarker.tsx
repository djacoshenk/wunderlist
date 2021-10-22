import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import 'pages/RestaurantSearchPage/GoogleMapMarker/GoogleMapMarker.scss';
import { setMapId } from 'reducers/mapIdReducer';
import { RootState } from 'store/store';

type Props = {
  id: number;
  place: {
    alias: string;
    name: string;
  };
};

const mapIdIconStyles = {
  color: '#333',
  transform: 'translateY(-7px)',
};

const mapIdTextStyles = {
  color: '#38b2ac',
};

export default function GoogleMapMarker({ id, place }: Props): JSX.Element {
  const { mapId } = useSelector((state: RootState) => state.mapId);
  const dispatch = useDispatch();

  return (
    <Link
      className={`map-marker-link ${id}`}
      to={{
        pathname: `/business/${place.alias}`,
        state: {
          place: place.name,
        },
      }}
      onClick={() => dispatch(setMapId(0))}
    >
      <i
        className='fas fa-map-marker'
        style={mapId === id ? mapIdIconStyles : undefined}
        onMouseEnter={() => dispatch(setMapId(id))}
        onMouseLeave={() => dispatch(setMapId(0))}
      >
        <p style={mapId === id ? mapIdTextStyles : undefined}>{id}</p>
      </i>
    </Link>
  );
}
