import React, { useState, useEffect } from 'react'
import "./Product.scss"
import Image from "../../../customElement/Image"
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import { useRecoilState } from "recoil"
import { wishNumberState } from "../../SharedState/wishListAtom"
import { NotificationAtom } from "../../SharedState/NotificationAtom"
import { cartAtom } from '../../SharedState/cartAtom'
const Product = ({ image1, image2, title, price, sku, variations }) => {

    const navigateTo = useNavigate()
    const navigate = () => {
        navigateTo("/product/" + sku)
    }
    const [cookie, setCookie] = useCookies()
    const [addedWish, setAddedWish] = useState()
    useEffect(() => {
        if (Array.isArray(cookie.W_L) && cookie.W_L.indexOf(sku) != -1) {
            setAddedWish(true)
        }
        else {
            setAddedWish(false)
        }
        setNumber(() => {
            return Array.isArray(cookie.W_L) ? cookie.W_L.length : 0
        })
    })

    const [number, setNumber] = useRecoilState(wishNumberState)
    const addToWishList = (e) => {
        setNotification({
            ...notification,
            visible: true,
            message: "Product is Added to WishList successfully",
            type: "success"
        })
        e.preventDefault()
        if (Array.isArray(cookie.W_L)) {
            setCookie("W_L", [...cookie.W_L, sku], { maxAge: 14 * 24 * 60 * 60 })
        }
        else {
            setCookie("W_L", Array.of(sku), { maxAge: 14 * 24 * 60 * 60 })
        }
    }
    const deleteWish = () => {
        setNotification({
            ...notification,
            visible: true,
            message: "Product is removed from WishList successfully",
            type: "success"
        })
        setCookie("W_L", cookie.W_L ? cookie.W_L.filter((element) => element != sku) : [], { maxAge: 14 * 24 * 60 * 60 })
    }


    const [notification, setNotification] = useRecoilState(NotificationAtom)

    const [addToCartState, setAddToCartState] = useState()
    const [cartNumber, setCartNumber] = useRecoilState(cartAtom)
    const roundPrice = (price) => {
        price = price + ""
        if (price.indexOf(".") != -1) {
            price = price.slice(0, price.indexOf(".") + 3)
        }
        return price
    }
    useEffect(() => {
        if (cookie.c_r?.filter(element => element.id === sku).length > 0) {
            setAddToCartState(true)
        }
        else {
            setAddToCartState(false)
        }
    })

    const addItemToCart = () => {
        if (!addToCartState && variations.map((element) => { if (element.quantity != 0) return element.quantity; }).filter(element => element).length) {
            var productAttributs = {
                id: sku,
                price: variations[0].sale_price,
                image: image1,
                quantity: 1,
                name: title
            }

            if (variations[0].attributes.filter(element => element.name.en == "Size")[0]?.option.en) productAttributs.size = variations[0].attributes.filter(element => element.name.en == "Size")[0].option.en
            if (variations[0].attributes.filter(element => element.name.en == "Ring Size")[0]?.option.en) productAttributs.ringSize = variations[0].attributes.filter(element => element.name.en == "Ring Size")[0].option.en
            if (variations[0].attributes.filter(element => element.name.en == "Color")[0]?.option.en) productAttributs.color = variations[0].attributes.filter(element => element.name.en == "Color")[0].option.en
            if (variations[0].attributes.filter(element => element.name.en == "Length")[0]?.option.en) productAttributs.len = variations[0].attributes.filter(element => element.name.en == "Length")[0].option.en
            setCookie("c_r", [...cookie.c_r, productAttributs], { maxAge: 7 * 24 * 60 * 60 })
            setCartNumber(cartNumber + 1)
            setNotification({
                ...notification,
                visible: true,
                message: "product is added to cart successfully",
                type: "success"
            })
        }
        else {
            setNotification({
                ...notification,
                visible: true,
                message: "product out of stock",
                type: "error"
            })
        }
    }
    const removeItemFromCart = () => {
        if (addToCartState) {
            setNotification({
                ...notification,
                visible: true,
                message: "product is removed from cart successfully",
                type: "success"
            })
            setCartNumber(cartNumber - 1)
            setCookie("c_r", cookie.c_r.filter(element => element.id != sku), { maxAge: 7 * 24 * 60 * 60 })
        }
    }
    return (
        <div className='firstContainer t-px-2 t-pt-2 t-box-content t-pb-3 md:t-w-5/12 lg:t-w-60 t-font-body t-rounded-sm t-min-h-[370px] t-border-2 hover:t-border-stone-200 t-border-transparent t-flex t-flex-col'>

            <div className='secondContainer t-flex t-items-start t-justify-center'>
                <div className="action_links lg:t-opacity-0 t-z-20 t-justify-self-start lg:t-mr-52 t-mr-60 md:t-mr-72">
                    {(!addedWish) && (<ul onClick={addToWishList} >
                        <li className="wishlist"><a href="/" title="Add to Wishlist"><i
                            className="fa fa-heart-o" aria-hidden="true"></i></a></li>
                    </ul>) || (<div onClick={deleteWish} className='t-p-1.5 t-bg-blue-700 t-items-center t-flex t-justify-center t-rounded-full'><img src="/assets/icons/check.png" className='t-h-5 t-w-5' /></div>)}
                </div>
                <Image click={navigate} src={image1} className="img1 t-mb-0 lg:t-h-48 lg:t-w-60 t-w-72 t-h-56" />
                <Image click={navigate} src={`${image2 != undefined ? image2 : image1}`} className="img2 t-absolute t-mb-0 lg:t-h-48 lg:t-w-60 t-w-72 t-h-56" />
                {!addToCartState && <button onClick={addItemToCart} className='butt t-space-x-1 t-flex t-items-center t-justify-center lg:t-opacity-0 lg:t-mt-44 t-mt-52  t-absolute t-px-4 t-py-3 t-bg-blue-600 t-text-white t-font-bold hover:t-bg-blue-700 t-rounded-md'>
                    <p>Add To Cart</p>
                    <img src="/assets/icons/shopping-cart.png" className='t-h-5 t-w-5' />
                </button> ||
                    <button onClick={removeItemFromCart} className='butt t-text-[12px] t-space-x-1 t-flex t-items-center t-justify-center lg:t-opacity-0 lg:t-mt-44 t-mt-52  t-absolute t-px-4 t-py-3 t-bg-red-500 t-text-white t-font-bold hover:t-bg-red-500 t-rounded-md'>
                        <p>Remove From Cart</p>
                        <img src="/assets/icons/shopping-cart.png" className='t-h-5 t-w-5' />
                    </button>}
            </div>
            <Link to={"/product/" + sku} className='t-max-w-full t-overflow-hidden t-break-words'>
                <p className='t-text-blue-600 t-font-bold t-text-xl t-text-center lg:t-mt-10 t-mt-14'>{price}</p>
                <p className='t-text-md t-neutral-700 t-tracking-wider t-break-words t-overflow-x-hidden hover:t-text-blue-500 t-delay-75 t-duration-100 t-mt-5 t-text-center t-max-w-[350px]'>{title}</p>
            </Link>
        </div>
    )
}

export default Product