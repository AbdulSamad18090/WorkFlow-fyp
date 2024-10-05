import React from "react";

const SaveProjectDialog = ({ onClose, children }) => {
  
  return (
    <div className="w-full h-screen z-50 bg-black bg-opacity-50 fixed flex items-center justify-center">
      <div className="bg-white w-11/12 sm:w-96 md:w-[600px] min-h-[350px] rounded-lg shadow-lg p-8 relative">
        {children}
        {/* Close button (optional) */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &#10005;
        </button>
      </div>
    </div>
  );
};

export default SaveProjectDialog;
