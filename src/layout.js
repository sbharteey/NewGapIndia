// src/layout.js
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../src/components/Header';
import Navbar from '../src/components/Navbar';
import Subnavbar from '../src/components/Subnavbar';
import Footer from '../src/components/Footer';
import layoutStyles from '../src/styles/layout.module.css';
import '../src/styles/globals.css';
import CustomToaster from '../src/components/Toaster';

const Layout = ({ children, pageTitle }) => {
  const websiteTitle = 'Gareeb Aadmi Party';
  const websiteDescription = 'GAP a Political Party in India Founded by Shyam Bharteey';
  // Get the current route
  const router = useRouter();
  const isDonationPage = router.pathname === '/donation';
  return (
    <div>
      <Head>
        <title>{pageTitle ? `${pageTitle} - ${websiteTitle}` : websiteTitle}</title>
        <meta name="description" content={websiteDescription} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <CustomToaster />
      <Header />
      <Navbar />
      <Subnavbar /> {/* Include the Subnavbar component */}
      <div className={layoutStyles.contentContainer}>
        <div className={layoutStyles.buttonContainer}>
        </div>
      </div>
      <main className={layoutStyles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;