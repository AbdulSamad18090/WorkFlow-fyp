// Expected EdgeDialog
import React, { useState } from 'react';

export default function EdgeDialog({ edge, onSave, onDelete, onClose }) {
  const [title, setTitle] = useState(edge?.data?.label || ''); // Load current label or default empty

  const handleSave = () => {
    if (onSave) {
      onSave(edge, title); // Pass updated title back to FlowDiagram
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Edit Edge Title</h3>
        <input
          type="text"
          placeholder="Edge Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update title state
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave} // Save title
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete(edge)} // Allow edge deletion
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Edge
          </button>
        </div>
      </div>
    </div>
  );
}
