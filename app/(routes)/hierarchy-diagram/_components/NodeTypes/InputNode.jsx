import React from "react";
import { Handle, Position } from "reactflow";
import { FaUsers } from "react-icons/fa";

const InputNode = ({ data }) => {
  return (
    <div className="relative p-2 border rounded bg-white shadow-md">
      <div>
        <strong>{data.title || "Input Node"}</strong>
        <div className="text-sm">{data.position || "Position"}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555' }}
      />
      {/* People icon with child node count */}
      <div className="absolute bottom-2 right-2 flex items-center">
        <FaUsers className="text-gray-600 mr-1" />
        {data.childCount || 0}
      </div>
    </div>
  );
};

export default InputNode;
