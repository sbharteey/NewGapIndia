// components/VideoCarousel.js

import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/videoCarousel.module.css';

const VideoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // Replace this with the total number of videos you have
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 2000); // Change the slide every 2 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className={styles.videoCarousel}>
      <div className={styles.videoWindowContainer} ref={videoContainerRef}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`${styles.videoWindow} ${index === currentSlide ? styles.active : ''}`}
          >
            {/* Sample video URLs */}
            {index === 0 && (
              <iframe
                src="https://www.youtube.com/embed/FE64VI557ms"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
            {index === 1 && (
              <video controls>
                <source src="https://example.com/video2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {index === 2 && (
              <video controls>
                <source src="https://example.com/video3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
