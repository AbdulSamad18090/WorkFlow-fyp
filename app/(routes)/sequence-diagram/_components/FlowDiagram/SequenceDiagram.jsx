"use client";
import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "../SideBar/Siderbar"; // Adjust the path as needed
import NodeDialog from "../dialouge/NodeDialog"; // Adjust the path as needed
import EdgeDialog from "../edges/EdgeDialog"; // Updated Edge Dialog component
import DefaultNode from "../Nodes/DefaultNode";
import InputNode from "../Nodes/InputNode";
import OutputNode from "../Nodes/OutputNode";
import CustomNode from "../Nodes/CustomNode";
import CircleNode from "../Nodes/CircleNode";
import RectangleNode from "../Nodes/RectangleNode";
import HumanNode from "../Nodes/HumanNode";
import VerticalLineNode from "../Nodes/VerticalLineNode";
import { CustomEdge } from "../edges/CustomEdge";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SaveProjectDialog from "@/app/components/SaveProjectDialog/page";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { ImSpinner3 } from "react-icons/im";
import ClassNode from '../Nodes/ClassNode';
import NoteNode from '../Nodes/NoteNode';
import FrameFragmentNode from '../Nodes/FrameFragmentNode';

const localStorageKey = "Sequence-diagram-data";

const nodeTypes = {
  defaultNode: DefaultNode,
  inputNode: InputNode,
  outputNode: OutputNode,
  verticalLine: VerticalLineNode,
  customNode: CustomNode,
  circleNode: CircleNode,
  rectangleNode: RectangleNode,
  classNode: ClassNode,
  noteNode: NoteNode,
  frameFragmentNode: FrameFragmentNode,
  humanNode: HumanNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const SequenceDiagram = () => {
  const { data: session } = useSession();

  const params = useParams(); // Get all dynamic params from the URL
  const { id } = params;

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [edgeDialogOpen, setEdgeDialogOpen] = useState(false);
  const [edgeDialogData, setEdgeDialogData] = useState({});
  const [draggingNodeType, setDraggingNodeType] = useState(null);
  const [hideNodes, setHideNodes] = useState(false);
  const [hideEdges, setHideEdges] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [isOpenSaveDialog, setIsOpenSaveDialog] = useState(false);
  const [diagramData, setDiagramData] = useState({
    name: "",
    diagram: "",
    type: "Sequence Diagram",
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

  const onConnect = useCallback(
    (params) => {
      const edgeType = dialogData.edgeStyle || 'straight';

      // Define the new edge based on the selected edge style
      const newEdge = {
        ...params,
        type: edgeType === 'arrow-smooth' ? 'smoothstep' : 'straight', // Use 'smoothstep' for the new edge type
        animated: edgeType === 'dotted' ? false : true, // Disable animation for dotted lines
        style: {
          stroke: '#333',
          strokeWidth: '2px',
          strokeDasharray: edgeType === 'dotted' ? '5,5' : '0', // Dotted style for 'dotted' edges
        },
        markerEnd: { type: MarkerType.ArrowClosed }, // Arrow at the end of the edge
        label: dialogData.edgeLabel || '',
      };

      setEdges((eds) => addEdge(newEdge, eds)); // Update edges in the state
    },
    [dialogData.edgeLabel, dialogData.edgeStyle, setEdges]
  );

  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
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

  const handleNodeDoubleClick = (event, node) => {
    setDialogData({
      ...node,
      position: node.position || dialogData.position,
      nodeType: node.type,
      title: node.data.label,
      color: node.data.color || "#ffffff",
      nodeId: node.id,
    });
    setDialogOpen(true);
  };

  const handleEdgeDoubleClick = (event, edge) => {
    setEdgeDialogData({
      ...edge,
      label: edge.label || "",
      style: edge.style || { stroke: "#333", strokeWidth: "2px" },
    });
    setEdgeDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogData({});
  };

  const handleEdgeDialogClose = () => {
    setEdgeDialogOpen(false);
    setEdgeDialogData({});
  };

  const handleDialogSave = () => {
    const { position, nodeType, title, color, nodeId } = dialogData;

    if (nodeId) {
      // Update existing node
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? {
              ...node,
              data: { label: title, color },
              position: position || node.position,
              type: nodeType,
            }
            : node
        )
      );
    } else {
      // Add new node
      const newNode = {
        id: `${nodes.length + 1}`,
        type: nodeType,
        position,
        data: { label: title, color },
      };

      if (nodeType === "verticalLine") {
        newNode.data = {
          intervals: 10,
          height: 500,
          color,
          title,
          onConnectHandle: (params) => onConnect(params),
        };
      }

      setNodes((nds) => [...nds, newNode]);
    }

    handleDialogClose();
  };

  const handleEdgeDialogSave = () => {
    const { id, label, style } = edgeDialogData;

    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === id
          ? {
            ...edge,
            label,
            style,
          }
          : edge
      )
    );

    handleEdgeDialogClose();
  };

  const handleEdgeDelete = () => {
    const { id } = edgeDialogData;

    setEdges((eds) => eds.filter((edge) => edge.id !== id));
    handleEdgeDialogClose();
  };

  const handleDeleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
    handleDialogClose();
  };

  const handleInputChange = (event) => {
    setDialogData({ ...dialogData, [event.target.name]: event.target.value });
  };

  const handleEdgeInputChange = (event) => {
    setEdgeDialogData({
      ...edgeDialogData,
      [event.target.name]: event.target.value,
    });
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
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

  return (
    <div>
      <ReactFlowProvider>
        <div className="flex h-screen ">
          {/* Sidebar */}
          <Sidebar
            onDragStart={handleDragStart}
            onInputChange={handleInputChange}
            dialogData={dialogData}
            onToggleNodes={() => setHideNodes(!hideNodes)}
            onToggleEdges={() => setHideEdges(!hideEdges)}
            onToggleMiniMap={() => setShowMiniMap(!showMiniMap)}
          />

          {/* React Flow Canvas */}
          <div className="flex-grow relative overflow-auto">
            {/* Container with border for diagram */}
            <div
              id="react-flow"
              className="relative w-full h-full md:h-screen border border-gray-300 bg-gray-50 pl-1"
            >
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
                onNodeDoubleClick={handleNodeDoubleClick}
                onEdgeDoubleClick={handleEdgeDoubleClick} // Add edge double click handler
                fitView
                minZoom={0.3}
                style={{ width: '100%', height: '100%' }}  // Ensure it takes 100% of the parent
              >
            <div className="font-bold pl-4 pt-3 text-l md:text-2xl lg:text-3xl">
                  <h1>SEQUENCE DIAGRAM</h1>
                </div>
                {showMiniMap && <MiniMap />}
                <Controls />
                <Background />
              </ReactFlow>

              {/* Top-right buttons */}
              <div className="absolute top-2 right-2 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 md:px-3 md:py-2"
                  onClick={() => {
                    const exists = localStorage.getItem("Res");
                    console.log(isOpenSaveDialog);
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
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 md:px-3 md:py-2"
                  onClick={handleRestoreDiagram}
                >
                  Restore
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 md:px-3 md:py-2"
                  onClick={handleExportPng}
                >
                  Export PNG
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 md:px-3 md:py-2"
                  onClick={handleExportPdf}
                >
                  Export PDF
                </button>
              </div>
            </div>
          </div>

          {/* Node Configuration Dialog */}
          <NodeDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            onSave={handleDialogSave}
            dialogData={dialogData}
            onInputChange={handleInputChange}
            onDelete={handleDeleteNode}
          />

          {/* Edge Configuration Dialog */}
          <EdgeDialog
            open={edgeDialogOpen}
            onClose={handleEdgeDialogClose}
            onSave={handleEdgeDialogSave}
            onDelete={handleEdgeDelete} // Pass delete handler to EdgeDialog
            edgeData={edgeDialogData}
            onInputChange={handleEdgeInputChange}
          />
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
                Make sure to give your project a name and save it before
                closing.
              </p>

              {/* Input for project name */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="projectName"
                >
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
      </ReactFlowProvider>
    </div>
  );
};

export default SequenceDiagram;
