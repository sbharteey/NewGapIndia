// src/components/MembershipCardTemplate.js
import React, { useEffect, useState } from 'react';
import { getMembershipDataByMobile2 } from '../../utils/database'; // Import the database function
import Image from 'next/image';
import styles from '../styles/membershipCardTemplate.module.css';
import printStyles from '../styles/print.module.css';

const MembershipCardTemplate = ({ mobile }) => {
  const [memberData, setMemberData] = useState(null);
  useEffect(() => {
    const fetchData = async () =>
   {
      try {
        const response = await fetch(`/api/searchMembership?mobile=${mobile}`);
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
          console.error('Error searching for membership1');
          console.log('Error searching for membership2.');
        }
        console.log("try completed");
      } catch (error) {
        console.error('Error searching for membership:3', error);
        console.log('Error searching for membership.4');
        setMemberData(null);
      }
    };





    fetchData();
  }, [mobile]);

  if (!memberData) {
    return <p>Member not found.</p>;
  }

  return (
    <div id="membershipCard" className={styles.card}>
    <h2> GAP Membership Card</h2>
    <p>Membership ID: {memberData._id}</p> {/* Display the membership ID */}
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

export default MembershipCardTemplate;
