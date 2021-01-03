import React from 'react';
import PropTypes from 'prop-types';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';
import './RestaurantProfileImageCarousel.scss';

RestaurantProfileImageCarousel.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string),
};

SwiperCore.use([Navigation, Pagination]);

export default function RestaurantProfileImageCarousel({ photos }) {
  return (
    <Swiper
      navigation
      pagination={{ clickable: true }}
      loop={true}
      spaceBetween={0}
      slidesPerView={1}
    >
      {photos.map((photo, index) => {
        return (
          <SwiperSlide key={`slide-${index}`}>
            <img src={photo} alt='restaurant-food'></img>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
