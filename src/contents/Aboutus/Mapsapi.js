import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, OverlayView } from "@react-google-maps/api";

const MapsAPI = ({ center, containerStyle, markers, mapRef }) => {
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  // Google Maps 로드 완료 후 상태 업데이트
  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsGoogleLoaded(true);
    }
  }, []);

  // 마커 사이즈를 단순 객체로 설정하여 조정(로드때문에)
  const handleMarkerIcon = () => {
    return {
      width: 32,
      height: 32
    };
  };
  

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      onLoad={() => setIsGoogleLoaded(true)} // Google Maps 로드 완료 시 상태 업데이트
    >
      {isGoogleLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center} // 초기 위치
          zoom={18}
          onLoad={(map) => {
            mapRef.current = map; // 지도 참조 저장
          }}>
          {markers.map((marker, index) => (
            <div key={index}>
              <Marker
                position={marker.position}
                icon={{
                  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#214AEE" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                    </svg>
                  `)}`,
                  scaledSize: handleMarkerIcon(),
                }}/>

              <OverlayView
                position={marker.position}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                <div
                  style={{
                    display: "inline-block",
                    background: "#fff",
                    padding: "10px",
                    border: "1px solid #214AEE",
                    borderRadius: "8px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    position: "absolute",
                    transform: "translateY(-200%) translateX(-50%)",
                  }}>
                  <h4 style={{ color: "#214AEE", fontSize: "16px" }}>{marker.title}</h4>
                </div>
              </OverlayView>
            </div>
          ))}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default MapsAPI;
