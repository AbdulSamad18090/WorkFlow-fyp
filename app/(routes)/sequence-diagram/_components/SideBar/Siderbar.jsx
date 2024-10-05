import React, { useState } from 'react';
import { FaUser, FaBars, FaDrawPolygon, FaShapes, FaLink, FaBook, FaSitemap } from 'react-icons/fa';
import { MdCircle, MdRectangle } from 'react-icons/md';

const Sidebar = ({ onDragStart, onInputChange, dialogData, onToggleNodes, onToggleEdges, onToggleMiniMap }) => {
  
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
    className={`relative h-screen transition-all duration-300 border border-gray-300 
      ${isCollapsed ? 'w-16' : 'w-64'} 
      overflow-auto flex flex-col justify-between bg-white text-gray-800 shadow-md`}
     onMouseEnter={() => setIsCollapsed(false)} // Expand on hover
     onMouseLeave={() => setIsCollapsed(true)} // Collapse when not hovering
     
    >
      
      
       {/* Hamburger Menu Icon for toggling */}
       <div className={`flex justify-end ${isCollapsed ? 'p-5 sm:p-5' : 'p-5 sm:p-5'}`}>
        <button
          className="focus:outline-none"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            style={{ color: '#3b82f6' }}  // Color applied here
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          
        </button>
      </div>

      {/* Collapsible Sidebar Content */}
      <div className={`flex-grow overflow-auto`}>
        <div className="p-4">
          {/* Standard Nodes Section */}
          <SidebarSection title="Standard Nodes" isCollapsed={isCollapsed} icon={<FaUser className="text-blue-500" />}>
            {['defaultNode', 'inputNode', 'outputNode', 'customNode'].map((type) => (
              <SidebarItem
                key={type}
                isCollapsed={isCollapsed}
                onDragStart={(event) => onDragStart(event, type)}
                title={getNodeTitle(type)}
                icon={getSVGIcon(type)}
              />
            ))}
          </SidebarSection>

          {/* Edge Options Section */}
          <SidebarSection title="Edge Options" isCollapsed={isCollapsed} icon={<FaLink className="text-blue-500" />}>
            <label className="block mb-4">
              <span className="text-gray-700">{!isCollapsed && 'Edge Label'}</span>
              <input
                type="text"
                name="edgeLabel"
                value={dialogData.edgeLabel || ''}
                onChange={onInputChange}
                className="block w-full mt-1 px-3 py-2 rounded-md bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">{!isCollapsed && 'Edge Style'}</span>
              <select
                name="edgeStyle"
                value={dialogData.edgeStyle || 'straight'}
                onChange={onInputChange}
                className="block w-full mt-1 px-3 py-2 rounded-md bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="straight">Straight</option>
                <option value="dotted">Dotted</option>
                <option value="arrow">Arrow</option>
                <option value="arrow-smooth">Arrow Smooth Step</option> {/* Custom Edge Type */}
              </select>
            </label>
          </SidebarSection>

          {/* Shapes Section */}
          <SidebarSection title="Shapes" isCollapsed={isCollapsed} icon={<FaShapes className="text-blue-500" />}>
            {['circleNode', 'rectangleNode', 'humanNode'].map((type) => (
              <SidebarItem
                key={type}
                isCollapsed={isCollapsed}
                onDragStart={(event) => onDragStart(event, type)}
                title={getNodeTitle(type)}
                icon={getSVGIcon(type)}
              />
            ))}
          </SidebarSection>

          {/* Vertical Line Section */}
          <SidebarSection
            title="Vertical Line"
            isCollapsed={isCollapsed}
            icon={<FaDrawPolygon className="text-blue-500" />}
          >
            <SidebarItem
              isCollapsed={isCollapsed}
              onDragStart={(event) => onDragStart(event, 'verticalLine')}
              title="Vertical Line Node"
              icon={getSVGIcon('verticalLine')}
            />
          </SidebarSection>

          {/* New Node Types Section */}
          <SidebarSection title=" More Nodes" isCollapsed={isCollapsed} icon={<FaBook className="text-blue-500" />}>
            {['classNode', 'frameFragmentNode', 'noteNode'].map((type) => (
              <SidebarItem
                key={type}
                isCollapsed={isCollapsed}
                onDragStart={(event) => onDragStart(event, type)}
                title={getNodeTitle(type)}
                icon={getSVGIcon(type)}
              />
            ))}
          </SidebarSection>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className={`p-4 text-center ${isCollapsed ? 'hidden' : 'block'}`}>
        <button
          onClick={onToggleNodes}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-2 w-full"
        >
          Toggle Nodes
        </button>
        <button
          onClick={onToggleEdges}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-2 w-full"
        >
          Toggle Edges
        </button>
        <button
          onClick={onToggleMiniMap}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
        >
          Toggle MiniMap
        </button>
      </div>
    </div>
  );
};

/* Section Wrapper Component */
const SidebarSection = ({ title, isCollapsed, icon, children }) => (
  <div className="mb-6">
    <div className={`text-lg font-semibold mb-4 flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
      {icon}
      {!isCollapsed && <span className="ml-2">{title}</span>}
    </div>
    {children}
  </div>
);

/* Sidebar Item Component */
const SidebarItem = ({ title, icon, isCollapsed, onDragStart }) => (
  <div
    onDragStart={onDragStart}
    draggable
    className="flex items-center justify-start p-2 mb-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer transition-all duration-200"
  >
    {icon}
    {!isCollapsed && <span className="ml-3">{title}</span>}
  </div>
);

/* Function to get the SVG icon based on node type */
const getSVGIcon = (type) => {
  switch (type) {
    case 'circleNode':
      return <MdCircle className="text-blue-500 w-6 h-6" />;
    case 'rectangleNode':
      return <MdRectangle className="text-blue-500 w-6 h-6" />;
    case 'humanNode':
      return <FaUser className="text-blue-500 w-6 h-6" />;
    case 'verticalLine':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 w-6 h-6">
          <line x1="10" y1="0" x2="10" y2="20" stroke="#3b82f6" strokeWidth="2" />
        </svg>
      );
      case 'customNode':
        return (
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 w-6 h-6">
            <rect width="20" height="20" fill="#3b82f6" />
           
          </svg>
        );
      case 'outputNode':
        return (
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 w-6 h-6">
            <rect width="20" height="20" fill="#3b82f6" />
          </svg>
        );
      case 'inputNode':
        return (
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 w-6 h-6">
            <rect width="20" height="20" fill="#3b82f6" />
          </svg>
        );
    case 'defaultNode':
      return (
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 w-6 h-6">
          <rect width="20" height="20" fill="#3b82f6" />
        </svg>
      );
    case 'classNode':
      return <FaSitemap className="text-blue-500 w-6 h-6" />;
    case 'frameFragmentNode':
      return (
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 w-6 h-6">
          <rect x="2" y="2" width="16" height="16" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <line x1="2" y1="10" x2="18" y2="10" stroke="#3b82f6" strokeWidth="1" />
        </svg>
      );
    case 'noteNode':
      return (
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 w-6 h-6">
          <rect x="2" y="2" width="16" height="16" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <line x1="4" y1="6" x2="16" y2="6" stroke="#3b82f6" strokeWidth="1" />
          <line x1="4" y1="10" x2="16" y2="10" stroke="#3b82f6" strokeWidth="1" />
          <line x1="4" y1="14" x2="12" y2="14" stroke="#3b82f6" strokeWidth="1" />
        </svg>
      );
    default:
      return null;
  }
};

/* Function to get the title of each node type */
const getNodeTitle = (type) => {
  switch (type) {
    case 'defaultNode':
      return 'Default Node';
    case 'inputNode':
      return 'Input Node';
    case 'outputNode':
      return 'Output Node';
    case 'customNode':
      return 'Custom Node';
    case 'circleNode':
      return 'Circle Node';
    case 'rectangleNode':
      return 'Rectangle Node';
    case 'humanNode':
      return 'Human Node';
    case 'verticalLine':
      return 'Vertical Line';
    case 'classNode':
      return 'Class Node';
    case 'frameFragmentNode':
      return 'Frame Fragment Node';
    case 'noteNode':
      return 'Note Node';
    default:
      return 'Node';
  }
};

export default Sidebar;
