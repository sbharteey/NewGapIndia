// src/components/MembersList.js
import React from 'react';
import { useMembers } from '../../membershipQueries';
import Link from 'next/link';

function MembersList() {
  const { data, error, isLoading } = useMembers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data.map((member) => (
        <div key={member._id}>
          {/* Render member data */}
          <Link href={`/members/${member._id}`}>

          </Link>
        </div>
      ))}
    </div>
  );
}

export default MembersList;
