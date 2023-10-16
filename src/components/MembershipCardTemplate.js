// src/components/MembershipCardTemplate.js
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/membershipCardTemplate.module.css';
import logoImage from '../../public/images/logo.png';
import sbImage from '../../public/images/sb.png';

const upiQRCodeImage = '/images/GAPupiQrCode.png';
const MembershipCardTemplate = ({ mobile }) => {
  const [memberData, setMemberData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
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
      <h1> GAREEB AADMI PARTY</h1>
      <div className={styles.registration}>
        <p>56/12/2014/PPS-I</p>
      </div>

      <div className={styles.logoContainer}>
        <Image src={logoImage} alt="Logo" width={100} height={100} />
      </div>
      <div className={styles.sbContainer}>
        <Image src={sbImage} alt="SB Image" width={100} height={100} />
      </div>
      <div className={styles.p}>
        <p>ID: {memberData._id}</p>
        <p>{memberData.gapId}</p>
        <p>Name: {memberData.name}</p>
        <p>Mobile: {memberData.mobile}</p>
        <p>State: {memberData.state}</p>
        <p>Lok Sabha: {memberData.lokSabha}</p>
        <p>Vidhan Sabha: {memberData.vidhanSabha}</p>
      </div>
      <div className={styles.bothImages}>
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
      </div>
      <div className={styles.www}>
        <p>www.gapindia.org</p>
      </div>
    </div>
  );
};

export default MembershipCardTemplate;