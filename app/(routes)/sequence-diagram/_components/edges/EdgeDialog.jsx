import React from 'react';

const EdgeDialog = ({ open, onClose, onSave, onDelete, edgeData, onInputChange }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Edge</h2>
        <label className="block mb-2">
          Label
          <input
            type="text"
            name="label"
            value={edgeData.label || ''}
            onChange={onInputChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-4">
          Stroke Color
          <input
            type="color"
            name="strokeColor"
            value={edgeData.style?.stroke || '#333'}
            onChange={onInputChange}
            className="block mt-1"
          />
        </label>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EdgeDialog;
