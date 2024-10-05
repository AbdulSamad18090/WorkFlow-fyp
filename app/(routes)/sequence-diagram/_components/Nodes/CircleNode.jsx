import React from 'react';
import { Handle, Position } from 'reactflow';

const CircleNode = ({ data }) => {
  const text = data.label || ""; // Get the label text
  const color = data.color || "white"; // Default color if none is provided

  const baseDiameter = 60; // Base diameter of the circle
  const fontSize = 10; // Font size in px
  const estimatedCharWidth = 6; // Estimate average width of a character in px
  const charsPerLine = 10; // Estimate max characters per line to fit inside circle

  // Calculate the number of lines needed based on text length
  const numLines = Math.ceil(text.length / charsPerLine);

  // Adjust the circle's size proportionally based on the number of lines
  const newDiameter = baseDiameter + (numLines * fontSize);

  return (
    <div
      className="relative p-3 text-center border border-gray-300 flex items-center justify-center"
      style={{
        backgroundColor: color, // Apply user-selected color
        borderColor: '#ccc',
        width: `${newDiameter}px`, // Increase width based on the text
        height: `${newDiameter}px`, // Keep height equal to width for a circle
        borderRadius: '50%', // Ensure the node remains a circle
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Text inside the circle node */}
      <div style={{ textAlign: 'center', wordWrap: 'break-word', fontSize: `${fontSize}px`, fontWeight: 'bold', width: '80%' }}>
        {text}
      </div>

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
          top: '50%',
          transform: 'translateY(-50%)',
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
          left: '50%',
          transform: 'translateX(-50%)',
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
