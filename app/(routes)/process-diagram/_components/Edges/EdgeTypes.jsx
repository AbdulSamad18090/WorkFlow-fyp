// EdgeTypes.js
import React from 'react';
import { MarkerType } from 'reactflow';

export const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, style, markerEnd }) => {
  return (
    <path
      id={id}
      d={`M${sourceX},${sourceY}L${targetX},${targetY}`}
      style={style}
      markerEnd={markerEnd}
    />
  );
};
