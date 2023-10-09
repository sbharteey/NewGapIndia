// src/pages/members/[mobile].js
import { useRouter } from 'next/router';
import MembershipCardTemplate from '../../components/MembershipCardTemplate';
import Layout from '../../layout';

const MemberCardPage = () => {
  const router = useRouter();
  const { mobile } = router.query;

  // Use the mobile number to fetch member data
  // Fetch member data using the mobile number and display the card

  return (
    <Layout pageTitle="Membership Card">
      <MembershipCardTemplate mobile={mobile} /> {/* Pass the mobile as a prop */}
    </Layout>
  );
};

export default MemberCardPage;
