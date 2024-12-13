import React from 'react';
import { StoreTag } from '../../ui/commonui';
import { ReactComponent as Callnum } from '../../svg/util/phone.svg';

export default function Storelist({ stores, onStoreClick, storeRefs  }) {
  return (
    <div className='storelistBox'
    style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {stores.map((store, index) => (
        <div
          key={index}
          ref={(el) => (storeRefs.current[store.title] = el)}
          className="storebox d-flex gap-3 pb-3 mt-2"
          style={{
            width: '100%',
            cursor: 'pointer', 
          }}
          onClick={() => onStoreClick(store)} >
          <div
            className="img d-flex align-items-center justify-content-center"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '10px',
              color: '#fff',
              flexShrink: 0,
            }}>
            <img
              src={store.storeimg}
              alt="매장 이미지"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px',
              }}/>
          </div>

          <div className="info-box w-100 d-flex flex-column" style={{ flexGrow: 1, gap: '0.625rem' }}>
            {/* 상호명, 위치 */}
            <div className="d-flex justify-content-between">
              <h3 className="fs-h3" style={{ color: '#333' }}>{store.title}</h3>
              <StoreTag type="location">{store.location}</StoreTag>
            </div>

            {/* 영업 상태, 시간 */}
            <div className="d-flex gap-1 align-items-center">
              <StoreTag type={store.isOpen ? 'open' : 'close'}>
                {store.isOpen ? '영업중' : '영업전'}
              </StoreTag>
              <h6 className="fs-h6" style={{ color: '#666' }}>{store.opentime}</h6>
            </div>

            {/* 매장번호 */}
            <div className="d-flex gap-1 align-items-center">
              <Callnum />
              <h6 className="fs-h6" style={{ color: '#666' }}>{store.number}</h6>
            </div>

            {/* 판매 물품 */}
            <h3 className="fs-h4" style={{ color: '#333', wordBreak: 'keep-all' }}>{store.items}</h3>

            {/* 결제 수단 */}
            <div className="d-flex flex-wrap gap-1 align-items-center">
              {store.Payment.map((payment, idx) => (
                <StoreTag key={idx} type="close">#{payment}</StoreTag>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
