import React from 'react';
import { IoClose, IoSave } from 'react-icons/io5';
import { FaTrash } from 'react-icons/fa';

const NodeDialog = ({ open, onClose, onSave, dialogData, onInputChange, onDelete }) => {
  return (
    <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center ${open ? '' : 'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg w-1/3 max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Configure Node</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        <label className="block mb-4">
          <span className="text-gray-700">Title</span>
          <input
            type="text"
            name="title"
            value={dialogData.title || ''}
            onChange={onInputChange}
            className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Color</span>
          <input
            type="color"
            name="color"
            value={dialogData.color || '#ffffff'}
            onChange={onInputChange}
            className="block w-full mt-1 border border-gray-300 rounded-lg"
          />
        </label>
        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
            Cancel
          </button>
          <button onClick={() => onDelete(dialogData.nodeId)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center">
            <FaTrash className="inline-block mr-2" /> Delete
          </button>
          <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center">
            <IoSave className="inline-block mr-2" /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeDialog;
