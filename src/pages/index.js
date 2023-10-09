// src/pages/index.js
import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import styles from '../styles/index.module.css';

const Home = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    // Fetch content from the API route when the component mounts
    const fetchGoogleSlideContent = async () => {
      try {
        const response = await fetch('/api/fetchIndexData');

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

    fetchGoogleSlideContent();

  }, []);

  return (
    <Layout pageTitle="Home">
      <div className={styles.container}>
        <h1>Home Page</h1>
        <div className={styles.googleslides}/>
        {content.slides && content.slides.slides.map((slide, index) => (
    <div key={index}>
      {/* Render slide content here */}
      <h2>{slide.title}</h2>
      {/* Render other slide content as needed */}
    </div>
  ))}
        
      </div>
    </Layout>
  );
};

export default Home;