//  src/components/Navbar.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/vision">Vision</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/manifesto">Manifesto</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/membership">Membership</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/donation">Donation</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/offices">Offices</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
