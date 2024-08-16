import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalcatFilterHome from './components/GlobalcatFilterHome';
import { ARiProvider } from './apiData/ARiContext';

function App() {
  return (
    <ARiProvider>
      <Router>
        <Routes>
          <Route path="/" element={<GlobalcatFilterHome />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </ARiProvider>
  );
}

export default App;
