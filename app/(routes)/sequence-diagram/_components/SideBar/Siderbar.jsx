import React from 'react';
import { FaUser } from 'react-icons/fa';
import { MdRectangle, MdCircle } from 'react-icons/md';
import { IoMdCreate, IoMdArrowDropright } from 'react-icons/io';

const Sidebar = ({ onDragStart, onInputChange, dialogData, onToggleNodes, onToggleEdges, onToggleMiniMap }) => {
  return (
    <div className="w-80 bg-gray-100 p-6 overflow-y-auto shadow-md">
      <h2 className="text-sm font-bold mb-6 text-center">SEQUENCE DIAGRAM TOOLS</h2>

      {/* Standard Nodes Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FaUser className="w-5 h-5 mr-2 text-blue-500" /> Standard Nodes
        </h3>
        {['defaultNode', 'inputNode', 'outputNode', 'customNode'].map(type => (
          <div
            key={type}
            onDragStart={(event) => onDragStart(event, type)}
            draggable
            className="bg-white rounded-lg shadow-md p-4 flex items-center border border-gray-300 my-2 cursor-pointer hover:bg-gray-200 transition"
          >
            <span className="text-gray-700 mr-2">{type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
          </div>
        ))}
      </div>

      {/* Edge Options Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <IoMdCreate className="w-5 h-5 mr-2 text-green-500" /> Edge Options
        </h3>
        <label className="block mb-4">
          <span className="text-gray-700">Edge Label</span>
          <input
            type="text"
            name="edgeLabel"
            value={dialogData.edgeLabel || ''}
            onChange={onInputChange}
            className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Edge Style</span>
          <select
            name="edgeStyle"
            value={dialogData.edgeStyle || 'straight'}
            onChange={onInputChange}
            className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
          >
            <option value="straight">Straight</option>
            <option value="dotted">Dotted</option>
            <option value="arrow">Arrow</option>
          </select>
        </label>
      </div>

      {/* Shapes Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FaUser className="w-5 h-5 mr-2 text-purple-500" /> Shapes
        </h3>
        {['circleNode', 'rectangleNode', 'humanNode'].map(type => {
          let Icon;
          if (type === 'circleNode') Icon = MdCircle;
          if (type === 'rectangleNode') Icon = MdRectangle;
          if (type === 'humanNode') Icon = FaUser;

          return (
            <div
              key={type}
              onDragStart={(event) => onDragStart(event, type)}
              draggable
              className="bg-white rounded-lg shadow-md p-4 flex items-center border border-gray-300 my-2 cursor-pointer hover:bg-gray-200 transition"
            >
              <Icon className="w-5 h-5 mr-2 text-gray-700" />
              <span>{type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
            </div>
          );
        })}
      </div>

      {/* Vertical Line Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <IoMdArrowDropright className="w-5 h-5 mr-2 text-red-500" /> Vertical Line
        </h3>
        <div
          onDragStart={(event) => onDragStart(event, 'verticalLine')}
          draggable
          className="bg-white rounded-lg shadow-md p-4 flex items-center border border-gray-300 my-2 cursor-pointer hover:bg-gray-200 transition"
        >
          <IoMdArrowDropright className="w-5 h-5 mr-2 text-gray-700" />
          <span>Vertical Line Node</span>
        </div>
      </div>

      {/* Controls */}
      <div className="text-center mt-6">
        <button onClick={onToggleNodes} className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-2 hover:bg-blue-600 transition">
          Toggle Nodes
        </button>
        <button onClick={onToggleEdges} className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-2 hover:bg-blue-600 transition">
          Toggle Edges
        </button>
        <button onClick={onToggleMiniMap} className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition">
          Toggle MiniMap
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
