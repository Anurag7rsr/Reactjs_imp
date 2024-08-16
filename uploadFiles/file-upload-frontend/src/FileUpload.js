import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const FileUpload = () => {
  const { token } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error('File upload failed', error);
    }
  };

  return (
    <form onSubmit={handleFileUpload}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload File</button>
    </form>
  );
};

export default FileUpload;
