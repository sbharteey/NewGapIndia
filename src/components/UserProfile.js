import React, { useState } from 'react';
import Image from 'next/image'; // Import the Image component

function UserProfile() {
  const [photo, setPhoto] = useState(null); // State to store the Base64 photo

  // Function to handle photo upload
  function handlePhotoUpload(file) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const base64String = e.target.result.split(',')[1]; // Get the Base64 string
      setPhoto(base64String); // Set the Base64 string in state
    };

    reader.readAsDataURL(file);
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(e.target.files[0])} />
      {photo && (
        <div>
          {/* Use the Image component to optimize the image */}
          <Image
            src={`data:image/jpeg;base64,${photo}`}
            alt="User's Photo"
            width={200} // Specify the desired width
            height={200} // Specify the desired height
          />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
