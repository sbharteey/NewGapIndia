// src/components/CardTemplate.js
import React, { useEffect, useState } from 'react';
import { getDataByMobile2 } from '../../utils/database'; // Import the database function
import Image from 'next/image';
import styles from '../styles/membershipCardTemplate.module.css';
import printStyles from '../styles/print.module.css';

const CardTemplate = ({ mobile }) => {
  const [memberData, setMemberData] = useState(null);
  useEffect(() => {
    const fetchData = async () =>
   {
      try {
        const response = await fetch(`/api/search?mobile=${mobile}`);
        if (response.ok) {
          const memberData = await response.json();
          if (memberData && memberData._id) {
            setMemberData(memberData);
            console.log(memberData._id);

          } else {
            console.log('Member not found.');
          }

        }
        else {
          console.error('Error searching for 1');
          console.log('Error searching for 2.');
        }
        console.log("try completed");
      } catch (error) {
        console.error('Error searching for :3', error);
        console.log('Error searching for .4');
        setMemberData(null);
      }
    };





    fetchData();
  }, [mobile]);

  if (!memberData) {
    return <p>Member not found.</p>;
  }

  return (
    <div id="Card" className={styles.card}>
    <h2> GAP  Card</h2>
    <p> ID: {memberData._id}</p> {/* Display the  ID */}
    <p>Name: {memberData.name}</p>
    <p>Mobile: {memberData.mobile}</p>
    <p>Email: {memberData.email}</p>
    <div className={styles.photo}>
      {/* Use the Image component for the member's photo */}
      <Image src={memberData.photo} alt="Member Photo" width={150} height={150} />
    </div>
    <button onClick={() => window.print()}>Print Card</button>
    </div>
  );
};

export default CardTemplate;
