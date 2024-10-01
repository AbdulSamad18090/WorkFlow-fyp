import React from 'react';
import { Handle, Position } from 'reactflow';

const CircleNode = ({ data }) => {
  const { label, color } = data; // Assume `color` is passed in data

  return (
    <div
      className="relative p-3 text-center border border-gray-300 flex items-center justify-center"
      style={{
        backgroundColor: color || 'white', // Apply user-selected color
        borderColor: '#ccc', // Optional: You can adjust or add this for border color
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div>{label}</div>
      
      {/* Handles */}
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="source-right"
        type="source"
        position={Position.Right}
        style={{
          borderRadius: 0,
          top: '12px',
          transition: 'opacity 0.3s',
        }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="target-right"
        type="target"
        position={Position.Right}
        style={{
          borderRadius: 0,
          transition: 'opacity 0.3s',
        }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="source-left"
        type="source"
        position={Position.Left}
        style={{
          borderRadius: 0,
          top: '12px',
          transition: 'opacity 0.3s',
        }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="target-left"
        type="target"
        position={Position.Left}
        style={{
          borderRadius: 0,
          transition: 'opacity 0.3s',
        }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="source-bottom"
        type="source"
        position={Position.Bottom}
        style={{
          borderRadius: 0,
          left: '12px',
          transition: 'opacity 0.3s',
        }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="target-bottom"
        type="target"
        position={Position.Bottom}
        style={{
          borderRadius: 0,
          transition: 'opacity 0.3s',
        }}
      />
    </div>
  );
};

export default CircleNode;
