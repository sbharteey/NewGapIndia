// membershipQueries.js
import { useQuery, useMutation } from 'react-query';

// Query to fetch members
export function useMembers() {
  return useQuery('members', async () => {
    const response = await fetch('/api/member');
    if (!response.ok) {
      throw new Error('Failed to fetch members');
    }
    return response.json();
  });
}

// Mutation to add a new member
export function useAddMember() {
  return useMutation(async (newMemberData) => {
console.log("The new member Data is:");
console.log(newMemberData);

console.log("The new member data after Json.Stringify is:");
console.log(JSON.stringify(newMemberData));

    try {
      const response = await fetch('/api/member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMemberData),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        
        console.log(errorData.error);
        if(errorData.error=="Mobile number already exists.")
        {
          console.log("Now I will return errorData");
          return errorData;
        }
        else{
          console.log("now I will throw my error:");
          throw new Error(errorData.error);
        }
        
      }
    } catch (error) {
      throw error;
    }
  });
}

// Mutation to delete a member
export function useDeleteMember() {
  return useMutation(async (mobile) => { // Change parameter to 'mobile'
    const response = await fetch(`/api/member?mobile=${mobile}`, { // Use 'mobile' in the query parameter
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete the member');
    }
  });
}

// Mutation to update a member by mobile number
export function useUpdateMemberByMobile() {
  return useMutation(async ({ mobile, updatedData }) => {
    try {
      const response = await fetch(`/api/member?mobile=${mobile}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update the member');
      }
    } catch (error) {
      throw error;
    }
  });
}