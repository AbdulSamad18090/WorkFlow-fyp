"use client";
import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  MarkerType,
  EdgeText,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "../SiderBar/SideBar";
import EdgeDialogue from "../EdgeDialog/EdgeDialog"; // Import EdgeDialogue component
import { StartNode } from "../NodeTypes/StartNode";
import SwimlaneDialog from "../swimlaneDialog/SwimlaneDialog";
import { ProcessNode } from "../NodeTypes/ProcessNode";
import { DecisionNode } from "../NodeTypes/DecisionNode";
import { DisplayNode } from "../NodeTypes/DisplayNode";
import { ManualInputNode } from "../NodeTypes/ManualInputNode";
import { ManyDocumentsNode } from "../NodeTypes/ManyDocumentsNode";
import { ManualOperationNode } from "../NodeTypes/ManualOperationNode";
import { MergeNode } from "../NodeTypes/MergeNode";
import { CurvedNode } from "../NodeTypes/CurvedNode";
import { TerminatorNode } from "../NodeTypes/TerminatorNode";
import { CircleNode } from "../NodeTypes/CircleNode";
import { CustomEdge } from "../Edges/EdgeTypes";
import { PreparationNode } from "../NodeTypes/PareparationNode";
import { DelayNode } from "../NodeTypes/DelayNode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Swimlane } from "../NodeTypes/Swimlane";
import { useSession } from "next-auth/react";
import SaveProjectDialog from "@/app/components/SaveProjectDialog/page";
import axios from "axios";
import { ImSpinner3 } from "react-icons/im";
import { useParams } from "next/navigation";
import domtoimage from "dom-to-image";
import { DocumentNode } from "../NodeTypes/DocumentNode";
const localStorageKey = "process-diagram-data";

const nodeTypes = {
  start: StartNode,
  process: ProcessNode,
  decision: DecisionNode,
  curved: CurvedNode,
  terminator: TerminatorNode,
  swimlane: Swimlane,
  circle: CircleNode,
  delay: DelayNode,
  preparation: PreparationNode,
  display: DisplayNode,
  manyDocuments: ManyDocumentsNode,
  manualOperation: ManualOperationNode,
  manualInput: ManualInputNode,
  merge: MergeNode,
  document:DocumentNode,
};

const customEdgeTypes = {
  custom: CustomEdge, // Register your custom edge
};

// Utility to generate unique IDs for nodes
let id = 0;
const getId = () => `node_${id++}`;

// Main FlowContainer component
export default function FlowContainer() {
  const { data: session } = useSession();

  const params = useParams(); // Get all dynamic params from the URL
  const { id } = params;

  const [reactFlowInstance, setReactFlowInstance] = useState(null); // React Flow instance reference
  const [isSwimlaneDialogOpen, setIsSwimlaneDialogOpen] = useState(false); // Control swimlane dialog visibility
  const [currentNode, setCurrentNode] = useState(null); // Keep track of the currently selected node
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [nodeTitle, setNodeTitle] = useState("");
  const [nodeColor, setNodeColor] = useState("#ffffff");
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [selectedEdgeType, setSelectedEdgeType] = useState("default");
  const [pendingEdge, setPendingEdge] = useState(null); // Temporary state to hold edge
  const [currentSwimlane, setCurrentSwimlane] = useState(null); // Track the selected swimlane for editing

  const [isOpenSaveDialog, setIsOpenSaveDialog] = useState(false);
  const [diagramData, setDiagramData] = useState({
    name: "",
    diagram: "",
    type: "Process Diagram",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getSpecificDiagram = async () => {
      if (typeof id !== "undefined") {
        setIsFetching(true);
        try {
          const res = await axios.get(`/api/diagram/getSpecific/${id}`);
          console.log("RESPONSE =>", res.data);
          localStorage.setItem("Res", JSON.stringify(res.data));
          setIsFetching(false);
        } catch (error) {
          console.log("Error =>", error);
          setIsFetching(false);
        }
      }
    };
    getSpecificDiagram();
  }, [id]);

  // Function to dynamically add a swimlane based on user input
  // Function to dynamically add a swimlane based on user input
  const addSwimlane = ({ title, titleColor, borderColor }) => {
    const swimlaneHeight = 320;
    const swimlaneGap = 5;

    const swimlaneNodes = nodes.filter((node) => node.type === "swimlane");
    const swimlaneCount = swimlaneNodes.length;

    const newSwimlane = {
      id: getId(),
      type: "swimlane",
      position: {
        x: 0,
        y: swimlaneCount * (swimlaneHeight + swimlaneGap),
      },
      style: {
        width: 1300,
        height: swimlaneHeight,
        zIndex: 0, // Ensure swimlane is behind nodes and edges
        pointerEvents: "none", // Allow interactions with edges inside the swimlane
      },
      data: {
        title: title || `Swimlane ${swimlaneCount + 1}`,
        titleColor: titleColor || "gray",
        borderColor: borderColor || "gray",
        bgColor: "rgba(128, 128, 128, 0.1)",
        onClick: () => {
          setCurrentSwimlane(newSwimlane); // Set the swimlane as current
          setIsSwimlaneDialogOpen(true); // Open the dialog to edit
        }, // Pass click handler for the swimlane title
      },
      draggable: false,
      selectable: false,
    };

    setNodes((nds) => [...nds, newSwimlane]);
  };

  const editSwimlane = ({ title, titleColor, borderColor }) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === currentSwimlane.id
          ? {
              ...node,
              data: {
                ...node.data,
                title,
                titleColor,
                borderColor, // Update border color in the edited swimlane
              },
            }
          : node
      )
    );
    setCurrentSwimlane(null);
    setIsSwimlaneDialogOpen(false);
  };

  const deleteSwimlane = () => {
    if (currentSwimlane) {
      const swimlaneId = currentSwimlane.id;

      setNodes((nds) =>
        nds.filter(
          (node) => node.id !== swimlaneId && node.parentNode !== swimlaneId
        )
      );
      setEdges((eds) =>
        eds.filter(
          (edge) => edge.source !== swimlaneId && edge.target !== swimlaneId
        )
      );
      setCurrentSwimlane(null);
      setIsSwimlaneDialogOpen(false);
    }
  };

  const handleNodeClick = (event, node) => {
    if (node.type === "swimlane") {
      setCurrentSwimlane(node);
      setIsSwimlaneDialogOpen(true);
    }
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
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // Handle drop event when nodes are dropped on the canvas
  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowInstance.project({
      x: event.clientX,
      y: event.clientY,
    });
    const nodeType = event.dataTransfer.getData("application/reactflow");
    const position = { x: reactFlowBounds.x, y: reactFlowBounds.y };

    // Check if dropped inside a swimlane
    const swimlane = nodes.find(
      (n) =>
        n.type === "swimlane" &&
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
    if (node.type === "swimlane") return; // Prevent swimlane movement

    const nodePosition = reactFlowInstance.project({
      x: event.clientX,
      y: event.clientY,
    });
    const swimlane = nodes.find(
      (n) =>
        n.type === "swimlane" &&
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
                extent: "parent",
              }
            : n
        )
      );
    }
  };

  // Handle drag over event to allow dropping of nodes
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // Handle node connection (edge creation) in React Flow

  const onConnect = useCallback(
    (params) => {
      const edgeType = selectedEdgeType === 'bezierArrow' || selectedEdgeType === 'straightArrow' ? selectedEdgeType : 'smoothstep';
      
      const newEdge = {
        ...params,
        type: edgeType, // Set the correct edge type
        markerEnd:
          selectedEdgeType === 'arrow' || 
          selectedEdgeType === 'bezierArrow' || 
          selectedEdgeType === 'straightArrow' || 
          selectedEdgeType === 'dotted' // Ensure arrowhead for dotted edges
            ? { type: MarkerType.Arrow, width: 10, height: 10 }
            : undefined,
        style: {
          stroke: 'black',
          strokeWidth: 2,
          strokeDasharray: selectedEdgeType === 'dotted' ? '3,3' : undefined, // Dotted style
        },
        data: { label: '' }, // Empty label by default
        label: '', // Ensure label is empty by default
      };
  
      setPendingEdge(newEdge);
      setSelectedEdge(newEdge); // Open dialog for setting title
    },
    [selectedEdgeType, setEdges]
  );
  
  const handleEdgeSave = (edge, title) => {
    if (pendingEdge) {
      // Add the pending edge to the list of edges with the updated label
      setEdges((eds) =>
        addEdge(
          {
            ...pendingEdge,
            data: { ...pendingEdge.data, label: title },
            label: title,
          },
          eds
        )
      );
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
    const type = e.dataTransfer.getData("nodeType");
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
    setNodeColor(node.data.color || "#ffffff");
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    if (selectedNode && !nodes.some((node) => node.id === selectedNode.id)) {
      setNodes((nds) => nds.concat(selectedNode));
    }

    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? {
              ...node,
              data: { ...node.data, label: nodeTitle, color: nodeColor },
            }
          : node
      )
    );

    setDialogOpen(false);
    setSelectedNode(null);
  };

  const handleNodeDelete = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== selectedNode.id && edge.target !== selectedNode.id
        )
      );
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

  const handleSaveDiagram = async () => {
    setIsSaving(true);

    // Prepare updated diagram data
    const updatedDiagramData = {
      ...diagramData,
      diagram: {
        nodes: nodes,
        edges: edges,
      },
    };
    try {
      const local = JSON.parse(localStorage.getItem("Res"));
      // Make API request to save the diagram
      const res = await axios.post(
        `/api/diagram/create/${session?.user?.userData?.id}`,
        {
          name: local?.diagram?.name || updatedDiagramData.name,
          diagram: JSON.stringify(updatedDiagramData.diagram), // Diagram serialized as a JSON string
          type: updatedDiagramData.type,
          diagramId: JSON.parse(localStorage.getItem("Res"))?.diagram?._id,
        }
      );

      // Check if response has the expected data
      if (res.data && res.data.diagram && res.data.diagram._id) {
        // Store the diagram data in localStorage, using the diagramId directly
        localStorage.setItem("Res", JSON.stringify(res.data));

        // Set the diagram data with the returned ID
        setDiagramData({
          ...updatedDiagramData,
          diagramId: res.data.diagram._id, // Use the diagram ID from the response
        });

        console.log("Saved Diagram Data:", localStorage.getItem("Res"));
      } else {
        console.error("Unexpected API response: ", res.data);
      }

      setIsSaving(false);
    } catch (error) {
      console.log("Error occurred during diagram save: ", error);
      setIsSaving(false);
    }
  };

  const handleRestoreDiagram = () => {
    const savedData = localStorage.getItem("Res");
    const diagram = JSON.parse(savedData)?.diagram;
    if (savedData) {
      const { nodes, edges } = JSON.parse(diagram?.diagram);
      setNodes(nodes || []);
      setEdges(edges || []);

      console.log(JSON.parse(diagram?.diagram));
    }
  };
  const handleExportPng = () => {
    const flowElement = document.getElementById("react-flow");
  
    // Check if flowElement is defined
    if (!flowElement) {
      console.error('Flow element not found!');
      return;
    }
  
    // Create a temporary container to hold the diagram
    const tempElement = flowElement.cloneNode(true);
  
    // Hide unwanted elements (backgrounds, minimaps, buttons, etc.)
    const unwantedElements = tempElement.querySelectorAll('.button-class, .heading-class, .minimap-class, .background-class'); // Adjust selectors accordingly
    unwantedElements.forEach((element) => {
      element.style.display = 'none'; // Hide elements by changing their display style
    });
  
    // Append the cloned element to the body (temporarily)
    document.body.appendChild(tempElement);
  
    // Use dom-to-image to create PNG
    domtoimage.toPng(tempElement, { bgcolor: '#ffffff' }) // Optional: Set bgcolor to white if needed
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'diagram.png';
        link.click();
      })
      .catch((error) => {
        console.error('Oops, something went wrong!', error);
      })
      .finally(() => {
        // Remove the temporary element from the body
        document.body.removeChild(tempElement);
      });
  };
  
  const handleExportPdf = () => {
    const flowElement = document.getElementById("react-flow");
  
    // Check if flowElement is defined
    if (!flowElement) {
      console.error('Flow element not found!');
      return;
    }
  
    // Create a temporary container to hold the diagram
    const tempElement = flowElement.cloneNode(true);
  
    // Hide unwanted elements (backgrounds, minimaps, buttons, etc.)
    const unwantedElements = tempElement.querySelectorAll('.button-class, .heading-class, .minimap-class, .background-class'); // Adjust selectors accordingly
    unwantedElements.forEach((element) => {
      element.style.display = 'none'; // Hide elements by changing their display style
    });
  
    // Append the cloned element to the body (temporarily)
    document.body.appendChild(tempElement);
  
    // Use dom-to-image to create PNG for PDF
    domtoimage.toPng(tempElement, { bgcolor: '#ffffff' }) // Optional: Set bgcolor to white if needed
      .then((dataUrl) => {
        const pdf = new jsPDF({
          orientation: tempElement.offsetWidth > tempElement.offsetHeight ? 'landscape' : 'portrait',
          unit: 'px',
          format: [tempElement.offsetWidth, tempElement.offsetHeight]
        });
        pdf.addImage(dataUrl, 'PNG', 0, 0, tempElement.offsetWidth, tempElement.offsetHeight);
        pdf.save('diagram.pdf');
      })
      .catch((error) => {
        console.error('Oops, something went wrong!', error);
      })
      .finally(() => {
        // Remove the temporary element from the body
        document.body.removeChild(tempElement);
      });
  };
  



  useEffect(() => {
    setTimeout(() => {
      handleRestoreDiagram();
    }, 1500);
  }, []);

  const handleEdgeDoubleClick = (event, edge) => {
    setSelectedEdge(edge);
  };

  return (
    <div
      className="h-screen flex"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Sidebar
        setIsSwimlaneDialogOpen={setIsSwimlaneDialogOpen}
        onSetEdgeType={setSelectedEdgeType}
        selectedEdgeType={selectedEdgeType}
      />
      <div className="flex-grow relative pt-1">
        <div
          id="react-flow"
          className="relative w-full h-full md:h-screen border border-gray-300 bg-gray-50 pl-1"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={customEdgeTypes} // Use custom edge type
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView={{padding :40}}
            onNodeDoubleClick={handleNodeDoubleClick}
            onEdgeDoubleClick={handleEdgeDoubleClick} // Handle double-click on edges
            onInit={setReactFlowInstance}
            onNodeClick={handleNodeClick} // Handle single click on swimlane
            onNodeDragStop={onNodeDragStop}
            minZoom={0.3}
            style={{ width: "80%", height: "130%" }}
          >
          <div className="font-bold pl-4 pt-3 text-l md:text-2xl lg:text-3xl">
              <h1>PROCESS DIAGRAM</h1>
            </div>
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
          <div className="absolute top-2 right-2 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 md:px-3 md:py-2"
              onClick={() => {
                const exists = localStorage.getItem("Res");
                if (!exists) {
                  setIsOpenSaveDialog(true);
                } else {
                  setIsOpenSaveDialog(false);
                  handleSaveDiagram();
                }
              }}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 md:py-2"
              onClick={handleRestoreDiagram}
            >
              Restore
            </button>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 md:py-2"
              onClick={handleExportPng}
            >
              Export PNG
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 md:py-2"
              onClick={handleExportPdf}
            >
              Export PDF
            </button>
          </div>
        </div>
        {dialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                {selectedNode ? "Edit Node" : "Add Node"}
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
            onSubmit={currentSwimlane ? editSwimlane : addSwimlane} // Dynamically handle edit or add
            onDelete={currentSwimlane ? deleteSwimlane : null} // Handle deletion for existing swimlanes
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
      {isOpenSaveDialog && (
        <SaveProjectDialog
          onClose={() => {
            setIsOpenSaveDialog(false);
          }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Save Your Project
          </h2>
          <p className="text-gray-600 mb-6">
            Make sure to give your project a name and save it before closing.
          </p>

          {/* Input for project name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="projectName">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project name"
              value={diagramData.name}
              onChange={(e) =>
                setDiagramData({ ...diagramData, name: e.target.value })
              }
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-all"
              onClick={() => {
                setIsOpenSaveDialog(false);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
              onClick={handleSaveDiagram}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </SaveProjectDialog>
      )}
      {isFetching && (
        <div className="w-full absolute z-50 top-20 flex justify-center bg-transparent">
          <div className="w-fit p-4 text-xl bg-blue-100 rounded-lg shadow-md flex items-center gap-4">
            <h1>Fetching Diagram</h1>
            <ImSpinner3 className="animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
}
