import React from 'react';
import { Handle } from 'reactflow';

export const ProcessNode = ({ data }) => {
    const text = data.label || ""; // Get the label text
    const color = data.color || "lightblue"; // Default color if none is provided
    const maxLineWidth = 100; // Maximum width of the text container
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
                {/* Draw the rectangle with the user-selected color */}
                <rect x="0" y="0" width="120" height={newHeight} style={{ fill: color, stroke: "black", strokeWidth: 2 }} />
                {/* Insert the text */}
                <foreignObject x="10" y="10" width="100" height={newHeight - 20}>
                    <div xmlns="http://www.w3.org/1999/xhtml" style={{ textAlign: 'center', wordWrap: 'break-word', fontSize: '8px', fontWeight: 'bold' }}>
                        {text}
                    </div>
                </foreignObject>
            </svg>
            {/* Handles with adjusted distance between them */}
            <Handle type="source" position="top" id="top1" style={{ top: '-5px', left: '25%', transform: 'translateX(-50%)', zIndex: 10 }} className="bg-gray-800 opacity-0 hover:opacity-100"  />
            <Handle type="target" position="top" id="top2" style={{ top: '-5px', left: '75%', transform: 'translateX(-50%)', zIndex: 10 }}className="bg-gray-800 opacity-0 hover:opacity-100"  />
            <Handle type="source" position="bottom" id="bottom1" style={{ bottom: '-5px', left: '25%', transform: 'translateX(-50%)', zIndex: 10 }} className="bg-gray-800 opacity-0 hover:opacity-100"  />
            <Handle type="target" position="bottom" id="bottom2" style={{ bottom: '-5px', left: '75%', transform: 'translateX(-50%)', zIndex: 10 }} className="bg-gray-800 opacity-0 hover:opacity-100" />
            <Handle type="source" position="right" id="right1" style={{ right: '-5px', top: '25%', transform: 'translateY(-50%)', zIndex: 10 }} className="bg-gray-800 opacity-0 hover:opacity-100" />
            <Handle type="target" position="right" id="right2" style={{ right: '-5px', top: '75%', transform: 'translateY(-50%)', zIndex: 10 }} className="bg-gray-800 opacity-0 hover:opacity-100"  />
            <Handle type="source" position="left" id="left1" style={{ left: '-5px', top: '25%', transform: 'translateY(-50%)', zIndex: 10 }} className="bg-gray-800 opacity-0 hover:opacity-100" />
            <Handle type="target" position="left" id="left2" style={{ left: '-5px', top: '75%', transform: 'translateY(-50%)', zIndex: 10 }} className="bg-gray-800 opacity-0 hover:opacity-100" />
        </div>
    );
};
