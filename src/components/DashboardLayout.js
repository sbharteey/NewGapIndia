// src/components/DashboardLayout.js
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Import the Link component
import styles from '../styles/dashboardLayout.module.css'; // Import your CSS module

const DashboardLayout = ({ children }) => {
  const router = useRouter();

  const navigateToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Admin Dashboard</h1>
        <button className={styles.homeButton} onClick={navigateToDashboard}>
          Dashboard Home
        </button>
      </header>
      <nav className={styles.nav}>
        {/* Use Link components for navigation */}
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            {/* Use the `href` attribute with the `Link` component */}
            <Link href="/dashboard/content" passHref>
              Content
            </Link>
          </li>
          <li className={styles.navItem}>
            {/* Use the `href` attribute with the `Link` component */}
            <Link href="/dashboard/settings" passHref>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default DashboardLayout;
