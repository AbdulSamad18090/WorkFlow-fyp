import React from 'react';
import { Handle } from 'reactflow';

export const DecisionNode = ({ data }) => {
    const text = data.label || ""; // Get the label text
    const color = data.color || "lightblue"; // Default color if none is provided
    let fontSize = 7; // Starting font size in px
    const padding = 25; // Padding around the text
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
    const maxNodeWidth = Math.max(textWidth, 100);
    const maxNodeHeight = Math.max(textHeight, 100);
  
    // Reduce the font size if the text doesn't fit
    while ((textWidth > maxNodeWidth || textHeight > maxNodeHeight) && fontSize > minFontSize) {
      fontSize -= 1;
      ({ lines, textWidth, textHeight } = calculateTextDimensions(fontSize));
    }
  
    // Set the size of the diamond (decision node)
    const width = Math.max(textWidth, 100); // Ensure a minimum width
    const height = Math.max(textHeight, 100); // Ensure a minimum height for balance
  
    const halfWidth = width / 2;
    const halfHeight = height / 2;
  
    return (
      <div style={{ position: 'relative', width: `${width}px`, height: `${height}px` }}>
        <svg width={width} height={height}>
          {/* Draw the diamond shape */}
          <polygon
            points={`${halfWidth},0 ${width},${halfHeight} ${halfWidth},${height} 0,${halfHeight}`}
            style={{ fill: color, stroke: "black", strokeWidth: 2 }}
          />
          {/* Insert text */}
          <foreignObject x="0" y="0" width={width} height={height}>
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
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
          style={{ top: '1px', left: '43%', transform: 'translateX(-50%)', zIndex: 10 }}
          className="bg-gray-800 opacity-0 hover:opacity-100"
        />
        <Handle
          type="target"
          position="top"
          id="top2"
          style={{ top: '1px', left: '56%', transform: 'translateX(-50%)', zIndex: 10 }}
          className="bg-gray-800 opacity-0 hover:opacity-100"
        />
        <Handle
           type="source"
          position="bottom"
          id="bottom1"
          style={{ bottom: '-1px', left: '45%', transform: 'translateX(-50%)', zIndex: 10 }}
          className="bg-gray-800 opacity-0 hover:opacity-100"
        />
        <Handle
          type="target"
          position="bottom"
          id="bottom2"
          style={{ bottom: '-1px', left: '55%', transform: 'translateX(-50%)', zIndex: 10 }}
         className="bg-gray-800 opacity-0 hover:opacity-100"
        />
        <Handle
          type="source"
          position="right"
          id="right1"
          style={{ right: '-1px', top: '45%', transform: 'translateY(-50%)', zIndex: 10 }}
         className="bg-gray-800 opacity-0 hover:opacity-100"
        />
        <Handle
          type="target"
          position="right"
          id="right2"
          style={{ right: '-1px', top: '55%', transform: 'translateY(-50%)', zIndex: 10 }}
        className="bg-gray-800 opacity-0 hover:opacity-100"
        />
        <Handle
          type="source"
          position="left"
          id="left1"
          style={{ left: '-1px', top: '45%', transform: 'translateY(-50%)', zIndex: 10 }}
          className="bg-gray-800 opacity-0 hover:opacity-100"
        />
        <Handle
          type="target"
          position="left"
          id="left2"
          style={{ left: '-1px', top: '55%', transform: 'translateY(-50%)', zIndex: 10 }}
          className="bg-gray-800 opacity-0 hover:opacity-100"
        />
      </div>
    );
};
