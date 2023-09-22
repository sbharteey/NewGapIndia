import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MembershipCardTemplate from '../../components/MembershipCardTemplate';
import Layout from '../../app/layout';

const MemberCardPage = () => {
  const router = useRouter();
  const { mobile } = router.query;

  // Use the mobile number to fetch member data
  // Fetch member data using the mobile number and display the card
  const [memberData, setMemberData] = useState(null); // State to store member data

  useEffect(() => {
    // Define a function to fetch member data by mobile number
    const fetchMemberData = async () => {
      // Check if 'mobile' matches the expected format (e.g., 10 digits)
      const mobileRegex = /^[0-9]{10}$/;

      if (!mobile || !mobile.match(mobileRegex)) {
        // Mobile number is invalid, handle accordingly (e.g., show an error message)
        console.error('Invalid mobile number');
        return;
      }

      try {
        // Make an API request to fetch member data using the 'mobile' query parameter
        const response = await fetch(`/api/members/${mobile}`);
        if (response.ok) {
          const data = await response.json();
          // Update the member data in the state
          setMemberData(data);
        } else {
          // Handle error responses here
          console.error('Error fetching member data');
        }
      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    };

    if (mobile) {
      // If 'mobile' is available in the query, fetch member data
      fetchMemberData();
    }
  }, [mobile]); // Run this effect when 'mobile' changes

  return (
    <Layout pageTitle="Membership Card">
      {memberData ? (
        <MembershipCardTemplate memberData={memberData} />
      ) : (
        // Display a loading message while data is being fetched
        <p>Loading...</p>
      )}
    </Layout>
  );
  
};

export default MemberCardPage;
