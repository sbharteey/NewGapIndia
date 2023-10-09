// src/pages/officeBearer/[location].js
import React from "react";
import Link from 'next/link';
import Head from "next/head";
import Layout from "../../layout";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import MembershipCardTemplate from '../../components/MembershipCardTemplate';
import styles from "../../styles/officeBearerDetails.module.css";
import { officeBearersData } from "../../models/officeBearersData";

const OfficeBearerPage = () => {
  const router = useRouter();
  const { location } = router.query;
  const country = location?.[0] || "Not Specified"; // Default value if not provided
  const state = location?.[1] || "Not Specified"; // Default value if not provided
  const lokSabha = location?.[2] || "Not Specified"; // Default value if not provided
  const vidhanSabha = location?.[3] || "Not Specified"; // Default value if not provided
  const [officeBearers, setOfficeBearers] = useState([]);

  useEffect(() => {
    // Fetch office bearers data based on the location
    const fetchOfficeBearers = async () => {
      try {
        const response = await fetch(`/api/queryOfficeBearers?country=${country}&state=${state}&lokSabha=${lokSabha}&vidhanSabha=${vidhanSabha}`);

        if (response.ok) {
          console.log("Response OK");
          const data = await response.json();
          console.log(data);
          console.log("??");
          setOfficeBearers(data);
        } else {
          console.log("ELSE");
          // Handle errors when fetching office bearers
          //console.error('Error fetching office bearers:', response.statusText);
          setOfficeBearers(null);
        }
      } catch (error) {
        // Handle any errors here
        console.error('Error fetching office bearers:', error);
      }
    };

    if (location) {

      console.log("location was true, so I will fetch office bearers now");
      fetchOfficeBearers();
    }
  }, [location]);

  return (
    <div>
      <Layout>
        <Head>
          <title>Office Bearer Details</title>
          <meta
            name="description"
          //content={`Details for Office Bearer ${officeBearers.officeBearerId}`}
          />
        </Head>

        <div className={styles.officeBearerDetails}>
          <h1 className={styles.detailsHeader}>Office Bearers Details</h1>
          <div className={styles.locationInfo}>
            {country && (
              <p>
                Country: {country}
              </p>
            )}
            {state !== "Not Specified" && (
              <p>
                State: {state}
              </p>
            )}
            {lokSabha !== "Not Specified" && (
              <p>
                Lok Sabha: {lokSabha}
              </p>
            )}
            {vidhanSabha !== "Not Specified" && (
              <p>
                Vidhan Sabha: {vidhanSabha}
              </p>
            )}
          </div>
          {officeBearers ? (
            <ul className={styles.officeBearersList}>
              {officeBearers.map((item, index) => (
                <li key={index} className={styles.officeBearerItem}>
                  <p>Office Address: {item.officeAddress}</p>
                  <p>President:</p>
                  <MembershipCardTemplate mobile={item.presidentMob} /> {/* Pass the mobile as a prop */}
                  <p>Vice President:</p>
                  <MembershipCardTemplate mobile={item.vpMob} /> {/* Pass the mobile as a prop */}
                  <p>General Secretary:</p>
                  <MembershipCardTemplate mobile={item.genSecMob} /> {/* Pass the mobile as a prop */}
                  <p>IT Head:</p>
                  <MembershipCardTemplate mobile={item.itHeadMob} /> {/* Pass the mobile as a prop */}
                  <p>Active Member 1:</p>
                  <MembershipCardTemplate mobile={item.activeMem1Mob} /> {/* Pass the mobile as a prop */}
                  <p>Active Member 2:</p>
                  <MembershipCardTemplate mobile={item.activeMem2Mob} /> {/* Pass the mobile as a prop */}
                  {/* Add other properties as needed */}
                </li>
              ))}
              <Link href="/offices">
                <button className={styles.buttonLink}>
                  Return to Location Selection
                </button>
              </Link>



            </ul>
          ) : (
            <div className={styles.notFound}>
              <p>हम पूरे देश में पार्टी के संगठन का विस्तार कर रहे हैं बहुत ही जल्द यहां भी पार्टी ऑफिस बनेगा</p>
              <Link href="/offices">
                <button className={styles.buttonLink}>
                  Return to Location Selection
                </button>
              </Link>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};
export default OfficeBearerPage;

