import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromPanier } from '../../reducer/removeFromPanier'
const Panier = () => {
    const dispacher = useDispatch()
    const [increment, setIncrement] = useState(0)
    const panier = useSelector(element => element.panier.products)
    const removeCart = (id) => {
        dispacher(removeFromPanier(id));
        setIncrement(increment + 1)
        console.log(panier)
    }
    return (
        <div class="mini_cart_wrapper">
            <a href="javascript:void(0)"><i class="fa fa-shopping-bag"
                aria-hidden="true"></i>$147.00 <i class="fa fa-angle-down"></i></a>
            <span class="cart_quantity">2</span>
            <div class="mini_cart">
                {panier.map((element, index) => {
                    return (<div class="cart_item">
                        <div key={index} class="cart_img">
                            <Link to="#"><img src={element.image} alt="" /></Link>
                        </div>
                        <div class="cart_info">
                            <Link to={"/product/" + element.id}>{element.title}</Link>
                            <p>Qty: {element.qte} X <span> {"$" + element.price} </span></p>
                        </div>
                        <div class="cart_remove">
                            <div className='t-cursor-pointer' onClick={() => { removeCart(element.id) }} href="#"><i class="ion-android-close"></i></div>
                        </div>
                    </div>)
                })}
                <div class="mini_cart_table">
                    <div class="cart_total">
                        <span>Sub total:</span>
                        <span class="price">$138.00</span>
                    </div>
                    <div class="cart_total mt-10">
                        <span>total:</span>
                        <span class="price">$138.00</span>
                    </div>
                </div>

                <div class="mini_cart_footer">
                    <div class="cart_button">
                        <Link to="/cart">View cart</Link>
                    </div>
                    <div class="cart_button">
                        <Link to="/Checkout">Checkout</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Panier