// import React, { useState } from "react";
// import LoginPage from "./Pages/LoginPage";

// function App() {
//     const [signIn, toggle] = useState(true);

//     return <LoginPage signIn={signIn} toggle={toggle} />;
// }

// export default App;
import React,{useState} from 'react'
import {BrowserRouter,Routes,Route} from  "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import ChooseImage from './Pages/ChooseImage'

const App = () => {
  const [signIn, toggle] = useState(true);
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChooseImage/>}></Route>
    
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


