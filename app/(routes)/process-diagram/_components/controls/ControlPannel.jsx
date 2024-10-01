import React from 'react';

const ControlPanel = ({ handleSave, handleRestore, handleExportPng, handleExportPdf }) => {
  return (
    <div className="absolute top-2 right-2 space-x-2">
      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={handleSave}>Save</button>
      <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" onClick={handleRestore}>Restore</button>
      <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={handleExportPng}>Export PNG</button>
      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={handleExportPdf}>Export PDF</button>
    </div>
  );
};

export default ControlPanel;
