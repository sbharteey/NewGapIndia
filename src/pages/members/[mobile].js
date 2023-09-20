// pages/members/[mobile].js
import { useRouter } from 'next/router';
import MembershipCardTemplate from '../../components/MembershipCardTemplate';
import Layout from '../../app/layout';

const MemberCardPage = () => {
  const router = useRouter();
  const { mobile } = router.query;

  // Use the mobile number to fetch member data
  // Fetch member data using the mobile number and display the card
console.log({mobile});
  return (
    <Layout pageTitle="Membership Card">
      <MembershipCardTemplate mobile={mobile} /> {/* Pass the mobile as a prop */}
    </Layout>
  );
};

export default MemberCardPage;
