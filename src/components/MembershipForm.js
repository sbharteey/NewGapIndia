// src/components/MembershipForm.js
import React, { useState } from 'react';
import { useAddMember } from '../../membershipQueries';
import membershipDataStructure from '../../utils/membershipDataStructure';
import membershipData from '../data/membershipData';
import styles from '../styles/membershipForm.module.css';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import Compressor from 'compressorjs';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const MembershipForm = () => {
  const [formData, setFormData] = useState(membershipDataStructure);
  const [selectedPhotoName, setSelectedPhotoName] = useState("");
  const [isPhotoRequired, setIsPhotoRequired] = useState(true);
  const [mobileUniqueError, setMobileUniqueError] = useState(false);
  const handleMobileBlur = async () => {
    // Make a GET request to check mobile number uniqueness
    try {
      const response = await axios.get(`/api/checkMobileUnique?mobile=${formData.mobile}`);
      const { isUnique } = response.data;

      if (!isUnique) {
        // Mobile number is not unique, set an error
        setMobileUniqueError(true);
      } else {
        // Mobile number is unique, clear any previous error
        setMobileUniqueError(false);
      }
    } catch (error) {
    }
  };
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
        },
      });

      // Photo is uploaded, no longer required
      setIsPhotoRequired(false);
    }
  };

  // Define an object to store unique mobile numbers
  const uniqueMobileNumbers = {};
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Additional mobile number validation
    const firstDigit = formData.mobile.charAt(0);
    if (!['6', '7', '8', '9'].includes(firstDigit) || formData.mobile.length !== 10) {
      toast.error('Please use a correct mobile number with 10 digits.'); // Use toast for error message
      return;
    }

    // Check if the photo field is empty when it's required
    if (isPhotoRequired) {
      toast.error('Please upload your photo.'); // Use toast for error message
      return;
    }

    // Check if the mobile number is already used
    if (uniqueMobileNumbers[formData.mobile]) {
      toast.error('Mobile number already exists.'); // Use toast for error message
      return;
    }
    // Mark the mobile number as used
    uniqueMobileNumbers[formData.mobile] = true;

    // Call the mutation with the form data
    try {
      console.log("Try0");
      const response = await addMemberMutation.mutateAsync(formData);
console.log("Try1");
      // Handle the success case
      if (response.message) {
        // Member added successfully
        toast.success(response.message); // Use toast for success message
console.log("inside if");
        // Optionally, you can clear the form or perform other actions after a successful submission.
        // Clear the form data, for example:
        setFormData(membershipDataStructure);
        setSelectedPhotoName('');
        // Reset the photo requirement
        setIsPhotoRequired(true);
      } else {
        console.log(response.error);
        console.log("I go to else");
        // Handle other response data or errors if needed
        toast.error(response.error); // Use toast for error message
      }
    } catch (error) {
      console.log("there was some erorrrr");
      // Handle network errors or other exceptions
      toast.error('Error adding member.catch'); // Use toast for error message
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.jpg, .jpeg, .png',
    onDrop: handlePhotoChange,
  });
  return (
    <div>
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
              maxLength="20" // Maximum name length
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
              onBlur={handleMobileBlur} // Add this onBlur event handler
              required
            />
            {mobileUniqueError && (
              <div className={`${styles.error} ${styles.mobileError}`}>
                Mobile number already exists. Please use a different mobile number.
              </div>
            )}
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
            <label htmlFor="voterId"></label>
            Voter ID <span className={styles.required}>*</span>
            <input
              type="text"
              id="voterId"
              name="voterId"
              value={formData.voterId}
              onChange={handleInputChange}
              required // Add the required attribute
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