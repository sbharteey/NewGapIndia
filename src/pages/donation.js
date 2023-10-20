// src/pages/donation.js
import React from 'react';
import Layout from '../layout';
import Image from 'next/image';
import styles from '../../src/styles/donation.module.css';

const DonationPage = () => {
  const bankAccountDetails = {
    accountNumber: '606920110000363',
    ifscCode: 'BKID0006069',
    accountHolderName: 'GAREEB AADMI PARTY',
  };
  const upiQRCodeImage = '/images/upi_qr_code.png';
  return (
    <Layout pageTitle="Donation">
      <div className={styles.main}>
        <div className={styles.donationContainer}>
          <div className={styles.content}>
            <h1>देश बदलने के लिए गरीब आदमी पार्टी को सहयोग करें</h1>
            <p>
              हमें आपके सहयोग की अत्यंत आवश्यकता है, आपके सहयोग के बिना इस देश को बदलने का ख्वाब अधूरा ही रह जायेगा
            </p>
            <p>देश का हर व्यक्ति कम से कम 21 रुपये का सहयोग अवश्य करे आपका 21 रुपया हम लाखों में लौटाकर आपको देंगे ये हमारा वादा  है</p>
          </div>
          <div className={styles.imgandPaymentDetail}>
            <div className={styles.paymentDetails}>
              <h1>Bank Account Details:</h1>
              <p>Account Number :  {bankAccountDetails.accountNumber}</p>
              <p>IFSC Code :  {bankAccountDetails.ifscCode}</p>
              <p>Account:  {bankAccountDetails.accountHolderName}</p>
            </div>
            <div className={styles.qrCodeContainer}>
              <div className="image-wrapper">
                <Image
                  src={upiQRCodeImage}
                  alt="UPI QR Code"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonationPage;
