import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './styles.css';

// import required modules
import { EffectCards } from 'swiper';
import img1 from '../../assets/rioquente/1.jpg';
import img2 from '../../assets/rioquente/2.jpg';
import img3 from '../../assets/rioquente/3.jpg';
import img4 from '../../assets/rioquente/4.jpg';
import img5 from '../../assets/rioquente/5.jpg';
import img6 from '../../assets/rioquente/6.jpg';
import img7 from '../../assets/rioquente/7.jpg';
import { Img } from '@chakra-ui/react';

export function SwiperImages() {
  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Img src={img1} />
        </SwiperSlide>
        <SwiperSlide>
          <Img src={img2} />
        </SwiperSlide>
        <SwiperSlide>
          <Img src={img3} />
        </SwiperSlide>
        <SwiperSlide>
          <Img src={img4} />
        </SwiperSlide>
        <SwiperSlide>
          <Img src={img6} />
        </SwiperSlide>
        <SwiperSlide>
          <Img src={img5} />
        </SwiperSlide>
        <SwiperSlide>
          <Img src={img7} />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
