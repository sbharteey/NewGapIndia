// src/components/Header.js
import React from 'react';
import styles from '../styles/header.module.css';
import Image from 'next/image';
const Header = () => {
  return (
    <header className={styles.header}>
      <h1> Welcome to&#160;: GAREEB AADMI PARTY</h1>
      <Image src="/images/sb small.png"
       alt="sb pic"
        width={100}
         height={100}
          />
      
      {/* Add your header content here */}
    </header>
  );
};

export default Header;
