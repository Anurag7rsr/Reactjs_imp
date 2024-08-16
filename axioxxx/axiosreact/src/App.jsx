import React, { useState, useEffect } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => 
        console.log("My Api or axios is here", res)
      )
      .catch((error) => 
        console.error("Error fetching data: ", error)
      );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="logo" />
        <img src={viteLogo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <p>
          <button onClick={() => setCount(count + 1)}>
            count is {count}
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
