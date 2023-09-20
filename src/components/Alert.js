// src/components/Alert.js
import React from 'react';
import styles from '../styles/alert.module.css';

const Alert = ({ message, type }) => {
  return (
    <div className={`alert alert-${type}`}>
      {message}
    </div>
  );
};

export default Alert;
