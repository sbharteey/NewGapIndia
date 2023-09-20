// src/pages/DashboardPage.js
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import styles from '../styles/dashboardLayout.module.css'
const DashboardPage = () => {
  return (
    <DashboardLayout>
      {/* Add sample content here */}
      <h2>Welcome to the Dashboard</h2>
      <p>This is a sample dashboard page.</p>
    </DashboardLayout>
  );
};

export default DashboardPage;
