// utils/searchFunctions.js
const searchByMobile = async (mobileNumber) => {
  try {
    const searchURL = `/api/searchMembership?mobile=${encodeURIComponent(mobileNumber)}`;
    const response = await fetch(searchURL);

    if (response.ok) {
      const data = await response.json();
      // Handle the data as needed (e.g., display it on the page)
      console.log(data);
    } else {
      // Handle errors here
      console.error('Error searching by mobile');
    }
  } catch (error) {
    console.error('Error searching by mobile:', error);
  }
};

export { searchByMobile };
