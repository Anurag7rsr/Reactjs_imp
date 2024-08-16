import React from 'react';
import './App.css';
import DataFetcher from './component/DataFetcher';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Data Fetching Example</h1>
        <DataFetcher />
      </header>
    </div>
  );
}

export default App;
