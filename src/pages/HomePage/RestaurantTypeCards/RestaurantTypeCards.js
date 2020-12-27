import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setLocationURL } from 'reducers/locationURLReducer';

import burger from 'assets/burger.png';
import sushi from 'assets/sushi.png';
import rice from 'assets/rice-bowl.png';
import taco from 'assets/taco.png';
import pizza from 'assets/pizza-slice.png';
import chili from 'assets/chili.png';

import styles from './RestaurantTypeCards.module.scss';

RestaurantTypeCards.propTypes = {
  locationURL: PropTypes.string,
  setLocationURL: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    locationURL: state.location.locationURL,
  };
}

const mapDispatchToProps = {
  setLocationURL,
};

export function RestaurantTypeCards({ locationURL, setLocationURL }) {
  const restaurantTypes = [
    {
      name: 'Burgers',
      icon: burger,
      alt: 'black-white-cheeseburger',
    },
    {
      name: 'Japanese',
      icon: sushi,
      alt: 'black-white-sushi-roll',
    },
    {
      name: 'Italian',
      icon: pizza,
      alt: 'black-white-pizza-slice',
    },
    {
      name: 'Chinese',
      icon: rice,
      alt: 'black-white-rice-bowl',
    },
    {
      name: 'Mexican',
      icon: taco,
      alt: 'black-white-taco',
    },
    {
      name: 'Thai',
      icon: chili,
      alt: 'black-white-chili-pepper',
    },
  ];

  return (
    <div className={styles['restaurant-type-cards-main-container']}>
      <div className={styles['restaurant-type-cards-grid-container']}>
        {restaurantTypes.map((type) => {
          if (locationURL) {
            return (
              <Link
                to={{
                  pathname: `/search/${type.name.toLowerCase()}/${locationURL}`,
                }}
                className={styles['restaurant-type-card-link']}
                key={uuidv4()}
                onClick={() => setLocationURL('')}
              >
                <div className={styles['restaurant-type-card']}>
                  <img src={type.icon} alt={type.alt} />
                  <p>{type.name}</p>
                </div>
              </Link>
            );
          } else {
            return (
              <Link
                to={{
                  pathname: `/search/${type.name.toLowerCase()}/${locationURL}`,
                }}
                className={styles['restaurant-type-card-link']}
                key={uuidv4()}
                onClick={(e) => e.preventDefault()}
              >
                <div className={styles['restaurant-type-card']}>
                  <img src={type.icon} alt={type.alt} />
                  <p>{type.name}</p>
                </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantTypeCards);
