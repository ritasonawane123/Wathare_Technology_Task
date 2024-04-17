import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataDisplay.css'; 

const DataDisplay = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/data');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h2>Data Display</h2>
            <div style={{ display: 'inline-block' }}>
            <div style={{ textAlign: 'left' }}>Cycle Status</div>
            <table style={{ borderCollapse: 'collapse'}}>
                <thead>
                    <tr>
                        {data.map((item, index) => (
                            <th key={index} style={{ padding: 0, border: 'none' }}>
                                <div style={{ height: '40px', width: '0.2px', backgroundColor: item.machine_status === 0 ? 'yellow' : item.machine_status === 1 ? 'green' : 'red' }}>
                                    {/* Color box */}
                                </div>
                                <div>
                                    {/* Uncomment to show timestamp */}
                                    {/* <div>Timestamp</div> */}
                                    {/* <div>{new Date(item.ts).toLocaleTimeString([], { hour12: false })}</div> */}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
            </table>
            </div>
        </div>
    );
    
};

export default DataDisplay;