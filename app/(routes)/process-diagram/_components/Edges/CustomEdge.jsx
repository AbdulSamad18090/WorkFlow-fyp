import React from 'react';
import { getBezierPath, getStraightPath } from 'reactflow';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, markerEnd, data, style, type }) => {
  let edgePath;

  if (type === 'bezierArrow') {
    // Bezier path with arrow
    edgePath = getBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
      borderRadius: 0,
    })[0];
  } else if (type === 'straightArrow') {
    // Straight path with arrow
    edgePath = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    })[0];
  } else {
    // Default to smoothstep path for other edge types
    edgePath = getBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
      borderRadius: 0,
    })[0];
  }

  const titleX = (sourceX + targetX) / 2;
  const titleY = (sourceY + targetY) / 2;
  const titleOffset = -15;

  return (
    <g>
      <path
        id={id}
        d={edgePath}
        style={style}
        stroke="black"
        strokeWidth={2}
        fill="none"
        markerEnd={markerEnd}
      />
      {data?.label && (
        <text
          x={titleX}
          y={titleY + titleOffset}
          textAnchor="middle"
          fill="black"
          fontSize="12"
          alignmentBaseline="middle"
        >
          {data.label}
        </text>
      )}
    </g>
  );
};

export default CustomEdge;
