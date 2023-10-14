import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import styles from '../styles/index.module.css';
import Image from 'next/image';

const Home = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    // Fetch content from the API route when the component mounts
    const fetchGoogleDocsContent = async () => {
      try {
        const response = await fetch('/api/fetchVisionData');

        if (response.ok) {
          const data = await response.json();
          setContent(data.content);
          setTitle(data.title);
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
      <div className={`${styles.container} ${styles.main}`}>
      <Image src="/images/sb small.png" alt="Image Description" width={200} height={200} className={styles.image} />




        <h1 className={styles.h1}></h1>
        <div className={styles['google-docs-content']} dangerouslySetInnerHTML={{ __html: content }} />
        <p>{
        //content
        }
        </p>
      </div>
    </Layout>
  );
};

export default Home;
