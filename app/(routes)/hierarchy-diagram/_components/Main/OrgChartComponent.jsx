"use client";
import React, { useCallback, useState, useMemo, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
} from "reactflow";
import Sidebar from "../SideBar/SideBar";
import NodeDialog from "../Dialouges/NodeDialog";
import PictureNodeDialog from "../Dialouges/PictureNodeDialog";
import EdgeDialog from "../Dialouges/EdgeDialog"; // Import EdgeDialog
import { getLayoutedElements } from "../Layout/LayoutHelper";
import "reactflow/dist/style.css";
import { nodeTypes } from "../types/nodeTypes";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSession } from "next-auth/react";
import SaveProjectDialog from "@/app/components/SaveProjectDialog/page";
import axios from "axios";
import { useParams } from "next/navigation";
import { ImSpinner3 } from "react-icons/im";

const initialNodes = [];
const initialEdges = [];

const LayoutFlow = () => {
  const { data: session } = useSession();

  const params = useParams(); // Get all dynamic params from the URL
  const { id } = params;

  // State for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // State for selected nodes and edges
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null); // Track selected edge

  // State for dialogs
  const [isNodeDialogOpen, setIsNodeDialogOpen] = useState(false);
  const [isPictureDialogOpen, setIsPictureDialogOpen] = useState(false);
  const [isEdgeDialogOpen, setIsEdgeDialogOpen] = useState(false); // Track edge dialog visibility
  const [isNewNode, setIsNewNode] = useState(false);

  // State for edge type (direct or indirect)
  const [edgeType, setEdgeType] = useState("direct");

  const [isOpenSaveDialog, setIsOpenSaveDialog] = useState(false);
  const [diagramData, setDiagramData] = useState({
    name: "",
    diagram: "",
    type: "Hierarchy Diagram",
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

  // Key for storing diagram data in localStorage
  const localStorageKey = "Orgchart-data";

  // Calculate number of connected nodes for each node (node connection counter)
  const nodeConnections = useMemo(() => {
    const connections = {};
    edges.forEach((edge) => {
      if (!connections[edge.source]) {
        connections[edge.source] = 0;
      }
      connections[edge.source]++;
    });
    return connections;
  }, [edges]);

  // Handle when a new connection (edge) is made between two nodes
  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: ConnectionLineType.SmoothStep,
        // Styling both direct and indirect edges
        style: {
          strokeWidth: 2,
          strokeDasharray: edgeType === "indirect" ? "5,5" : "",
          stroke: "#000",
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [edgeType, setEdges]
  );

  // Handle drop event for adding a new node
  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = event.target.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: (nodes.length + 1).toString(),
      type,
      position,
      data: { title: "", position: "", image: null },
    };

    setNodes((nds) => nds.concat(newNode));
    setSelectedNode(newNode);
    setIsNewNode(true);

    if (["rectanglePictureNode", "largePictureNode"].includes(type)) {
      setIsPictureDialogOpen(true);
    } else {
      setIsNodeDialogOpen(true);
    }
  };

  // Handle node double-click to edit the node's data
  const onDoubleClickNode = (_, node) => {
    setSelectedNode(node);
    if (["rectanglePictureNode", "largePictureNode"].includes(node.type)) {
      setIsPictureDialogOpen(true);
    } else {
      setIsNodeDialogOpen(true);
    }
    setIsNewNode(false);
  };

  // Handle edge double-click to prompt edge deletion
  const onEdgeDoubleClick = (_, edge) => {
    setSelectedEdge(edge); // Set the selected edge
    setIsEdgeDialogOpen(true); // Open the dialog
  };

  // Handle edge deletion
  const handleDeleteEdge = () => {
    setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id)); // Remove the edge
    setSelectedEdge(null); // Clear selected edge
    setIsEdgeDialogOpen(false); // Close the dialog
  };

  // Handle saving node data from the node dialog
  const handleSaveNodeData = (title, position, color) => {
    if (isNewNode && !title) {
      setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    } else {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: { ...node.data, title, position, color },
                style: { backgroundColor: color },
              }
            : node
        )
      );
    }
    setSelectedNode(null);
    setIsNodeDialogOpen(false);
  };

  // Handle saving picture node data from the picture node dialog
  const handleSavePictureNodeData = (title, position, image) => {
    if (isNewNode && !title) {
      setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    } else {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, title, position, image } }
            : node
        )
      );
    }
    setSelectedNode(null);
    setIsPictureDialogOpen(false);
  };

  // Handle node deletion from node dialog
  const handleDeleteNode = () => {
    setEdges((eds) =>
      eds.filter(
        (edge) =>
          edge.source !== selectedNode.id && edge.target !== selectedNode.id
      )
    );
    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    setSelectedNode(null);
    setIsNodeDialogOpen(false);
    setIsPictureDialogOpen(false);
  };

  // Layout the diagram in a specific direction
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  // Change the edge type between direct and indirect
  const handleEdgeTypeChange = (type) => {
    setEdgeType(type);
  };

  // Save the current diagram state to localStorage
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

  // Export the diagram as PNG
  const handleExportPng = () => {
    const flowElement = document.getElementById("react-flow");
    html2canvas(flowElement).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "diagram.png";
      link.click();
    });
  };

  // Export the diagram as PDF
  const handleExportPdf = () => {
    const flowElement = document.getElementById("react-flow");
    html2canvas(flowElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("diagram.pdf");
    });
  };

  // Restore the diagram on initial load
  useEffect(() => {
    setTimeout(() => {
      handleRestoreDiagram();
    }, 1500);
  }, []);

  return (
    <div className="flex w-full h-screen ">
      <Sidebar
        onLayout={onLayout}
        onEdgeTypeChange={handleEdgeTypeChange}
        currentEdgeType={edgeType}
      />

      <div className="flex-grow relative pt-1">
        {/* Container with border for diagram */}
        <div
          id="react-flow"
          className="relative w-full h-[99vh] border border-gray-300 rounded-lg bg-gray-50"
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {/* ReactFlow Canvas */}
          <ReactFlow
            nodes={nodes.map((node) => ({
              ...node,
              data: {
                ...node.data,
                childCount: nodeConnections[node.id] || 0,
              },
            }))}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDoubleClick={onDoubleClickNode}
            onEdgeDoubleClick={onEdgeDoubleClick} // Double click on edge
            nodeTypes={nodeTypes}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
          >
            <div className="font-bold pl-4 pt-3 text-2xl">
              <h1>HIERARCHY DIAGRAM</h1>
            </div>
            <MiniMap position="bottom-right" />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>

          {/* Top-right buttons */}
          <div className="absolute top-2 right-2 space-x-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
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

        {/* Dialogs for Node, PictureNode, and Edge */}
        <NodeDialog
          isOpen={isNodeDialogOpen}
          nodeData={selectedNode}
          onSave={handleSaveNodeData}
          onClose={() => {
            if (isNewNode)
              handleSaveNodeData(""); // Discard new node if cancelled
            else setIsNodeDialogOpen(false);
          }}
          onDelete={isNewNode ? null : handleDeleteNode}
          isNewNode={isNewNode}
        />
        <PictureNodeDialog
          isOpen={isPictureDialogOpen}
          nodeData={selectedNode}
          onSave={handleSavePictureNodeData}
          onClose={() => {
            if (isNewNode) handleSavePictureNodeData("", "", null);
            // Discard new node if cancelled
            else setIsPictureDialogOpen(false);
          }}
          onDelete={isNewNode ? null : handleDeleteNode}
          isNewNode={isNewNode}
        />
        <EdgeDialog
          isOpen={isEdgeDialogOpen}
          onDelete={handleDeleteEdge}
          onClose={() => setIsEdgeDialogOpen(false)}
        />
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
};

export default LayoutFlow;
