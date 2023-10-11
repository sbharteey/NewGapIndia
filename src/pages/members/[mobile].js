// src/pages/members/[mobile].js
import { useRouter } from 'next/router';
import MembershipCardTemplate from '../../components/MembershipCardTemplate';
import Layout from '../../layout';
import styles from '../../styles/memberCardPage.module.css';

const MemberCardPage = () => {
  const router = useRouter();
  const { mobile } = router.query;

  // Use the mobile number to fetch member data
  // Fetch member data using the mobile number and display the card

  return (
    <Layout pageTitle="Membership Card">
      <div className={styles.memberCardPage}>
        <MembershipCardTemplate mobile={mobile} />
      </div>
    </Layout>
  );
};

export default MemberCardPage;
