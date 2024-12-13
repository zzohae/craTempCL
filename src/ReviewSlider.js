import React, { useEffect, useState } from 'react';
import Movetool from './ui/Mtitle';
import allData from './db/allData.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Product from './ui/Product';
import { supabase } from './api/dbconnect';
import { Starwrap } from './ui/commonui';

export default function ReviewSlider() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState({});
  const [averageRatings, setAverageRatings] = useState({});

  useEffect(() => {
    async function fetchData() {
      const { data: productData } = await supabase
        .from('productData')
        .select('*');
        
      const { data: reviewData } = await supabase
        .from('reviewData')
        .select('*')
        .in('productID', productData.map(product => product.id))
        .order('likes', { ascending: false });

      const shownReviews = {};
      const ratings = {};

      const productsWithReviews = productData.filter((product) => {
        const filteredReviews = reviewData.filter(
          (review) => review.productID === product.id
        );

        if (filteredReviews.length > 0) {
          shownReviews[product.id] = filteredReviews.slice(0, 2);

          const totalRating = filteredReviews.reduce((sum, review) => sum + review.rating, 0);
          const averageRating = totalRating / filteredReviews.length;
          ratings[product.id] = averageRating;
        }

        return filteredReviews.length > 0;
      });

      setReviews(shownReviews);
      setProducts(productsWithReviews);
      setAverageRatings(ratings);
    }
    fetchData();
  }, []);

  return (
    <div className='container d-flex flex-column align-items-start justify-content-center reviewCont'>
      <Movetool textColor='#214aee' h2size='34px'>
        {allData.mainPagetitle[3].title}
      </Movetool>
      <div className='w-100 mainreviewwrap mb150'>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          autoplay={{
            delay: 6000,
            disableOnInteraction: true,
          }}
          draggable={true}
          loop={true}
          slidesPerView={1.5}
          breakpoints={{
            576: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <Product
                rowclass=''
                prdId={product.id}
                promobadge={product.promobadge}
                img={`/assets/img/product/${product.img}.jpg`}
                prodName={product.prodName}
                store={product.store}
                originprice={product.originprice}
                saleprice={product.saleprice}
                mB='0px'
              />
              <div className='d-flex align-items-center rating'>
              <Starwrap rating={parseFloat(averageRatings[product.id].toFixed(1))}></Starwrap>
              <span>{averageRatings[product.id].toFixed(1)}</span>
              </div>
              <div className='d-flex flex-column align-items-start reviewWrap'>
                {reviews[product.id] && reviews[product.id].map((review, idx) => (
                  <div key={idx} className='minireview'>
                    <img src='https://via.placeholder.com/80' alt='' />
                    <p>{review.reviewContent}</p>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
