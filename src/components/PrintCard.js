// src/components/PrintCard.js
import React from 'react';
import styles from '../styles/printCard.module.css'

const PrintCard = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.printCard}>
      <button onClick={handlePrint}>Print Card</button>
    </div>
  );
};

export default PrintCard;
