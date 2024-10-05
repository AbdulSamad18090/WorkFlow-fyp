import React from 'react';
import { Handle } from 'reactflow';

export const ManyDocumentsNode = ({ data }) => {
  const color = data.color || 'lightyellow';

  return (
    <div style={{ position: 'relative', width: '120px', height: '70px' }}>
      <svg width="120" height="70">
        {/* Many Documents Shape: Three rectangles stacked with an offset */}
        <rect x="5" y="10" width="100" height="40" style={{ fill: color, stroke: 'black', strokeWidth: 2 }} />
        <rect x="10" y="5" width="100" height="40" style={{ fill: color, stroke: 'black', strokeWidth: 2 }} />
        <rect x="15" y="0" width="100" height="40" style={{ fill: color, stroke: 'black', strokeWidth: 2 }} />
        <foreignObject x="10" y="15" width="100" height="30">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ textAlign: 'center', fontSize: '8px', fontWeight: 'bold' }}>
            {data.label || 'Many Documents'}
          </div>
        </foreignObject>
      </svg>
      <Handle type="source" position="bottom" id="bottom" style={{ bottom: '18px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }} className="bg-gray-800 opacity-0 hover:opacity-100"/>
      <Handle type="target" position="top" id="top" style={{ top: '-2px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }} className="bg-gray-800 opacity-0 hover:opacity-100"/>
    </div>
  );
};
