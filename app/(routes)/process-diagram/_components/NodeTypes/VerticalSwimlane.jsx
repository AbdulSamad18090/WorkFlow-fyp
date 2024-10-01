
export const VerticalSwimlane = ({ data }) => {
  const { title, titleColor, bgColor } = data;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: bgColor || 'rgba(128, 128, 128, 0.1)',
        border: `2px solid ${titleColor || 'gray'}`,
        width: '200px',
        height: '800px', // Adjust this height based on your requirements
        position: 'relative',
      }}
    >
      <div
        style={{
          backgroundColor: titleColor || 'gray',
          color: 'white',
          padding: '5px 10px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {title}
      </div>
      <div style={{ flex: 1 }}></div> {/* This creates the vertical lane */}
    </div>
  );
};
