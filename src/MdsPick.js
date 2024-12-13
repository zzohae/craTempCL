import React, { useState, useRef } from "react";
import allData from "./db/allData.json";
import Movetool from "./ui/Mtitle";
import SwiperBanner from "./contents/SwiperBanner";

export default function MdsPick() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = allData.mdpbanner.bannerData.length;
  const actualSlides = totalSlides / 3
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);
  };

  function goToSlide(direction) {
    let newIndex = (currentIndex + direction + totalSlides) % totalSlides;
    
    setCurrentIndex(newIndex % actualSlides);
    swiperRef.current.swiper.slideTo(newIndex);
  }
  

  return (
    <div className="container mdspickcont d-flex flex-column flex-lg-row align-items-start align-items-lg-stretch justify-content-start">
      <div className="mdsTitle">
        <Movetool textColor="#214aee" h2size="34px" nomargin={true}>
          {allData.mainPagetitle[0].title}
        </Movetool>
        <p className="d-none d-lg-block">
          내 손 안의 전통시장, <br />
          청량마켓몰만의 특별한 경험
        </p>
        <div className="tagwrap d-none d-lg-flex">
          <p className="tagitem">#시즌메뉴</p>
          <p className="tagitem">#구독할인</p>
          <p className="tagitem">#무료배송</p>
        </div>
        <div className="d-none d-lg-block">
          <button onClick={() => goToSlide(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="18"
              viewBox="0 0 10 18"
              fill="none"
            >
              <path
                d="M9 17L1 9L9 1"
                stroke="#214AEE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span>
          {((currentIndex % actualSlides) + 1)} / {actualSlides}
          </span>
          <button onClick={() => goToSlide(1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="18"
              viewBox="0 0 10 18"
              fill="none"
            >
              <path
                d="M1 17L9 9L1 1"
                stroke="#214AEE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mdswiper">
        <SwiperBanner
          datakey={allData.mdpbanner}
          viewslides={1}
          pagination={false}
          hasrwd={false}
          spacebtw={20}
          disableAutoplay={true}
          currentIndex={currentIndex}
          onSlideChange={handleSlideChange}
          swiperRef={swiperRef}
        />
      </div>
    </div>
  );
}
