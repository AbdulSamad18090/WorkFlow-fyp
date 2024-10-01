import React from "react";
import { Handle, Position } from "reactflow";

const OutputNode = ({ data }) => {
  return (
    <div className="relative p-2 border rounded bg-white shadow-md">
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
      />
      <div>
        <strong>{data.title || "Output Node"}</strong>
        <div className="text-sm">{data.position || "Position"}</div>
      </div>
    
    </div>
  );
};

export default OutputNode;
