import React from "react";
import SwiperBanner from "../contents/SwiperBanner";
import Boardlist from "./Boardlist";
import allData from "../db/allData.json";
import Topad from "./Topad";

export default function Home({ bgcolor, textcolor, incartNum, setIncartNum }) {
  const pagination1 = {
    clickable: true,
    renderBullet: function(index, className) {
      return `<span class="${className}">${allData.mainRWDbanner.bannerData[index].alt}</span>`;
    },
  };
  return (
    <div style={{ background: bgcolor, color: textcolor }}>
      <div className="mainvisual">
        <SwiperBanner
        datakey={allData.mainRWDbanner}
        viewslides={1}
        pagination={pagination1}
        hasrwd={true}
        ></SwiperBanner>
      </div>
      <Topad className='d-sm-none'></Topad>
      <Boardlist incartNum={incartNum} setIncartNum={setIncartNum}></Boardlist>
    </div>
  );
}
