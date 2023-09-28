import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styles from "../styles/locationSelector.module.css";
import Router from "next/router"; // Import Router from Next.js

const LocationSelector = ({
  formData,
  handleInputChange,
  officesData,
  handleStateChange,
  handleLokSabhaChange,
  handleVidhanSabhaChange,
  handleFormSubmit,
}) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Submit button clicked"); // Debugging line

    try {
      // Call the function to get office bearers data based on selected location
      const filteredOfficeBearers = getOfficeBearersForSelectedLocation();
      console.log("Filtered office bearers:", filteredOfficeBearers); // Debugging line

      // Extract the selected office bearer's ID from your form data
      const selectedOfficeBearerId = formData.officeBearerId; // Replace with the actual field name or source

      // You can use the filteredOfficeBearers for further processing here if needed.
      await handleFormSubmit(filteredOfficeBearers);

      // Navigate to the dynamic page using Link component
      // This will navigate to /officeBearer/[id] with the selected ID
      Router.push(`/officeBearer/${selectedOfficeBearerId}`);

      // Reset the form or perform any other necessary actions after successful submission.
    } catch (error) {
      // Handle any errors here, e.g., show an error message to the user.
      console.error('Error submitting form:', error);
    }
  };

  // Define selectedOfficeBearerId here so it's in scope for the Link component
  const selectedOfficeBearerId = formData.officeBearerId; // Replace with the actual field name or source

  return (
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
          onChange={handleStateChange}
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
          onChange={handleLokSabhaChange}
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
          onChange={handleVidhanSabhaChange}
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

      {/* Link component moved here */}
      <Link href={`/officeBearer/${selectedOfficeBearerId}`}>
        <button type="submit" className={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      </Link>

    </div>
  );
};

LocationSelector.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  officesData: PropTypes.object.isRequired,
  handleStateChange: PropTypes.func.isRequired,
  handleLokSabhaChange: PropTypes.func.isRequired,
  handleVidhanSabhaChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};

export default LocationSelector;
