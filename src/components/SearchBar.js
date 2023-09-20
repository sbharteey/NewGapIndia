// src/components/SearchBar.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/subnavbar.module.css';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/searchMembership?mobile=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data._id) {
          router.push(`/members/${data.mobile}`);
        } else {
          setSearchError('');
          setSearchError('Member not found.');
        }
      } else {
        console.error('Error searching for membership');
        setSearchError('');
        setSearchError('Error searching for membership.');
      }
    } catch (error) {
      console.error('Error searching for membership:', error);
      setSearchError('');
      setSearchError('Error searching for membership.');
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search Membership"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      {searchError && <p className={styles.error}>{searchError}</p>}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
