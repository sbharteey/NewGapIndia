import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/locationSelector.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const LocationSelector = ({ officesData, handleFormSubmit }) => {
  const [formData, setFormData] = useState({
    country: "India",
    state: "",
    lokSabha: "",
    vidhanSabha: "",
  });

  const router = useRouter();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dynamicRoute = `/officeBearer/${formData.country}/${formData.state}/${formData.lokSabha}/${formData.vidhanSabha}`;
      router.push(dynamicRoute);
    } catch (error) {
    }
  };
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
