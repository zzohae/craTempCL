import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as Searchicon } from '../svg/searchicon.svg';

export default function Searchbox({ keyword, setKeyword }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keywordFromUrl = queryParams.get('keyword');
    
    if (!keywordFromUrl && location.pathname.includes("/products")) {
      setKeyword('');
    }
  }, [location.pathname, location.search, setKeyword])

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && keyword.trim() !== '') {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const handleSearchClick = () => {
    if (keyword.trim() !== '') {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    
      <div className='search-box d-none d-lg-flex'>
        <input
          type="text"
          placeholder='검색어를 입력하세요'
          className='d-none d-lg-block'
          value={keyword}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <Searchicon width='30' height='30' onClick={handleSearchClick} />
      </div>
  );
}
