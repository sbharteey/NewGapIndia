import React from "react";
import Link from 'next/link'; 
import Head from "next/head";
import Layout from "../../app/layout";
import { useRouter } from "next/router";
import styles from "../../styles/officeBearerDetails.module.css";

import { officeBearersData } from "../../models/officeBearersData";

const OfficeBearerDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  // Ensure 'id' is a string and not undefined
  const officeBearerId = typeof id === 'string' ? id : '';

  const findOfficeBearerById = () => {
    return officeBearersData.find((officeBearer) => {
      return officeBearer.data.id === officeBearerId;
    });
  };

  const officeBearer = findOfficeBearerById();

  return (
    <div>
      <Layout>
        <Head>
          <title>Office Bearer Details</title>
          <meta name="description" content={`Details for Office Bearer ${officeBearerId}`} />
        </Head>

        <h1>Office Bearer Details</h1>

        {officeBearer ? (
          <div>
            <h2>{officeBearer.title}</h2>
            <p>Name: {officeBearer.data.name}</p>
            <p>Membership ID: {officeBearer.data.membershipId}</p>
            <p>Mobile No: {officeBearer.data.mobileNo}</p>
          </div>
        ) : (
          <div>
            <p>Office Bearer not found.</p>
            <Link href="/offices">
              <div className={styles.returnLink}>Return to Location Selection</div>
            </Link>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default OfficeBearerDetails;
