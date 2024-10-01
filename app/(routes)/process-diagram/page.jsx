"use client"
import React from 'react';
import FlowDiagram from './_components/Main/FlowDiagram';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto">
        <FlowDiagram />
      </div>
    </DndProvider>
  );
};

export default App;
