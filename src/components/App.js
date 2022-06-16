import React from 'react'
import Loader from './Loader/Loader'
import Login from './Login/Login'
import "../index.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgetPassword from './ForgetPassword/ForgetPassword'
import Sign from './Sign/Sign'
const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" >
          <Route element={<Login />} index />
          <Route path="ForgetPassword" element={<ForgetPassword />} />
        </Route>
        <Route element={<Sign />} path="/sign" />
      </Routes>
    </BrowserRouter>
  )
}

export default App