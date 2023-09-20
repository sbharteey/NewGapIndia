//  src/pages/index.js
import React from 'react';
import Head from "next/head";
import Layout from '../app/layout';
import VideoCarousel from "../components/VideoCarousel";
import PhotoCarousel from "../components/PhotoCarousel";
import styles from "../styles/index.module.css";
const Home = () => {
  return (
    <Layout pageTitle="Home">
      <div className="content.wrapper">
        <h3>Featured Videos</h3>
        <VideoCarousel />

        <h3>Featured Photos</h3>
        <PhotoCarousel />

        {/* You can add other content here */}
      </div>
    </Layout>
    
  );
};

export default Home;
