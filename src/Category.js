import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Product from './ui/Product';
import allcategory from './db/allData.json';
import { supabase } from './api/dbconnect';
import { Btn } from './ui/commonui';

export default function Category({ keyword, incartNum, setIncartNum }) {
  const { cn } = useParams();
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keywordFromUrl = queryParams.get('keyword');
    setSearchKeyword(keywordFromUrl || keyword);
  }, [location.search, keyword]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const { data, error } = await supabase
          .from('productData')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          throw error;
        }

        const filtered = data.map((product) => {
          const saleprice = product.saleprice !== null && !isNaN(parseInt(product.saleprice))
            ? parseInt(product.saleprice)
            : parseInt(product.originprice);

          return {
            ...product,
            saleprice: saleprice,
          };
        }).filter((product) => {
          const matchesCategory = cn ? product.category === cn : true;
          const matchesKeyword = searchKeyword
            ? product.prodName.toLowerCase().includes(searchKeyword.toLowerCase())
            : true;

          return matchesCategory && matchesKeyword;
        });

        setFilteredProducts(filtered);
      } catch (err) {
        setError('상품 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchKeyword, cn]);

  const getCategoryTitle = (cn) => {
    return (
      allcategory?.navdata?.category?.submenu?.find((v) => v.linkto === cn)
        ?.title || '전체 상품'
    );
  };

  const getSearchTitle = (keyword) => {
    if (keyword) {
      return `'${keyword}'의 검색결과`;
    }
    return getCategoryTitle(cn);
  };

  if (loading) {
    return <div className='vh-100 d-flex text-center align-items-center justify-content-center'>불러오는 중...</div>;
  }

  if (error) {
    return <div className='vh-100 d-flex text-center align-items-center justify-content-center'>{error}</div>;
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="container">
        <h2 className="categorytitle">{getSearchTitle(searchKeyword)}</h2>

        <ul className="d-flex flex-wrap justify-content-center justify-content-xl-start mytab">
          <li className={`d-flex justify-content-center align-items-center ${!cn ? 'active' : ''}`}>
            <Link to="/products">전체 상품</Link>
          </li>
          {allcategory.navdata.category.submenu.map((v) => (
            <li
              key={v.linkto}
              className={`d-flex justify-content-center align-items-center ${cn === v.linkto ? 'active' : ''}`}
            >
              <Link to={`/products/${v.linkto}`}>{v.title}</Link>
            </li>
          ))}
        </ul>

        <p className="totalQuan">총 {filteredProducts.length}건</p>
        {filteredProducts.length === 0 ? (
          <div className="text-center d-flex flex-column align-items-center justify-content-center gap-2 mt50 mb50 pb-5">
            <p>상품이 없습니다.</p>
            <p className='mb-2'>청량마켓몰은 여러분이 원하는 상품을 들여오기 위해 노력하겠습니다!</p>
            <Btn version="v1">상품 문의하기</Btn>
          </div>
        ) : (
          <>
        <div className="row align-items-center">
          {filteredProducts.map((product) => (
            <Product
              key={product.id}
              rowclass="col-6 col-lg-4 col-xl-3"
              prdId={product.id}
              img={`/assets/img/product/${product.img}.jpg`}
              prodName={product.prodName}
              store={product.store}
              originprice={product.originprice}
              saleprice={product.saleprice}
              promobadge={product.promobadge}
              incartNum={incartNum}
              setIncartNum={setIncartNum}
            />
          ))}
        </div>
        </>
        )}
      </div>
    </div>
  );
}
