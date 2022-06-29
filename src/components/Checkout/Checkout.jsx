import React, { useState, useEffect } from 'react'
import NavBonde from '../NavBonde/NavBonde'
import "./Checkout.scss"
import { UseLogged } from "../../hooks/UseLogged"
import { useCookies } from 'react-cookie'
import { useRecoilState } from "recoil"
import { cartAtom } from "../SharedState/cartAtom"
import Options from '../Sign/Options'
import Paypal from './Paypal'
const Checkout = () => {
    UseLogged("/login")
    const [cookie, setCookie] = useCookies()
    const [products, setProducts] = useState([])
    const [productNumber, setProductNumber] = useRecoilState(cartAtom)
    useEffect(() => {
        if (cookie.c_r != undefined) setProducts(cookie.c_r)
    }, [productNumber])

    const calculTotal = () => {
        var total = 0
        products?.forEach(element => {
            total += Number(element.price) * element.quantity
        });
        return total
    }

    return (
        <>
            <NavBonde paths={["Checkout"]}></NavBonde>
            <div className="Checkout_section t-mt-16 t-pb-20">
                <div className="container">
                    <div className="checkout_form">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <form action="#">
                                    <h3>Billing Details</h3>
                                    <div className="row">

                                        <div className="col-lg-6 mb-20 t-mt-5">
                                            <label>First Name <span>*</span></label>
                                            <input type="text" />
                                        </div>
                                        <div className="col-lg-6 mb-20 lg:t-mt-5">
                                            <label>Last Name <span>*</span></label>
                                            <input type="text" />
                                        </div>
                                        <div className="col-12 mb-20">
                                            <label>address line 1 <span>*</span></label>
                                            <input type="text" />
                                        </div>
                                        <div className="col-12 mb-20">
                                            <label>address line 2</label>
                                            <input type="text" />
                                        </div>
                                        <div className="col-12 mb-20">
                                            <label>City<span>*</span></label>
                                            <input type="text" />
                                        </div>
                                        <div className="col-12 mb-20">
                                            <label>State<span>*</span></label>
                                            <input type="text" />
                                        </div>
                                        <div className="mb-20 t-flex t-items-center t-space-x-4 lg:t-space-x-20">
                                            <label htmlFor="country">country <span>*</span></label>
                                            <select className="t-border-2 t-w-52 lg:t-w-60 t-border-neutral-700 t-rounded-sm t-px-1 t-py-2 " name="cuntry" id="country">
                                                <Options />
                                            </select>
                                        </div>
                                        <div className="col-lg-6 mb-20">
                                            <label> Email Address <span>*</span></label>
                                            <input type="text" />
                                        </div>
                                        <div className="col-lg-6 mb-20">
                                            <label>Phone<span>*</span></label>
                                            <input type="text" />
                                        </div>
                                        <div className="col-12">
                                            <div className='t-w-full'>
                                                <label htmlFor="order_note">Order Notes</label>
                                                <textarea id="order_note" className='order_note_area t-h-32 t-w-full t-border-[1px] t-pt-3 t-px-3 t-resize-none'
                                                    placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <form action="#">
                                    <h3>Your order</h3>
                                    <div className="order_table table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((element, index) => {
                                                    return (<tr key={index}>
                                                        <td> {element.name} <strong> × {element.quantity}</strong></td>
                                                        <td> {"$" + (element.price * element.quantity)}</td>
                                                    </tr>)
                                                })}
                                            </tbody>
                                            <tfoot>
                                                <tr className="order_total">
                                                    <th>Order Total</th>
                                                    <td><strong>{"$" + calculTotal()}</strong></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div className="payment_method">

                                        <div className="order_button">
                                            <Paypal total={calculTotal()}></Paypal>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Checkout