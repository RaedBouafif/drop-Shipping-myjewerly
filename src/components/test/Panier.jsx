import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { cartAtom } from '../SharedState/cartAtom'
import { useCookies } from "react-cookie"
import { NotificationAtom } from "../SharedState/NotificationAtom"
import "./panier.scss"
const Panier = () => {
    const [resize, setResize] = useState(true)
    const [showMobileNav, setShowMobileNav] = useState(false)
    const [cartNumber, setCartNumber] = useRecoilState(cartAtom)
    const [panier, setPanier] = useState([])
    const [cookie, setCookie] = useCookies()
    const [notification, setNotification] = useRecoilState(NotificationAtom)
    const handleResize = () => {
        setResize(!resize)
    }
    useEffect(() => {
        if (cookie.c_r != undefined) setPanier(cookie.c_r)
    }, [cartNumber])


    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [resize])
    const roundPrice = (price) => {
        price = price + ""
        if (price.indexOf(".") != -1) {
            price = price.slice(0, price.indexOf(".") + 3)
        }
        return price
    }
    const calculTotal = () => {
        var total = 0
        panier?.forEach(element => {
            total += Number(roundPrice(element.price)) * element.quantity
        });
        return roundPrice(total)
    }
    const removeItemFromCart = (id) => {
        setCartNumber(cartNumber - 1)
        setCookie("c_r", cookie.c_r.filter(element => element.id != id), { maxAge: 7 * 24 * 60 * 60 })
        setNotification({
            ...notification,
            visible: true,
            message: "Product is removed from Cart successfully",
            type: "success"
        })
    }
    if (window.innerWidth > 991) {
        return (
            <div className="mini_cart_wrapper">
                <Link to="/checkout"><i className="fa fa-shopping-bag"
                    aria-hidden="true"></i>{"$" + calculTotal()} <i className="fa fa-angle-down"></i></Link>
                <span className="cart_quantity">{cartNumber}</span>
                <div className="mini_cart t-overflow-y-scroll mini_cart_scroll">
                    {panier?.map((element, index) => {
                        return (<div key={index} className="cart_item">
                            <div className="cart_img">
                                <Link to={"/product/" + element.id}><img src={element.image} className="t-h-[100px] t-w-full" alt="" /></Link>
                            </div>
                            <div className="cart_info">
                                <Link to={"/product/" + element.id}>{element.name}</Link>
                                <p>Qty: {element.quantity} X <span> {"$" + roundPrice(element.price)} </span></p>
                            </div>
                            <div className="cart_remove">
                                <div className='t-cursor-pointer' onClick={() => { removeItemFromCart(element.id) }}><i className="ion-android-close"></i></div>
                            </div>
                        </div>)
                    })}
                    <div className="mini_cart_table">
                        <div className="cart_total mt-10">
                            <span>total:</span>
                            <span className="price">{"$" + calculTotal()}</span>
                        </div>
                    </div>

                    <div className="mini_cart_footer">
                        <div className="cart_button">
                            <Link to="/cart">View cart</Link>
                        </div>
                        <div className="cart_button">
                            <Link to="/Checkout">Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="middel_right_info">
                <div className="mini_cart_wrapper t-flex t-items-center t-flex-col" onClick={() => { setShowMobileNav(!showMobileNav) }}>
                    <div className='t-w-full t-ml-14 t-mb-5 t-flex t-items-center t-justify-center'>
                        <span style={{ fontSize: "12px" }} className="t-border-0 t-w-5 t-text-center t-h-5 t-p-1 t-relative t-bottom-2.5 t-left-1 t-rounded-full t-text-white t-flex t-items-center t-justify-center t-bg-blue-700/90" >{cartNumber}</span>
                        <i className="fa fa-shopping-bag" aria-hidden="true"></i>{"$" + calculTotal()}<i className="fa fa-angle-down"></i>
                    </div>
                    <div className="mini_cart mini_cart_scroll t-overflow-y-scroll t-h-auto" style={{ display: showMobileNav ? "block" : "none", position: "relative", right: 0 }}>
                        <div className="cart_item t-flex t-flex-col">
                            {panier.map((element, index) => {
                                return (<div key={index} className="cart_item">
                                    <div className="cart_img">
                                        <Link to={"/product/" + element.id}><img src={element.image} alt="" /></Link>
                                    </div>
                                    <div className="cart_info">
                                        <Link to={"/product/" + element.id}>{element.name}</Link>
                                        <p>Qty: {element.quantity} X <span> {"$" + roundPrice(element.price)} </span></p>
                                    </div>
                                    <div className="cart_remove">
                                        <div className='t-cursor-pointer' onClick={() => { removeItemFromCart(element.id) }} href="#"><i className="ion-android-close"></i></div>
                                    </div>
                                </div>)
                            })}
                            <div className="mini_cart_table">
                                <div className="cart_total mt-10">
                                    <span>total:</span>
                                    <span className="price">{"$" + calculTotal()}</span>
                                </div>
                            </div>

                            <div className="mini_cart_footer">
                                <div className="cart_button">
                                    <Link to="/cart">View cart</Link>
                                </div>
                                <div className="cart_button">
                                    <Link to="/Checkout">Checkout</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>)
    }
}

export default Panier
