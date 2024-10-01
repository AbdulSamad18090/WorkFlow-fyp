import React from 'react';
import { EdgeText, getBezierPath, getStraightPath, getStepPath } from 'reactflow';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  step,
  label, // Added label prop
}) => {
  const path = `M${sourceX},${sourceY} C${sourceX + 100},${sourceY} ${targetX - 100},${targetY} ${targetX},${targetY}`;

  return (
    <g>
      <path
        id={id}
        className="react-flow__edge-path"
        d={path}
        type='smoothstep'
        style={{ ...style, strokeWidth: '2px', type:'smoothstep' }}
        markerEnd={markerEnd}
      />
      {label && (
        <text
          x={(sourceX + targetX) / 2}
          y={(sourceY + targetY) / 2}
          fill="#333"
          fontSize="12"
          textAnchor="middle"
          dy="-0.5em"
        >
          {label}
        </text>
      )}
    </g>
  );
};
