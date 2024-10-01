import React from 'react';
import { getBezierPath } from 'reactflow';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, markerEnd, data }) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    borderRadius: 0,
  });

  // Calculate mid-point for the title position
  const titleX = (sourceX + targetX) / 2;
  const titleY = (sourceY + targetY) / 2;

  // Define a slight offset to position the title above the edge
  const titleOffset = -15;

  return (
    <g>
      <path
        id={id}
        d={edgePath}
        stroke="black"
        strokeWidth={2}
        fill="none"
        markerEnd={markerEnd}
      />
      {data?.label && (
        <text
          x={titleX}
          y={titleY + titleOffset}  // Apply offset to position above the edge
          textAnchor="middle"
          fill="black"
          fontSize="12"
          alignmentBaseline="middle"  // Align text vertically
        >
          {data.label}
        </text>
      )}
    </g>
  );
};

export default CustomEdge;
