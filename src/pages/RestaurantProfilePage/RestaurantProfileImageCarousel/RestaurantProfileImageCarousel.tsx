import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';
import './RestaurantProfileImageCarousel.scss';

SwiperCore.use([Navigation, Pagination]);

type Props = {
  photos: string[];
};

export default function RestaurantProfileImageCarousel({
  photos,
}: Props): JSX.Element {
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
