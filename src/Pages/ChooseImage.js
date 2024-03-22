import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function ChooseImage() {
  const [svgImage, setSvgImage] = useState(null);
  const [message, setMessage] = useState('');
  const [scale, setScale] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.type !== 'image/svg+xml') {
      setMessage('Please choose an SVG image.');
      setSvgImage(null);
      return;
    }

    // Read the selected file as data URL and set it as src for the image
    const reader = new FileReader();
    reader.onload = () => {
      setSvgImage(reader.result);
      setMessage('File uploaded successfully!');
    };
    reader.readAsDataURL(file);

    // Hide the file input after uploading image
    document.getElementById('fileInput').style.display = 'none';
  };

  const handleRotateClick = () => {
    // Increase rotation angle by 90 degrees on each click
    const newRotationAngle = rotationAngle + 90;
    setRotationAngle(newRotationAngle);

    // Save current state to history
    const currentState = { svgImage, scale, rotationAngle: newRotationAngle };
    setHistory([...history, currentState]);
  };

  const handleScaleClick = () => {
    // Increase scale factor by 0.1 on each click
    const newScale = scale + 0.1;
    setScale(newScale);

    // Save current state to history
    const currentState = { svgImage, scale: newScale, rotationAngle };
    setHistory([...history, currentState]);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setSvgImage(previousState.svgImage);
      setScale(previousState.scale);
      setRotationAngle(previousState.rotationAngle);
      setHistory(history.slice(0, -1)); // Remove the last item from history
      setRedoHistory([...redoHistory, previousState]); // Add the reverted state to redo history
    }
  };

  const handleRedo = () => {
    if (redoHistory.length > 0) {
      const nextState = redoHistory[redoHistory.length - 1];
      setSvgImage(nextState.svgImage);
      setScale(nextState.scale);
      setRotationAngle(nextState.rotationAngle);
      setRedoHistory(redoHistory.slice(0, -1)); // Remove the last item from redo history
      setHistory([...history, nextState]); // Add the reapplied state to history
    }
  };
  const handleSaveImage = () => {
    // Save current state of the image
    const currentState = { svgImage, scale, rotationAngle };
    // You can then save currentState to your database or perform any other action needed
    console.log('Image saved:', currentState);
  };
  const handleToggleInput = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.style.display === 'none') {
      fileInput.style.display = 'block';
      setSvgImage(null); // Hide the displayed image
    } else {
      fileInput.style.display = 'none';
    }
  };
  

  return (
    <div>
<Navbar onUndo={handleUndo} onRedo={handleRedo} onSaveImage={handleSaveImage} svgImage={svgImage} onToggleInput={handleToggleInput} />

      <div style={{ display: "flex" }}>
        <div>
          <Sidebar onRotate={handleRotateClick} onScale={handleScaleClick} />
        </div>
        <div className='preview-wrap'>
          <input type="file" id="fileInput" accept=".svg" onChange={handleFileSelect} />

          <div>
            {svgImage && <img src={svgImage} alt="Uploaded SVG" style={{ transform: `scale(${scale}) rotate(${rotationAngle}deg)` }} />}
          </div>
        </div>
      </div>
    </div>
  );
}
