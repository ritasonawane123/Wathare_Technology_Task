import React from 'react';
import './App.css';
import DataDisplay from './components/DataDisplay';
// import FilterData from './components/FilterData';
import Summary from './components/Summary';

function App() {
    return (
        <div className="App">
            <DataDisplay />
            <Summary/>
            {/* <FilterData /> */}
        </div>
    );
}

export default App;
