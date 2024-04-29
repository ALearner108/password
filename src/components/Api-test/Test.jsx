import React, { useState, useEffect } from 'react';
import axios from 'axios'; // If you're using Axios

function MyComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/data');
        setData(response.data); // Set the data in state
        setLoading(false); // Set loading to false
      } catch (error) {
        setError(error); // Set error state if request fails
        setLoading(false); // Set loading to false
      }
    };

    fetchData(); // Call the function to fetch data
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while data is being fetched
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Render an error message if request fails
  }

  return (
    <div>
      {/* Render the fetched data */}
      {data && (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyComponent;
