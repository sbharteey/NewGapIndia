// src/components/Subnavbar.js
import React from 'react';
import SearchBar from '../components/SearchBar';
import DonateButton from '../components/DonateButton';
import subnavbarStyles from '../styles/subnavbar.module.css';

const Subnavbar = () => {
  return (
    <div className={subnavbarStyles.subnavbar}>
  <SearchBar className={subnavbarStyles.searchBar} onSearch={(query) => console.log('Search query:', query)} />
  <DonateButton className={subnavbarStyles.donateButton} />
  
</div>

  );
};

export default Subnavbar;
