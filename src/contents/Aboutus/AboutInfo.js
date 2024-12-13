import React, { useState, useEffect } from "react";
import { YellowTag } from "../../ui/commonui";
import InfoHistory from './InfoHistory';
import Movetool from '../../ui/Mtitle'


export default function AboutInfo() {
  const images = [
    "https://cheongnyangnijeontongmarket.com/theme/basic/img/main/subvisual01.jpg", // 큰 이미지
    "https://cheongnyangnijeontongmarket.com/theme/basic/img/main/subvisual01.jpg",
    "https://cheongnyangnijeontongmarket.com/theme/basic/img/main/subvisual00.jpg",
    "https://cheongnyangnijeontongmarket.com/theme/basic/img/sub/sub_visual01.jpg",
    "https://cheongnyangnijeontongmarket.com/theme/basic/img/main/subvisual02.jpg",
    "https://cheongnyangnijeontongmarket.com/data/file/gallery/thumb-3551375640_8mKP6WLz_9a9c80258c260365f47f931a300ef2562cf1fef0_835x470.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const [isXlOrSmaller, setIsXlOrSmaller] = useState(window.innerWidth <= 1200);
    useEffect(() => {
      const handleResize = () => {
        setIsXlOrSmaller(window.innerWidth <= 1200);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  return (
    <div className="container p-0">
            <Movetool textColor='#214aee' h2size='34px'>청량리종합시장</Movetool>
            <div className="row gx-3 mt-3">
              <div className="col-12 col-xl-7" style={{ height: "29.625rem", overflow: "hidden" }}>
                <img
                  src={selectedImage}
                  alt="청량리종합시장 이미지"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />
            </div>

              <div className="col-12 col-xl-5 mt-md-3 mt-lg-0 d-flex justify-content-between"
                style={{ flexDirection: "column" }}>
                <div className="order-1 order-xl-0" style={{
                    borderBottom: "2px solid #214AEE",
                    paddingBottom: "30px",
                    marginBottom: "30px",
                    lineHeight: "1.625rem",
                    wordBreak: "keep-all",
                  }}>
                  <span className="fs-h1">&nbsp;청년마켓몰은, </span>
                  서울 동북권의 최대의 전통시장을 보유한 청량리에서 상인들과 방문객 간의
                  소통을 강화하고 온라인과 오프라인을 아우르는 현대적 쇼핑 환경을 구축하여
                  지역 경제 활성화와 전통시장의 성공적인 디지털 전환을 목표로 합니다.
                </div>

                {/* 태그 */}
                <div className="d-flex flex-wrap justify-content-center fs-h5 gap-4 order-2 order-xl-1">
                  <div className="d-flex flex-column justify-content-start gap-3" >
                    <YellowTag>#경동광성상가</YellowTag>
                    <YellowTag>#청량리농수산물시장</YellowTag>
                    <YellowTag>#청량리전통시장</YellowTag>
                  </div>
                  <div className="d-flex flex-column justify-content-start gap-3">
                    <YellowTag>#경동시장</YellowTag>
                    <YellowTag>#청량리도매시장</YellowTag>
                    <YellowTag>#청량리청과물시장</YellowTag>
                  </div>
                  <div className="d-flex flex-column justify-content-start gap-3">
                    <YellowTag>#동서시장</YellowTag>
                    <YellowTag>#청량리종합시장</YellowTag>
                    <YellowTag>#홍릉시장</YellowTag>
                  </div>
                </div>

                {/* 썸네일 */}
                <div className="d-grid d-flex justify-content-between gap-3 mt-4 g-0 order-0 order-xl-2"
                style={{
                  borderTop: isXlOrSmaller ? "none" : "2px solid #214AEE",
                  paddingTop: isXlOrSmaller ? "0" : "30px",
                  marginTop: isXlOrSmaller ? "0" : "30px",
                  borderBottom: isXlOrSmaller ? "2px solid #214AEE" : "none",
                  paddingBottom: isXlOrSmaller ? "30px" : "0",
                  marginBottom: isXlOrSmaller ? "30px" : "0",
                }}>
                  {images.slice(1).map((image, index) => (
                    <div key={index}
                        style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "1 / 1",
                          cursor: "pointer",
                          overflow: "hidden",
                        }} onClick={() => handleThumbnailClick(image)}>
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "5px"
                          }}/>

                        {selectedImage === image && (
                          <div style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: "0.875rem",
                              borderRadius: "5px"
                            }}>
                          </div>
                        )}
                      </div>
                  ))}
                </div>

          </div>
        </div>
        <div>
          <InfoHistory />
        </div>
    </div>
  );
}
