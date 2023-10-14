// src/pages/manifesto.js
import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import styles from '../styles/manifesto.module.css';
import Image from 'next/image';

const Manifesto = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch content from the API route when the component mounts
    const fetchGoogleDocsContent = async () => {
      try {
        const response = await fetch('/api/fetchManifestoData');
        if (response.ok) {
          const data = await response.json();
          setContent(data.content);
        } else {
          console.log("else");
          console.error('Error fetching Google Docs content:', response.statusText);
          setContent('Error fetching content.');
        }
      } catch (error) {
        console.error('Error fetching Google Docs content:', error);
        setContent('Error fetching content.');
      }
    };
    fetchGoogleDocsContent();
  },
    []);

  return (
    <Layout pageTitle="Manifesto">
      <div className={`${styles.container} ${styles.main}`}>
      <Image src="/images/sb small.png" alt="Image Description" width={200} height={200} className={styles.image} />

        <h1 className={styles.h1}>GAP Manifesto 2024</h1>
        <div className={styles['google-docs-content']} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Layout>
  );
};

export default Manifesto;
