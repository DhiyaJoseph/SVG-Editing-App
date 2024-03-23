import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function ChooseImage() {
  const [svgImage, setSvgImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.type !== 'image/svg+xml') {
      // Handle invalid file type
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSvgImage(reader.result);
    };
    reader.readAsDataURL(file);

    document.getElementById('fileInput').style.display = 'none';
  };

  const handleRotateClick = () => {
    const newRotationAngle = rotationAngle + 90;
    setRotationAngle(newRotationAngle);

    const currentState = { svgImage, scale, rotationAngle: newRotationAngle };
    setHistory([...history, currentState]);
  };

  const handleScaleClick = () => {
    const newScale = scale + 0.1;
    setScale(newScale);

    const currentState = { svgImage, scale: newScale, rotationAngle };
    setHistory([...history, currentState]);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setSvgImage(previousState.svgImage);
      setScale(previousState.scale);
      setRotationAngle(previousState.rotationAngle);
      setHistory(history.slice(0, -1));
      setRedoHistory([...redoHistory, previousState]);
    }
  };

  const handleRedo = () => {
    if (redoHistory.length > 0) {
      const nextState = redoHistory[redoHistory.length - 1];
      setSvgImage(nextState.svgImage);
      setScale(nextState.scale);
      setRotationAngle(nextState.rotationAngle);
      setRedoHistory(redoHistory.slice(0, -1));
      setHistory([...history, nextState]);
    }
  };

  const handleSaveImage = () => {
    const currentState = { svgImage, scale, rotationAngle };
    // Save currentState to database or perform any other action
    console.log('Image saved:', currentState);
  };

  const handleToggleInput = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.style.display = fileInput.style.display === 'none' ? 'block' : 'none';
    setSvgImage(null);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const offsetX = e.clientX - e.target.getBoundingClientRect().left;
    const offsetY = e.clientY - e.target.getBoundingClientRect().top;
  
    const img = document.createElement("img");
    img.src = svgImage;
    img.style.transform = `scale(${scale}) rotate(${rotationAngle}deg)`;
    img.style.position = "absolute";
    img.style.left = `${offsetX}px`;
    img.style.top = `${offsetY}px`;
    img.style.cursor = "grab";
  
    img.setAttribute("draggable", "true");
    img.addEventListener("dragstart", handleDragStart);
  
    // Double click event listener for deleting the image
    img.addEventListener("dblclick", handleDelete);
  
    e.target.appendChild(img);
  };
  
  const handleDelete = (e) => {
    e.target.parentNode.removeChild(e.target);
  };
  

  return (
    <div>
      <Navbar onUndo={handleUndo} onRedo={handleRedo} onSaveImage={handleSaveImage} svgImage={svgImage} onToggleInput={handleToggleInput} />
      <div style={{ display: "flex" }}>
        <div>
          <Sidebar onRotate={handleRotateClick} onScale={handleScaleClick} />
        </div>
        <div className='preview-wrap' onDragOver={handleDragOver} onDrop={handleDrop}>
          <div className="file-input-container">
            <input type="file" id="fileInput" accept=".svg" onChange={handleFileSelect} />
            <label htmlFor="fileInput" className="file-input-label">+</label>
          </div>
          <div>
            {svgImage && <img src={svgImage} alt="Uploaded SVG" style={{ transform: `scale(${scale}) rotate(${rotationAngle}deg)`, cursor: "grab" }} />}
          </div>
        </div>
      </div>
    </div>
  );
}
