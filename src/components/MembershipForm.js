// src/components/MembershipForm.js
import React, { useState } from 'react';
import { useAddMember } from '../../membershipQueries';
import membershipDataStructure from '../../utils/membershipDataStructure';
import membershipData from '../data/membershipData';
import styles from '../styles/membershipForm.module.css';
import Alert from './Alert';

const MembershipForm = () => {
  const [formData, setFormData] = useState(membershipDataStructure);
  const [selectedPhotoName, setSelectedPhotoName] = useState("");
  const [alert, setAlert] = useState(null);

  // Use the useAddMember mutation hook
  const addMemberMutation = useAddMember();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (event) => {
    const photoFile = event.target.files[0];
    if (photoFile) {
      setSelectedPhotoName(photoFile.name); // Set the selected photo name
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          photo: e.target.result,
        }));
      };
      reader.readAsArrayBuffer(photoFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic mobile number validation
    if (formData.mobile.length !== 10) {
      setAlert({ message: 'Mobile number should be 10 digits long.', type: 'error' });
      return;
    }

    // Simulate a successful email and mobile uniqueness check
    const isEmailUnique = true;
    const isMobileUnique = true;

    if (!isEmailUnique) {
      setAlert({ message: 'Email ID already exists.', type: 'error' });
      return;
    }

    if (!isMobileUnique) {
      setAlert({ message: 'Mobile number already exists.', type: 'error' });
      return;
    }

    // Call the mutation with the form data
    

    try {
      const response = await addMemberMutation.mutateAsync(formData);
  
      // Handle the success case
      console.log('Trying');
  
      if (response.message) {
        // Member added successfully
        console.log('Member added successfully:', response.message);
        setAlert({ message: response.message, type: 'success' });
  
        // Optionally, you can clear the form or perform other actions after a successful submission.
        // Clear the form data, for example:
        setFormData(membershipDataStructure);
        setSelectedPhotoName('');
  
        console.log('completed');
      } else {
        // Handle other response data or errors if needed
        console.error('Error adding member:', response);
        setAlert({ message: 'Error adding member.', type: 'error' });
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error adding member:', error.message);
      setAlert({ message: error.message, type: 'error' });
    }




    // Your form submission logic
    // If successful, set a success alert
    //setAlert({ message: 'Member added successfully.', type: 'success' });
    // console.log(JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      {/* Display the alert if it exists */}
      {alert && (
        <div
          className={`${styles.alert} ${alert.type === 'success' ? styles['alert-success'] : styles['alert-error']
            }`}
        >
          {alert.message}
        </div>
      )}

      <div className={styles.membershipFormContainer}>
        <h1>Membership Form</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              minLength="3" // Minimum name length
              maxLength="30" // Maximum name length
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="mobile">
              Mobile No. <span className={styles.required}>*</span>
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="country">
              Country <span className={styles.required}>*</span>
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            >
              <option value="India">India</option>
              {/* Add other countries here */}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="state">
              State <span className={styles.required}>*</span>
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            >
              <option value="">Select State</option>
              {membershipData.indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lokSabha">
              Lok Sabha <span className={styles.required}>*</span>
            </label>
            <select
              id="lokSabha"
              name="lokSabha"
              value={formData.lokSabha}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Lok Sabha</option>
              {formData.state &&
                membershipData.lokSabhaData[formData.state]?.map((lokSabha) => (
                  <option key={lokSabha} value={lokSabha}>
                    {lokSabha}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="vidhanSabha">
              Vidhan Sabha <span className={styles.required}>*</span>
            </label>
            <select
              id="vidhanSabha"
              name="vidhanSabha"
              value={formData.vidhanSabha}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Vidhan Sabha</option>
              {formData.lokSabha &&
                membershipData.vidhanSabhaData[formData.state]?.[formData.lokSabha]?.map(
                  (vidhanSabha) => (
                    <option key={vidhanSabha} value={vidhanSabha}>
                      {vidhanSabha}
                    </option>
                  )
                )}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="voterId">Voter ID</label>
            <input
              type="text"
              id="voterId"
              name="voterId"
              value={formData.voterId}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="photo" className={styles.fileInputLabel}>
              Member Photo (JPG/PNG)
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept=".jpg, .jpeg, .png"
              onChange={handlePhotoChange}
              className={styles.fileInput}
            />
            {/* Display the selected photo name */}
            {selectedPhotoName && (
              <p className={styles.selectedPhotoName}>Selected Photo: {selectedPhotoName}</p>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MembershipForm;
