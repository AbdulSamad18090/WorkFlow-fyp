import React from 'react';
import { Handle } from 'reactflow';

// Start Node Component
export const StartNode = ({ data }) => {
  const text = data.label || ""; 
  const color = data.color || "lightgoldenrodyellow"; // Default color if none is provided
  const maxLineWidth = 80; 
  const fontSize = 8; 
  const estimatedCharWidth = 5; 

  const numLines = Math.ceil((text.length * estimatedCharWidth) / maxLineWidth);
  const lineHeight = fontSize + 2; 
  const newHeight = 30 + (numLines * lineHeight); 

  return (
    <div style={{ position: 'relative', width: '100px', height: `${newHeight}px`, borderRadius: '20px' }}>
      <svg width="100" height={newHeight}>
        <ellipse cx="49" cy={newHeight / 2} rx="48" ry={newHeight / 2.2} style={{ fill: color, stroke: "black", strokeWidth: 2 }} />
        <foreignObject x="10" y="10" width="80" height={newHeight - 20}>
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ textAlign: 'center', wordWrap: 'break-word', fontSize: '8px', fontWeight: 'bold' }}>
            {text}
          </div>
        </foreignObject>
      </svg>
      <Handle type="source" position="top" id="top" className="bg-gray-800 opacity-0 hover:opacity-100" />
      <Handle type="source" position="right" id="right" className="bg-gray-800 opacity-0 hover:opacity-100" />
      <Handle type="source" position="left" id="left" className="bg-gray-800 opacity-0 hover:opacity-100" />
      <Handle type="source" position="bottom" id="bottom" className="bg-gray-800 opacity-0 hover:opacity-100" />
    </div>
  );
};
