// src/pages/membership.js
import React from 'react';
import Head from 'next/head';
import Layout from '../layout';
import MembershipForm from '../components/MembershipForm';
import styles from '../../src/styles/membership.module.css';

const MembershipPage = () => {
  return (
    <Layout pageTitle="Membership">
      <Head>
        <title>Gareeb Aadmi Party/membership</title>
        <meta
          name="online membership form of Gareeb Aadmi Party"
          content="Membership Form for GAP India"
        />
      </Head>
      <div className={styles.main}> 
        <p className={styles.membershipTitle}>ONLINE MEMBERSHIP FORM</p>
        <MembershipForm className={styles.membershipForm} />
      </div>
    </Layout>
  );
};

export default MembershipPage;
