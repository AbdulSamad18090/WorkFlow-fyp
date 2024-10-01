import React from 'react';
import { Handle } from 'reactflow';

export const DisplayNode = ({ data }) => {
  const color = data.color || 'lightgreen';
  
  return (
    <div style={{ position: 'relative', width: '120px', height: '60px' }}>
      <svg width="120" height="60">
        {/* Display Shape: A parallelogram */}
        <polygon points="20,0 120,0 100,60 0,60" style={{ fill: color, stroke: 'black', strokeWidth: 2 }} />
        <foreignObject x="10" y="10" width="100" height="40">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ textAlign: 'center', wordWrap: 'break-word', fontSize: '8px', fontWeight: 'bold' }}>
            {data.label || 'Display'}
          </div>
        </foreignObject>
      </svg>
      <Handle type="source" position="bottom" id="bottom" style={{ bottom: '-5px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }} />
      <Handle type="target" position="top" id="top" style={{ top: '-5px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }} />
    </div>
  );
};
