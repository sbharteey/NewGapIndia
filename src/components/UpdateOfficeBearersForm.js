// src/components/UpdateOfficeBearersForm.js
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const UpdateOfficeBearersForm = () => {
  const [dataToUpdate, setDataToUpdate] = useState('');
  const queryClient = useQueryClient();

  // Create mutation for adding data (POST)
  const addDataMutation = useMutation(
    (data) =>
      fetch('/api/addOfficeBearers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response) => response.json()),
    {
      onSettled: () => {
        // Invalidate relevant query to refetch updated data
        queryClient.invalidateQueries('officeBearers');
      },
    }
  );

  // Create mutation for updating data (PUT)
  const updateDataMutation = useMutation(
    (data) =>
      fetch('/api/updateOfficeBearers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response) => response.json()),
    {
      onSettled: () => {
        // Invalidate relevant query to refetch updated data
        queryClient.invalidateQueries('officeBearers');
      },
    }
  );

  // Create query to get data (GET)
  const getDataQuery = useQuery('officeBearers', () =>
    fetch('/api/getOfficeBearers').then((response) => response.json())
  );

  // Create mutation for deleting data (DELETE)
  const deleteDataMutation = useMutation(
    (data) =>
      fetch('/api/deleteOfficeBearers', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response) => response.json()),
    {
      onSettled: () => {
        // Invalidate relevant query to refetch updated data
        queryClient.invalidateQueries('officeBearers');
      },
    }
  );

  const handleAdd = async () => {
    try {
      // Prepare the data you want to write to Google Sheets
      const dataToAdd = {
        // Replace these with actual column names and values
        columnName1: 'Value1',
        columnName2: 'Value2',
        // Add more columns and values as needed
      };

      // Call your API endpoint to write data
      await addDataMutation.mutateAsync(dataToAdd);

      // Optionally, you can handle the response or show a success message.
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors that may occur during the API call
    }
  };

  const handleUpdate = async () => {
    try {
      // Prepare the updated data you want to write to Google Sheets
      const updatedData = {
        // Replace these with actual column names and updated values
        columnName1: 'UpdatedValue1',
        columnName2: 'UpdatedValue2',
        // Add more columns and updated values as needed
      };

      // Call your API endpoint to update data
      await updateDataMutation.mutateAsync(updatedData);

      // Optionally, you can handle the response or show a success message.
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors that may occur during the API call
    }
  };

  const handleGet = () => {
    // Fetch data using the GET method
    queryClient.invalidateQueries('officeBearers'); // Optional: Invalidate the query to refresh data
    getDataQuery.refetch();
  };

  const handleDelete = async () => {
    try {
      // Prepare the data you want to delete from Google Sheets
      const dataToDelete = {
        // Replace these with actual data to delete
        columnName1: 'ValueToDelete1',
        columnName2: 'ValueToDelete2',
        // Add more columns and values as needed
      };

      // Call your API endpoint to delete data
      await deleteDataMutation.mutateAsync(dataToDelete);

      // Optionally, you can handle the response or show a success message.
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors that may occur during the API call
    }
  };

  return (
    <div>
      <input
        type="text"
        value={dataToUpdate}
        onChange={(e) => setDataToUpdate(e.target.value)}
      />
      <button onClick={handleAdd}>Add Data (POST)</button>
      <button onClick={handleUpdate}>Update Data (PUT)</button>
      <button onClick={handleGet}>Get Data (GET)</button>
      <button onClick={handleDelete}>Delete Data (DELETE)</button>
    </div>
  );
};

export default UpdateOfficeBearersForm;
