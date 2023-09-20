import React from 'react';
import Link from 'next/link';
import styles from '../styles/subnavbar.module.css';

const DonateButton = () => {
  return (
    <Link href="/donation">
      <button className={styles.donateButton}>Donate</button>
    </Link>
  );
};

export default DonateButton;
