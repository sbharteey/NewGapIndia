import React, { useEffect, useState } from 'react';
import Layout from '../app/layout';
import styles from '../styles/vision.module.css';

const Vision = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch content from the API route when the component mounts
    const fetchGoogleDocsContent = async () => {
      try {
        const response = await fetch('/api/fetchVisionData');

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

  }, []);

  return (
    <Layout pageTitle="Vision">
      <div className={styles.container}>
        <h1>Vision</h1>
        <p>{content}</p>
      </div>
    </Layout>
  );
};

export default Vision;
