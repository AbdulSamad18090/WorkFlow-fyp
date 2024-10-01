import React from 'react';
import { Handle, Position } from 'reactflow';

const RectangleNode = ({ data }) => {
  const { label, color } = data; // Assume `color` is passed in data

  return (
    <div
      className="relative p-3 text-center border border-gray-300 w-[200px] h-[100px] flex items-center justify-center"
      style={{ backgroundColor: color || 'white' }} // Apply user-selected color
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
          top: '50%',
          transform: 'translateY(-50%)',
          transition: 'opacity 0.3s'
        }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="target-left"
        type="target"
        position={Position.Left}
        style={{
          borderRadius: 0,
          top: '20%',
          transform: 'translateY(-50%)',
          transition: 'opacity 0.3s'
        }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="source-left"
        type="source"
        position={Position.Left}
        style={{
          borderRadius: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0, // Initially hidden
          transition: 'opacity 0.3s'
        }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="target-right"
        type="target"
        position={Position.Right}
        style={{
          borderRadius: 0,
          top: '20%',
          transform: 'translateY(-50%)',
          transition: 'opacity 0.3s'
        }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="source-bottom"
        type="source"
        position={Position.Bottom}
        style={{
          borderRadius: 0,
          left: '47px',
          opacity: 0, // Initially hidden
          transition: 'opacity 0.3s'
        }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="target-bottom"
        type="target"
        position={Position.Bottom}
        style={{
          borderRadius: 0,
          transition: 'opacity 0.3s'
        }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="source-top"
        type="source"
        position={Position.Top}
        style={{
          borderRadius: 0,
          left: '47px',
          opacity: 0, // Initially hidden
          transition: 'opacity 0.3s'
        }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="target-top"
        type="target"
        position={Position.Top}
        style={{
          borderRadius: 0,
          transition: 'opacity 0.3s'
        }}
      />
    </div>
  );
};

export default RectangleNode;
