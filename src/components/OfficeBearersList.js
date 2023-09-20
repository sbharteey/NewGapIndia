// src/components/OfficeBearersList.js
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from '../styles/officeBearersList.module.css';

const OfficeBearersList = ({ officeBearers }) => {
  return (
    <div className={styles.officeBearersList}>
      <h2>Office Bearers</h2>
      <ul>
        {officeBearers.map((officeBearer) => (
          <li key={officeBearer.title} className={styles.officeBearer}>
            <h3>{officeBearer.title}</h3>
            {officeBearer.data && officeBearer.title !== 'Office Address' ? (
              <div>
                {officeBearer.title !== 'President' && (
                  <p className={styles.detail}>{officeBearer.data.name}</p>
                )}
                <p className={styles.detail}>Membership ID: {officeBearer.data.membershipId}</p>
                <p className={styles.detail}>Mobile No: {officeBearer.data.mobileNo}</p>
              </div>
            ) : (
              <p className={styles.address}>{officeBearer.data.address}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

OfficeBearersList.propTypes = {
  officeBearers: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      data: PropTypes.shape({
        name: PropTypes.string,
        membershipId: PropTypes.string,
        mobileNo: PropTypes.string,
        address: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default OfficeBearersList;
