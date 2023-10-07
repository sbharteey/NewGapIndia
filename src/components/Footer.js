import React from 'react';
import Image from 'next/image';
import styles from '../styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialIcons}>
        <a href="https://www.facebook.com/gap.sbharteey/" target="_blank" rel="noopener noreferrer">
          <Image src="/images/facebook.png" alt="Facebook" width={32} height={32} />
        </a>
        <a href="http://www.youtube.com/@GareebAadmiParty-rz5jb" target="_blank" rel="noopener noreferrer">
          <Image src="/images/youtube.png" alt="YouTube" width={32} height={32} />
        </a>
        <a href="https://www.instagram.com/gareeb_aadmi_party/" target="_blank" rel="noopener noreferrer">
          <Image src="/images/instagram.png" alt="Instagram" width={32} height={32} />
        </a>
        <a href="https://twitter.com/GapIndia" target="_blank" rel="noopener noreferrer">
          <Image src="/images/twitter.png" alt="Twitter" width={32} height={32} />
        </a>
        <a href="https://www.linkedin.com/in/gareeb-aadmi-party-gap-377123286/" target="_blank" rel="noopener noreferrer">
          <Image src="/images/linkedin.png" alt="LinkedIn" width={32} height={32} />
        </a>
        <a href="https://wa.me/message/4YCZTDK5W5VVF1" target="_blank" rel="noopener noreferrer">
          <Image src="/images/whatsapp.png" alt="WhatsApp" width={32} height={32} />
        </a>
        <a href="https://www.telegram.org/" target="_blank" rel="noopener noreferrer">
          <Image src="/images/telegram.png" alt="Telegram" width={32} height={32} />
        </a>
      </div>
<div>
      <p className={styles.copyRight}>Contact Us :- 9599076349, Email :- gapindia.org@gmail.com </p>
      <p className={styles.copyRight}>Regd. Office :- R-21, Mohan Garden, New Delhi - 110059</p>
      <p className={styles.copyRight}>© 2023 Gareeb Aadmi Party. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
