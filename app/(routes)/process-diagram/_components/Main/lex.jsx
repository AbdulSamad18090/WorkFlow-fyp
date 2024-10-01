"use client";
import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, MarkerType, EdgeText } from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from '../SiderBar/SideBar';
import EdgeDialogue from '../EdgeDialog/EdgeDialog'; // Import EdgeDialogue component
import { StartNode } from "../NodeTypes/StartNode";
import SwimlaneDialog from '../swimlaneDialog/SwimlaneDialog'
import { ProcessNode } from "../NodeTypes/ProcessNode";
import { DecisionNode } from "../NodeTypes/DecisionNode";
import { CurvedNode } from "../NodeTypes/CurvedNode";
import { TerminatorNode } from "../NodeTypes/TerminatorNode";
import { CircleNode } from "../NodeTypes/CircleNode";
import { CustomEdge } from '../Edges/EdgeTypes';
import { PreparationNode } from '../NodeTypes/PareparationNode';
import { DelayNode } from '../NodeTypes/DelayNode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Swimlane } from '../NodeTypes/Swimlane';

const localStorageKey = "process-diagram-data";

const nodeTypes = {
  start: StartNode,
  process: ProcessNode,
  decision: DecisionNode,
  curved: CurvedNode,
  terminator: TerminatorNode,
  swimlane:Swimlane,
  circle: CircleNode,
  delay: DelayNode,
  preparation: PreparationNode,
};

const customEdgeTypes = {
  custom: CustomEdge, // Register your custom edge
};



// Utility to generate unique IDs for nodes
let id = 0;
const getId = () => `node_${id++}`;

// Main FlowContainer component
export default function FlowContainer() {

  const [reactFlowInstance, setReactFlowInstance] = useState(null); // React Flow instance reference
  const [isSwimlaneDialogOpen, setIsSwimlaneDialogOpen] = useState(false); // Control swimlane dialog visibility
  const [currentNode, setCurrentNode] = useState(null); // Keep track of the currently selected node
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [nodeTitle, setNodeTitle] = useState('');
  const [nodeColor, setNodeColor] = useState('#ffffff');
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [selectedEdgeType, setSelectedEdgeType] = useState('default');
  const [pendingEdge, setPendingEdge] = useState(null); // Temporary state to hold edge

  // Function to dynamically add a swimlane based on user input
  const addSwimlane = ({ title, color }) => {
    const swimlaneHeight = 320;
    const swimlaneGap = 5;

    // Filter only swimlane nodes to count existing swimlanes
    const swimlaneNodes = nodes.filter((node) => node.type === 'swimlane');
    const swimlaneCount = swimlaneNodes.length;

    const newSwimlane = {
      id: getId(),
      type: 'swimlane',
      // Dynamically calculate the position of the new swimlane
      position: {
        x: 0,
        y: swimlaneCount * (swimlaneHeight + swimlaneGap),
      },
      style: {
        width: 1300,
        height: swimlaneHeight,
      },
      data: {
        title: title || `Swimlane ${swimlaneCount + 1}`, // Use user input or default label
        titleColor: color || 'gray', // Use user input or default color
        bgColor: 'rgba(128, 128, 128, 0.1)', // Swimlane background color
      },
      draggable: false, // Disable dragging of swimlanes
      selectable: false, // Disable selection for swimlanes
    };

    setNodes((nds) => [...nds, newSwimlane]); // Add the new swimlane to the node array
  };

  // Function to add a node at a specific position and open the node edit dialog
  const addNodeAtPosition = (type, position, parentNodeId = null) => {
    const newNode = {
      id: getId(),
      type,
      position,
      parentNode: parentNodeId, // Bind node to parent swimlane if inside one
      extent: parentNodeId ? 'parent' : undefined, // Constrain to parent if inside swimlane
      data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`, bgColor: 'lightgray' },
    };
    setNodes((nds) => [...nds, newNode]); // Add new node to the node array
    setCurrentNode(newNode); // Set the newly added node as the current node
    setIsNodeDialogOpen(true); // Open the node edit dialog
  };

  // Function to handle the submission of the node dialog
  const handleNodeDialogSubmit = (data) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === currentNode.id ? { ...n, data } : n))
    );
    setIsNodeDialogOpen(false); // Close the node dialog
  };

  // Handle drag start event when dragging nodes from the sidebar
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  // Handle drop event when nodes are dropped on the canvas
  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowInstance.project({ x: event.clientX, y: event.clientY });
    const nodeType = event.dataTransfer.getData('application/reactflow');
    const position = { x: reactFlowBounds.x, y: reactFlowBounds.y };

    // Check if dropped inside a swimlane
    const swimlane = nodes.find(
      (n) =>
        n.type === 'swimlane' &&
        position.x >= n.position.x &&
        position.x <= n.position.x + n.style.width &&
        position.y >= n.position.y &&
        position.y <= n.position.y + n.style.height
    );

    // Add node inside swimlane if found, otherwise place it freely
    addNodeAtPosition(nodeType, position, swimlane ? swimlane.id : null);
  };

  // Handle drag stop event to ensure nodes remain inside swimlanes if dragged there
  const onNodeDragStop = (event, node) => {
    if (node.type === 'swimlane') return; // Prevent swimlane movement

    const nodePosition = reactFlowInstance.project({ x: event.clientX, y: event.clientY });
    const swimlane = nodes.find(
      (n) =>
        n.type === 'swimlane' &&
        nodePosition.x >= n.position.x &&
        nodePosition.x <= n.position.x + n.style.width &&
        nodePosition.y >= n.position.y &&
        nodePosition.y <= n.position.y + n.style.height
    );

    if (swimlane && node.parentNode !== swimlane.id) {
      const adjustedPosition = {
        x: nodePosition.x - swimlane.position.x,
        y: nodePosition.y - swimlane.position.y,
      };

      // Adjust node's position relative to swimlane and bind it to swimlane
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id
            ? {
                ...n,
                position: adjustedPosition,
                parentNode: swimlane.id,
                extent: 'parent',
              }
            : n
        )
      );
    }
  };

  // Handle drag over event to allow dropping of nodes
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  // Handle node connection (edge creation) in React Flow
  

  const onConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      type: 'smoothstep',
      markerEnd: selectedEdgeType === 'arrow' || selectedEdgeType === 'dotted'
        ? { type: MarkerType.Arrow, width: 10, height: 10 }
        : undefined,
      style: {
        stroke: 'black',
        strokeWidth: selectedEdgeType === 'dotted' ? 2 : 2,
        strokeDasharray: selectedEdgeType === 'dotted' ? '3,3' : undefined,
      },
      data: { label: '' }, // Initially empty label
      label: '', // Ensure this is added
    };
  
    setPendingEdge(newEdge); // Set the new edge as pending
    setSelectedEdge(newEdge); // Open dialog for setting title
  }, [selectedEdgeType, setEdges]);
  

  const handleEdgeSave = (edge, title) => {
    if (pendingEdge) {
      // Add the pending edge to the list of edges with the updated label
      setEdges((eds) => addEdge({ ...pendingEdge, data: { ...pendingEdge.data, label: title }, label: title }, eds));
      setPendingEdge(null); // Clear the pending edge
    } else {
      // Update existing edge
      setEdges((eds) =>
        eds.map((ed) =>
          ed.id === edge.id
            ? { ...ed, data: { ...ed.data, label: title }, label: title }
            : ed
        )
      );
    }
    setSelectedEdge(null); // Close dialog
  };
  
  
  const handleEdgeDelete = (edge) => {
    setEdges((eds) => eds.filter((ed) => ed.id !== edge.id));
    setSelectedEdge(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('nodeType');
    const newNode = {
      id: `${nodes.length + 1}`,
      type,
      position: { x: e.clientX, y: e.clientY },
      data: { label: `New ${type}`, color: nodeColor },
    };

    setSelectedNode(newNode);
    setNodeTitle(`New ${type}`);
    setNodeColor(nodeColor);
    setDialogOpen(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  

  const handleNodeDoubleClick = (event, node) => {
    setSelectedNode(node);
    setNodeTitle(node.data.label);
    setNodeColor(node.data.color || '#ffffff');
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    if (selectedNode && !nodes.some((node) => node.id === selectedNode.id)) {
      setNodes((nds) => nds.concat(selectedNode));
    }

    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: nodeTitle, color: nodeColor } }
          : node
      )
    );

    setDialogOpen(false);
    setSelectedNode(null);
  };

  const handleNodeDelete = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));
      setDialogOpen(false);
      setSelectedNode(null);
    }
  };

  const handleDialogCancel = () => {
    if (selectedNode && !nodes.some((node) => node.id === selectedNode.id)) {
      setPendingEdge(null); // Clear pending edge
  setSelectedEdge(null); // Close dialog
      setSelectedNode(null);
    }

    setDialogOpen(false);
  };

  const handleSaveDiagram = () => {
    const diagramData = {
      nodes,
      edges,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(diagramData));
    alert("Diagram saved successfully!");
  };

  const handleRestoreDiagram = () => {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedData);
      setNodes(savedNodes || []);
      setEdges(savedEdges || []);
    } else {
      alert("No saved diagram found.");
    }
  };

  const handleExportPng = () => {
    const flowElement = document.getElementById('react-flow');
    html2canvas(flowElement).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'diagram.png';
      link.click();
    });
  };

  const handleExportPdf = () => {
    const flowElement = document.getElementById('react-flow');
    html2canvas(flowElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('diagram.pdf');
    });
  };

  useEffect(() => {
    handleRestoreDiagram();
  }, []);

  const handleEdgeDoubleClick = (event, edge) => {
    setSelectedEdge(edge);
  };

  return (
    <div className="h-screen flex" onDrop={handleDrop} onDragOver={handleDragOver}>
    <Sidebar setIsSwimlaneDialogOpen={setIsSwimlaneDialogOpen} onSetEdgeType={setSelectedEdgeType} selectedEdgeType={selectedEdgeType} />
    <div className="flex-grow relative pt-1">
      <div id="react-flow" className="relative w-full h-[99vh] border border-gray-300 rounded-lg bg-gray-50 pl-1">
      <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={customEdgeTypes} // Use custom edge type
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            onNodeDoubleClick={handleNodeDoubleClick}
            onEdgeDoubleClick={handleEdgeDoubleClick} // Handle double-click on edges
            onInit={setReactFlowInstance}
            onNodeDragStop={onNodeDragStop}
            minZoom={0.3}
            style={{ width: '80%', height: '130%' }}
          >
            <div className="font-bold pl-4 pt-3 text-2xl"><h1>PROCESS DIAGRAM</h1></div>
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
          <div className="absolute top-2 right-2 space-x-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={handleSaveDiagram}
            >
              Save
            </button>
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              onClick={handleRestoreDiagram}
            >
              Restore
            </button>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              onClick={handleExportPng}
            >
              Export PNG
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={handleExportPdf}
            >
              Export PDF
            </button>
          </div>
        </div>
        {dialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-semibold mb-4">
                {selectedNode ? 'Edit Node' : 'Add Node'}
              </h3>
              <input
                type="text"
                placeholder="Node Title"
                value={nodeTitle}
                onChange={(e) => setNodeTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <input
                type="color"
                value={nodeColor}
                onChange={(e) => setNodeColor(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleDialogClose}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={handleDialogCancel}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                {selectedNode && (
                  <button
                    onClick={handleNodeDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete Node
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      {/* Node Dialog */}


     
      
      {/* Swimlane Dialog */}
      {isSwimlaneDialogOpen && (
        <SwimlaneDialog
          onSubmit={addSwimlane}
          onClose={() => setIsSwimlaneDialogOpen(false)}
        />
      )}
       {selectedEdge && (
          <EdgeDialogue
            edge={selectedEdge}
            onSave={handleEdgeSave}
            onDelete={handleEdgeDelete}
            onClose={() => setSelectedEdge(null)}
          />
        )}
    </div>
    </div>
  );
}
