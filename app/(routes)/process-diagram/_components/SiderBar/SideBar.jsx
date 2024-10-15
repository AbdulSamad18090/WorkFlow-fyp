import React, { useState } from 'react';

// DraggableButton component with icons and labels
const DraggableButton = ({ type, label, Icon, onDragStart, isCollapsed }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      className={`flex items-center space-x-2 bg-white hover:bg-gray-100 cursor-pointer p-2 rounded-lg shadow-md transition-all ${isCollapsed ? 'justify-center' : ''
        }`}
    >
      <Icon className="w-5 h-5 text-blue-500" />
      {!isCollapsed && <span className="text-black font-medium">{label}</span>}
    </div>
  );
};

// Sidebar component with collapsible behavior and proper layout
const Sidebar = ({ onSetEdgeType, selectedEdgeType, setIsSwimlaneDialogOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('nodeType', type);
  };

  return (
    <div
      className={`relative h-screen transition-all duration-300 border border-gray-300 
      ${isCollapsed ? 'w-16 sm:w-20 md:w-22' : 'w-35 sm:w-54 md:w-79'}
      h-screen overflow-auto flex flex-col justify-between bg-white text-gray-800 shadow-md`}
      onMouseEnter={() => setIsCollapsed(false)} // Expand on hover
      onMouseLeave={() => setIsCollapsed(true)} // Collapse when not hovering
    >
      {/* Collapsible Icon (3-line menu icon for collapse/expand) */}
      <div className={`flex justify-end ${isCollapsed ? 'p-5 sm:p-7' : 'p-5 sm:p-7'}`}>
        <button
          className="focus:outline-none text-blue-500"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Content Wrapper with Scrollable */}
      <div className="flex-1 overflow-auto ">
        {/* Node Types Section */}
        <div className="mb-8 ">
          <div className="flex items-center space-x-2 mb-4 px-2 pl-6">

            <svg
              className="w-5 h-5 text-blue-500 "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="2" />
            </svg>
            {!isCollapsed && <h3 className="text-lg font-bold text-gray-700">Process Node Types</h3>}
          </div>

          {/* Draggable buttons for each node */}
          <div className="flex flex-col space-y-3 mb-6 px-2">
            <DraggableButton
              type="start"
              label="Start Node"
              Icon={(props) => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              onDragStart={handleDragStart}
              isCollapsed={isCollapsed}
            />

            <DraggableButton
              type="process"
              label="Process Node"
              Icon={(props) => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}
                >
                  <rect x="3" y="6" width="18" height="12" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              onDragStart={handleDragStart}
              isCollapsed={isCollapsed}
            />

            <DraggableButton
              type="decision"
              label="Decision Node"
              Icon={(props) => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}
                >
                  <polygon points="12,2 22,12 12,22 2,12" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              )}
              onDragStart={handleDragStart}
              isCollapsed={isCollapsed}
            />

            <DraggableButton
              type="curved"
              label="Curved Node"
              Icon={(props) => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}
                >
                  <path d="M5 12C5 9 9 5 12 5C15 5 19 9 19 12" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              onDragStart={handleDragStart}
              isCollapsed={isCollapsed}
            />

            <DraggableButton
              type="manyDocuments"
              label="Many Documents Node"
              Icon={(props) => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}
                >
                  <rect x="4" y="4" width="16" height="18" stroke="currentColor" strokeWidth="2" />
                  <line x1="4" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              onDragStart={handleDragStart}
              isCollapsed={isCollapsed}
            />
            <DraggableButton
              type="document"
              label="Document Node"
              Icon={(props) => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}
                >
                  {/* SVG for Document Node */}
                  <path d="M4 4 H20 V18 Q12 22 4 18 Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              onDragStart={handleDragStart}
              isCollapsed={isCollapsed}
            />
         
            <DraggableButton
              type="merge"
              label="Merge Node"
              Icon={(props) => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}
                >
                  <path d="M12 2 L2 22 H22 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              )}
              onDragStart={handleDragStart}
              isCollapsed={isCollapsed}
            />

            <DraggableButton
              type="manualInput"
              label="Manual Input"
              Icon={(props) => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}
                >
                  <polygon points="4,4 20,4 18,20 6,20" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              onDragStart={handleDragStart}
              isCollapsed={isCollapsed}
            />

            <DraggableButton
              type="manualOperation"
              label="Manual Operation"
              Icon={(props) => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}
                >
                  <path d="M4 4 L20 12 L4 20 Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              onDragStart={handleDragStart}
              isCollapsed={isCollapsed}
            />

            <DraggableButton
              type="terminator"
              label="Terminator Node"
              Icon={(props) => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}
                >
                  <ellipse cx="12" cy="12" rx="10" ry="6" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              onDragStart={handleDragStart}
              isCollapsed={isCollapsed}
            />

            <DraggableButton
              type="circle"
              label="Connector Node"
              Icon={(props) => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              onDragStart={handleDragStart}
              isCollapsed={isCollapsed}
            />

            <DraggableButton
              type="preparation"
              label="Preparation Node"
              Icon={(props) => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}
                >
                  <polygon points="4,6 20,6 16,18 8,18" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              onDragStart={handleDragStart}
              isCollapsed={isCollapsed}
            />

            <DraggableButton
              type="delay"
              label="Delay Node"
              Icon={(props) => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}
                >
                  <polygon points="4,4 20,4 18,20 6,20" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              onDragStart={handleDragStart}
              isCollapsed={isCollapsed}
            />
          </div>
        </div>

        {/* Swimlane Section */}
        <div className="mb-8 px-2">
          <div className="flex items-center space-x-2 mb-4 pl-3 ">
            <svg
              className="w-5 h-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
            </svg>
            {!isCollapsed && <h3 className="font-bold text-lg text-gray-700">Swimlane Nodes</h3>}
          </div>
          <button
            className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-700 flex items-center justify-center transition-colors"
            onClick={() => setIsSwimlaneDialogOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="w-5 h-5 mr-2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {!isCollapsed && 'Add H-Swimlane'}
          </button>
        </div>

        {/* Edge Types Section */}
        <div className="mb-6 px-2">
          <div className="flex items-center space-x-2 mb-4 pl-4">
            <svg
              className="w-5 h-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
            {!isCollapsed && <h3 className="text-lg font-semibold text-gray-700">Edge Types</h3>}
          </div>
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => onSetEdgeType('default')}
              className={`bg-white hover:bg-gray-100 text-black font-semibold py-2 px-3 rounded-lg flex items-center space-x-2 transition-all ${selectedEdgeType === 'default' ? 'border-2 border-blue-500' : ''
                }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                style={{ color: '#3b82f6' }}
              >
                <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" />
              </svg>
              {!isCollapsed && <span>Default Edge</span>}
            </button>

            <button
              onClick={() => onSetEdgeType('arrow')}
              className={`bg-white hover:bg-gray-100 text-black font-semibold py-2 px-3 rounded-lg flex items-center space-x-2 transition-all ${selectedEdgeType === 'arrow' ? 'border-2 border-blue-500' : ''
                }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                style={{ color: '#3b82f6' }}
              >
                <line x1="2" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="2" />
                <polygon points="18,12 12,16 12,8" fill="currentColor" />
              </svg>
              {!isCollapsed && <span>Arrow Edge</span>}
            </button>
            <button
              onClick={() => onSetEdgeType('bezierArrow')}
              className={`bg-white hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-all ${selectedEdgeType === 'bezierArrow' ? 'border-2 border-blue-500' : ''}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
                <path d="M5 12C5 9 9 5 12 5C15 5 19 9 19 12" stroke="currentColor" strokeWidth="2" />
                <polygon points="18,12 12,16 12,8" fill="#3b82f6" />
              </svg>
              <span className={`${isCollapsed ? 'hidden' : ''}`}>Bezier Arrow</span>
            </button>

            <button
              onClick={() => onSetEdgeType('dotted')}
              className={`bg-white hover:bg-gray-100 text-black font-semibold py-2 px-3 rounded-lg flex items-center space-x-2 transition-all ${selectedEdgeType === 'dotted' ? 'border-2 border-blue-500' : ''
                }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                style={{ color: '#3b82f6' }}
              >
                <line
                  x1="2"
                  y1="12"
                  x2="22"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  style={{ color: '#3b82f6' }}
                />
              </svg>
              {!isCollapsed && <span>Dotted Edge</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
