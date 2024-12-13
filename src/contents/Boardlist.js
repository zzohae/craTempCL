import React from 'react'
import MdsPick from '../MdsPick'
import Best from '../layout/Best'
import Mapbanner from '../Mapbanner'
import Livecom from '../Livecom'
import ReviewSlider from '../ReviewSlider'


export default function Boardlist( {incartNum, setIncartNum} ) {
  return (
    <div className='d-flex flex-column align-items-center overflow-hidden boardlist'>
      <MdsPick></MdsPick>
      <Best incartNum={incartNum} setIncartNum={setIncartNum}></Best>
      <Mapbanner></Mapbanner>
      <Livecom incartNum={incartNum} setIncartNum={setIncartNum}></Livecom>
      <ReviewSlider></ReviewSlider>
    </div>
  )
}
