import React, { useState, useEffect } from 'react';

interface DataType {
  id: number;
  title: string;
}

const DataFetcher: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    // Simulate fetching user permissions
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(permissionData => {
        // Simulate checking permission - you can replace this with your actual logic
        const userHasPermission = permissionData.id === 1; // Assuming permission is granted if id is 1
        setHasPermission(userHasPermission);
      })
      .catch(error => {
        console.error('Error fetching permissions:', error);
      });
  }, []);

  useEffect(() => {
    if (hasPermission) {
      // Fetch data from the public API if user has permission
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(jsonData => {
          setData(Array.isArray(jsonData) ? jsonData : [jsonData]);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [hasPermission]);

  return (
    <div>
      <h1>Fetched Data</h1>
      {hasPermission ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      ) : (
        <p>You do not have permission to view this data.</p>
      )}
    </div>
  );
};

export default DataFetcher;
