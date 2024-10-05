import React, { useState } from 'react';

// DraggableButton component with icons and labels
const DraggableButton = ({ type, label, Icon, onDragStart, isCollapsed }) => {
  return (
    <div 
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      className="flex items-center space-x-3 bg-white hover:bg-gray-100 cursor-pointer p-3 rounded-lg shadow-md transition-all"
    >
      <Icon className="w-6 h-6" style={{ color: '#3b82f6' }} />
      {!isCollapsed && <span className="text-black font-medium">{label}</span>}
    </div>
  );
};

// Sidebar component with draggable buttons and edge selection
const Sidebar = ({ onSetEdgeType, selectedEdgeType }) => {
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
      {/* Hamburger Menu Icon for toggling */}
      <div className={`flex justify-end ${isCollapsed ? 'p-5 sm:p-7' : 'p-5 sm:p-7'}`}>
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

      {/* Node Types Section */}
      <div className="mb-8 px-3 ">
      <div className={`flex items-center space-x-2 mb-2 ${isCollapsed ? 'pl-2 sm:pl-3' : 'pl-2 sm:pl-3'}`}>
          <svg className="w-6 h-6" style={{ color: '#3b82f6' }} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2L2 12l10 10 10-10L12 2z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <h3 className={`text-xl font-semibold text-gray-700 ${isCollapsed ? 'hidden' : ''}`}>Node Types</h3>
        </div>
        
        <div className="flex flex-col space-y-4 mb-6">
          <DraggableButton
            type="start"
            label="Start Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
            isCollapsed={isCollapsed}
          />
          <DraggableButton
            type="process"
            label="Process Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
                <rect x="3" y="6" width="18" height="12" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
            isCollapsed={isCollapsed}
          />
          <DraggableButton
            type="decision"
            label="Decision Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
                <polygon points="12,2 22,12 12,22 2,12" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            )}
            onDragStart={handleDragStart}
            isCollapsed={isCollapsed}
          />
          <DraggableButton
            type="curved"
            label="Curved Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
                <path d="M5 12C5 9 9 5 12 5C15 5 19 9 19 12" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
            isCollapsed={isCollapsed}
          />
          <DraggableButton 
            type="terminator"
            label="Terminator Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
                <ellipse cx="12" cy="12" rx="10" ry="6" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
            isCollapsed={isCollapsed}
          />
        </div>
      </div>

      {/* Other Shapes Section */}
      <div className="mb-8 px-3">
      <div className={`flex items-center space-x-2 mb-2 ${isCollapsed ? 'pl-2 sm:pl-3' : 'pl-2 sm:pl-3'}`}>
          <svg className="w-6 h-6" style={{ color: '#3b82f6' }} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <polygon points="12,2 22,22 2,22" stroke="currentColor" strokeWidth="2" />
          </svg>
          <h3 className={`font-bold text-lg text-gray-700 ${isCollapsed ? 'hidden' : ''}`}>Other Shapes</h3>
        </div>
        
        <div className="flex flex-col space-y-4">
          <DraggableButton
            type="triangle"
            label="Triangle Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
                <polygon points="12,2 22,22 2,22" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            )}
            onDragStart={handleDragStart}
            isCollapsed={isCollapsed}
          />
          <DraggableButton
            type="note"
            label="Note Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
                <rect x="3" y="6" width="18" height="12" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
            isCollapsed={isCollapsed}
          />
          <DraggableButton
            type="circle"
            label="Circle Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
            isCollapsed={isCollapsed}
          />
          <DraggableButton
            type="rectangle"
            label="Rectangle Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
                <rect x="3" y="6" width="18" height="12" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
            isCollapsed={isCollapsed}
          />
          <DraggableButton
            type="database"
            label="Database Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
                <ellipse cx="12" cy="6" rx="10" ry="4" stroke="currentColor" strokeWidth="2" />
                <path d="M2,6v12c0,2.209 4.477,4 10,4s10-1.791 10-4V6" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
            isCollapsed={isCollapsed}
          />
          <DraggableButton
            type="preparation"
            label="Preparation Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
                <polygon points="4,6 20,6 16,18 8,18" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
            isCollapsed={isCollapsed}
          />
          <DraggableButton
            type="delay"
            label="Delay Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
                <polygon points="4,4 20,4 18,20 6,20" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
            isCollapsed={isCollapsed}
          />
        </div>
      </div>

      {/* Edge Types Section */}
      <div className="mb-6 px-3">
      <div className={`flex items-center space-x-2 mb-2 ${isCollapsed ? 'pl-2 sm:pl-3' : 'pl-2 sm:pl-3'}`}>
          <svg className="w-6 h-6" style={{ color: '#3b82f6' }} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M2 12h20M2 6h10m0 12h10" stroke="currentColor" strokeWidth="2" />
          </svg>
          <h3 className={`text-lg font-semibold text-gray-700 ${isCollapsed ? 'hidden' : ''}`}>Edge Types</h3>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => onSetEdgeType('default')}
            className={`bg-white hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-all ${selectedEdgeType === 'default' ? 'border-2 border-blue-500' : ''}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
              <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className={`${isCollapsed ? 'hidden' : ''}`}>Default Edge</span>
          </button>
          <button
            onClick={() => onSetEdgeType('arrow')}
            className={`bg-white hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-all ${selectedEdgeType === 'arrow' ? 'border-2 border-blue-500' : ''}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
              <line x1="2" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="2" />
              <polygon points="18,12 12,16 12,8" fill="#3b82f6" />
            </svg>
            <span className={`${isCollapsed ? 'hidden' : ''}`}>Arrow Edge</span>
          </button>
          <button
            onClick={() => onSetEdgeType('dotted')}
            className={`bg-white hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-all ${selectedEdgeType === 'dotted' ? 'border-2 border-blue-500' : ''}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#3b82f6' }}>
              <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
            <span className={`${isCollapsed ? 'hidden' : ''}`}>Dotted Edge</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
