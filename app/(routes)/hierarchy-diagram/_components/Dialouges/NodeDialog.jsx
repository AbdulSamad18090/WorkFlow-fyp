import React, { useState } from "react";
import { BlockPicker } from "react-color"; // Import BlockPicker

const NodeDialog = ({ isOpen, nodeData, onSave, onClose, onDelete }) => {
  const [title, setTitle] = useState(nodeData?.data?.title || "");
  const [position, setPosition] = useState(nodeData?.data?.position || "");
  const [color, setColor] = useState(nodeData?.data?.color || "#ffffff"); // Default color

  const handleSave = () => {
    onSave(title, position, color); // Pass the selected color to onSave
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-3 rounded shadow-lg w-80"> 
        <h2 className="text-lg font-bold mb-3">Edit Node</h2> 
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">Title</label> 
          <input
            type="text"
            className="w-full border p-1 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">Position</label>
          <input
            type="text"
            className="w-full border p-1 rounded"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">Color</label>
          <BlockPicker
            color={color}
            onChangeComplete={(newColor) => setColor(newColor.hex)}
            triangle="hide" // Hide the picker triangle for a more compact look
            width="100%" // Make the color picker responsive
            styles={{
              default: {
                card: { boxShadow: '2px', padding: '', border: 'none' }, // Remove unnecessary styling
                body: { padding: '0' },
              },
            }}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-3 py-1 rounded mr-2" 
          >
            Save
          </button>
          <button onClick={onClose} className="bg-gray-300 px-3 py-1 rounded mr-2">
            Cancel
          </button>
          {onDelete && (
            <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NodeDialog;
