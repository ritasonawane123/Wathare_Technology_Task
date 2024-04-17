import React, { useState } from 'react';
import axios from 'axios';

const FilterData = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [selectedFrequency, setSelectedFrequency] = useState('');
    const [startTime, setStartTime] = useState('');

    const handleFilter = async (frequency) => {
        try {
            let backendFrequency;
            switch (frequency) {
                case 'hour':
                    backendFrequency = 'hour';
                    break;
                case '8hours':
                    backendFrequency = 'day';
                    break;
                case '24hours':
                    backendFrequency = 'day';
                    break;
                default:
                    console.error('Invalid frequency:', frequency);
                    return;
            }
            const response = await axios.get(`http://localhost:5000/api/filter-data?startTime=${encodeURIComponent(startTime)}&frequency=${backendFrequency}`);
            setFilteredData(response.data);
            setSelectedFrequency(frequency);
        } catch (error) {
            console.error('Error filtering data:', error);
        }
    };

    return (
        <div>
            <h2>Filter Data</h2>
            <div className="frequency-buttons">
                <button onClick={() => handleFilter('hour')}>1hr</button>
                <button onClick={() => handleFilter('8hours')}>8hr</button>
                <button onClick={() => handleFilter('24hours')}>24hr</button>
            </div>
            <div className="start-time-input">
                <label htmlFor="start-time">Start Time:</label>
                <input type="datetime-local" id="start-time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div className="filtered-results">
                {filteredData.length > 0 && (
                    <div>
                        <h3>Filtered Data ({selectedFrequency}):</h3>
                        <ul>
                            {filteredData.map((item, index) => (
                                <li key={index}>
                                    Timestamp: {new Date(item.ts).toLocaleString()}, Machine Status: {item.machine_status}, Vibration: {item.vibration}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterData;
