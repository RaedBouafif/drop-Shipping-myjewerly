import React, { useState, useEffect, useRef } from 'react'
import NavBonde from '../navBonde/NavBonde'
import "./Checkout.scss"
import { UseLogged } from "../../hooks/UseLogged"
import { useCookies } from 'react-cookie'
import { useRecoilState } from "recoil"
import { cartAtom } from "../SharedState/cartAtom"
import Options from '../Sign/Options'
import Paypal from './Paypal'
import { UseTrueEmail, UseTrueString } from "../../hooks/strings"
const Checkout = () => {
    UseLogged("/login")
    const [cookie, setCookie] = useCookies()
    const [products, setProducts] = useState([])
    const [productNumber, setProductNumber] = useRecoilState(cartAtom)
    const [canPurchase, setCanPurchase] = useState(false)
    const [orderData, setOrderData] = useState()


    useEffect(() => {
        if (cookie.c_r != undefined) setProducts(cookie.c_r)
    })

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
            total += roundPrice(element.price) * element.quantity
        });
        return roundPrice(total)
    }


    const firstName = useRef()
    const lastName = useRef()
    const address1 = useRef()
    const address2 = useRef()
    const city = useRef()
    const state = useRef()
    const country = useRef()
    const email = useRef()
    const tel = useRef()
    const orderNote = useRef()

    const checkNormalInputs = (input) => {
        var submit = true
        const msg = input.current.parentNode.childNodes[2]
        if (input.current.value.length < 1) {
            input.current.style.borderColor = "red"
            msg.style.display = "flex"
            submit = false
        }
        else {
            input.current.style.borderColor = ""
            msg.style.display = "none"
            submit = true
        }
        return submit
    }

    const makeDefault = (input) => {
        const msg = input.parentNode.childNodes[2]
        input.style.borderColor = ""
        msg.style.display = "none"
    }

    const checkInformation = () => {
        var submit = true
        if (!checkNormalInputs(firstName)) submit = false
        if (!checkNormalInputs(lastName)) submit = false
        if (!checkNormalInputs(address1)) submit = false
        if (!checkNormalInputs(city)) submit = false
        if (!checkNormalInputs(state)) submit = false
        const msg = email.current.parentNode.childNodes[2]
        if (!UseTrueEmail(email.current.value)) {
            submit = false
            email.current.style.borderColor = "red"
            msg.style.display = "flex"
        }
        else {
            email.current.style.borderColor = ""
            msg.style.display = "none"
        }


        if (tel.current.value.length < 4 || tel.current.value.length > 12 || isNaN(tel.current.value)) {
            submit = false
            const msgtel = tel.current.parentNode.childNodes[2]
            tel.current.style.borderColor = "red"
            msgtel.style.display = "flex"
        }
        else {
            const msgtel = tel.current.parentNode.childNodes[2]
            tel.current.style.borderColor = ""
            msgtel.style.display = "none"
        }
        return submit
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        if (checkInformation()) {
            setCanPurchase(true)
            var data = new FormData()
            data.append("clid", cookie.clid)
            data.append("first_name", UseTrueString(firstName.current.value))
            data.append("last_name", UseTrueString(lastName.current.value))
            data.append("phone", UseTrueString(tel.current.value))
            data.append("email", UseTrueString(email.current.value))
            data.append("city", UseTrueString(city.current.value))
            data.append("country", country.current.value)
            data.append("state", UseTrueString(state.current.value))
            data.append("total", calculTotal())
            data.append("order_note", orderNote.current.value)
            data.append("address_1", UseTrueString(address1.current.value))
            data.append("address_2", UseTrueString(address2.current.value))
            data.append("products", cookie.c_r)
            setOrderData(data)
        }
    }
    return (
        <>
            <NavBonde paths={["Checkout"]}></NavBonde>
            {products.length != 0 && <div className="Checkout_section t-mt-16 t-pb-20">
                <div className="container">
                    <div className="checkout_form">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <form action="#" className={`${canPurchase ? "t-opacity-30" : "t-opacity-100"}`}>
                                    <h3>Billing Details</h3>
                                    <div className="row">

                                        <div className="col-lg-6 mb-20 t-mt-5">
                                            <label>First Name <span>*</span></label>
                                            <input ref={firstName} onInput={(e) => { makeDefault(e.target) }} type="text" />
                                            <p style={{ display: "none" }} className='t-text-red-500 t-text-[14px]'>first name is Required</p>
                                        </div>
                                        <div className="col-lg-6 mb-20 lg:t-mt-5">
                                            <label>Last Name <span>*</span></label>
                                            <input ref={lastName} onInput={(e) => { makeDefault(e.target) }} type="text" />
                                            <p style={{ display: "none" }} className='t-text-red-500 t-text-[14px]'>Last name is Required </p>
                                        </div>
                                        <div className="col-12 mb-20">
                                            <label>address line 1 <span>*</span></label>
                                            <input ref={address1} onInput={(e) => { makeDefault(e.target) }} type="text" />
                                            <p style={{ display: "none" }} className='t-text-red-500 t-text-[14px]'>Address is Required</p>
                                        </div>
                                        <div className="col-12 mb-20">
                                            <label>address line 2</label>
                                            <input ref={address2} type="text" />
                                        </div>
                                        <div className="col-12 mb-20">
                                            <label>City<span>*</span></label>
                                            <input ref={city} onInput={(e) => { makeDefault(e.target) }} type="text" />
                                            <p style={{ display: "none" }} className='t-text-red-500 t-text-[14px]'>City is Required</p>
                                        </div>
                                        <div className="col-12 mb-20">
                                            <label>State<span>*</span></label>
                                            <input ref={state} onInput={(e) => { makeDefault(e.target) }} type="text" />
                                            <p style={{ display: "none" }} className='t-text-red-500 t-text-[14px]'>State is Required</p>
                                        </div>
                                        <div className="mb-20 t-flex t-items-center t-space-x-4 lg:t-space-x-20">
                                            <label htmlFor="country">country<span>*</span></label>
                                            <select ref={country} className="t-border-2 t-w-52 lg:t-w-60 t-border-neutral-700 t-rounded-sm t-px-1 t-py-2 " name="cuntry" id="country">
                                                <Options />
                                            </select>
                                        </div>
                                        <div className="col-lg-6 mb-20">
                                            <label> Email Address <span>*</span></label>
                                            <input ref={email} onInput={(e) => { makeDefault(e.target) }} type="text" />
                                            <p style={{ display: "none" }} className='t-text-red-500 t-text-[14px]'>Invalid Email</p>
                                        </div>
                                        <div className="col-lg-6 mb-20">
                                            <label>Phone<span>*</span></label>
                                            <input ref={tel} onInput={(e) => { makeDefault(e.target) }} type="text" />
                                            <p style={{ display: "none" }} className='t-text-red-500 t-text-[14px]'>Invalid Phone</p>
                                        </div>
                                        <div className="col-12">
                                            <div className='t-w-full'>
                                                <label htmlFor="order_note">Order Notes</label>
                                                <textarea ref={orderNote} id="order_note" className='order_note_area t-h-32 t-w-full t-border-[1px] t-pt-3 t-px-3 t-resize-none'
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
                                                        <td> {"$" + (roundPrice(element.price) * element.quantity)}</td>
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
                                        {!canPurchase && <button onClick={handleSubmit} type="button" className="t-bg-blue-600 t-py-3 t-text-lg t-w-full t-rounded-sm t-mb-20 t-text-white">Check informations</button>}
                                        {canPurchase && (<Paypal total={calculTotal()} orderData={orderData} />)}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div > || <div className='t-text-2xl t-text-neutral-800 t-text-center t-tracking-widest t-mt-20'>No products are found </div>}
        </>
    )
}

export default Checkout