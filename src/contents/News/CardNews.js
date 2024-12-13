import React, { useState, useEffect } from 'react';
import { supabase2 } from '../../api/dbconnect';
import EventCard from '../../ui/EventCard';
import './Event.scss';

const CardNews = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase2
          .from('cardNews')
          .select('*')
          .order('id', { ascending: true });
        if (error) throw error;
        setEvents(data); 
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };
    fetchEvents();
  }, []);

  const totalPages = Math.ceil(events.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="row gx-4 gy-4">
        {currentEvents.map((event) => (
          <EventCard
            key={event.id}
            imgSrc={`/assets/img/cardnews/cardnews_${event.img_number}.jpg`}
            title={event.title}
            period={event.period}
            isExpired={event.isExpired}
          />
        ))}
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

export default CardNews;
