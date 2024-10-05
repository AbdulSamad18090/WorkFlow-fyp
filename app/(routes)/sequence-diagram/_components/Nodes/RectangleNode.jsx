import React from 'react';
import { Handle, Position } from 'reactflow';

const RectangleNode = ({ data }) => {
  const text = data.label || ""; // Get the label text
  const color = data.color || "lightgrey"; // Default color if none is provided
  const maxLineWidth = 100; // Maximum width of the text container
  const fontSize = 8; // Font size in px
  const estimatedCharWidth = 5; // Estimate average width of a character in px

  // Calculate the number of lines needed based on text length and container width
  const numLines = Math.ceil((text.length * estimatedCharWidth) / maxLineWidth);

  // Calculate the new height based on the number of lines
  const lineHeight = fontSize + 2; // Line height slightly larger than font size
  const newHeight = 40 + (numLines * lineHeight); // Base height + text height

  return (
    <div style={{ position: 'relative', width: '150px', height: `${newHeight}px` }}>
      <svg width="150" height={newHeight}>
        {/* Draw the rectangle with the user-selected color */}
        <rect
          x="10"
          y="10"
          width="130"
          height={newHeight - 20}
          style={{ fill: color, stroke: "black", strokeWidth: 1 }}
        />
        {/* Insert text */}
        <foreignObject x="20" y="20" width="110" height={newHeight - 40}>
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{ textAlign: 'center', wordWrap: 'break-word', fontSize: '8px', fontWeight: 'bold' }}
          >
            {text}
          </div>
        </foreignObject>
      </svg>

      {/* Handles for the node */}
      <Handle
        type="source"
        position={Position.Top}
        id="top1"
        style={{ top: '7px', left: '30%', transform: 'translateX(-50%)', zIndex: 10 }}
        className="bg-gray-800 opacity-0 hover:opacity-100"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top2"
        style={{ top: '7px', left: '70%', transform: 'translateX(-50%)', zIndex: 10 }}
        className="bg-gray-800 opacity-0 hover:opacity-100"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom1"
        style={{ bottom: '7px', left: '30%', transform: 'translateX(-50%)', zIndex: 10 }}
        className="bg-gray-800 opacity-0 hover:opacity-100"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom2"
        style={{ bottom: '7px', left: '70%', transform: 'translateX(-50%)', zIndex: 10 }}
        className="bg-gray-800 opacity-0 hover:opacity-100"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right1"
        style={{ right: '7px', top: '30%', transform: 'translateY(-50%)', zIndex: 10 }}
        className="bg-gray-800 opacity-0 hover:opacity-100"
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right2"
        style={{ right: '7px', top: '70%', transform: 'translateY(-50%)', zIndex: 10 }}
        className="bg-gray-800 opacity-0 hover:opacity-100"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left1"
        style={{ left: '7px', top: '30%', transform: 'translateY(-50%)', zIndex: 10 }}
        className="bg-gray-800 opacity-0 hover:opacity-100"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left2"
        style={{ left: '7px', top: '70%', transform: 'translateY(-50%)', zIndex: 10 }}
        className="bg-gray-800 opacity-0 hover:opacity-100"
      />
    </div>
  );
};

export default RectangleNode;
