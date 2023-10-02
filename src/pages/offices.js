// src/pages/offices.js
import React from 'react';
import Head from 'next/head';
import Layout from '../app/layout';
import LocationSelector from '../components/LocationSelector';
import styles from '../styles/offices.module.css';
import officesData from '../data/officesLocationData'; // Import your offices data

const OfficesPage = () => {
  const handleFormSubmit = (filteredOfficeBearers) => {
    // Handle the form submission here if needed
    console.log('Filtered office bearers:', filteredOfficeBearers);
  };

  return (
    <Layout pageTitle="Offices">
      <Head>
        <title>Gareeb Aadmi Party/offices</title>
        <meta
          name="Office Selection Page"
          content="Select your office location"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LocationSelector officesData={officesData} handleFormSubmit={handleFormSubmit} />
    </Layout>
  );
};

export default OfficesPage;
