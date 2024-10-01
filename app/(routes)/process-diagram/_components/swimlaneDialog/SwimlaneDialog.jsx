import React, { useState, useEffect } from 'react';

const SwimlaneDialog = ({ swimlane, onSubmit, onDelete, onClose }) => {
  // If swimlane is passed (editing), set the default state to the current values
  const [title, setTitle] = useState(swimlane?.data.title || '');
  const [titleColor, setTitleColor] = useState(swimlane?.data.titleColor || '#fff200'); // For title box color
  const [borderColor, setBorderColor] = useState(swimlane?.data.borderColor || '#fff200'); // For border color

  useEffect(() => {
    // Update state if the swimlane prop changes (in case of switching between different swimlanes)
    if (swimlane) {
      setTitle(swimlane.data.title || '');
      setTitleColor(swimlane.data.titleColor || '#fff200');
      setBorderColor(swimlane.data.borderColor || '#fff200'); // Initialize border color
    }
  }, [swimlane]);

  const handleSubmit = () => {
    if (title) {
      onSubmit({ title, titleColor, borderColor }); // Submit updated swimlane title, title color, and border color
      onClose(); // Close the dialog after submission
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">
          {swimlane ? 'Edit Swimlane' : 'Add Swimlane'} {/* Dynamic title */}
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Swimlane Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Swimlane Title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title Box Color</label>
          <input
            type="color"
            value={titleColor}
            onChange={(e) => setTitleColor(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Border Color</label>
          <input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button onClick={onClose} className="ml-2 text-gray-700 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Swimlane
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwimlaneDialog;
