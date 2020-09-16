import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Card from './Card';

CardList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object),
  setPlaces: PropTypes.func,
  searchParams: PropTypes.objectOf(PropTypes.string),
  handleHover: PropTypes.func,
};

export default function CardList({
  places,
  setPlaces,
  searchParams,
  handleHover,
}) {
  let offset = 10;
  const obs = new IntersectionObserver(
    (entries) => {
      const first = entries[0];

      if (first.isIntersecting) {
        searchMorePlaces(searchParams);
      }
    },
    { threshold: 0 }
  );
  const observer = useRef(obs);
  const [loadRef, setLoadRef] = useState(null);

  useEffect(() => {
    const currentElement = loadRef;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [loadRef]);

  async function searchMorePlaces({ term, location }) {
    const res = await axios.get(
      `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
        },
        params: {
          sort_by: 'best_match',
          limit: 10,
          offset: offset,
        },
      }
    );

    setPlaces((prevState) => {
      return prevState.concat(res.data.businesses);
    });

    offset += 10;
  }

  return (
    <div className='card-list-container'>
      {places.map((place, index) => {
        return (
          <Card
            key={place.id}
            id={place.id}
            image={place.image_url}
            rank={index + 1}
            title={place.name}
            rating={place.rating}
            review_count={place.review_count}
            price={place.price}
            phone={place.display_phone}
            address={place.location.display_address}
            tags={place.categories}
            handleHover={handleHover}
          />
        );
      })}
      <div ref={setLoadRef} className='card-list-loader'>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
      </div>
    </div>
  );
}
