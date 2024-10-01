import React from 'react';
import { Handle, Position } from 'reactflow';

const HumanNode = ({ data }) => {
  const { label, color = '#fff' } = data; // Default to white if no color is provided

  return (
    <div
      className="flex items-center justify-center rounded-lg shadow-md p-3 border border-gray-300"
      style={{ backgroundColor: color, width: '150px', height: '150px' }} // Apply the dynamic background color
    >
      <div className="text-center">
        {/* Inline SVG for a stick figure */}
        <svg
          width="100"
          height="100"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="12" r="10" stroke="black" strokeWidth="2" />
          <line x1="32" y1="22" x2="32" y2="44" stroke="black" strokeWidth="2" />
          <line x1="32" y1="44" x2="16" y2="60" stroke="black" strokeWidth="2" />
          <line x1="32" y1="44" x2="48" y2="60" stroke="black" strokeWidth="2" />
          <line x1="32" y1="28" x2="16" y2="44" stroke="black" strokeWidth="2" />
          <line x1="32" y1="28" x2="48" y2="44" stroke="black" strokeWidth="2" />
        </svg>
        
        {/* Display the label below the SVG */}
        <div className="mt-2">{label}</div>
      </div>
      
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="source-bottom"
        type="source"
        position={Position.Bottom}
        style={{ borderRadius: 0, left: '23px' }}
      />
      <Handle
        className="bg-gray-800 opacity-0 hover:opacity-100"
        id="target-bottom"
        type="target"
        position={Position.Bottom}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};

export default HumanNode;
