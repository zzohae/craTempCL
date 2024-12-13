import React, { useState, useRef, useEffect } from "react";
import Movetool from '../../ui/Mtitle';
import Searchbox from '../../ui/Searchbox';
import storeDB from '../../db/storeData.json';
import Storelist from './Storelist';
import MapsAPI from "./Mapsapi";

export default function StoreInfo() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [markers, setMarkers] = useState([
    {
      position: { lat: 37.581127, lng: 127.043834 },
      title: "청량리종합시장",
    }
  ]);
  const mapRef = useRef(null);
  const storeRefs = useRef({});

  // 검색 기능: 검색된 매장 필터링
  useEffect(() => {
    if (searchKeyword) {
      const targetStore = storeDB.find((store) =>
        store.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      if (targetStore && storeRefs.current[targetStore.title]) {
        // 서치 시 스크롤 이동이었으나(아래코드) 필터링되는것으로 변경됨.
        // storeRefs.current[targetStore.title].scrollIntoView({
        //   behavior: "smooth",
        // });
      }
    }
  }, [searchKeyword]);
  

  // 탭 필터링
  const filteredStores = storeDB.filter((store) =>
    activeTab === "all" ? true : store.category === activeTab
  );

  const searchedStores = filteredStores.filter((store) => {
    const titleLower = store.title.toLowerCase();
    const keywordLower = searchKeyword.toLowerCase();

    return (
      searchKeyword === "" || 
      titleLower.includes(keywordLower) || 
      titleLower.split('').some((_, idx) =>
        titleLower.slice(idx).startsWith(keywordLower)
      )
    );
  });

  // Storelist 클릭 이벤트(마커 추가 및 지도 중심 이동)
  const handleStoreClick = (store) => {
    const newLat = store.lat || 37.581127;
    const newLng = store.lng || 127.043834;
  
    setMarkers([
      {
        position: { lat: 37.581127, lng: 127.043834 }, // 기본 마커
        title: "청량리종합시장",
      },
      {
        position: { lat: newLat, lng: newLng }, // 클릭한 매장의 마커
        title: store.title,
      },
    ]);
  
    // 지도 중심 이동
    if (mapRef.current) {
      setTimeout(()=>{
        mapRef.current.setCenter({
          lat: newLat,
          lng: newLng,
        });
      })
    }
  };
  
  
  

  return (
    <div className='container storeinfo' style={{ padding: '0 0 150px 0' }}>
      <Movetool textColor='#214aee' h2size='34px'>매장 소개</Movetool>

      {/* 검색 및 탭 */}
      <div className="row w-100 mt-3 gx-2">
        <div className="col-5 ps-0 pe-4">
          <Searchbox
            keyword={searchKeyword}
            setKeyword={setSearchKeyword}
            className='order-0 order-lg-1 mb-2'/>

          <div className="mytab" style={{ borderBottom: '0', padding: '0', marginBottom: '0' }}>
            <ul className="mt-2 mb-4 d-flex list-unstyled">
              <li className={`me-2 px-3 py-2 ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
                style={{ cursor: "pointer" }}>
                전체
              </li>
              <li className={`me-2 px-3 py-2 ${activeTab === "produce" ? "active" : ""}`}
                onClick={() => setActiveTab("produce")}
                style={{ cursor: "pointer" }}>
                농산물
              </li>
              <li className={`me-2 px-3 py-2 ${activeTab === "seafood" ? "active" : ""}`}
                onClick={() => setActiveTab("seafood")}
                style={{ cursor: "pointer" }}>
                수산물
              </li>
              <li className={`me-2 px-3 py-2 ${activeTab === "meat" ? "active" : ""}`}
                onClick={() => setActiveTab("meat")}
                style={{ cursor: "pointer" }}>
                육류
              </li>
              <li className={`px-3 py-2 ${activeTab === "another" ? "active" : ""}`}
                onClick={() => setActiveTab("another")}
                style={{ cursor: "pointer" }}>
                기타
              </li>
            </ul>
          </div>

          <div style={{
              height: '500px',
              overflowY: 'auto',
              paddingRight: '0.8rem',
              scrollbarGutter: 'stable',
            }}>
            <Storelist
              stores={searchedStores}
              onStoreClick={handleStoreClick}
              storeRefs={storeRefs} // 참조 전달
            />
          </div>
        </div>

        {/* 지도 API */}
        <div
          className="col-7"
          style={{ padding: '0', borderRadius: '8px', overflow: 'hidden' }}>
          <MapsAPI
            center={{ lat: 37.581127, lng: 127.043834 }}
            containerStyle={{ width: '100%', height: '100%' }}
            markers={markers}
            mapRef={mapRef}/>
        </div>
      </div>
    </div>
  );
}
