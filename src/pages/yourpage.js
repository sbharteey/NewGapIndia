// src/pages/YourPage.js
import React from 'react';
import Layout from '../layout';
import styles from '../styles/globalStyles.module.css';

const YourPage = () => {
  return (
    <Layout pageTitle="Your Page">
      <div className={styles.pageContainer}>
        {/* Your custom page content */}
      </div>
    </Layout>
  );
};

export default YourPage;
