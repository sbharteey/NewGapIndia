// src/pages/offices.js
import React, { useState } from "react";
import Head from "next/head";
import Layout from "../app/layout";
import styles from "../styles/offices.module.css";
import LocationSelector from "../components/LocationSelector";
import OfficeBearersList from "../components/OfficeBearersList";
import officesLocationData from "../data/officesLocationData";
import { officeBearersData } from "../models/officeBearersData";

const Offices = () => {
  const [formData, setFormData] = useState({
    country: "India",
    state: "",
    lokSabha: "",
    vidhanSabha: "",
  });

  const [filteredOfficeBearers, setFilteredOfficeBearers] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleStateChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      state: value,
      lokSabha: "",
      vidhanSabha: "",
    }));
  };

  const handleLokSabhaChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      lokSabha: value,
      vidhanSabha: "",
    }));
  };

  const handleVidhanSabhaChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      vidhanSabha: value,
    }));
  };

  // Function to get office bearers data based on selected location
  const getOfficeBearersForSelectedLocation = () => {
    // Filter the office bearers data based on the selected location
    const filteredOfficeBearers = officeBearersData.filter((officeBearer) => {
      // Check if the office bearer's data has a 'location' property
      if (officeBearer && officeBearer.data && officeBearer.data.location) {
        const officeLocation = officeBearer.data.location;

        // Check if the selected location fields match the office location
        const stateMatch = formData.state === officeLocation.state;
        const lokSabhaMatch = formData.lokSabha === officeLocation.lokSabha;
        const vidhanSabhaMatch =
          formData.vidhanSabha === officeLocation.vidhanSabha;

        // Return true if all selected location fields match the office location
        return stateMatch && lokSabhaMatch && vidhanSabhaMatch;
      }

      // If 'officeBearer' or 'officeBearer.data' is missing, return false
      return false;
    });

    // Set the filtered office bearers in state
    setFilteredOfficeBearers(filteredOfficeBearers);

    // You can also add code here to send the data to the server if needed.

    return filteredOfficeBearers;
  };

  return (
    <div>
      <Layout>
        <Head>
          <title>Offices Page</title>
          <meta name="description" content="Office bearers and locations" />
          {/* ... */}
        </Head>

        <div className={styles.officeContainer}>
          <LocationSelector
            formData={formData}
            handleInputChange={handleInputChange}
            handleStateChange={handleStateChange}
            handleLokSabhaChange={handleLokSabhaChange}
            handleVidhanSabhaChange={handleVidhanSabhaChange}
            officesData={officesLocationData}
            getOfficeBearersForSelectedLocation={
              getOfficeBearersForSelectedLocation
            }
          />

          <OfficeBearersList officeBearers={filteredOfficeBearers} />
        </div>
      </Layout>
    </div>
  );
};

export default Offices;
