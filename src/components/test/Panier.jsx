import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromPanier } from '../../reducer/removeFromPanier'
const Panier = () => {
    const [resize, setResize] = useState(true)
    const [showMobileNav, setShowMobileNav] = useState(false)
    const dispacher = useDispatch()
    const [increment, setIncrement] = useState(0)
    const panier = useSelector(element => element.panier.products)
    const removeCart = (id) => {
        dispacher(removeFromPanier(id));
        setIncrement(increment + 1)
    }
    const handleResize = () => {
        setResize(!resize)
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [resize])

    if (window.innerWidth > 991) {
        return (
            <div className="mini_cart_wrapper">
                <a href="#"><i className="fa fa-shopping-bag"
                    aria-hidden="true"></i>$147.00 <i className="fa fa-angle-down"></i></a>
                <span className="cart_quantity">2</span>
                <div className="mini_cart">
                    {panier.map((element, index) => {
                        return (<div key={index} className="cart_item">
                            <div className="cart_img">
                                <Link to="#"><img src={element.image} alt="" /></Link>
                            </div>
                            <div className="cart_info">
                                <Link to={"/product/" + element.id}>{element.title}</Link>
                                <p>Qty: {element.qte} X <span> {"$" + element.price} </span></p>
                            </div>
                            <div className="cart_remove">
                                <div className='t-cursor-pointer' onClick={() => { removeCart(element.id) }} href="#"><i className="ion-android-close"></i></div>
                            </div>
                        </div>)
                    })}
                    <div className="mini_cart_table">
                        <div className="cart_total">
                            <span>Sub total:</span>
                            <span className="price">$138.00</span>
                        </div>
                        <div className="cart_total mt-10">
                            <span>total:</span>
                            <span className="price">$138.00</span>
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
                    <div className='t-w-full t-relative t-top-1 t-flex t-items-center t-justify-center'>
                        <span className="t-border-0 t-w-4 t-h-4 t-p-1 t-relative t-bottom-1.5 t-left-1 t-rounded-full t-text-white t-flex t-items-center t-justify-center t-bg-blue-700" >2</span>
                        <i className="fa fa-shopping-bag" aria-hidden="true"></i>$147.00 <i className="fa fa-angle-down"></i>
                    </div>
                    <div className="mini_cart" style={{ display: showMobileNav ? "block" : "none", position: "relative", right: 0 }}>
                        <div className="cart_item t-flex t-flex-col">
                            {panier.map((element, index) => {
                                return (<div key={index} className="cart_item">
                                    <div className="cart_img">
                                        <Link to="#"><img src={element.image} alt="" /></Link>
                                    </div>
                                    <div className="cart_info">
                                        <Link to={"/product/" + element.id}>{element.title}</Link>
                                        <p>Qty: {element.qte} X <span> {"$" + element.price} </span></p>
                                    </div>
                                    <div className="cart_remove">
                                        <div className='t-cursor-pointer' onClick={() => { removeCart(element.id) }} href="#"><i className="ion-android-close"></i></div>
                                    </div>
                                </div>)
                            })}
                            <div className="mini_cart_table">
                                <div className="cart_total">
                                    <span>Sub total:</span>
                                    <span className="price">$138.00</span>
                                </div>
                                <div className="cart_total mt-10">
                                    <span>total:</span>
                                    <span className="price">$138.00</span>
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
