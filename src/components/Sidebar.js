import React, { useState } from 'react';
import { MdOutlineRotate90DegreesCw } from "react-icons/md";
import { IoMdResize } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa";

const Sidebar = ({ onRotate, onScale}) => {
  const [showRotateTooltip, setShowRotateTooltip] = useState(false);
  const [showScaleTooltip, setShowScaleTooltip] = useState(false);
  const [showTranslateTooltip, setShowTranslateTooltip] = useState(false);

  return (
    <div className='sidebar'>
      <div style={{ display: 'flex', flexDirection: "column", padding: "50px", height: "100vh", border: "1px solid #111", gap: "20px", }}>
        <div
          className='round-wrap'
          onClick={onRotate}
          onMouseEnter={() => setShowRotateTooltip(true)}
          onMouseLeave={() => setShowRotateTooltip(false)}
        >
          <MdOutlineRotate90DegreesCw />
          <span className={showRotateTooltip ? 'tooltip tooltip-show' : 'tooltip'}>Rotate</span>
        </div>
        <div
          className='round-wrap'
          onClick={onScale}
          onMouseEnter={() => setShowScaleTooltip(true)}
          onMouseLeave={() => setShowScaleTooltip(false)}
        >
          <IoMdResize />
          <span className={showScaleTooltip ? 'tooltip tooltip-show' : 'tooltip'}>Scale</span>
        </div>
        <div
          className='round-wrap'
          onMouseEnter={() => setShowTranslateTooltip(true)}
          onMouseLeave={() => setShowTranslateTooltip(false)}
        >
          <FaLocationArrow />
          <span className={showTranslateTooltip ? 'tooltip tooltip-show' : 'tooltip'}>Translate</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
