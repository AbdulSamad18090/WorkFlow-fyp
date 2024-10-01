import React from "react";
import { Handle, Position } from "reactflow";
import { FaUsers } from "react-icons/fa";

const RectanglePictureNode = ({ data }) => {
  return (
    <div className="relative w-52 h-20 flex text-center items-center p-2 border rounded bg-white shadow-md">
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
      />
      {data.image && (
        <div className="relative top-0 left-0 w-16 h-16 overflow-hidden rounded-full border">
          <img src={data.image} alt="Profile" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="ml-7">
        <strong>{data.title}</strong>
        <div className="text-sm">{data.position}</div>
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

export default RectanglePictureNode;
