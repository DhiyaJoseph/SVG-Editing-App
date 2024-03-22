import React from 'react';
import { FaUndo } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";

import { ImCheckmark } from "react-icons/im";
import { FaDownload } from "react-icons/fa6";
import { ImCross } from "react-icons/im";



const Navbar = ({ onUndo, onRedo, onSaveImage, svgImage ,onToggleInput}) => {
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
    <div style={{ border: "1px solid #111", margin: "0", padding: "" }}>
      <div className='nav-wrapper'>
        <h1 className=''>SVG EDITOR</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <div className='round-wrap' onClick={onUndo}><FaUndo /></div>
          <div className='round-wrap' onClick={onRedo}><FaRedoAlt /></div>

          <div className='round-wrap' onClick={onSaveImage}><ImCheckmark /></div>
          <div className='round-wrap' onClick={handleDownloadImage}><FaDownload /></div>
          <div className='round-wrap' onClick={onToggleInput}><ImCross /></div>

        </div>
      </div>
    </div>
  )
}

export default Navbar
