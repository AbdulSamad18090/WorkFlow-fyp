"use client";
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Node components...
// Default Node Component
const DefaultNode = ({ data }) => (
  <div className="relative bg-white rounded-lg shadow-md p-3 text-center border border-gray-300 w-[200px]">
    <div>{data.label}</div>
    <Handle
      id="source-top"
      type="source"
      position={Position.Top}
      style={{ borderRadius: 0, top: '-8px', left: '30%', transform: 'translateX(-50%)' ,
        }}
    />
    <Handle
      id="target-top"
      type="target"
      position={Position.Top}
      style={{ borderRadius: 0, top: '-8px', left: '70%', transform: 'translateX(-50%)' ,
       }}
    />
    <Handle
      id="source-bottom"
      type="source"
      position={Position.Bottom}
      style={{ borderRadius: 0, bottom: '-8px', left: '30%', transform: 'translateX(-50%)',
        }}
    />
    <Handle
      id="target-bottom"
      type="target"
      position={Position.Bottom}
      style={{ borderRadius: 0, bottom: '-8px', left: '70%', transform: 'translateX(-50%)',
        }}
    />
    
  </div>
);


// Input Node Component
const InputNode = ({ data }) => (
  <div className="bg-white rounded-lg shadow-md p-3 text-center border border-gray-300 w-[200px]">
    <div>{data.label}</div>
    <Handle type="source" position={Position.Right} style={{ borderRadius: 0 ,
        }} />
    
  </div>
);

// Output Node Component
const OutputNode = ({ data }) => (
  <div className="bg-white rounded-lg shadow-md p-3 text-center border border-gray-300 w-[200px]">
    <div>{data.label}</div>
    <Handle type="target" position={Position.Left} style={{ borderRadius: 0 ,
        }} />
  </div>
);

// Custom Node Component
const CustomNode = ({ data }) => (
  <div className="bg-white rounded-lg shadow-md p-3 text-center border border-gray-300 w-[200px]">
    <div>{data.label}</div>
    <Handle
      id="source-right"
      type="source"
      position={Position.Right}
      style={{ borderRadius: 0,top:'8px',
       }}
    />
    <Handle
      id="target-right"
      type="target"
      position={Position.Right}
      style={{ borderRadius: 0 ,
        }}
    />
    <Handle
      id="source-left"
      type="source"
      position={Position.Left}
      style={{ borderRadius: 0,top:'8px' ,
       }}
    />
    <Handle
      id="target-left"
      type="target"
      position={Position.Left}
      style={{ borderRadius: 0 ,
        }}
    />
  </div>
);

// Circle Node Component
const CircleNode = ({ data }) => (
  <div className="bg-white rounded-full shadow-md p-3 text-center border border-gray-300 w-[60px] h-[60px] flex items-center justify-center">
    <div>{data.label}</div>
    <Handle
      id="source-right"
      type="source"
      position={Position.Right}
      style={{ borderRadius: 0,top:'12px'  , opacity: 0, // Initially hidden
        transition: 'opacity 0.3s'
       }}
    />
    <Handle
      id="target-right"
      type="target"
      position={Position.Right}
      style={{ borderRadius: 0 , opacity: 0, // Initially hidden
        transition: 'opacity 0.3s'
        }}
    />
    <Handle
      id="source-left"
      type="source"
      position={Position.Left}
      style={{ borderRadius: 0,top:'12px' , opacity: 0, // Initially hidden
        transition: 'opacity 0.3s'
        }}
    />
    <Handle
      id="target-left"
      type="target"
      position={Position.Left}
      style={{ borderRadius: 0 , opacity: 0, // Initially hidden
        transition: 'opacity 0.3s'
       }}
    />

<Handle
      id="source-bottom"
      type="source"
      position={Position.Bottom}
      style={{ borderRadius: 0,left:'12px' , opacity: 0, // Initially hidden
        transition: 'opacity 0.3s'
       }}
    />
    <Handle
      id="target-bottom"
      type="target"
      position={Position.Bottom}
      style={{ borderRadius: 0 , opacity: 0, // Initially hidden
        transition: 'opacity 0.3s'
        }}
    />
  </div>
);

// Rectangle Node Component
const RectangleNode = ({ data }) => (
  <div className="relative bg-white shadow-md p-3 text-center border border-gray-300 w-[200px] h-[100px] flex items-center justify-center">
    <div>{data.label}</div>
    <Handle
      id="source-right"
      type="source"
      position={Position.Right}
      style={{ borderRadius: 0,top: '50%', transform: 'translateY(-50%)' ,
        }}
    />
    <Handle
      id="target-left"
      type="target"
      position={Position.Left}
      style={{ borderRadius: 0, top: '20%', transform: 'translateY(-50%)' ,
       }}
    />
    <Handle
      id="source-left"
      type="source"
      position={Position.Left}
      style={{ borderRadius: 0, top: '50%', transform: 'translateY(-50%)' ,
        }}
    />
    <Handle
      id="target-right"
      type="target"
      position={Position.Right}
      style={{ borderRadius: 0, top: '20%', transform: 'translateY(-50%)' ,
        }}
    />
    
    <Handle
      id="source-bottom"
      type="source"
      position={Position.Bottom}
      style={{ borderRadius: 0,left:'47px' ,
       }}
    />
    <Handle
      id="target-bottom"
      type="target"
      position={Position.Bottom}
      style={{ borderRadius: 0 ,
       }}
    />
 
 <Handle
      id="source-top"
      type="source"
      position={Position.Top}
      style={{ borderRadius: 0,left:'47px' ,
       }}
    />
    <Handle
      id="target-top"
      type="target"
      position={Position.Top}
      style={{ borderRadius: 0 ,
       }}
    />
 
  </div>
);


// Human/Actor Node Component
const HumanNode = ({ data }) => (
  <div className="flex items-center justify-center">
    {/* Inline SVG for a stick figure */}
    <svg
      width="100"
      height="100"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="12" r="10" stroke="black" strokeWidth="2" />
      <line x1="32" y1="22" x2="32" y2="44" stroke="black" strokeWidth="2" />
      <line x1="32" y1="44" x2="16" y2="60" stroke="black" strokeWidth="2" />
      <line x1="32" y1="44" x2="48" y2="60" stroke="black" strokeWidth="2" />
      <line x1="32" y1="28" x2="16" y2="44" stroke="black" strokeWidth="2" />
      <line x1="32" y1="28" x2="48" y2="44" stroke="black" strokeWidth="2" />
    </svg>

    <Handle
      id="source-bottom"
      type="source"
      position={Position.Bottom}
      style={{ borderRadius: 0,left:'23px'  , opacity: 0, // Initially hidden
        transition: 'opacity 0.3s'
       }}
    />
    <Handle
      id="target-bottom"
      type="target"
      position={Position.Bottom}
      style={{ borderRadius: 0 ,
        }}
    />
  </div>
);

// Vertical Line Node Component
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


// Function to create interval handles dynamically on both left and right sides
const createIntervalHandles = (id, intervals, height, color, onConnectHandle) => {
  const handles = [];
  const intervalSpacing = height / (intervals + 1); // Total intervals

  for (let i = 0; i < intervals; i++) {
    const topPosition = (i + 1) * intervalSpacing;

    handles.push(
      <React.Fragment key={`${id}-handle-${i}`}>
        <Handle
          type="source"
          position={Position.Right}
          style={{
            top: `${topPosition}px`,
            background: 'transparent',
            border: 'none',
            width: '10px',
            height: '10px',
          }}
          id={`${id}-right-handle-${i}`}
          onConnect={(params) => handleConnect(params, `${id}-right-handle-${i}`, onConnectHandle)}
        />
         <Handle
          type="target"
          position={Position.Right}
          style={{
            top: `${topPosition}px`,
            background: 'transparent',
            border: 'none',
            marginRight:'13px',
            marginTop:'16px',
            width: '10px',
            height: '10px',
          }}
          id={`${id}-right-handle-${i}`}
          onConnect={(params) => handleConnect(params, `${id}-right-handle-${i}`, onConnectHandle)}
        />
        <div
          className="absolute -left-px w-1 hidden"
          style={{
            height: '34px',
            top: `${topPosition}px`,
            zIndex: 1,
            borderRadius: '2px',
            backgroundColor: color,
          }}
          id={`bar-${id}-right-handle-${i}`}
        />
        <Handle
          type="source"
          position={Position.Left}
          style={{
            top: `${topPosition}px`,
            background: 'transparent',
            left:'-17px',
            border: 'none',
            width: '10px',
            height: '10px',
          }}
          id={`${id}-left-handle-${i}`}
          onConnect={(params) => handleConnect(params, `${id}-left-handle-${i}`, onConnectHandle)}
        />
        <Handle
          type="target"
          position={Position.Right}
          style={{
            top: `${topPosition}px`,
            background: 'transparent',
            left:'17px',
            marginTop:'8px',
            border: 'none',
            width: '10px',
            height: '10px',
          }}
          id={`${id}-left-handle-${i}`}
          onConnect={(params) => handleConnect(params, `${id}-left-handle-${i}`, onConnectHandle)}
        />
        <div
          className="absolute -left-px w-1 hidden"
          style={{
            height: '34px',
            top: `${topPosition}px`,
            zIndex: 1,
            borderRadius: '2px',
            backgroundColor: color,
          }}
          id={`bar-${id}-left-handle-${i}`}
        />
      </React.Fragment>
    );
  }

  return handles;
};

// Function to handle connection and show the bar
const handleConnect = (params, handleId, onConnectHandle) => {
  const barId = `bar-${handleId}`;
  const barElement = document.getElementById(barId);

  if (barElement) {
    barElement.classList.remove('hidden');
  }

  if (typeof onConnectHandle === 'function') {
    onConnectHandle(params);
  }
};
// Custom Edge component for smooth connections...
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const path = `M${sourceX},${sourceY} C${sourceX + 100},${sourceY} ${targetX - 100},${targetY} ${targetX},${targetY}`;

  return (
    <path
      id={id}
      className="react-flow__edge-path stroke-2"
      d={path}
      style={style}
      markerEnd={markerEnd}
    />
  );
};

const nodeTypes = {
  defaultNode: DefaultNode,
  inputNode: InputNode,
  outputNode: OutputNode,
  verticalLine: VerticalLineNode,
  customNode: CustomNode,
  circleNode: CircleNode,
  rectangleNode: RectangleNode,
  humanNode: HumanNode,
};


const edgeTypes = { custom: CustomEdge };

const SequenceDiagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [draggingNodeType, setDraggingNodeType] = useState(null);
  const [hideNodes, setHideNodes] = useState(false);
  const [hideEdges, setHideEdges] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: 'smooth',
        animated: true,
        style: { stroke: '#333', strokeWidth: '2px' },
        markerEnd: { type: MarkerType.ArrowClosed },
      };

      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    setDraggingNodeType(nodeType);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = event.target.getBoundingClientRect();
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    setDialogData({ position, nodeType: draggingNodeType });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogData({});
  };
  const handleDialogSave = () => {
    const { position, nodeType, title, color } = dialogData;
   
    if (nodeType === 'defaultNode') {
      setNodes((nds) =>
        nds.concat({
          id: `${nds.length + 1}`,
          type: 'defaultNode',
          position,
          data: { label: title },
        })
      );
    } else if (nodeType === 'inputNode') {
      setNodes((nds) =>
        nds.concat({
          id: `${nds.length + 1}`,
          type: 'inputNode',
          position,
          data: { label: title },
        })
      );
    } else if (nodeType === 'outputNode') {
      setNodes((nds) =>
        nds.concat({
          id: `${nds.length + 1}`,
          type: 'outputNode',
          position,
          data: { label: title },
        })
      );
    } else if (nodeType === 'verticalLine') {
      setNodes((nds) =>
        nds.concat({
          id: `${nds.length + 1}`,
          type: 'verticalLine',
          position,
          data: {
            intervals: 10,
            height: 500,
            color,
            title,
            onConnectHandle: (params) => onConnect(params),
          },
        })
      );
    } else if (nodeType === 'customNode') {
      setNodes((nds) =>
        nds.concat({
          id: `${nds.length + 1}`,
          type: 'customNode',
          position,
          data: { label: title },
        })
      );
    } else if (nodeType === 'circleNode') {
      setNodes((nds) =>
        nds.concat({
          id: `${nds.length + 1}`,
          type: 'circleNode',
          position,
          data: { label: title },
        })
      );
    } else if (nodeType === 'rectangleNode') {
      setNodes((nds) =>
        nds.concat({
          id: `${nds.length + 1}`,
          type: 'rectangleNode',
          position,
          data: { label: title },
        })
      );
    } else if (nodeType === 'humanNode') {
      setNodes((nds) =>
        nds.concat({
          id: `${nds.length + 1}`,
          type: 'humanNode',
          position,
          data: { label: title },
        })
      );
    }
   
    handleDialogClose();
   };
   

  

  const handleInputChange = (event) => {
    setDialogData({ ...dialogData, [event.target.name]: event.target.value });
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  return (
    <>
      <ReactFlowProvider>
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-1/6 bg-gray-100 p-2 overflow-y-auto">
            <p className="text-center font-bold">Drag and Drop Nodes</p>

            {/* Standard Nodes Section */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Standard Nodes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  onDragStart={(event) => handleDragStart(event, 'defaultNode')}
                  draggable
                  className="bg-white rounded-lg shadow-md p-2 text-center border border-gray-300 my-2"
                >
                  Default Node
                </div>
                <div
                  onDragStart={(event) => handleDragStart(event, 'inputNode')}
                  draggable
                  className="bg-white rounded-lg shadow-md p-2 text-center border border-gray-300 my-2"
                >
                  Input Node
                </div>
                <div
                  onDragStart={(event) => handleDragStart(event, 'outputNode')}
                  draggable
                  className="bg-white rounded-lg shadow-md p-2 text-center border border-gray-300 my-2"
                >
                  Output Node
                </div>
                <div
                  onDragStart={(event) => handleDragStart(event, 'customNode')}
                  draggable
                  className="bg-white rounded-lg shadow-md p-2 text-center border border-gray-300 my-2"
                >
                  Custom Node
                </div>
              </AccordionDetails>
            </Accordion>

            {/* Shapes Section */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Shapes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  onDragStart={(event) => handleDragStart(event, 'circleNode')}
                  draggable
                  className="bg-white rounded-lg shadow-md p-2 text-center border border-gray-300 my-2"
                >
                  Circle Node
                </div>
                <div
                  onDragStart={(event) => handleDragStart(event, 'rectangleNode')}
                  draggable
                  className="bg-white rounded-lg shadow-md p-2 text-center border border-gray-300 my-2"
                >
                  Rectangle Node
                </div>
                <div
                  onDragStart={(event) => handleDragStart(event, 'humanNode')}
                  draggable
                  className="bg-white rounded-lg shadow-md p-2 text-center border border-gray-300 my-2"
                >
                  Human Node
                </div>
              </AccordionDetails>
            </Accordion>

            {/* Vertical Line Section */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Vertical Line</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  onDragStart={(event) => handleDragStart(event, 'verticalLine')}
                  draggable
                  className="bg-white rounded-lg shadow-md p-2 text-center border border-gray-300 my-2"
                >
                  Vertical Line Node
                </div>
              </AccordionDetails>
            </Accordion>

            {/* Controls */}
            <div className="text-center mt-4">
              <Button variant="contained" onClick={() => setHideNodes(!hideNodes)} fullWidth>
                Toggle Nodes
              </Button>
              <Button variant="contained" onClick={() => setHideEdges(!hideEdges)} fullWidth style={{ marginTop: '8px' }}>
                Toggle Edges
              </Button>
              <Button variant="contained" onClick={() => setShowMiniMap(!showMiniMap)} fullWidth style={{ marginTop: '8px' }}>
                Toggle MiniMap
              </Button>
            </div>
          </div>

          {/* React Flow Canvas */}
          <div className="w-5/6" style={{ height: '100%' }}>
            <ReactFlow
              nodes={hideNodes ? [] : nodes}
              edges={hideEdges ? [] : edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onDrop={handleDrop}
              onDragOver={onDragOver}
              fitView
            >
              {showMiniMap && <MiniMap />}
              <Controls />
              <Background />
            </ReactFlow>
          </div>

          {/* Node Configuration Dialog */}
          <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Configure Node</DialogTitle>
            <DialogContent>
              <TextField
                label="Title"
                name="title"
                value={dialogData.title || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              {dialogData.nodeType === 'verticalLine' && (
                <TextField
                  label="Color"
                  name="color"
                  value={dialogData.color || ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDialogSave} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </ReactFlowProvider>
    </>
  );
};

export default SequenceDiagram;
