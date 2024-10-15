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
} from "reactflow";
import { ImSpinner3 } from "react-icons/im";
import "reactflow/dist/style.css";
import Sidebar from "../SiderBar/SideBar";
import EdgeDialogue from "../EdgeDialog/EdgeDialog"; // Import EdgeDialogue component
import { StartNode } from "../NodeTypes/StartNode";
import { RectangleNode } from "../NodeTypes/RectangleNode";
import { NoteNode } from "../NodeTypes/NoteNode";
import { DatabaseNode } from "../NodeTypes/DatabaseNode";
import { ProcessNode } from "../NodeTypes/ProcessNode";
import { DecisionNode } from "../NodeTypes/DecisionNode";
import { CurvedNode } from "../NodeTypes/CurvedNode";
import { TerminatorNode } from "../NodeTypes/TerminatorNode";
import { TriangleNode } from "../NodeTypes/TringleNode";
import { CircleNode } from "../NodeTypes/CircleNode";
import { DisplayNode } from "../NodeTypes/DisplayNode";
import { CustomEdge } from "../Edges/EdgeTypes";
import { PreparationNode } from "../NodeTypes/PareparationNode";
import { DelayNode } from "../NodeTypes/DelayNode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SaveProjectDialog from "../../../../components/SaveProjectDialog/page";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import domtoimage from "dom-to-image";
import { DocumentNode } from "../NodeTypes/DocumentNode"; 
const localStorageKey = "flow-diagram-data";

const nodeTypes = {
  start: StartNode,
  process: ProcessNode,
  decision: DecisionNode,
  curved: CurvedNode,
  terminator: TerminatorNode,
  rectangle: RectangleNode,
  triangle: TriangleNode,
  circle: CircleNode,
  note: NoteNode,
  database: DatabaseNode,
  delay: DelayNode,
  preparation: PreparationNode,
  document:DocumentNode,
};

const customEdgeTypes = {
  custom: CustomEdge, // Register your custom edge
};

export default function FlowDiagram() {
  const { data: session } = useSession();

  const params = useParams(); // Get all dynamic params from the URL
  const { id } = params; // Destructure the 'id' parameter from params

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [nodeTitle, setNodeTitle] = useState("");
  const [nodeColor, setNodeColor] = useState("#ffffff");
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [selectedEdgeType, setSelectedEdgeType] = useState("default");
  const [pendingEdge, setPendingEdge] = useState(null); // Temporary state to hold edge
  const [isOpenSaveDialog, setIsOpenSaveDialog] = useState(false);
  const [diagramData, setDiagramData] = useState({
    name: "",
    diagram: "",
    type: "Flow Diagram",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedDiagram, setFetchedDiagram] = useState("null");

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
    // alert("restored")
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

    // Using dom-to-image to create PNG
    domtoimage.toPng(flowElement)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'diagram.png';
        link.click();
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };

  const handleExportPdf = () => {
    const flowElement = document.getElementById("react-flow");

    // Using dom-to-image to create PNG for PDF
    domtoimage.toPng(flowElement)
      .then((dataUrl) => {
        const pdf = new jsPDF({
          orientation: flowElement.offsetWidth > flowElement.offsetHeight ? 'landscape' : 'portrait',
          unit: 'px',
          format: [flowElement.offsetWidth, flowElement.offsetHeight]
        });
        pdf.addImage(dataUrl, 'PNG', 0, 0, flowElement.offsetWidth, flowElement.offsetHeight);
        pdf.save('diagram.pdf');
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };



  useEffect(() => {
    setTimeout(() => {
      handleRestoreDiagram();
    }, 1500);
  }, [id]);

  const handleEdgeDoubleClick = (event, edge) => {
    setSelectedEdge(edge);
  };

  return (
    <div
      className="h-screen  flex "
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Sidebar 
        onSetEdgeType={setSelectedEdgeType}
        selectedEdgeType={selectedEdgeType}
      />
      <div className="flex-grow relative overflow-auto  ">
        <div
          id="react-flow"
          className="relative w-full h-full md:h-screen border border-gray-300 bg-gray-50 pl-1 "

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
            minZoom={0.3}

            style={{ width: '100%', height: '100%' }}  // Ensure it takes 100% of the parent
            onNodeDoubleClick={handleNodeDoubleClick}
            onEdgeDoubleClick={handleEdgeDoubleClick} // Handle double-click on edges
          >
            
           <div className="font-bold pl-4 pt-3 text-l md:text-2xl lg:text-3xl ">
              <h1>FLOW DIAGRAM</h1>

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
        {dialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
              <h3 className="text-lg font-semibold mb-4 text-center">
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
