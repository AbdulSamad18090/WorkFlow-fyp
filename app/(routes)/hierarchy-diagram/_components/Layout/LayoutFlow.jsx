import React, { useCallback, useState } from "react";
import { 
  ReactFlow, 
  addEdge, 
  MiniMap, 
  Controls, 
  Background, 
  ConnectionLineType, 
  useNodesState, 
  useEdgesState 
} from "reactflow";
import Sidebar from "../SideBar/SideBar";
import NodeDialog from "../Dialouges/NodeDialog";
import PictureNodeDialog from "../Dialouges/PictureNodeDialog";
import { getLayoutedElements } from "../Layout/LayoutHelper";
import "reactflow/dist/style.css";
import { nodeTypes } from "../types/nodeTypes";

const initialNodes = [];
const initialEdges = [];

const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isNodeDialogOpen, setIsNodeDialogOpen] = useState(false);
  const [isPictureDialogOpen, setIsPictureDialogOpen] = useState(false);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep},
          eds
        )
      ),
    []
  );

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
    if (["rectanglePictureNode", "largePictureNode"].includes(type)) {
      setIsPictureDialogOpen(true);
    } else {
      setIsNodeDialogOpen(true);
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleSaveNodeData = (title, position) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, title, position } }
          : node
      )
    );
    setSelectedNode(null);
    setIsNodeDialogOpen(false);
  };

  const handleSavePictureNodeData = (title, position, image) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, title, position, image } }
          : node
      )
    );
    setSelectedNode(null);
    setIsPictureDialogOpen(false);
  };

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  return (
    <div className="flex w-full h-screen">
      <Sidebar onLayout={onLayout} />
      <div
        className="w-full h-full bg-gray-50 relative"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
        >
          <MiniMap position="bottom-right" />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
        <NodeDialog
          isOpen={isNodeDialogOpen}
          nodeData={selectedNode}
          onSave={handleSaveNodeData}
          onClose={() => setIsNodeDialogOpen(false)}
        />
        <PictureNodeDialog
          isOpen={isPictureDialogOpen}
          nodeData={selectedNode}
          onSave={handleSavePictureNodeData}
          onClose={() => setIsPictureDialogOpen(false)}
        />
      </div>
    </div>
  );
};

export default LayoutFlow;
