import React, { useEffect } from 'react'
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
import ProductDetails from './ProductDetails/productDetails'
import WishList from './wishList/WishList'
import Notification from './Notification/Notification'
import Cart from './Cart/Cart'
import { useCookies } from 'react-cookie'
import { useRecoilState } from 'recoil'
import { cartAtom } from './SharedState/cartAtom'
import Checkout from './Checkout/Checkout'
const App = () => {
  const [cookie, setCookie] = useCookies()
  const [cartNumber, setCartNumber] = useRecoilState(cartAtom)
  useEffect(() => {
    if (cookie.c_r == undefined) {
      setCookie("c_r", [], { maxAge: 7 * 24 * 60 * 60 })
    }
    else {
      setCartNumber(cookie.c_r.length)
    }
  }, [cartNumber])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Notification />}>
          <Route path="login" >
            <Route element={<Login />} index />
            <Route path="ForgetPassword" element={<ForgetPassword />} />
            <Route element={<Login />} path="*"></Route>
          </Route>

          <Route path="sign">
            <Route element={<Sign />} index />
            <Route element={<Verify />} path="emailVerify" />
            <Route element={<Sign />} path="*"></Route>
          </Route>

          <Route path="account">
            <Route path=":idAccount" element={<div>My account </div>} ></Route>
            <Route element={<ChangePassword />} path="changePassword/:operationId"></Route>
          </Route>

          <Route path='' element={<Test />}>
            <Route element={<WishList />} path="wishList" />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path='cart'>
              <Route path="" element={<Cart />} />
            </Route>
            <Route path='checkout'>
              <Route path="" element={<Checkout />} />
            </Route>
            <Route path="shop" >
              <Route index element={<Shop />} />

              <Route path=":categorie" >
                <Route index element={<Shop />} />
                <Route path=":categoireChild">
                  <Route index element={<Shop />} />
                </Route>
                <Route path="search/:name" element={<Shop />} />
              </Route>


            </Route>
          </Route>
        </Route>


        <Route element={<ErrorPage />} path="*"></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App