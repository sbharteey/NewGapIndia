// src/pages/offices.js
import React from 'react';
import Layout from '../layout';
import LocationSelector from '../components/LocationSelector';
import officesData from '../data/officesLocationData';
import styles from '../../src/styles/offices.module.css';

const OfficesPage = () => {
  const handleFormSubmit = (filteredOfficeBearers) => {
    // Handle the form submission here if needed
    console.log('Filtered office bearers:', filteredOfficeBearers);
  };

  return (
    <Layout pageTitle="Offices Page">
      <div className={`${styles.pageContainer} ${styles.main}`}>
        <h1>All India Location wise Office Bearers  & Address</h1>
        <LocationSelector officesData={officesData} handleFormSubmit={handleFormSubmit} />
      </div>
    </Layout>
  );
};

export default OfficesPage;
