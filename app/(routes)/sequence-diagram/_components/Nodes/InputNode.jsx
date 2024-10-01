import React from 'react';
import { Handle, Position } from 'reactflow';

const InputNode = ({ data }) => {
  const { label, color = '#fff' } = data; // Default to white if no color is provided

  return (
    <div
      className="rounded-lg shadow-md p-3 text-center border border-gray-300 w-[200px]"
      style={{ backgroundColor: color }} // Apply the dynamic background color
    >
      <div>{label}</div>
      
      {/* Handle for the output on the right side */}
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        type="source"
        position={Position.Right}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};

export default InputNode;
