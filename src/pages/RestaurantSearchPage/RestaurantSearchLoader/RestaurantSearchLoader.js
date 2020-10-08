import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import block from 'bem-cn';

import RestaurantSearchLoaderBubbles from '../RestaurantSearchLoaderBubbles/RestaurantSearchLoaderBubbles';

import './RestaurantSearchLoader.scss';

const b = block('RestaurantSearchPage');

export default function SearchRestaurantLoader() {
  const params = useParams();

  function formatTermParam(param) {
    return param
      .split('')
      .map((val) => (val === '-' ? ' ' : val))
      .join('');
  }

  function formatLocationParam(param) {
    param = param.split('');
    param.splice(param.length - 3, 0, ',');

    for (let i = 0; i < param.length; i++) {
      if (i === 0) {
        param[i] = param[i].toUpperCase();
      } else if (param[i] === '-') {
        param[i] = ' ';
      } else if (param[i - 1] === ' ') {
        param[i] = param[i].toUpperCase();
      } else if (i === param.length - 1) {
        param[i] = param[i].toUpperCase();
      }
    }

    return param.join('');
  }

  let term = formatTermParam(params.term);
  let location = formatLocationParam(params.location);

  return (
    <Fragment>
      <div className={b('main-content-loader')}>
        <h3>
          Finding you the best {term} in {location}
        </h3>
        <div className={b('main-content-bubble-loader')}>
          <RestaurantSearchLoaderBubbles />
        </div>
      </div>
    </Fragment>
  );
}
