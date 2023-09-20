// src/pages/donation.js
import React from 'react';
import Layout from '../app/layout';
import Image from 'next/image'; // Import the Image component
import styles from '../styles/donation.module.css'

const DonationPage = () => {
  const bankAccountDetails = {
    accountNumber: '606920110000363',
    ifscCode: 'BKID0006069',
    accountHolderName: 'GAREEB AADMI PARTY',
  };
  const upiQRCodeImage = '/images/upi_qr_code.png'; // Replace with the actual image file
  return (
    <Layout pageTitle="Donation">
      <div className={styles.donationContainer}>
        <h1>देश बदलने के लिए गरीब आदमी पार्टी को सहयोग करें </h1>
        <p>
          हमें आपके सहयोग की अत्यंत आवश्यकता है, आपके सहयोग के बिना इस देश को बदलने का ख्वाब अधूरा ही रह जायेगा 
        </p>
        <p>देश का हर व्यक्ति कम से कम एक रुपये का सहयोग अवश्य करे आपका एक रुपया हम लाखों में लौटाकर आपको देंगे ये हमारा वादा  है</p>
        <div className={styles.paymentDetails}>
          <h2>Bank Account Details:</h2>
          <p>Account Number: {bankAccountDetails.accountNumber}</p>
          <p>IFSC Code: {bankAccountDetails.ifscCode}</p>
          <p>Account Holder Name: {bankAccountDetails.accountHolderName}</p>
        </div>
        <div className={styles.qrCodeContainer}>
          {/* Use the Image component for your QR Code */}
          <Image
            src={upiQRCodeImage}
            alt="UPI QR Code"
            width={300} // Adjust width as needed
            height={300} // Adjust height as needed
          />
        </div>
        <div><h2 className={styles.qrCode}>UPI QR Code:</h2></div>
      </div>
    </Layout>
  );
};

export default DonationPage;
