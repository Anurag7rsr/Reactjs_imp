import React from 'react';
import * as XLSX from 'xlsx';

const ExportToExcel = ({ data, fileName }) => {

  const handleDownload = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <button onClick={handleDownload}>
      Download Excel
    </button>
  );
};

function App() {
  const sampleData = [
    { Name: 'John Doe', Age: 28, Email: 'john.doe@example.com' },
    { Name: 'Jane Smith', Age: 34, Email: 'jane.smith@example.com' },
  ];

  return (
    <div>
      <h1>Export Data to Excel</h1>
      <ExportToExcel data={sampleData} fileName="User_Data" />
    </div>
  );
}

export default App;
