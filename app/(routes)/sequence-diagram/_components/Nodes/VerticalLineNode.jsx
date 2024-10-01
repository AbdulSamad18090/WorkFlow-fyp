import React from 'react'
import { createIntervalHandles, handleConnect } from '../Utils/Utils';
const VerticalLineNode = ({ id, data }) => {
    const { intervals, height, color, title, onConnectHandle } = data;
  
    return (
      <div className="relative w-[2px] bg-gray-400" style={{ height: height || '400px' }}>
        {/* Title and color bar at the top */}
        <div
          className="absolute -top-1 left-14 transform -translate-x-1/2 font-bold"
          style={{ color: 'black', fontWeight: 'bold' }}
        >
          {title}
        </div>
        <div
          className="absolute top-0 left-0 w-full"
          style={{ height: '20px', backgroundColor: color || 'gray' }}
        />
        {/* Handles on both left and right sides */}
        {createIntervalHandles(id, intervals, height || 400, color, onConnectHandle)}
      </div>
    );
  };
  
  

export default VerticalLineNode
