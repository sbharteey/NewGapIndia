// src/pages/members/[mobile].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MembershipCardTemplate from '../../components/MembershipCardTemplate';
import Layout from '../../app/layout';

const MemberCardPage = () => {
  const router = useRouter();
  const { mobile } = router.query;

  // Use the mobile number to fetch member data
  const [memberData, setMemberData] = useState(null); // State to store member data
  const [loading, setLoading] = useState(false); // State to track loading status

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

      // Set loading to true when the request starts
      setLoading(true);

      try {
        // Make an API request to fetch member data using the 'mobile' query parameter
        const response = await fetch(`/members/${mobile}`);

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
      } finally {
        // Set loading back to false when the request completes
        setLoading(false);
      }
    };

    if (mobile) {
      // If 'mobile' is available in the query, fetch member data
      fetchMemberData();
    }
  }, [mobile]); // Run this effect when 'mobile' changes
  console.log('memberData:', memberData); // Add this line to check the value
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
