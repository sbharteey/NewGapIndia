// src/components/MyComponent.jsx
import React from 'react';
import toast from 'react-hot-toast';

const MyComponent = () => {
  // Function to trigger a success toast
  const notifySuccess = () => {
    toast.success('This is a success toast message');
  };

  // Function to trigger an error toast
  const notifyError = () => {
    toast.error('This is an error toast message');
  };

  // Additional component within MyComponent
  const AdditionalComponent = () => {
    return <p>This is an additional component within MyComponent.</p>;
  };

  return (
    <div>
      <h1>My Component</h1>
      <button onClick={notifySuccess}>Show Success Toast</button>
      <button onClick={notifyError}>Show Error Toast</button>

      {/* Render the AdditionalComponent */}
      <AdditionalComponent />
    </div>
  );
};

export default MyComponent;
export { toast };
