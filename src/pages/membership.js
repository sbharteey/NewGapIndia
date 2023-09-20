// src/pages/membership.js
import React from 'react';
import Head from 'next/head';
import Layout from '../app/layout';
import MembershipForm from '../components/MembershipForm';
import styles from '../styles/membership.module.css';
const MembershipPage = () => {
  return (
    <Layout pageTitle="Membership">
      <Head>
        <title>Gareeb Aadmi Party/membership</title>
        <meta
          name="online membership form of Gareeb Aadmi Party"
          content="Membership Form for GAP India"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MembershipForm />
    </Layout>
  );
};

export default MembershipPage;
