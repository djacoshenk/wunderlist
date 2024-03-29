import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setMapId } from 'reducers/mapIdReducer';
import styles from 'pages/RestaurantSearchPage/RestaurantCard/RestaurantCard.module.scss';
import RestaurantRatingStars from 'shared/RestaurantRatingStars/RestaurantRatingStars';

type Props = {
  place: Place;
  index: number;
};

type Place = {
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

export default function RestaurantCard({ place, index }: Props) {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Link
        to={{
          pathname: `/business/${place.alias}`,
          state: {
            place: place.name,
          },
        }}
        className={styles['card-container-link']}
        onMouseEnter={() => dispatch(setMapId(index))}
        onMouseLeave={() => dispatch(setMapId(0))}
        onClick={() => dispatch(setMapId(0))}
      >
        <div className={styles['card-container']}>
          <div className={styles['image-container']}>
            <img className={styles['card-img']} src={place.image_url} alt='' />
          </div>
          <div className={styles['content-container']}>
            <div className={styles['title-row']}>
              <h3>
                {index}. {place.name}
              </h3>
            </div>
            <div className={styles['ratings-row']}>
              <div className={styles['stars-container']}>
                <RestaurantRatingStars rating={place.rating} />
              </div>
              <p>{place.review_count}</p>
            </div>
            <div className={styles['price-category-row']}>
              <p>
                {place.price && `${place.price} \u2022 `}
                {place.categories[0].title}
              </p>
            </div>
            {place.display_phone && (
              <div className={styles['phone-number-row']}>
                <p>{place.display_phone}</p>
              </div>
            )}
            <div className={styles['address-row']}>
              {place.location.display_address.map((adrs, index) => {
                return <p key={index}>{adrs}</p>;
              })}
            </div>
          </div>
        </div>
      </Link>
    </Fragment>
  );
}
