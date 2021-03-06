import GoogleMapReact from 'google-map-react';

import styles from 'pages/RestaurantSearchPage/GoogleMap/GoogleMap.module.scss';
import GoogleMapMarker from 'pages/RestaurantSearchPage/GoogleMapMarker/GoogleMapMarker';

type Props = {
  places: Place[];
  mapKey: number;
};

type Place = {
  id: string;
  alias: string;
  image_url: string;
  name: string;
  rating: number;
  review_count: number;
  price: string;
  categories: Categories[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  display_phone: string;
  location: {
    display_address: string[];
  };
};

type Categories = {
  title: string;
};

const defaultCenter = {
  lat: 0,
  lng: 0,
};

const defaultZoom = 13;

export default function GoogleMap({ places, mapKey }: Props) {
  function getMapBounds(maps: any): any {
    const bounds = new maps.LatLngBounds();

    places.forEach((place) => {
      bounds.extend(
        new maps.LatLng(place.coordinates.latitude, place.coordinates.longitude)
      );
    });

    return bounds;
  }

  function handleMapBounds(map: any, maps: any): void {
    const bounds = getMapBounds(maps);

    map.fitBounds(bounds);
  }

  return (
    <div className={styles['google-map-container']}>
      <GoogleMapReact
        key={mapKey}
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_CLIENT_SECRET as string,
        }}
        center={defaultCenter}
        zoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleMapBounds(map, maps)}
        options={{ gestureHandling: 'greedy' }}
      >
        {places.map((place, index) => {
          const center = {
            lat: place.coordinates.latitude,
            lng: place.coordinates.longitude,
          };

          return (
            <GoogleMapMarker
              {...center}
              key={place.id}
              id={index + 1}
              place={place}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
