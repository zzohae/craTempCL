import React, { useState, useEffect } from 'react'
import Product from './ui/Product';
import allData from "./db/allData.json";
import Movetool from './ui/Mtitle'
import { supabase } from './api/dbconnect';

export default function Livecom({ incartNum, setIncartNum }) {
  const [liveProducts, setLiveProducts] = useState([]);

  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('productData')
          .select('*')
          .eq('onLive', true);

        if (error) {
          throw error;
        }

        const productsWithDiscount = data.map((product) => {
          const saleprice = product.saleprice !== null ? product.saleprice : product.originprice;
          const discount = ((product.originprice - saleprice) / product.originprice) * 100;

          return {
            ...product,
            saleprice,
            discount,
          };
        });

        const sortedProducts = productsWithDiscount.sort((a, b) => b.discount - a.discount);

        setLiveProducts(sortedProducts.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchLiveProducts();
  }, []);

  return (
    <div className='container d-flex flex-column align-items-start justify-content-center livecomCont'>
      <Movetool textColor='#214aee' h2size='34px'>{allData.mainPagetitle[2].title}</Movetool>
      <div className='row livecomCont justify-content-between'>
        <div className='row col-12 col-lg-6 col-xl-7 order-1 order-lg-0 prodwrap p-0 mx-0'>
          {liveProducts.map((v, index) => (
            <Product
              key={index}
              rowclass='col-6'
              prdId={v.id}
              promobadge={v.promobadge}
              img={`/assets/img/product/${v.img}.jpg`}
              prodName={v.prodName}
              store={v.store}
              originprice={v.originprice}
              saleprice={v.saleprice}
              mB='0px'
              incartNum={incartNum}
              setIncartNum={setIncartNum}
            />
          ))}
        </div>
        <div className='col-12 col-lg-6 col-xl-5 order-0 order-lg-1'>
          <div className='liveimg'></div>
        </div>
      </div>
    </div>
  )
}
