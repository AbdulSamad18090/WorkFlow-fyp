import React from 'react';
import { Handle, Position } from 'reactflow';

const NoteNode = ({ data }) => {
  const { label, color } = data;
  
  // Calculate the number of lines needed based on text length and container width
  const maxLineWidth = 160; // Maximum width of the text container
  const fontSize = 8; // Font size in px
  const estimatedCharWidth = 5; // Estimate average width of a character in px

  // Calculate the number of lines needed based on content length and container width
  const numLines = Math.ceil((label.length * estimatedCharWidth) / maxLineWidth);
  
  // Calculate the new height based on the number of lines
  const lineHeight = fontSize + 2; // Line height slightly larger than font size
  const newHeight = 40 + (numLines * lineHeight); // Base height + text height

  return (
    <div
      className="relative"
      style={{
        backgroundColor: color || '#fffbc8',
        width: '180px',
        height: `${newHeight}px`, // Dynamic height based on content
        borderRadius: '4px',
        border: '1px solid #fcd34d', // Yellow border
      }}
    >
      <textarea
        className="w-full h-full bg-transparent outline-none resize-none"
        placeholder="Write your note here..."
        defaultValue={label}
        style={{ color: '#333', fontSize: '8px', padding: '5px', boxSizing: 'border-box' }}
      />

      {/* Handles for connections */}
      <Handle type="source" position={Position.Right} className="bg-gray-800 opacity-0 hover:opacity-100"  />
      <Handle type="target" position={Position.Left} className="bg-gray-800 opacity-0 hover:opacity-100" />
      <Handle type="target" position={Position.Bottom} className="bg-gray-800 opacity-0 hover:opacity-100" />
      <Handle type="source" position={Position.Top} className="bg-gray-800 opacity-0 hover:opacity-100" />
    </div>
  );
};

export default NoteNode;
