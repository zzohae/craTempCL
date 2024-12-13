import React, { useEffect, useState } from 'react';
import BestProduct from '../ui/BestProduct';
import allData from "../db/allData.json";
import Movetool from '../ui/Mtitle'
import { supabase } from '../api/dbconnect';

export default function Best({incartNum, setIncartNum}) {
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: productData, error: productError } = await supabase
          .from('productData')
          .select('*');

        const { data: reviewData, error: reviewError } = await supabase
          .from('reviewData')
          .select('*');

        if (productError || reviewError) {
          console.error('Error fetching data:', productError || reviewError);
          return;
        }

        // 해당 로직은 계산의 횟수를 최소화하는 방식으로 설계되었습니다.
        // 1. 각 제품당 리뷰 개수
        const productReviewCount = reviewData.reduce((acc, review) => {
          acc[review.productID] = (acc[review.productID] || 0) + 1;
          return acc;
        }, {});

        // 2. 상위 3개 제품 선택
        const sortedProducts = productData
          .map((product) => ({
            ...product,
            reviewCount: productReviewCount[product.id] || 0,
          }))
          .sort((a, b) => b.reviewCount - a.reviewCount)
          .slice(0, 3);

        // 3. 베스트 제품에 대한 평균 평점
        const productRatings = reviewData.reduce((acc, review) => {
          acc[review.productID] = (acc[review.productID] || []).concat(review.rating);
          return acc;
        }, {});

        // 4. 평균 평점을 제품 데이터에 결합
        const productsWithRatings = sortedProducts.map((product) => {
          const productReviews = productRatings[product.id] || [];
          const avgRating = productReviews.length
            ? productReviews.reduce((sum, rating) => sum + rating, 0) / productReviews.length
            : 0;
          
          return {
            ...product,
            avgRating,
          };
        });

        setBestProducts(productsWithRatings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container d-flex flex-row align-items-start justify-content-center bestprod'>
      <div className='row'>
        <Movetool textColor='#214aee' h2size='34px'>{allData.mainPagetitle[1].title}</Movetool>
        {bestProducts.map((v, index) => (
          <BestProduct
            key={index}
            rowclass='col-12 col-md-4 d-flex flex-row flex-md-column align-items-center align-items-md-start'
            prdId={v.id}
            promobadge={v.promobadge}
            img={`/assets/img/product/${v.img}.jpg`}
            prodName={v.prodName}
            store={v.store}
            originprice={v.originprice}
            saleprice={v.saleprice}
            mB='10px'
            rating={parseFloat(v.avgRating.toFixed(1))}
            incartNum={incartNum}
            setIncartNum={setIncartNum}
          />
        ))}
      </div>
  </div>
  );
}