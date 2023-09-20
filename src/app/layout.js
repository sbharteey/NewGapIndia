// src/app/layout.js
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Subnavbar from '../components/Subnavbar'; // Import the Subnavbar component
import Footer from '../components/Footer';
import layoutStyles from '../styles/layout.module.css';
import '../styles/globals.css';


const Layout = ({ children, pageTitle }) => {
  const websiteTitle = 'Gareeb Aadmi Party';
  const websiteDescription = 'Founded by Shyam Bharteey';

  // Get the current route
  const router = useRouter();
  const isDonationPage = router.pathname === '/donation';

  // Example member data (replace this with actual member data)
  const memberData = {
    name: 'John Doe',
    mobileNumber: '1234567890',
    // Other member data fields...
  };

  return (
    <div>
      <Head>
        <title>{pageTitle ? `${pageTitle} - ${websiteTitle}` : websiteTitle}</title>
        <meta name="description" content={websiteDescription} />
      </Head>
      <Header />
      <Navbar />
      <Subnavbar /> {/* Include the Subnavbar component */}
      <div className={layoutStyles.contentContainer}>
        <div className={layoutStyles.buttonContainer}>
          
        </div>
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
