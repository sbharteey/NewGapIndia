//  src/components/PhotoCarousel.js
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component
import styles from '../styles/photoCarousel.module.css';

const PhotoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // Replace this with the total number of photos you have
  const photoContainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 2000); // Change the slide every 2 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className={styles.photoCarousel}>
      <div className={styles.photoWindowContainer} ref={photoContainerRef}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`${styles.photoWindow} ${index === currentSlide ? styles.active : ''}`}
          >
            {/* Use the Image component for your photos */}
            {index === 0 && (
              <Image
                src="/images/GAP Banner.png"
                alt="Photo 1"
                width={800} // Adjust width as needed
                height={600} // Adjust height as needed
              />
            )}
            {index === 1 && (
              <Image
                src="/images/GAP Sqr.png"
                alt="Photo 2"
                width={800} // Adjust width as needed
                height={600} // Adjust height as needed
              />
            )}
            {index === 2 && (
              <Image
                src="/images/GAP Banner hindi.png"
                alt="Photo 3"
                width={800} // Adjust width as needed
                height={600} // Adjust height as needed
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;
