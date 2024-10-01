import React from "react";
import { FiSquare, FiLayout, FiArrowRightCircle, FiArrowUpCircle } from "react-icons/fi";
import { MdImage, MdCompareArrows } from "react-icons/md";

const Sidebar = ({ onLayout, onEdgeTypeChange, currentEdgeType }) => {
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-80 bg-gradient-to-b from-gray-50 to-gray-100 h-full p-6 flex flex-col overflow-y-auto border-r border-gray-200 shadow-lg">
      {/* Node Types Section */}
      <div className="mb-6">
        <div className="mb-3 text-xl font-bold text-gray-700 flex items-center">
          <FiSquare className="mr-2 text-blue-500" /> Node Types
        </div>
        <div
          className="border p-3 mb-3 cursor-pointer bg-white hover:bg-gray-100 rounded-xl shadow-md transition-all duration-200 ease-in-out flex items-center"
          onDragStart={(event) => handleDragStart(event, "input")}
          draggable
        >
          <FiArrowRightCircle className="mr-2 text-green-500" /> Input Node
        </div>
        <div
          className="border p-3 mb-3 cursor-pointer bg-white hover:bg-gray-100 rounded-xl shadow-md transition-all duration-200 ease-in-out flex items-center"
          onDragStart={(event) => handleDragStart(event, "default")}
          draggable
        >
          <FiSquare className="mr-2 text-yellow-500" /> Middle Node
        </div>
        <div
          className="border p-3 mb-3 cursor-pointer bg-white hover:bg-gray-100 rounded-xl shadow-md transition-all duration-200 ease-in-out flex items-center"
          onDragStart={(event) => handleDragStart(event, "output")}
          draggable
        >
          <FiArrowUpCircle className="mr-2 text-red-500" /> Output Node
        </div>
      </div>

      {/* Picture Nodes Section */}
      <div className="mb-6">
        <div className="mb-3 text-xl font-bold text-gray-700 flex items-center">
          <MdImage className="mr-2 text-pink-500" /> Picture Nodes
        </div>
        <div
          className="border p-3 mb-3 cursor-pointer bg-white hover:bg-gray-100 rounded-xl shadow-md transition-all duration-200 ease-in-out flex items-center"
          onDragStart={(event) => handleDragStart(event, "rectanglePictureNode")}
          draggable
        >
          <MdImage className="mr-2 text-blue-500" /> Rectangle Picture Node
        </div>
        <div
          className="border p-3 cursor-pointer bg-white hover:bg-gray-100 rounded-xl shadow-md transition-all duration-200 ease-in-out flex items-center"
          onDragStart={(event) => handleDragStart(event, "largePictureNode")}
          draggable
        >
          <MdImage className="mr-2 text-indigo-500" /> Large Picture Node
        </div>
      </div>

      {/* Layout Options Section */}
      <div className="mb-6">
        <div className="mb-3 text-xl font-bold text-gray-700 flex items-center">
          <FiLayout className="mr-2 text-purple-500" /> Layout
        </div>
        <button
          onClick={() => onLayout("TB")}
          className={`w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white py-3 px-4 rounded-xl mb-3 shadow-lg transition-all duration-200 ease-in-out hover:from-blue-500 hover:to-blue-600 focus:ring-4 focus:ring-blue-300 flex items-center justify-center ${
            currentEdgeType === "TB" ? "ring-2 ring-blue-500" : ""
          }`}
        >
          <FiArrowUpCircle className="mr-2" /> Vertical Layout
        </button>
        <button
          onClick={() => onLayout("LR")}
          className={`w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 px-4 rounded-xl shadow-lg transition-all duration-200 ease-in-out hover:from-green-500 hover:to-green-600 focus:ring-4 focus:ring-green-300 flex items-center justify-center ${
            currentEdgeType === "LR" ? "ring-2 ring-green-500" : ""
          }`}
        >
          <FiArrowRightCircle className="mr-2" /> Horizontal Layout
        </button>
      </div>

      {/* Relationship Types Section */}
      <div>
        <div className="mb-3 text-xl font-bold text-gray-700 flex items-center">
          <MdCompareArrows className="mr-2 text-red-500" /> Relationship Types
        </div>
        <div
          className={`border p-3 mb-3 cursor-pointer bg-white rounded-xl shadow-md transition-all duration-200 ease-in-out flex items-center ${
            currentEdgeType === "direct"
              ? "bg-blue-100 border-blue-500 ring-2 ring-blue-300"
              : "hover:bg-gray-100"
          }`}
          onClick={() => onEdgeTypeChange("direct")}
        >
          <FiArrowRightCircle className="mr-2 text-blue-500" /> Direct Relation Edge
        </div>
        <div
          className={`border p-3 cursor-pointer bg-white rounded-xl shadow-md transition-all duration-200 ease-in-out flex items-center ${
            currentEdgeType === "indirect"
              ? "bg-blue-100 border-blue-500 ring-2 ring-blue-300"
              : "hover:bg-gray-100"
          }`}
          onClick={() => onEdgeTypeChange("indirect")}
        >
          <FiArrowUpCircle className="mr-2 text-blue-500" /> Indirect Relation Edge
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
