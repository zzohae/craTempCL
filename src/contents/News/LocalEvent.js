import React, { useState, useEffect } from 'react';
import EventCard from '../../ui/EventCard';
import { supabase2 } from '../../api/dbconnect';
import './Event.scss';
import Movetool from '../../ui/Mtitle';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  // Supabase에서 이벤트 데이터를 가져오는 함수
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase2
        .from('offEvents')
        .select('id, img_number, title, start_date, end_date')
        .order('id', { ascending: true }); // id 기준 오름차순 정렬

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  const totalPages = Math.ceil(events.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="row gx-4 gy-4">
        {currentEvents.map((event) => {
          const formattedStartDate = new Date(event.start_date).toLocaleDateString();
          const formattedEndDate = new Date(event.end_date).toLocaleDateString();
          const formattedPeriod = `${formattedStartDate} ~ ${formattedEndDate}`;

          return (
            <EventCard
              key={event.id}
              imgSrc={`/assets/img/localevent/localcard_${event.img_number}.jpg`}
              title={event.title}
              period={formattedPeriod}
            />
          );
        })}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center myPagination">
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
            <path d="M15 8H1" stroke="#214AEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 15L1 8L8 1" stroke="#214AEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 8H15" stroke="#214AEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 1L15 8L8 15" stroke="#214AEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          맨 끝
        </button>
      </div>
    </div>
  );
};

export default Event;
