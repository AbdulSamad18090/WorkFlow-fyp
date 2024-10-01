import React, { useState, useEffect } from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const PictureNodeDialog = ({ isOpen, nodeData, onSave, onClose, onDelete, isNewNode }) => {
  const [title, setTitle] = useState(nodeData?.data?.title || "");
  const [position, setPosition] = useState(nodeData?.data?.position || "");
  const [image, setImage] = useState(nodeData?.data?.image || "");
  const [previewUrl, setPreviewUrl] = useState("");
  const [crop, setCrop] = useState({ aspect: 1 });
  const [croppedImageUrl, setCroppedImageUrl] = useState("");

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreviewUrl("");
    }
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleCropComplete = (crop) => {
    if (!previewUrl) return;

    const image = new Image();
    image.src = previewUrl;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      const croppedUrl = canvas.toDataURL();
      setCroppedImageUrl(croppedUrl);
    };
  };

  const handleSave = () => {
    onSave(title, position, croppedImageUrl || previewUrl);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          {isNewNode ? "Add Picture Node" : "Edit Picture Node"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Position</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Image</label>
          <input type="file" className="w-full border p-2 rounded" onChange={handleImageChange} />
          {previewUrl && (
            <ReactCrop
              src={previewUrl}
              crop={crop}
              onChange={setCrop}
              onComplete={handleCropComplete}
              className="mt-2"
            />
          )}
          {croppedImageUrl && (
            <img
              src={croppedImageUrl}
              alt="Cropped Preview"
              className="mt-2 w-32 h-32 object-cover border border-gray-300 rounded"
            />
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded mr-2">
            Cancel
          </button>
          {!isNewNode && (
            <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PictureNodeDialog;