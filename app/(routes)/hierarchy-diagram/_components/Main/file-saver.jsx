const handleSaveDiagram = () => {
    const diagramData = {
      nodes,
      edges,
    };
    localStorage.setItem('savedDiagram', JSON.stringify(diagramData));
    alert('Diagram saved!');
  };
  