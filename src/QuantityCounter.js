import React, { useState } from 'react';

export default function QuantityCounter({ stock, saleprice, originprice }) {
  const [quantity, setQuantity] = useState(1);

  const validSaleprice = saleprice !== null ? saleprice : originprice;

  const increment = (e) => {
    e.preventDefault();
    if (quantity < stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrement = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const totalOriginPrice = originprice * quantity;
  const totalPrice = validSaleprice * quantity;

  return (
    <div className="quantityCont d-flex align-items-center justify-content-between">
      <div className="quantity-counter d-flex align-items-center justify-content-between">
        <button
          className={`btn ${quantity === 1 ? "disabled" : ""}`}
          onClick={decrement}
          disabled={quantity === 1}
          type="button"
        >
          -
        </button>

        <span className="quantity-display">{quantity}</span>

        <button
          className={`btn ${quantity === stock ? "disabled" : ""}`}
          onClick={increment}
          disabled={quantity === stock}
          type="button"
        >
          +
        </button>
      </div>

      <div className="d-flex align-items-end total-price">
        {validSaleprice !== originprice ? (
          <>
            <p className="original-price">
              {totalOriginPrice.toLocaleString()}원
            </p>
            <p className="sale-price">
              {totalPrice.toLocaleString()}
              <span>원</span>
            </p>
          </>
        ) : (
          <p className='sale-price'>{totalOriginPrice.toLocaleString()}<span>원</span></p>
        )}
      </div>
    </div>
  );
}