export const Swimlane = ({ data }) => {
  const swimlaneStyle = {
    backgroundColor: data.transparent ? 'transparent' : data.bgColor,
    border: `2px solid ${data.borderColor}`, // Use borderColor from data
    height: '320px', // Fixed height for each swimlane
    pointerEvents: 'none', // Disable interaction with the swimlane container itself
  };

  const titleStyle = {
    backgroundColor: data.titleColor, // Use titleColor from data
    border: `2px solid ${data.borderColor}`, // Use borderColor from data
    cursor: 'pointer', // Indicate the title is clickable
    pointerEvents: 'auto', // Allow interaction with the title
  };

  return (
    <div className="flex w-full">
      {/* Title box with rotated text */}
      <div
        style={titleStyle}
        className="text-black p-4 w-16 flex items-center justify-center font-bold"
        onClick={data.onClick} // Handle click on the title to open the dialog
      >
        <div className="transform -rotate-90">{data.title}</div>
      </div>
      {/* Swimlane background where edges/nodes reside */}
      <div style={swimlaneStyle} className="flex-grow relative" />
    </div>
  );
};
