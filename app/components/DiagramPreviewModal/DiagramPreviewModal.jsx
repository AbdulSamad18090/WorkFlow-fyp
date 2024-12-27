'use client'

import React, { useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { FaTimes } from 'react-icons/fa';

// Import all custom node types
import { StartNode } from "../../(routes)/flow-diagram/_components/NodeTypes/StartNode";
import { RectangleNode } from "../../(routes)/flow-diagram/_components/NodeTypes/RectangleNode";
import { CurvedNode } from '@/app/(routes)/flow-diagram/_components/NodeTypes/CurvedNode';
import { DecisionNode } from '@/app/(routes)/flow-diagram/_components/NodeTypes/DecisionNode';
import { TerminatorNode } from '@/app/(routes)/flow-diagram/_components/NodeTypes/TerminatorNode';
import { ProcessNode } from '@/app/(routes)/flow-diagram/_components/NodeTypes/ProcessNode';
import { TriangleNode } from '@/app/(routes)/flow-diagram/_components/NodeTypes/TringleNode';
import { CircleNode } from '@/app/(routes)/flow-diagram/_components/NodeTypes/CircleNode';
import { NoteNode } from '@/app/(routes)/flow-diagram/_components/NodeTypes/NoteNode';
import { DatabaseNode } from '@/app/(routes)/flow-diagram/_components/NodeTypes/DatabaseNode';
import { PreparationNode } from '@/app/(routes)/flow-diagram/_components/NodeTypes/PareparationNode';
import { DocumentNode } from '@/app/(routes)/flow-diagram/_components/NodeTypes/DocumentNode';
import DefaultNode from '@/app/(routes)/sequence-diagram/_components/Nodes/DefaultNode';
import InputNode from '@/app/(routes)/sequence-diagram/_components/Nodes/InputNode';
import OutputNode from '@/app/(routes)/sequence-diagram/_components/Nodes/OutputNode';
import VerticalLineNode from '@/app/(routes)/sequence-diagram/_components/Nodes/VerticalLineNode';
import CustomNode from '@/app/(routes)/sequence-diagram/_components/Nodes/CustomNode';
import ClassNode from '@/app/(routes)/sequence-diagram/_components/Nodes/ClassNode';
import FrameFragmentNode from '@/app/(routes)/sequence-diagram/_components/Nodes/FrameFragmentNode';
import HumanNode from '@/app/(routes)/sequence-diagram/_components/Nodes/HumanNode';
import { DelayNode } from '@/app/(routes)/flow-diagram/_components/NodeTypes/DelayNode';
import { Swimlane } from '@/app/(routes)/process-diagram/_components/NodeTypes/Swimlane';
import { DisplayNode } from '@/app/(routes)/process-diagram/_components/NodeTypes/DisplayNode';
import { ManyDocumentsNode } from '@/app/(routes)/process-diagram/_components/NodeTypes/ManyDocumentsNode';
import { ManualOperationNode } from '@/app/(routes)/process-diagram/_components/NodeTypes/ManualOperationNode';
import { ManualInputNode } from '@/app/(routes)/process-diagram/_components/NodeTypes/ManualInputNode';
import { MergeNode } from '@/app/(routes)/process-diagram/_components/NodeTypes/MergeNode';
import RectanglePictureNode from '@/app/(routes)/hierarchy-diagram/_components/PictureNodes/RectanglePictureNode';
import LargePictureNode from '@/app/(routes)/hierarchy-diagram/_components/PictureNodes/LargePictureNode';

const nodeTypes = {
    start: StartNode,
    rectangle: RectangleNode,
    decision: DecisionNode,
    curved: CurvedNode,
    terminator: TerminatorNode,
    process: ProcessNode,
    triangle: TriangleNode,
    circle: CircleNode,
    note: NoteNode,
    database: DatabaseNode,
    delay: DelayNode,
    preparation: PreparationNode,
    document: DocumentNode,
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
    swimlane: Swimlane,
    display: DisplayNode,
    manyDocuments: ManyDocumentsNode,
    manualOperation: ManualOperationNode,
    manualInput: ManualInputNode,
    merge: MergeNode,
    rectanglePictureNode: RectanglePictureNode,
    largePictureNode: LargePictureNode,
    default: DefaultNode,
    input: InputNode,
    output: OutputNode,
};

const DiagramPreviewModal = ({ isOpen, onClose, diagramData }) => {
    if (!isOpen) return null;

    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        let parsedDiagram = { nodes: [], edges: [] };
        try {
            parsedDiagram = typeof diagramData === 'string' ? JSON.parse(diagramData) : diagramData;
            setNodes(parsedDiagram.nodes || []);
            setEdges(parsedDiagram.edges || []);
        } catch (error) {
            console.error("Error parsing diagram data:", error);
        }
    }, [diagramData]);

    const onInit = useCallback((reactFlowInstance) => {
        console.log('flow loaded:', reactFlowInstance);
        reactFlowInstance.fitView({ padding: 0.2, includeHiddenNodes: true, duration: 200 });
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-end p-4">
            <div className="bg-white rounded-lg w-full max-w-7xl h-[85vh] z-50 flex flex-col shadow-2xl">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Diagram Preview</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="Close"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="flex-grow overflow-hidden" ref={reactFlowWrapper}>
                    <ReactFlowProvider>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onInit={onInit}
                            nodeTypes={nodeTypes}
                            fitView
                            maxZoom={1}
                            minZoom={0.1}
                            defaultZoom={0.2}
                            attributionPosition="bottom-left"
                        >
                            <Background />
                            <Controls />
                            <MiniMap />
                        </ReactFlow>
                    </ReactFlowProvider>
                </div>
            </div>
        </div>
    );
};

export default DiagramPreviewModal;

