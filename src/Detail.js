import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "./api/dbconnect";
import QuantityCounter from "./QuantityCounter";
import { Btn } from "./ui/commonui";
import Product from "./ui/Product";
import Bestreview from "./Bestreview";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

export default function Detail() {
  const formatNum = (num) => {
    return num.toLocaleString();
  };

  const { id } = useParams();

  const [targetProduct, setTargetProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [targetReviews, setTargetReviews] = useState([]);
  const [bestReviews, setBestReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("detail");
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchProductData = async () => {
    const { data: products } = await supabase
      .from("productData")
      .select("*")
      .eq("id", id);
  
    if (products.length > 0) {
      const product = products[0];
      setTargetProduct(product);
  
      if (product.saleprice === null) {
        product.saleprice = product.originprice;
      }
  
      const { data: related } = await supabase
      .from("productData")
      .select("*")
      .eq("category", product.category)
      .order("id", { ascending: true })
      .limit(10);

      const filteredRelated = related
        .filter((item) => item.id !== product.id)
  
      setRelatedProducts(filteredRelated);
    }
  };


  const fetchReviewData = async () => {
    try {
      const { data: reviews } = await supabase
        .from("reviewData")
        .select("*")
        .eq("productID", id);

      setTargetReviews(reviews);

      const sortedReviews = reviews.sort((a, b) => b.likes - a.likes);
      setBestReviews(sortedReviews.slice(0, 3));
    } catch (error) {
      console.error("리뷰 데이터 로딩 오류:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchReviewData();
  }, [id]);

  const calculateAverageRating = () => {
    if (targetReviews.length === 0) return 0;
    const totalRating = targetReviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / targetReviews.length).toFixed(1);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!targetProduct) {
    return <div>상품을 불러오는 중입니다...</div>;
  }

  const discount = parseInt(
    ((targetProduct.originprice - targetProduct.saleprice) /
      targetProduct.originprice) *
      100
  );
  return (
    <div className="d-flex flex-column align-items-center detailcont">
      <div className="container mycontainer">
        <div className="row">
          <div
            className="prodInfoDetail d-flex wrap"
            style={{ paddingBottom: "60px", borderBottom: "2px solid #214AEE" }}
          >
            <div className="col-12 col-lg-6">
              <img
                className="tempimg"
                src={`/assets/img/product/${targetProduct.img}.jpg`}
                alt={targetProduct.prodName}
              />
            </div>
            <div className="col-12 col-lg-6">
              <ul className="detailInfo">
                <li className="d-flex flex-column align-items-start">
                  <div>
                    {targetProduct.store}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 10 18"
                      fill="none"
                    >
                      <path
                        d="M1 17L9 9L1 1"
                        stroke="#aaa"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3>{targetProduct.prodName}</h3>
                </li>
                <li>
                  <span className="average-rating">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                    >
                      <path
                        d="M7.32317 1.3234C7.73583 0.487255 8.92817 0.487246 9.34083 1.3234L11.3058 5.30484L15.6996 5.94329C16.6223 6.07737 16.9908 7.21136 16.3231 7.8622L13.1437 10.9613L13.8942 15.3374C14.0518 16.2564 13.0873 16.9572 12.2619 16.5233L8.332 14.4572L4.4021 16.5233C3.57678 16.9572 2.61216 16.2564 2.76978 15.3374L3.52033 10.9613L0.340967 7.8622C-0.326741 7.21136 0.0417087 6.07737 0.964459 5.94329L5.35823 5.30484L7.32317 1.3234Z"
                        fill="#FF4A11"
                      />
                    </svg>
                    ({calculateAverageRating()})
                  </span>
                  <Link
                    className="totalReview"
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("review");
                      scrollToSection("review");
                    }}
                  >
                    후기 {targetReviews.length}건
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 10 18"
                      fill="none"
                    >
                      <path
                        d="M1 17L9 9L1 1"
                        stroke="#aaa"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
                <li className="d-flex flex-column align-items-start">
                {discount > 0 && (
                    <div className="origin detail">
                      {formatNum(targetProduct.originprice)}원
                    </div>
                  )}
                  <div className="d-flex gap-1">
                    {discount > 0 && (
                    <strong className="dcPercent detail">{discount}%</strong>
                    )}
                    <em className="saleprice detail d-block d-md-inline d-lg-block d-xl-inline">
                      {formatNum(targetProduct.saleprice)}
                      <span>원</span>
                    </em>
                    <button>쿠폰받기</button>
                  </div>
                </li>
                <div className="minorinfo d-flex flex-column">
                  <dl>
                    <dt>판매 단위</dt>
                    <dd>{targetProduct.sellUnit}</dd>
                  </dl>
                  <dl>
                    <dt>중량 · 용량</dt>
                    <dd>{targetProduct.volume}</dd>
                  </dl>
                  <dl>
                    <dt>포장 타입</dt>
                    <dd>임시</dd>
                  </dl>
                </div>
              </ul>
              <form action="" className="d-flex flex-column">
                <select name="" id="">
                  <option value="">우리시장 빠른배송</option>
                  <option value="">일반배송</option>
                </select>
                <div className="d-flex flex-column decision">
                  <p className="w-100">
                    {targetProduct.prodName} ({targetProduct.volume})
                  </p>
                  <QuantityCounter
                    stock={targetProduct.stock}
                    saleprice={targetProduct.saleprice}
                    originprice={targetProduct.originprice}
                  />
                </div>
                <div className="d-flex submitBtn">
                  <Btn
                    version="v1"
                    page="detail"
                    style={{ padding: "0", width: "60px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="27"
                      viewBox="0 0 24 27"
                      fill="none"
                    >
                      <path
                        d="M15.1944 0.897949C17.4879 0.897949 19.3472 2.75721 19.3472 5.05073C19.3472 5.87432 19.1075 6.64192 18.6939 7.28753L21.9028 7.28684C22.785 7.28684 23.5 8.00193 23.5 8.88406V13.3563C23.5 14.1286 22.9518 14.7728 22.2234 14.9213L22.2222 22.3007C22.2222 24.5151 20.4889 26.3247 18.3051 26.447L18.0694 26.4535H5.93056C3.71613 26.4535 1.90651 24.7202 1.78435 22.5364L1.77778 22.3007L1.77784 14.9216C1.04877 14.7736 0.5 14.1291 0.5 13.3563V8.88406C0.5 8.00193 1.2151 7.28684 2.09722 7.28684L5.30605 7.28753C4.89253 6.64192 4.65278 5.87432 4.65278 5.05073C4.65278 2.75721 6.51203 0.897949 8.80556 0.897949C10.0904 0.897949 11.239 1.48146 12.0008 2.39795C12.761 1.48146 13.9096 0.897949 15.1944 0.897949ZM11.0417 14.9522H3.69444V22.3007C3.69444 23.474 4.59797 24.4362 5.74716 24.5294L5.93056 24.5368H11.0417V14.9522ZM20.3056 14.9522H12.9583V24.5368H18.0694C19.2427 24.5368 20.2049 23.6333 20.2981 22.4841L20.3056 22.3007V14.9522ZM11.0417 9.20351H2.41667V13.0368L11.0417 13.0356V9.20351ZM21.5833 13.0368V9.20351H12.9583V13.0356L21.5833 13.0368ZM15.1944 2.81462C13.9595 2.81462 12.9583 3.81576 12.9583 5.05073V7.28556H15.2251L15.3778 7.27943C16.527 7.18614 17.4306 6.22394 17.4306 5.05073C17.4306 3.81576 16.4294 2.81462 15.1944 2.81462ZM8.80556 2.81462C7.57058 2.81462 6.56944 3.81576 6.56944 5.05073C6.56944 6.22394 7.47297 7.18614 8.62216 7.27943L8.77489 7.28556H11.0417V5.05073L11.0343 4.86733C10.941 3.71815 9.97881 2.81462 8.80556 2.81462Z"
                        fill="#666666"
                      />
                    </svg>
                  </Btn>
                  <div className="d-flex">
                    <Btn version="v1" page="detail">
                      장바구니
                    </Btn>
                    <Btn version="v2" page="detail">
                      구매하기
                    </Btn>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="d-flex col-12 justify-content-between gap-2 relatedProd">
          <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          draggable={true}
          loop={false}
          slidesPerView={2.5}
          slidesPerGroup={1}
          breakpoints={{
            576: {
              slidesPerView: 3.5,
              loop: false,
            },
            992: {
              slidesPerView: 5,
              loop: true,
            },
          }}
        >
          {relatedProducts.map((p, index) => (
            <SwiperSlide key={index}>
              <Product
                key={index}
                rowclass=""
                prdId={p.id}
                promobadge={p.promobadge}
                img={`/assets/img/product/${p.img}.jpg`}
                prodName={p.prodName}
                store={p.store}
                originprice={p.originprice}
                saleprice={p.saleprice}
                mB="60px"
              />
            </SwiperSlide>
          ))}
        </Swiper>
          </div>
          <div>
            <ul className="d-flex align-items-end sticky-top bg-white stickynavbar">
              <li className="col-3">
                <Link
                  to="#"
                  className={`nav-link ${
                    activeTab === "detail" ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("detail");
                    scrollToSection("detail");
                  }}
                >
                  상세정보
                </Link>
              </li>
              <li className="col-3">
                <Link
                  to="#"
                  className={`nav-link ${
                    activeTab === "review" ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("review");
                    scrollToSection("review");
                  }}
                >
                  상품후기
                </Link>
              </li>
              <li className="col-3">
                <Link
                  to="#"
                  className={`nav-link ${
                    activeTab === "question" ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("question");
                    scrollToSection("question");
                  }}
                >
                  상품문의
                </Link>
              </li>
              <li className="col-3">
                <Link
                  to="#"
                  className={`nav-link ${
                    activeTab === "purchase" ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("purchase");
                    scrollToSection("purchase");
                  }}
                >
                  구매안내
                </Link>
              </li>
            </ul>

            <div className="content row">
              <div
                id="detail"
                className="section detailsect mt-4 col-12"
                style={{ height: "auto", paddingTop: "110px" }}
              >
                <div
                  className={`image-container ${isExpanded ? "expanded" : ""}`}
                >
                  <img
                    src="https://via.placeholder.com/1320x2500"
                    alt="Product"
                    className={`product-image ${isExpanded ? "expanded" : ""}`}
                    style={{ backgroundColor: "orange" }}
                  />
                </div>

                <button className="morebtn btn-primary" onClick={toggleExpand}>
                  {isExpanded ? "간략히 보기" : "상품 정보 더 보기"}
                  {isExpanded ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="8"
                      viewBox="0 0 15 8"
                      fill="none"
                    >
                      <path
                        d="M1.5 7L7.5 1L13.5 7"
                        stroke="#214AEE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="8"
                      viewBox="0 0 15 8"
                      fill="none"
                    >
                      <path
                        d="M1.5 0.999999L7.5 7L13.5 1"
                        stroke="#214AEE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div
                id="review"
                className="section mt-4 col-12"
                style={{ height: "auto", paddingTop: "160px" }}
              >
                <h3>상품 후기</h3>
                <div
                  className="d-flex align-items-center flex-column flex-md-row"
                  style={{ gap: "20px", overflowX: 'scroll' }}
                >
                  {bestReviews.map((r, i) => {
                    return (
                      <Bestreview
                        key={i}
                        star={r.rating}
                        userID={`${r.username.slice(0, 3)}****`}
                        reviewContent={r.reviewContent}
                        createdAt={r.createdAt}
                      ></Bestreview>
                    );
                  })}
                </div>
              </div>
              <div
                id="question"
                className="section mt-4 col-12"
                style={{ height: "1000px", paddingTop: "160px" }}
              >
                <h3>상품 문의</h3>
                <p>상품 문의 내용...</p>
              </div>
              <div
                id="purchase"
                className="section mt-4 col-12"
                style={{ height: "1000px", paddingTop: "160px" }}
              >
                <h3>배송 정보</h3>
                <dl className="d-flex flex-wrap">
                  <div className="d-flex col-12 col-lg-6">
                    <dt className="text-center col-4">배송 방법</dt>
                    <dd className="w-100">신선/냉장/냉동</dd>
                  </div>
                  <div className="d-flex col-12 col-lg-6">
                    <dt className="text-center col-4">배송 지역</dt>
                    <dd className="w-100">
                      전국 지역 (단, 일부 산간벽지 및 도서 지역은 추가 요금이
                      발생할 수 있습니다.)
                    </dd>
                  </div>
                  <div className="d-flex col-12">
                    <dt className="text-center col-4 col-lg-2">배송 안내</dt>
                    <dd className="w-100">
                      <ul>
                        <li>
                          산간벽지나 도서지방은 별도의 추가금액을 지불하셔야
                          하는 경우가 있습니다.
                        </li>
                        <li>
                          고객님께서 주문하신 상품은 입금 확인 후 배송해
                          드립니다. (다만, 상품종류에 따라서 상품의 배송이 다소
                          지연될 수 있습니다.)
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
