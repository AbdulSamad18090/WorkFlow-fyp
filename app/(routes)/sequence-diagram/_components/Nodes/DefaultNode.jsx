import React from 'react';
import { Handle, Position } from 'reactflow';

const DefaultNode = ({ data }) => {
  const { label, color } = data; // Use 'color' for background color

  return (
    <div
      className="relative rounded-lg shadow-md p-3 text-center border"
      style={{
        backgroundColor: color || 'white', // Apply user-selected background color
        borderColor: '#ccc', // Default border color
        width: '200px',
      }}
    >
      <div>{label}</div>
      
      {/* Handles */}
      <Handle
        className='bg-gray-800 opacity-0 hover:opacity-100'
        id="source-top"
        type="source"
        position={Position.Top}
        style={{
          borderRadius: 0,
          top: '-8px',
          left: '30%',
          transform: 'translateX(-50%)',
          transition: 'opacity 0.3s',
        }}
      />
      <Handle
        className='bg-gray-800 opacity-0 hover:opacity-100'
        id="target-top"
        type="target"
        position={Position.Top}
        style={{
          borderRadius: 0,
          top: '-8px',
          left: '70%',
          transform: 'translateX(-50%)',
          transition: 'opacity 0.3s',
        }}
      />
      <Handle
        className='bg-gray-800 opacity-0 hover:opacity-100'
        id="source-bottom"
        type="source"
        position={Position.Bottom}
        style={{
          borderRadius: 0,
          bottom: '-8px',
          left: '30%',
          transform: 'translateX(-50%)',
          transition: 'opacity 0.3s',
        }}
      />
      <Handle
        className='bg-gray-800 opacity-0 hover:opacity-100'
        id="target-bottom"
        type="target"
        position={Position.Bottom}
        style={{
          borderRadius: 0,
          bottom: '-8px',
          left: '70%',
          transform: 'translateX(-50%)',
          transition: 'opacity 0.3s',
        }}
      />
    </div>
  );
};

export default DefaultNode;
