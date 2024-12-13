import React from 'react'
import Movetool from './ui/Mtitle'

export default function Mapbanner() {
  return (
    <div className='container d-flex flex-row align-items-center justify-content-end text-end mapbanner'>
      <div className='maptext'>
      <Movetool textColor='#214aee' h2size='34px' nomargin={true}>청량리종합시장 오시는 길</Movetool>
      <h6>다양한 문화와 특별한 경험,<br />
      청량리 종합시장에 직접 찾아와보세요!</h6>
      <p className='d-none d-sm-block'>지역 주민들의 정성 가득한 수공예품과 함께 <span className='d-inline d-lg-none'><br /></span>신선한 재료로 만든 다양한 먹거리를 즐길 수 있습니다.<br />
      아기자기한 상점들과 활기찬 시장 분위기 속에서, <span className='d-inline d-lg-none'><br /></span>잊지 못할 추억을 만들어보세요!</p>
      </div>
      <img src="/assets/img/map/main_map_lg.jpg" alt="오시는 길" className='d-none d-lg-block' />
      <img src="/assets/img/map/main_map_md.jpg" alt="오시는 길" className='d-none d-sm-block d-lg-none' />
      <img src="/assets/img/map/main_map_sm.jpg" alt="오시는 길" className='d-sm-none' />
    </div>
  )
}
