import React from 'react';

// DraggableButton component with icons and labels
const DraggableButton = ({ type, label, Icon, onDragStart }) => {
  return (
    <div 
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      className="flex items-center space-x-3 bg-white hover:bg-gray-100 cursor-pointer p-3 rounded-lg shadow-md transition-all"
    >
      <Icon className="w-6 h-6 text-gray-700" />
      <span className="text-black font-medium">{label}</span>
    </div>
  );
};

// Sidebar component with draggable buttons and edge selection
const Sidebar = ({ onSetEdgeType, selectedEdgeType }) => {
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('nodeType', type);
  };

  return (
    <div className="w-72 bg-gray-200 shadow-lg p-6 flex flex-col h-full overflow-auto">
      {/* Node Types Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <svg className="w-5 h-5 text-gray-600" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2L2 12l10 10 10-10L12 2z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <h3 className="text-xl font-semibold text-gray-700">Node Types</h3>
        </div>

        {/* Draggable buttons for each node */}
        <div className="flex flex-col space-y-4 mb-6">
          <DraggableButton
            type="start"
            label="Start Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
          />
          <DraggableButton
            type="process"
            label="Process Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="12" stroke="black" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
          />
          <DraggableButton
            type="decision"
            label="Decision Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="12,2 22,12 12,22 2,12" stroke="black" strokeWidth="2" fill="none" />
              </svg>
            )}
            onDragStart={handleDragStart}
          />
          <DraggableButton
            type="curved"
            label="Curved Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12C5 9 9 5 12 5C15 5 19 9 19 12" stroke="black" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
          />
          <DraggableButton
            type="terminator"
            label="Terminator Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="12" cy="12" rx="10" ry="6" stroke="black" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
          />
        </div>
      </div>

      {/* Other Shapes Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <svg className="w-5 h-5 text-gray-600" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M2 12L12 2l10 10L12 22 2 12z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <h3 className="font-bold text-lg text-gray-700">Other Shapes</h3>
        </div>

        {/* Draggable buttons for other shapes */}
        <div className="flex flex-col space-y-4">
          <DraggableButton
            type="triangle"
            label="Triangle Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="12,2 22,22 2,22" stroke="black" strokeWidth="2" fill="none" />
              </svg>
            )}
            onDragStart={handleDragStart}
          />
           <DraggableButton
            type="note"
            label="NOte Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="12" stroke="black" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
          />
          <DraggableButton
            type="circle"
            label="Circle Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
          />
          <DraggableButton
            type="rectangle"
            label="Rectangle Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="12" stroke="black" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
          />
          <DraggableButton
            type="database"
            label="Database Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="12" cy="6" rx="10" ry="4" stroke="black" strokeWidth="2" />
                <path d="M2,6v12c0,2.209 4.477,4 10,4s10-1.791 10-4V6" stroke="black" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
          />
          <DraggableButton
            type="preparation"
            label="Preparation Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="4,6 20,6 16,18 8,18" stroke="black" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
          />
          <DraggableButton
            type="delay"
            label="Delay Node"
            Icon={() => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="4,4 20,4 18,20 6,20" stroke="black" strokeWidth="2" />
              </svg>
            )}
            onDragStart={handleDragStart}
          />
        </div>
      </div>

      {/* Edge Types Section */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <svg className="w-5 h-5 text-gray-600" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M2 12h20M2 6h10m0 12h10" stroke="currentColor" strokeWidth="2" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-700">Edge Types</h3>
        </div>
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => onSetEdgeType('default')}
            className={`bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-all ${selectedEdgeType === 'default' ? 'border-2 border-black' : ''}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="2" y1="12" x2="22" y2="12" stroke="black" strokeWidth="2" />
            </svg>
            <span>Default Edge</span>
          </button>
          <button
            onClick={() => onSetEdgeType('arrow')}
            className={`bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-all ${selectedEdgeType === 'arrow' ? 'border-2 border-black' : ''}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="2" y1="12" x2="18" y2="12" stroke="black" strokeWidth="2" />
              <polygon points="18,12 12,16 12,8" fill="black" />
            </svg>
            <span>Arrow Edge</span>
          </button>
          <button
            onClick={() => onSetEdgeType('dotted')}
            className={`bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-all ${selectedEdgeType === 'dotted' ? 'border-2 border-black' : ''}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="2" y1="12" x2="22" y2="12" stroke="black" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
            <span>Dotted Edge</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
