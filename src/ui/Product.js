import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { InCartBtn } from './commonui';
import { TagStyle } from './commonui';
import Utilicon from './svg';

export default function Product({rowclass, prdId, img, prodName, store, originprice, saleprice, incartNum, setIncartNum, promobadge = [], mB = '100px' }) {
  const formatNum = (num) => {
    return num.toLocaleString();
  };

  originprice = parseInt(originprice);
  saleprice = saleprice !== null && !isNaN(parseInt(saleprice)) ? parseInt(saleprice) : parseInt(originprice);
  const discount = parseInt((originprice - saleprice) / originprice * 100);

  return (
    <div
      className={`product ${rowclass} position-relative align-self-stretch`}
      style={{ marginBottom: mB }}
    >
      <Link to={`/products/detail/${prdId}`}>
        <div className="position-absolute d-flex mt-2">
          {promobadge && promobadge.includes("new") && (
            <TagStyle type="new">NEW</TagStyle>
          )}
          {promobadge && promobadge.includes("hot") && (
            <TagStyle type="hot">HOT</TagStyle>
          )}
          {promobadge && promobadge.includes("best") && (
            <TagStyle type="best">BEST</TagStyle>
          )}
        </div>
        <img className="prodimg" src={img} alt={prodName} />
      </Link>
      <div className="d-flex justify-content-between align-items-end">
        <dl className="prodInfo d-flex flex-column align-items-start justify-content-between">
          <dt className="productName">{prodName}</dt>
          <dd className="seller mb-1">{store}</dd>
          <dd className="price mt-auto">
            {discount > 0 && (
              <>
                <strong className="dcPercent">{discount}%</strong>
                <span className="origin">{formatNum(originprice)}원</span>
              </>
            )}
            <em className="saleprice d-inline ">
              {formatNum(saleprice)}
              <span>원</span>
            </em>
          </dd>
          <p className='mt-1'>000개 구매중</p>
        </dl>
        <InCartBtn
          svgcolor="#D2D2D2"
          onClick={() => {
            setIncartNum((prev) => {
              const updatedCart = [...prev];

              const existingItemIndex = updatedCart.findIndex(
                (item) => item.prdId === prdId
              );

              if (existingItemIndex !== -1) {
                updatedCart[existingItemIndex].quantity += 1;
              } else {
                updatedCart.push({ prdId, quantity: 1 });
              }

              return updatedCart;
            });
          }}
        >
          <Utilicon.Cart></Utilicon.Cart>
        </InCartBtn>
      </div>
    </div>
  );
}
