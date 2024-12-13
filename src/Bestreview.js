import React from 'react'
import { Starwrap } from './ui/commonui'

export default function Bestreview({star, userID, reviewContent, createdAt}) {
  return (
    <div className='bestReviewcont'>
      <div className='contTop'>
        <div className='d-flex align-items-center'>
        <p className='userid'>{userID}</p>
        <Starwrap rating={star}></Starwrap>
        </div>
        <p className='bestreviewbadge'>BEST</p>
      </div>
      <div className='contBot'>
        <div className='col-12 col-xl-6'>
        <img src="https://via.placeholder.com/170x170" alt=""  />
        </div>
        <ul className='col-12 col-xl-6'>
          <li>{reviewContent}</li>
          <li>{createdAt}</li>
        </ul>
      </div>
    </div>
  )
}
