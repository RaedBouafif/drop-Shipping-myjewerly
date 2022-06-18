import React from 'react'
import "../index.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgetPassword from './ForgetPassword/ForgetPassword'
import Loader from './Loader/Loader'
import Login from './Login/Login'
import Sign from './Sign/Sign'
import Verify from './VerifyEmail/Verify'
import ChangePassword from './changePassword/ChangePassword'
import ErrorPage from './ErrorPage/ErrorPage'
import Test from './test/Test'
import Shop from "./Shop/Shop"
const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" >
          <Route element={<Login />} index />
          <Route path="ForgetPassword" element={<ForgetPassword />} />
          <Route element={<Login />} path="*"></Route>
        </Route>
        <Route path="/sign">
          <Route element={<Sign />} index />
          <Route element={<Verify />} path="emailVerify" />
          <Route element={<Sign />} path="*"></Route>
        </Route>
        <Route path="/account">
          <Route element={<ChangePassword />} path="changePassword/:operationId"></Route>
        </Route>
        <Route element={<ErrorPage />} path="*"></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/shop" >
          <Route index element={<Shop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App