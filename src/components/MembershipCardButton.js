import React from 'react';
import subnavbarStyles from '../styles/subnavbar.module.css'; // Import the CSS module

const handlePrint = () => {
  // Create a new window to isolate the printing content
  const printWindow = window.open('', '', 'width=600,height=600');
  const contentToPrint = document.getElementById('membershipCard'); // Use the ID 'membershipCard'

  if (printWindow && contentToPrint) {
    // Write the content to the new window
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Membership Card</title>
          <link rel="stylesheet" type="text/css" href="/path-to-your-print.css">
          <style>
            /* Use subnavbarStyles here */
            ${subnavbarStyles.membershipCardButton}
          </style>
        </head>
        <body>
          ${contentToPrint.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();

    // Wait for the content to be fully loaded before printing
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  }
};

const MembershipCardButton = ({ memberId }) => {
  return (
    <div>
      {/* Add an onClick handler to trigger the print */}
      <button className={subnavbarStyles.membershipCardButton} onClick={handlePrint}>
        Print Card
      </button>
    </div>
  );
};

export default MembershipCardButton;
