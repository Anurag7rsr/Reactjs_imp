import React from 'react';
import AuthProvider from './AuthContext';
import FileUpload from './FileUpload';

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <h1>File Upload with Authentication</h1>
        <FileUpload />    {/* calling a component */}
     
      </div>
    </AuthProvider>
  );
};

export default App;
