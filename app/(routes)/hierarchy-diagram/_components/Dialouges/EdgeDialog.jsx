// components/Dialogues/EdgeDialog.js
import React from "react";

const EdgeDialog = ({ isOpen, onDelete, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm"> {/* Added max-w-sm */}
        <h2 className="text-lg font-bold mb-2">Delete Edge</h2>
        <p className="mb-4">Are you sure you want to delete this edge?</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EdgeDialog;
