// src/pages/officeBearer/[location].js
import React from "react";
import Link from 'next/link';
import Head from "next/head";
import Layout from "../../layout";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import MembershipCardTemplate from '../../components/MembershipCardTemplate';
import styles from "../../../src/styles/officeBearerLocation.module.css";

const OfficeBearerPage = () => {
  const router = useRouter();
  const { location } = router.query;
  const country = location?.[0] || "Not Specified";
  const state = location?.[1] || "Not Specified";
  const lokSabha = location?.[2] || "Not Specified";
  const vidhanSabha = location?.[3] || "Not Specified";
  const [officeBearers, setOfficeBearers] = useState([]);

  useEffect(() => {
    const fetchOfficeBearers = async () => {
      try {
        const response = await fetch(`/api/queryOfficeBearers?country=${country}&state=${state}&lokSabha=${lokSabha}&vidhanSabha=${vidhanSabha}`);
        if (response.ok) {
          const data = await response.json();
          setOfficeBearers(data);
        } else {
          setOfficeBearers(null);
        }
      } catch (error) {
        console.error('Error fetching office bearers:', error);
      }
    };
  
    if (location) {
      fetchOfficeBearers();
    }
  }, [location, country, lokSabha, state, vidhanSabha]);
  

  return (
    <div>
      <Layout>
        <Head>
          <title>Office Bearer Details</title>
        </Head>

        <div className={`${styles.officeBearerDetails} ${styles.main}`}>
          <div className={styles.locationInfo}>
            {country && <p>Country: {country}</p>}
            {state !== "Not Specified" && <p>State: {state}</p>}
            {lokSabha !== "Not Specified" && <p>Lok Sabha: {lokSabha}</p>}
            {vidhanSabha !== "Not Specified" && <p>Vidhan Sabha: {vidhanSabha}</p>}
          </div>

          {officeBearers ? (
            <ul className={styles.officeBearersList}>
              {officeBearers.map((item, index) => (
                <li key={index} className={styles.officeBearerItem}>
                  
                  
                  <p>Office Address: {item.officeAddress}</p>
                  <div className={styles.membershipCardContainer}>
                    <div className={styles.membershipCard}>

                      <p>President:</p>
                      <MembershipCardTemplate mobile={item.presidentMob} />
                    </div>
                    <div className={styles.membershipCard}>
                      <p>Vice President:</p>
                      <MembershipCardTemplate mobile={item.vpMob} />
                    </div>
                  </div>
                  <div className={styles.membershipCardContainer}>
                    <div className={styles.membershipCard}>
                      <p>General Secretary:</p>
                      <MembershipCardTemplate mobile={item.genSecMob} />
                    </div>
                    <div className={styles.membershipCard}>
                      <p>IT Head:</p>
                      <MembershipCardTemplate mobile={item.itHeadMob} />
                    </div>
                  </div>
                  <div className={styles.membershipCardContainer}>
                    <div className={styles.membershipCard}>
                      <p>Active Member 1:</p>
                      <MembershipCardTemplate mobile={item.activeMem1Mob} />
                    </div>
                    <div className={styles.membershipCard}>
                      <p>Active Member 2:</p>
                      <MembershipCardTemplate mobile={item.activeMem2Mob} />
                    </div>
                  </div>
                </li>
              ))}
              <div className={styles.returnToLocationSelector1}>
                <Link href="/offices">
                  <button className={styles.buttonLink}>
                    Location Selection
                  </button>
                </Link>
              </div>

              <div className={styles.returnToLocationSelector2}>
                <Link href="/offices">
                  <button className={styles.buttonLink}>
                    Return to Location Selection
                  </button>
                </Link>
              </div>

            </ul>
          ) : (
            <div className={styles.notFound}>
              <p>हम पूरे देश में पार्टी के संगठन का विस्तार कर रहे हैं बहुत ही जल्द यहां भी पार्टी ऑफिस बनेगा</p>
              <div className={styles.buttonLink}>
                <Link href="/offices">
                  <button className={styles.buttonLink}>
                    Return to Location Selection
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default OfficeBearerPage;
