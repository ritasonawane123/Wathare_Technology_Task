import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SummaryTable = () => {
  const [data, setData] = useState([]);

  // Function to fetch data from the database using Axios
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setData(response.data); // Update the state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  // Function to generate summary for machine_status
  const generateSummary = () => {
    // Initialize variables to store summary counts and variations
    let countOnes = 0;
    let countZeros = 0;
    let maxContinuousOnes = 0;
    let maxContinuousZeros = 0;
    let variations = 0;
    let currentContinuousOnes = 0;
    let currentContinuousZeros = 0;

    // Iterate through the data to calculate summary counts and continuous variations
    for (let i = 0; i < data.length; i++) {
      if (data[i].machine_status === 1) {
        countOnes++;
        currentContinuousOnes++;
        currentContinuousZeros = 0; // Reset continuousZeros counter
        if (i > 0 && data[i - 1].machine_status === 0) {
          variations++; // Increment variations when status changes from 0 to 1
        }
        // Update maxContinuousOnes if the current sequence is longer
        if (currentContinuousOnes > maxContinuousOnes) {
          maxContinuousOnes = currentContinuousOnes;
        }
      } else {
        countZeros++;
        currentContinuousZeros++;
        currentContinuousOnes = 0; // Reset continuousOnes counter
        if (i > 0 && data[i - 1].machine_status === 1) {
          variations++; // Increment variations when status changes from 1 to 0
        }
        // Update maxContinuousZeros if the current sequence is longer
        if (currentContinuousZeros > maxContinuousZeros) {
          maxContinuousZeros = currentContinuousZeros;
        }
      }
    }

    return (
        <table style={{ borderCollapse: 'collapse', width: '50%', margin: 'auto' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px'}}>Status</th>
            <th style={{ border: '1px solid black', padding: '8px'}}>Count</th>
            <th style={{ border: '1px solid black', padding: '8px'}}>Continuous</th>
            <th style={{ border: '1px solid black', padding: '8px'}}>Variations</th> 
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>1</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{countOnes}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{maxContinuousOnes}</td>
            <td style={{ border: '1px solid black', padding: '8px' }} rowSpan={2}>{variations}</td> 
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>0</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{countZeros}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{maxContinuousZeros}</td>
          </tr>
        </tbody>
      </table>
      
    );
  };

  return (
    <div>
      <h2>Machine Status Summary</h2>
      {generateSummary()}
    </div>
  );
};

export default SummaryTable;
