import React from 'react';
import { MdOutlineRotate90DegreesCw } from "react-icons/md";
import { IoMdResize } from "react-icons/io";

const Sidebar = ({ onRotate, onScale }) => {
  return (
    <div>
      <div style={{display:'flex',flexDirection:"column", padding:"50px",height:"100vh" ,border:"1px solid #111", gap:"20px",}}>
      <div className='round-wrap' onClick={onRotate}> <MdOutlineRotate90DegreesCw /></div>
        <div className='round-wrap' onClick={onScale}><IoMdResize />  </div>
    
        
      </div>
    </div>
  )
}

export default Sidebar
