import React from 'react';
import { Handle } from 'reactflow';

export const NoteNode = ({ data }) => {
    const text = data.label || ""; // Get the label text
    const color = data.color || "lightyellow"; // Default color if none is provided
    const maxLineWidth = 80; // Maximum width of the text container
    const fontSize = 8; // Font size in px
    const estimatedCharWidth = 5; // Estimate average width of a character in px
  
    // Calculate the number of lines needed based on text length and container width
    const numLines = Math.ceil((text.length * estimatedCharWidth) / maxLineWidth);
  
    // Calculate the new height based on the number of lines
    const lineHeight = fontSize + 2; // Line height slightly larger than font size
    const newHeight = 40 + (numLines * lineHeight); // Base height + text height
  
    return (
        <div style={{ position: 'relative', width: '120px', height: `${newHeight}px` }}>
            <svg width="120" height={newHeight}>
                {/* Draw the main note rectangle */}
                <rect x="10" y="10" width="100" height={newHeight - 20} rx="10" ry="10" style={{ fill: color, stroke: "black", strokeWidth: 1 }} />
                {/* Draw the folded corner */}
                <polygon points="100,10 120,10 110,30" style={{ fill: color, stroke: "black", strokeWidth: 1 }} />
                {/* Insert text */}
                <foreignObject x="15" y="15" width="90" height={newHeight - 30}>
                    <div xmlns="http://www.w3.org/1999/xhtml" style={{ textAlign: 'left', wordWrap: 'break-word', fontSize: '8px', fontWeight: 'bold' }}>
                        {text}
                    </div>
                </foreignObject>
            </svg>
            {/* Handles for the node */}
            <Handle type="source" position="top" id="top" style={{ top: '-1px', left: '50%', transform: 'translateX(-50%)' }} className="bg-gray-800 opacity-0 hover:opacity-100" />
            <Handle type="source" position="right" id="right" style={{ right: '-1px', top: '50%', transform: 'translateY(-50%)' }} className="bg-gray-800 opacity-0 hover:opacity-100" />
            <Handle type="target" position="left" id="left" style={{ left: '-1px', top: '50%', transform: 'translateY(-50%)' }} className="bg-gray-800 opacity-0 hover:opacity-100" />
            <Handle type="target" position="bottom" id="bottom" style={{ bottom: '-1px', left: '50%', transform: 'translateX(-50%)' }} className="bg-gray-800 opacity-0 hover:opacity-100" />
        </div>
    );
};
