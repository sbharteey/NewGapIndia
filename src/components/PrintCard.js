// src/components/PrintCard.js
import React from 'react';

const PrintCard = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="printCard">
      <button onClick={handlePrint}>Print Card</button>
    </div>
  );
};

export default PrintCard;
