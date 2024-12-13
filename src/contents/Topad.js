import React from 'react';

export default function Topad({ className = '' }) {

  return (
    <div className={`top-ad ${className}`}>
      <p className="fs-18 text-center text-white">광고~~~~~~~~~</p>
    </div>
  );
}