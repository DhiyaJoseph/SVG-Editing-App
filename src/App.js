import React from 'react'
import {BrowserRouter,Routes,Route} from  "react-router-dom"
import ChooseImage from './Pages/ChooseImage'

const App = () => {
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


