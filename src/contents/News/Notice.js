import React, { useEffect, useState } from 'react';
import { supabase } from '../../api/dbconnect';
import { Link } from 'react-router-dom';
import Mypagination from '../../ui/Mypagination';

export default function Notice() {
  const [notices, setNotices] = useState([]);
  const [activeNotices, setActiveNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const noticesPerPage = 5;

  useEffect(() => {
    const fetchNotices = async () => {
      // 총 개수
      const { count, error: countError } = await supabase
        .from('notices')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        console.error('Error fetching count:', countError);
      } else {
        setTotalCount(count);
      }

      // 상단노출공지
      const { data: activeData, error: activeError } = await supabase
        .from('notices')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (activeError) {
        console.error('Error fetching active notices:', activeError);
      } else {
        setActiveNotices(activeData);
      }

      // 모든공지
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false })
        .range((currentPage - 1) * noticesPerPage, currentPage * noticesPerPage - 1);

      if (error) {
        console.error('Error fetching notices:', error);
      } else {
        setNotices(data);
      }
    };

    fetchNotices();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalCount / noticesPerPage);

  return (
    <div>
      <div className='mt50'>
      <p className='totalQuan'>총 {totalCount}개</p>
      <ul className='noticelist d-flex flex-column'>
        <li className='noticeitem noticeHd d-none d-md-flex'>
            <p className='postNum'>글번호</p>
            <h3 className='text-center'>제목</h3>
            <p className='createdAt'>작성일</p>
            <p className='view d-none d-md-block'>조회수</p>
        </li>
        {/* 상단노출공지 */}
        {activeNotices.map((notice) => (
          <li key={notice.id} className='noticeitem d-flex align-items-center justify-content-start justify-content-md-between active'>
            <p className='postNum'><span>공지</span></p>
            <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mobilewrap'>
              <h3><Link>{notice.title}</Link></h3>
              <p className='createdAt ms-2 ms-md-0'>{new Date(notice.created_at).toLocaleDateString()}</p>
            </div>
            <p className='view d-none d-md-block'>조회수</p>
          </li>
        ))}

        {/* 모든공지 */}
        {notices.map((notice, index) => (
          <li key={notice.id} className='noticeitem d-flex align-items-center justify-content-start justify-content-md-between'>
            <p className='postNum'>{totalCount - (currentPage - 1) * noticesPerPage - index }</p>
            <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mobilewrap'>
              <h3 className='normalTitle'><Link>{notice.title}</Link></h3>
              <p className='createdAt ms-2 ms-md-0'>{new Date(notice.created_at).toLocaleDateString()}</p>
            </div>
            <p className='view d-none d-md-block'>조회수</p>
          </li>
        ))}
      </ul>
      </div>

      {/* Pagination */}
      <Mypagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}