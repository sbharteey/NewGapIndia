// src/components/MembershipForm.js
import React, { useState } from 'react';
import { useAddMember } from '../../membershipQueries';
import membershipDataStructure from '../../utils/membershipDataStructure';
import membershipData from '../data/membershipData';
import styles from '../styles/membershipForm.module.css';
import Alert from './Alert';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import Compressor from 'compressorjs';


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

  const handlePhotoChange = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const photoFile = acceptedFiles[0];
      setSelectedPhotoName(photoFile.name); // Set the selected photo name

      new Compressor(photoFile, {
        quality: 0.6, // Adjust the quality as needed
        maxWidth: 200, // Adjust the dimensions as needed
        maxHeight: 200,
        success(result) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              photo: e.target.result,
            }));
          };
          reader.readAsDataURL(result);
        },
        error(err) {
          console.error('Error compressing image:', err);
        },
      });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Additional mobile number validation
    const firstDigit = formData.mobile.charAt(0);
    if (!['6', '7', '8', '9'].includes(firstDigit) || formData.mobile.length !== 10) {
      setAlert({ message: 'Please use correct mobile number and be 10 digits long.', type: 'error' });
      return;
    }

    // Simulate a successful mobile uniqueness check
    const isMobileUnique = true;

    if (!isMobileUnique) {
      setAlert({ message: 'Mobile number already exists.', type: 'error' });
      return;
    }

    // Call the mutation with the form data
    try {

      console.log(formData);
      console.log("Sending this data to useAddMember");
      const response = await addMemberMutation.mutateAsync(formData);

      // Handle the success case
      if (response.message) {
        // Member added successfully
        setAlert({ message: response.message, type: 'success' });

        // Optionally, you can clear the form or perform other actions after a successful submission.
        // Clear the form data, for example:
        setFormData(membershipDataStructure);
        setSelectedPhotoName('');
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
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.jpg, .jpeg, .png',
    onDrop: handlePhotoChange,
  });

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
              placeholder="Full Name"
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
              placeholder="ID Card will be sent if No. in WhatsApp"
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

          <div className={`${styles.formGroup} ${styles.dropzone}`} {...getRootProps()}>
            <label htmlFor="photo" className={styles.fileInputLabel}>
              Member Photo (JPG/PNG)
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*" // Allow only image files
              onChange={(e) => handlePhotoUpload(e.target.files[0])}
              className={styles.fileInput}
              {...getInputProps()}
            />
            {/* Display the selected photo preview */}
            {formData.photo && (
              <div className={styles.selectedPhotoPreview}>
                <Image
                  src={formData.photo}
                  alt="Selected"
                  width={100} // Set the width and height as needed
                  height={100}
                />
              </div>
            )}
            <p>Upload your small Passport size Photo so that Photo ID card will look beautiful.</p>
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
