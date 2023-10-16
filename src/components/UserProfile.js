import React, { useState } from 'react';
import Image from 'next/image';

function UserProfile() {
  const [photo, setPhoto] = useState(null);

  // Function to handle photo upload
  function handlePhotoUpload(file) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const base64String = e.target.result.split(',')[1];
      setPhoto(base64String);
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
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
