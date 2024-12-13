import React from 'react'

export default function Mypagination({ currentPage, totalPages, onPageChange }) {
  const pagesPerGroup = 3;

  const startPage = Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className='d-flex justify-content-center align-items-center myPagination'>
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        맨 처음
      </button>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M15 8H1" stroke="#214AEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 15L1 8L8 1" stroke="#214AEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* 페이지 그룹 */}
      {[...Array(endPage - startPage + 1)].map((_, index) => {
        const page = startPage + index;
        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1 8H15" stroke="#214AEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 1L15 8L8 15" stroke="#214AEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        맨 끝
      </button>
    </div>
  )
}
