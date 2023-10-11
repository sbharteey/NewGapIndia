// src/components/Toaster.js
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import style from '../styles/toaster.module.css';

const CustomToaster = () => {
  return (
    <div>
      <Toaster />
    </div>
  );
};

export default CustomToaster;
