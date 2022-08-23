import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './styles.css';

// import required modules
import { EffectCards } from 'swiper';
import jeri1 from '../../assets/jeri4.jpg';
import jeri2 from '../../assets/1.jpg';
import jeri3 from '../../assets/2.jpg';
import jeri4 from '../../assets/3.png';
import jeri5 from '../../assets/4.jpg';
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
          <Img src={jeri1} />
        </SwiperSlide>
        <SwiperSlide>
          <Img src={jeri2} />
        </SwiperSlide>
        <SwiperSlide>
          <Img src={jeri3} />
        </SwiperSlide>
        <SwiperSlide>
          <Img src={jeri4} />
        </SwiperSlide>
        <SwiperSlide>
          <Img src={jeri5} />
        </SwiperSlide>

        {/* <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </>
  );
}
