import React from 'react';
import { Handle, Position } from 'reactflow';

const FrameFragmentNode = ({ data }) => {
  const { label, color } = data;

  return (
    <div
      className="relative border border-dashed border-gray-400 p-2"
      style={{
        backgroundColor: color || '#f0f0f0',
        width: '500px',
        height: '300px',
        borderRadius: '8px',
      }}
    >
      <div className="font-bold mb-2">{label}</div>
      
      {/* Handles for connections */}
      <Handle type="source" position={Position.Right} className="bg-gray-800" />
      <Handle type="target" position={Position.Left} className="bg-gray-800" />
    </div>
  );
};

export default FrameFragmentNode;
