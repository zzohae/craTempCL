import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function SwiperBanner({ datakey, viewslides, pagination, currentIndex, onSlideChange, swiperRef, spacebtw = 0, hasrwd = false, disableAutoplay = false }) {
  const { bannerData, bannerDataMd, bannerDataSm } = datakey;

  const [responsiveData, setResponsiveData] = useState(bannerData);

  const autoplay = !disableAutoplay && {
    delay: 3000,
    disableOnInteraction: false,
  };

  useEffect(() => {
    const handleResize = () => {
      let newData;
      if (window.innerWidth < 576) {
        newData = bannerDataSm;
      } else if (window.innerWidth < 992) {
        newData = bannerDataMd;
      } else {
        newData = bannerData;
      }
      if (!hasrwd) newData = bannerData;
      setResponsiveData(newData);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [bannerData, bannerDataMd, bannerDataSm, hasrwd]);

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={spacebtw}
      slidesPerView={viewslides}
      loop={true}
      autoplay={autoplay}
      pagination={pagination}
      onSlideChange={onSlideChange}
      ref={swiperRef}
    >
      {responsiveData.map((v, i) => (
        <SwiperSlide key={i} style={{ width: 'fit-content' }}>
          <img src={`/assets/img/banner/${v.src}`} alt={v.alt} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
