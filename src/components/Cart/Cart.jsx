import React, { useState, useEffect } from 'react'
import { useCookies } from "react-cookie"
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { cartAtom } from "../SharedState/cartAtom"


const GenerateDesc = ({ element }) => {


    return (
        <td>
            {element.color && <div><span className='t-font-semibold'>Color</span> : {element.color}</div>}
            {element.size && <div><span className='t-font-semibold'>Size</span> : {element.size}</div>}
            {element.ringSize && <div><span className='t-font-semibold'>Ring Size</span> : {element.ringSize}</div>}
            {element.len && < div > <span className='t-font-semibold'>Length</span> : {element.len}</div>}
        </td >
    )
}


const Cart = () => {
    const [cookie, setCookie] = useCookies()
    const [products, setProducts] = useState([])
    const [cartNumber, setCartNumber] = useRecoilState(cartAtom)
    useEffect(() => {
        if (cookie.c_r != undefined) {
            setProducts(cookie.c_r)
        }
    }, [cartNumber])
    const removeItemFromCart = (id) => {
        setCartNumber(cartNumber - 1)
        setCookie("c_r", cookie.c_r.filter(element => element.id != id), { maxAge: 7 * 24 * 60 * 60 })
    }
    const roundPrice = (price) => {
        price = price + ""
        if (price.indexOf(".") != -1) {
            price = price.slice(0, price.indexOf(".") + 3)
        }
        return price
    }
    const calculTotal = () => {
        var total = 0
        products?.forEach(element => {
            total += Number(element.price) * element.quantity
        });
        return roundPrice(total)
    }
    return (
        <div className="shopping_cart_area mt-60">
            <div className="container">
                <form action="#">
                    {(products.length != 0) && <div className="row">
                        <div className="col-12">
                            <div className="table_desc">
                                <div className="cart_page table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="product_remove">Delete</th>
                                                <th className="product_thumb">Image</th>
                                                <th className="product_name">Product</th>
                                                <th className="product-price">Options</th>
                                                <th className="product_total">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((element, index) => {
                                                return (<tr key={index}>
                                                    <td className="product_remove"><a href="" onClick={(e) => { e.preventDefault(); removeItemFromCart(element.id) }}><i className="fa fa-trash-o"></i></a>
                                                    </td>
                                                    <td className="product_thumb"><img
                                                        src={element.image} className="t-h-32 t-w-10/12 t-mx-auto" alt="" /></td>
                                                    <td className="product_name"><Link to={"/product/" + element.id}>{element.name}</Link></td>
                                                    <GenerateDesc element={element} />
                                                    <td className="product_total">{"$" + roundPrice(element.price * element.quantity)}</td>
                                                </tr>)
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> ||
                        (<div className='t-text-center t-text-2xl t-text-neutral-800 t-tracking-widest t-my-40'>Cart is Empty</div>)}
                    {(products.length != 0) && (<div className="coupon_area">
                        <div className="row">
                            <div className="offset-md-3 col-lg-6 col-md-6">
                                <div className="coupon_code right">
                                    <h3>Cart Totals</h3>
                                    <div className="coupon_inner">
                                        <div className="cart_subtotal">
                                            <p>Subtotal</p>
                                            <p className="cart_amount">{"$" + calculTotal()}</p>
                                        </div>
                                        <div className="cart_subtotal ">
                                            <p>Shipping</p>
                                            <p className="cart_amount"><span>Flat Rate:</span> {"$" + calculTotal()}</p>
                                        </div>

                                        <div className="cart_subtotal">
                                            <p>Total</p>
                                            <p className="cart_amount">{"$" + calculTotal()}</p>
                                        </div>
                                        <div className="checkout_btn">
                                            <a href="#">Proceed to Checkout</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </form>
            </div>
        </div>
    )
}

export default Cart     