import React, { useState } from 'react';
import { FaUndo } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { FaDownload } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

const Navbar = ({ onUndo, onRedo, onSaveImage, svgImage, onToggleInput }) => {
  const [showUndoTooltip, setShowUndoTooltip] = useState(false);
  const [showRedoTooltip, setShowRedoTooltip] = useState(false);
  const [showSaveTooltip, setShowSaveTooltip] = useState(false);
  const [showDownloadTooltip, setShowDownloadTooltip] = useState(false);
  const [showToggleTooltip, setShowToggleTooltip] = useState(false);

  const handleDownloadImage = () => {
    // Check if an image is available for download
    if (svgImage) {
      // Convert the SVG image to a data URL
      const dataUrl = `data:image/svg+xml;base64,${btoa(svgImage)}`;

      // Create an anchor element
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = 'image.svg'; // Set the filename for the downloaded image
      document.body.appendChild(downloadLink);

      // Trigger the download
      downloadLink.click();

      // Clean up
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div style={{ border: "1px solid #111", margin: "0", padding: "" ,background: "linear-gradient(to right, #ff5733, #ff8d33)"
  }}>
      <div className='nav-wrapper'>
        <h1 className=''>SVG EDITOR</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <div
            className='round-wrap'
            onClick={onUndo}
            onMouseEnter={() => setShowUndoTooltip(true)}
            onMouseLeave={() => setShowUndoTooltip(false)}
          >
            <FaUndo />
            <span className={showUndoTooltip ? 'tooltip tooltip-show' : 'tooltip'}>Undo</span>
          </div>
          <div
            className='round-wrap'
            onClick={onRedo}
            onMouseEnter={() => setShowRedoTooltip(true)}
            onMouseLeave={() => setShowRedoTooltip(false)}
          >
            <FaRedoAlt />
            <span className={showRedoTooltip ? 'tooltip tooltip-show' : 'tooltip'}>Redo</span>
          </div>
          <div
            className='round-wrap'
            onClick={onSaveImage}
            onMouseEnter={() => setShowSaveTooltip(true)}
            onMouseLeave={() => setShowSaveTooltip(false)}
          >
            <ImCheckmark />
            <span className={showSaveTooltip ? 'tooltip tooltip-show' : 'tooltip'}>Save</span>
          </div>
          <div
            className='round-wrap'
            onClick={handleDownloadImage}
            onMouseEnter={() => setShowDownloadTooltip(true)}
            onMouseLeave={() => setShowDownloadTooltip(false)}
          >
            <FaDownload />
            <span className={showDownloadTooltip ? 'tooltip tooltip-show' : 'tooltip'}>Download</span>
          </div>
          <div
            className='round-wrap'
            onClick={onToggleInput}
            onMouseEnter={() => setShowToggleTooltip(true)}
            onMouseLeave={() => setShowToggleTooltip(false)}
          >
            <ImCross />
            <span className={showToggleTooltip ? 'tooltip tooltip-show' : 'tooltip'}>Close</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
