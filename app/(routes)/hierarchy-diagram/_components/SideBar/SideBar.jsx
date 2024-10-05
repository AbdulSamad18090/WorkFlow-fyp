import React, { useState } from "react";
import { FiSquare, FiLayout, FiArrowRightCircle, FiArrowUpCircle, FiMenu } from "react-icons/fi";
import { MdImage, MdCompareArrows } from "react-icons/md";

const Sidebar = ({ onLayout, onEdgeTypeChange, currentEdgeType }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Sidebar starts in collapsed state

  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside
  className={`${
    isCollapsed ? "w-20" : "w-72"
  } bg-white h-full p-4 flex flex-col border-r border-gray-300 shadow-lg transition-all duration-300 overflow-auto`}
  onMouseEnter={() => setIsCollapsed(false)}
  onMouseLeave={() => setIsCollapsed(true)}
>

      {/* Hamburger Icon for Collapsing/Expanding */}
      <div className={`flex justify-end ${isCollapsed ? 'p-4 sm:p-3' : 'p-4 sm:p-3'}`}>
        <button
          className="mb-1 text-blue-500 focus:outline-none"
          onClick={() => setIsCollapsed(!isCollapsed)} // Manually toggle sidebar
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Node Types Section */}
      <div className="mb-6">
      <div className={`flex items-center space-x-2 mb-2 ${isCollapsed ? 'pl-2 sm:pl-3' : 'pl-2 sm:pl-3'}`}>
          <FiSquare className="text-blue-500 w-6 h-6" />
          {!isCollapsed && <span className="ml-2">Node Types</span>} {/* Show text only when not collapsed */}
        </div>
        <div
          className={`border p-3 mb-3 cursor-pointer bg-white hover:bg-gray-100 rounded-xl shadow-md transition-all duration-200 ease-in-out flex ${
            isCollapsed ? "justify-center" : "items-center"
          }`}
          onDragStart={(event) => handleDragStart(event, "input")}
          draggable
        >
          <FiArrowRightCircle className="text-blue-500 w-6 h-6" />
          {!isCollapsed && <span className="ml-2">Input Node</span>} {/* Show text only when not collapsed */}
        </div>
        <div
          className={`border p-3 mb-3 cursor-pointer bg-white hover:bg-gray-100 rounded-xl shadow-md transition-all duration-200 ease-in-out flex ${
            isCollapsed ? "justify-center" : "items-center"
          }`}
          onDragStart={(event) => handleDragStart(event, "default")}
          draggable
        >
          <FiSquare className="text-blue-500 w-6 h-6" />
          {!isCollapsed && <span className="ml-2">Middle Node</span>} {/* Show text only when not collapsed */}
        </div>
        <div
          className={`border p-3 mb-3 cursor-pointer bg-white hover:bg-gray-100 rounded-xl shadow-md transition-all duration-200 ease-in-out flex ${
            isCollapsed ? "justify-center" : "items-center"
          }`}
          onDragStart={(event) => handleDragStart(event, "output")}
          draggable
        >
          <FiArrowUpCircle className="text-blue-500 w-6 h-6" />
          {!isCollapsed && <span className="ml-2">Output Node</span>} {/* Show text only when not collapsed */}
        </div>
      </div>

      {/* Picture Nodes Section */}
      <div className="mb-6">
      <div className={`flex items-center space-x-2 mb-2 ${isCollapsed ? 'pl-2 sm:pl-3' : 'pl-2 sm:pl-3'}`}>
          <MdImage className="text-blue-500 w-6 h-6" />
          {!isCollapsed && <span className="ml-2">Picture Nodes</span>} {/* Show text only when not collapsed */}
        </div>
        <div
          className={`border p-3 mb-3 cursor-pointer bg-white hover:bg-gray-100 rounded-xl shadow-md transition-all duration-200 ease-in-out flex ${
            isCollapsed ? "justify-center" : "items-center"
          }`}
          onDragStart={(event) => handleDragStart(event, "rectanglePictureNode")}
          draggable
        >
          <MdImage className="text-blue-500 w-6 h-6" />
          {!isCollapsed && <span className="ml-2">Rectangle Picture Node</span>} {/* Show text only when not collapsed */}
        </div>
        <div
          className={`border p-3 cursor-pointer bg-white hover:bg-gray-100 rounded-xl shadow-md transition-all duration-200 ease-in-out flex ${
            isCollapsed ? "justify-center" : "items-center"
          }`}
          onDragStart={(event) => handleDragStart(event, "largePictureNode")}
          draggable
        >
          <MdImage className="text-blue-500 w-6 h-6" />
          {!isCollapsed && <span className="ml-2">Large Picture Node</span>} {/* Show text only when not collapsed */}
        </div>
      </div>

      {/* Layout Options Section */}
      <div className="mb-6">
      <div className={`flex items-center space-x-2 mb-2 ${isCollapsed ? 'pl-2 sm:pl-3' : 'pl-2 sm:pl-3'}`}>
          <FiLayout className="text-blue-500 w-6 h-6" />
          {!isCollapsed && <span className="ml-2">Layout</span>} {/* Show text only when not collapsed */}
        </div>
        <button
          onClick={() => onLayout("TB")}
          className={`w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white py-3 px-4 rounded-xl mb-3 shadow-lg transition-all duration-200 ease-in-out hover:from-blue-500 hover:to-blue-600 focus:ring-4 focus:ring-blue-300 flex ${
            isCollapsed ? "justify-center" : "items-center"
          }`}
        >
          <FiArrowUpCircle className="w-6 h-6" />
          {!isCollapsed && <span className="ml-2">Vertical Layout</span>} {/* Show text only when not collapsed */}
        </button>
        <button
          onClick={() => onLayout("LR")}
          className={`w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 px-4 rounded-xl shadow-lg transition-all duration-200 ease-in-out hover:from-green-500 hover:to-green-600 focus:ring-4 focus:ring-green-300 flex ${
            isCollapsed ? "justify-center" : "items-center"
          }`}
        >
          <FiArrowRightCircle className="w-6 h-6" />
          {!isCollapsed && <span className="ml-2">Horizontal Layout</span>} {/* Show text only when not collapsed */}
        </button>
      </div>

     {/* Relationship Types Section */}
     <div>
     <div className={`flex items-center space-x-2 mb-2 ${isCollapsed ? 'pl-2 sm:pl-3' : 'pl-2 sm:pl-3'}`}>
          <MdCompareArrows className="text-blue-500 w-8 h-8" /> {/* Increased icon size */}
          {!isCollapsed && <span className="ml-2">Relationship Types</span>} {/* Show text only when not collapsed */}
        </div>

        {/* Direct Relation Edge */}
        <div
          className={`border p-3 mb-3 cursor-pointer rounded-xl shadow-md transition-all duration-200 ease-in-out flex ${
            isCollapsed ? "justify-center" : "items-center"
          } ${currentEdgeType === "direct" ? "bg-blue-100 border-blue-500" : "bg-white hover:bg-gray-100"}`}
          onClick={() => onEdgeTypeChange("direct")}
        >
          <FiArrowRightCircle className="text-blue-500 w-8 h-8" /> {/* Increased icon size */}
          {!isCollapsed && <span className="ml-2">Direct Relation Edge</span>} {/* Show text only when not collapsed */}
        </div>

        {/* Indirect Relation Edge */}
        <div
          className={`border p-3 cursor-pointer rounded-xl shadow-md transition-all duration-200 ease-in-out flex ${
            isCollapsed ? "justify-center" : "items-center"
          } ${currentEdgeType === "indirect" ? "bg-blue-100 border-blue-500" : "bg-white hover:bg-gray-100"}`}
          onClick={() => onEdgeTypeChange("indirect")}
        >
          <FiArrowUpCircle className="text-blue-500 w-8 h-8" /> {/* Increased icon size */}
          {!isCollapsed && <span className="ml-2">Indirect Relation Edge</span>} {/* Show text only when not collapsed */}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
