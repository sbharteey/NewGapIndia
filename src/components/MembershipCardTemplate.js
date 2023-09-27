// src/components/MembershipCardTemplate.js
import React, { useEffect, useState } from 'react';
import { getMembershipDataByMobile2 } from '../../utils/database'; // Import the database function
import Image from 'next/image';
import styles from '../styles/membershipCardTemplate.module.css';
import printStyles from '../styles/print.module.css';

const upiQRCodeImage = '/images/GAPupiQrCode.png';
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
    <h2> GAREEB AADMI PARTY</h2>
    <h6>www.gapindia.org</h6>
    <h5>56/12/2014/PPS-I</h5>
    <div className={styles.p}>
    <p>{memberData.gapId}</p>
    <p>Name: {memberData.name}</p>
    <p>Mobile: {memberData.mobile}</p>
    <p>State: {memberData.state}</p>
    <p>Lok Sabha: {memberData.lokSabha}</p>
    <p>Vidhan Sabha: {memberData.vidhanSabha}</p>
    </div>
    <div className={styles.photo}>
      {/* Use the Image component for the member's photo */}
      <Image src={memberData.photo} alt="Member Photo" width={150} height={150} />
    </div>

    <div className={styles.qrCodeContainer}>
          <Image
            src={upiQRCodeImage}
            alt="UPI QR Code"
            width={100} 
            height={125} 
          />
        </div>
    <div className={styles.printCard}>
    <button onClick={() => window.print()}>Print Card</button>
    </div>
    </div>
  );
};

export default MembershipCardTemplate;
