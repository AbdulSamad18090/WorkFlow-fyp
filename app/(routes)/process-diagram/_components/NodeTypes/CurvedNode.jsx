import React from 'react';
import { Handle } from 'reactflow';

export const CurvedNode = ({ data }) => {
    const text = data.label || ""; // Get the label text
    const color = data.color || "lightblue"; // Default color if none is provided
    let fontSize = 8; // Starting font size in px
    const padding = 10; // Padding around the text
    const maxTextWidth = 100; // Max width before wrapping text
    const minFontSize = 8; // Minimum font size
    const lineHeightMultiplier = 1.2; // Line height for text
  
    // Function to calculate the estimated text width and height
    const calculateTextDimensions = (fontSize) => {
        const lineHeight = fontSize * lineHeightMultiplier;
        const lines = text.split(/\s+/).reduce((lines, word) => {
            const line = lines[lines.length - 1] || "";
            const testLine = line + (line.length ? " " : "") + word;
            const testLineWidth = testLine.length * (fontSize * 0.6); // Estimate line width

            if (testLineWidth > maxTextWidth) {
                lines.push(word);
            } else {
                lines[lines.length - 1] = testLine;
            }
            return lines;
        }, [""]);

        const textWidth = Math.min(
            maxTextWidth,
            Math.max(...lines.map(line => line.length * (fontSize * 0.6))) + padding * 2
        );
        const textHeight = lines.length * lineHeight + padding * 2;

        return { lines, textWidth, textHeight };
    };

    // Adjust font size until the text fits within the node
    let { lines, textWidth, textHeight } = calculateTextDimensions(fontSize);
    const maxNodeWidth = 120; // Fixed node width
    const maxNodeHeight = 60;  // Fixed node height

    // Reduce the font size if the text doesn't fit
    while ((textWidth > maxNodeWidth || textHeight > maxNodeHeight) && fontSize > minFontSize) {
        fontSize -= 1;
        ({ lines, textWidth, textHeight } = calculateTextDimensions(fontSize));
    }

    return (
        <div style={{ position: 'relative', width: '120px', height: '60px' }}>
            <svg width="120" height="60">
                {/* Draw the curved shape */}
                <path 
                    d="M 0 60 Q 60 30 120 60 L 120 0 Q 60 -30 0 0 Z" 
                    fill={color} 
                    stroke="black" 
                    strokeWidth="2" 
                />
                {/* Insert the text */}
                <foreignObject x="0" y="0" width="120" height="60">
                    <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                            fontWeight: 'bold',
                            fontSize: `${fontSize}px`,
                            lineHeight: `${fontSize * lineHeightMultiplier}px`,
                            textAlign: 'center',
                            padding: `${padding}px`,
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                        }}
                    >
                        {lines.map((line, index) => (
                            <div key={index}>{line}</div>
                        ))}
                    </div>
                </foreignObject>
            </svg>
            {/* Handles with adjusted distance between them */}
            <Handle
                type="source"
                position="top"
                id="top1"
                style={{ top: '-1px', left: '30%', transform: 'translateX(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
            <Handle
                type="target"
                position="top"
                id="top2"
                style={{ top: '-1px', left: '70%', transform: 'translateX(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
            <Handle
                type="source"
                position="right"
                id="right1"
                style={{ right: '-1px', top: '25%', transform: 'translateY(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
            <Handle
                type="target"
                position="right"
                id="right2"
                style={{ right: '-1px', top: '75%', transform: 'translateY(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
            <Handle
                type="source"
                position="bottom"
                id="bottom1"
                style={{ bottom: '6px', left: '25%', transform: 'translateX(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
            <Handle
                type="target"
                position="bottom"
                id="bottom2"
                style={{ bottom: '6px', left: '75%', transform: 'translateX(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
            <Handle
                type="source"
                position="left"
                id="left1"
                style={{ left: '-1px', top: '25%', transform: 'translateY(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
            <Handle
                type="target"
                position="left"
                id="left2"
                style={{ left: '-1px', top: '75%', transform: 'translateY(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
        </div>
    );
};
