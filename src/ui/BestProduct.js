import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { InCartBtn, TagStyle, Starwrap, Btn } from "./commonui";
import Utilicon from "./svg";

export default function BestProduct({ rowclass, prdId, img, prodName, store, originprice, saleprice, incartNum, setIncartNum, rating, promobadge = [], mB = "100px",
}) {
  const formatNum = (num) => {
    return num.toLocaleString();
  };

  originprice = parseInt(originprice);
  saleprice =
    saleprice !== null && !isNaN(parseInt(saleprice))
      ? parseInt(saleprice)
      : parseInt(originprice);
  const discount = parseInt(((originprice - saleprice) / originprice) * 100);

  return (
    <div
      className={`bestproduct ${rowclass} position-relative`}
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
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end h-100">
        <dl className="prodInfo d-flex flex-column align-items-start justify-content-center justify-content-md-start">
          <dt className="productName">{prodName}</dt>
          <dd className="seller">{store}</dd>
          <dd className="price">
            {discount > 0 && (
              <>
                <strong className="dcPercent">{discount}%</strong>
                <span className="origin">{formatNum(originprice)}원</span>
              </>
            )}
            <em className="saleprice d-inline d-lg-block d-xl-inline">
              {formatNum(saleprice)}
              <span>원</span>
            </em>
          </dd>
          <p>000개 구매중</p>
          <div className="mt-3 order-4 d-flex gap-2 align-items-center">
            <Starwrap rating={rating}></Starwrap>
            <p className="ratingNum">({rating.toFixed(1)})</p>
          </div>
        </dl>
        <div className="order-5 w-100 d-flex d-md-none mobilecart">
        <InCartBtn
          svgcolor="#D2D2D2"
          page="mainbest"
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
          <Btn version="v1" page="mainbest">
            바로 구매
          </Btn>
        </div>
        <InCartBtn
          className="d-none d-md-flex"
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
