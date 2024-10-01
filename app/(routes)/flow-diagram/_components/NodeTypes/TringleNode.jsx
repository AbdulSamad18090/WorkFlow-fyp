import React from 'react';
import { Handle } from 'reactflow';

export const TriangleNode = ({ data }) => {
    const text = data.label || ""; // Get the label text
    const color = data.color || "lightgreen"; // Default color if not provided
    let fontSize = 8; // Starting font size in px
    const padding = 25; // Padding around the text
    const maxTextWidth = 100; // Max width before wrapping text
    const minFontSize = 5; // Minimum font size
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

    // Set the size of the triangle
    const width = Math.max(textWidth, 100); // Ensure a minimum width
    const height = Math.max(textHeight, 100); // Ensure a minimum height

    return (
        <div style={{ position: 'relative', width: `${width}px`, height: `${height}px` }}>
            <svg width={width} height={height}>
                {/* Draw the triangle shape with dynamic color */}
                <polygon
                    points={`${width / 2},0 ${width},${height} 0,${height}`}
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
            {/* Handles for the node positioned along the border */}
            <Handle
                type="source"
                position="top"
                id="top-source"
                style={{ top: '-1px', left: `${width / 2.3}px`, transform: 'translateX(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
            <Handle
                type="target"
                position="top"
                id="top-target"
                style={{ top: '-1px', left: `${3 * width / 5.4}px`, transform: 'translateX(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
            <Handle
                type="source"
                position="right"
                id="right-source"
                style={{ right: '26px', top: `${height / 3}px`, transform: 'translateY(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
            <Handle
                type="target"
                position="right"
                id="right-target"
                style={{ right: '5px', top: `${3 * height / 4}px`, transform: 'translateY(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
            <Handle
                type="source"
                position="bottom"
                id="bottom-source"
                style={{ bottom: '-5px', left: `${width / 4}px`, transform: 'translateX(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
            <Handle
                type="target"
                position="bottom"
                id="bottom-target"
                style={{ bottom: '-5px', left: `${3 * width / 4}px`, transform: 'translateX(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
            <Handle
                type="source"
                position="left"
                id="left-source"
                style={{ left: '25px', top: `${height / 3}px`, transform: 'translateY(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
            <Handle
                type="target"
                position="left"
                id="left-target"
                style={{ left: '5px', top: `${3 * height / 4}px`, transform: 'translateY(-50%)', zIndex: 10 }}
                className="bg-gray-800 opacity-0 hover:opacity-100"
            />
        </div>
    );
};
