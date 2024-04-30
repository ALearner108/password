import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Fetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://aligned.corvo.com.np/api/monthly/aries');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        alert(error.message)
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Data from Aries monthly prediction</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default Fetch;
