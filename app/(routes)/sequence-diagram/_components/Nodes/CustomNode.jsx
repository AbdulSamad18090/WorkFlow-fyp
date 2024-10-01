import React from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  const { label, color = '#fff' } = data; // Default to white if no color is provided

  return (
    <div
      className="rounded-lg shadow-md p-3 text-center border border-gray-300 w-[200px]"
      style={{ backgroundColor: color }} // Apply the dynamic background color
    >
      <div>{label}</div>

      {/* Handles */}
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="source-right"
        type="source"
        position={Position.Right}
        style={{ borderRadius: 0, top: '8px' }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="target-right"
        type="target"
        position={Position.Right}
        style={{ borderRadius: 0 }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="source-left"
        type="source"
        position={Position.Left}
        style={{ borderRadius: 0, top: '8px' }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="target-left"
        type="target"
        position={Position.Left}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};

export default CustomNode;
