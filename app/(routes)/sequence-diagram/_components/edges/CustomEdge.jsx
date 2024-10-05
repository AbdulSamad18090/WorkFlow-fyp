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
  label, // Added label prop
  type = 'smoothstep', // Added type prop for dynamic path generation
}) => {
  // Determine the path based on the edge type
  let edgePath;
  switch (type) {
    case 'straight':
      edgePath = getStraightPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition });
      break;
    case 'bezier':
      edgePath = getBezierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition });
      break;
    case 'step':
      edgePath = getStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition });
      break;
    default: // smoothstep or any other custom curve
      edgePath = `M${sourceX},${sourceY} C${sourceX + 100},${sourceY} ${targetX - 100},${targetY} ${targetX},${targetY}`;
      break;
  }

  return (
    <g>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={{ ...style, strokeWidth: '2px' }}
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

export default CustomEdge;
