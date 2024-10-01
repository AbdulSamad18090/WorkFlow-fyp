import React from 'react'
import { Handle, Position } from 'reactflow';

export const createIntervalHandles = (id, intervals, height, color, onConnectHandle) => {
    const handles = [];
    const intervalSpacing = height / (intervals + 1);
  
    for (let i = 0; i < intervals; i++) {
      const topPosition = (i + 1) * intervalSpacing;
  
      handles.push(
        <React.Fragment key={`${id}-handle-${i}`}>
          <Handle
            type="source"
            position={Position.Right}
            style={{
              top: `${topPosition}px`,
              background: 'transparent',
              border: 'none',
              width: '10px',
              height: '10px',
              
            }}
            id={`${id}-right-handle-${i}`}
            onConnect={(params) => handleConnect(params, `${id}-right-handle-${i}`, onConnectHandle)}
          />
          <Handle
            type="target"
            position={Position.Right}
            style={{
              top: `${topPosition}px`,
              background: 'transparent',
              marginRight:'13px',
              marginTop:'16px',
              border: 'none',
              width: '10px',
              height: '10px',
            }}
            id={`${id}-right-handle-${i}`}
            onConnect={(params) => handleConnect(params, `${id}-right-handle-${i}`, onConnectHandle)}
          />
          <div
            className="absolute -left-px w-1 hidden"
            style={{
              height: '34px',
              top: `${topPosition}px`,
              zIndex: 1,
              borderRadius: '2px',
              backgroundColor: color,
            }}
            id={`bar-${id}-right-handle-${i}`}
          />
          <Handle
            type="source"
            position={Position.Left}
            style={{
              top: `${topPosition}px`,
              background: 'transparent',
             
              left: '-17px',
              border: 'none',
              width: '10px',
              height: '10px',
            }}
            id={`${id}-left-handle-${i}`}
            onConnect={(params) => handleConnect(params, `${id}-left-handle-${i}`, onConnectHandle)}
          />
          <Handle
            type="target"
            position={Position.Right}
            style={{
              top: `${topPosition}px`,
              background: 'transparent',
              left: '17px',
              marginTop:'8px',
              border: 'none',
              width: '10px',
              
              height: '10px',
            }}
            id={`${id}-left-handle-${i}`}
            onConnect={(params) => handleConnect(params, `${id}-left-handle${i}`, onConnectHandle)}
          />
          <div
            className="absolute -left-px w-1 hidden"
            style={{
              height: '34px',
              top: `${topPosition}px`,
              zIndex: 1,
              borderRadius: '2px',
              backgroundColor: color,
            }}
            id={`bar-${id}-left-handle-${i}`}
          />
        </React.Fragment>
      );
    }
  
    return handles;
  };
  
  export const handleConnect = (params, handleId, onConnectHandle) => {
    const barId = `bar-${handleId}`;
    const barElement = document.getElementById(barId);
  
    if (barElement) {
      barElement.classList.remove('hidden');
    }
  
    if (typeof onConnectHandle === 'function') {
      onConnectHandle(params);
    }
  };
  

