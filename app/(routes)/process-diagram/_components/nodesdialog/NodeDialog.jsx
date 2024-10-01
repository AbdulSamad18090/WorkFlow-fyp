import React from 'react';

const NodeDialog = ({ selectedNode, nodeTitle, nodeColor, setNodeTitle, setNodeColor, setDialogOpen, setNodes, nodes }) => {
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
  };

  const handleNodeDelete = () => {
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setDialogOpen(false);
  };

  return (
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
          <button onClick={handleDialogClose} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
          <button onClick={() => setDialogOpen(false)} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
          {selectedNode && <button onClick={handleNodeDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete Node</button>}
        </div>
      </div>
    </div>
  );
};

export default NodeDialog;
