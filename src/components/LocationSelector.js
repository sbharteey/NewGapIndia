// Import necessary dependencies
import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/locationSelector.module.css";
import Link from "next/link"; // Import Link from Next.js
import { useRouter } from "next/router"; // Import useRouter from Next.js

const LocationSelector = ({ officesData, handleFormSubmit }) => {
  const [formData, setFormData] = useState({
    country: "India",
    state: "",
    lokSabha: "",
    vidhanSabha: "",
  });

  const router = useRouter(); // Initialize the router

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("submit clicked");
    e.preventDefault(); // Prevent the default form submission
  
    try {
      console.log("entered try block");
      // Build the dynamic route for the Link component
      const dynamicRoute = `/officeBearer/${formData.country}/${formData.state}/${formData.lokSabha}/${formData.vidhanSabha}`;
      console.log("1 ");
      router.push(dynamicRoute);

      // Make a request to the API route to query office bearers
     // const response = await fetch(`/api/queryOfficeBearers?country=${formData.country}&state=${formData.state}&lokSabha=${formData.lokSabha}&vidhanSabha=${formData.vidhanSabha}`);
      //console.log("2 ");
/*
      if (response.ok) {
        console.log("3");
        const officeBearers = await response.json();
        console.log('Office bearers:', officeBearers); // Debugging line
        

        // You can use the officeBearers data for further processing here if needed.
        
        // Redirect to the dynamic page using router.push
        router.push(dynamicRoute);
      } else {
        // Handle errors when querying office bearers
        console.log("inside else");
        //console.error('Error querying office bearers:', response.statusText);
      }
      */
      // Reset the form or perform any other necessary actions after successful submission.
    } catch (error) {
      // Handle any errors here, e.g., show an error message to the user.
      console.error('Error submitting form:', error);
    }
  };
  


  /*
  // Function to get office bearers data based on selected location
  const getOfficeBearersForSelectedLocation = () => {
    // Filter the office bearers data based on the selected location
    const filteredOfficeBearers = officesData.filter((officeBearer) => {
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

    // Return the filtered office bearers
    return filteredOfficeBearers;
  };
*/
  return (
    <div className={styles.mainBody}>
    <div className={styles.container}>
      <div className={styles.locationSelector}>
        <div className={styles.formGroup}>
          {/* Country selector */}
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className={styles.selectInput}
          >
            <option value="India">India</option>
            {/* You can add more country options here if needed */}
          </select>
        </div>

        <div className={styles.formGroup}>
          {/* State selector */}
          <label htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            className={styles.selectInput}
          >
            <option value="">Select State</option>
            {officesData.indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          {/* Lok Sabha selector */}
          <label htmlFor="lokSabha">Lok Sabha</label>
          <select
            id="lokSabha"
            name="lokSabha"
            value={formData.lokSabha}
            onChange={handleInputChange}
            required
            className={styles.selectInput}
          >
            <option value="">Select Lok Sabha</option>
            {formData.state &&
              officesData.lokSabhaData[formData.state]?.map((lokSabha) => (
                <option key={lokSabha} value={lokSabha}>
                  {lokSabha}
                </option>
              ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          {/* Vidhan Sabha selector */}
          <label htmlFor="vidhanSabha">Vidhan Sabha</label>
          <select
            id="vidhanSabha"
            name="vidhanSabha"
            value={formData.vidhanSabha}
            onChange={handleInputChange}
            required
            className={styles.selectInput}
          >
            <option value="">Select Vidhan Sabha</option>
            {formData.state &&
              formData.lokSabha &&
              officesData.vidhanSabhaData[formData.state]?.[formData.lokSabha]?.map(
                (vidhanSabha) => (
                  <option key={vidhanSabha} value={vidhanSabha}>
                    {vidhanSabha}
                  </option>
                )
              )}
          </select>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
    </div>
  );
};

LocationSelector.propTypes = {
  officesData: PropTypes.object.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};

export default LocationSelector;
