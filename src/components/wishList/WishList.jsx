import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { useCookies } from 'react-cookie'
import { context } from '../../index'
import { useRecoilState } from "recoil"
import { wishNumberState } from "../SharedState/wishListAtom"
import { NotificationAtom } from '../SharedState/NotificationAtom'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
const WishList = () => {
    const [cookie, setCookie] = useCookies()
    const [products, setProducts] = useState([])
    const { url } = useContext(context)
    const [isLoading, setIsLoading] = useState(true)
    const [notification, setNotification] = useRecoilState(NotificationAtom)
    const [number, setNumber] = useRecoilState(wishNumberState)
    useEffect(() => {
        if (Array.isArray(cookie.W_L)) {
            const datas = cookie.W_L.map((element) => axios.get(url + "/Knawat/getProductBySku.php?sku=" + encodeURIComponent(element)))
            axios.all(datas).then((res) => {
                setIsLoading(false)
                setProducts(() => res.map((res) => res.data))
                setNumber(res.map((res) => res.data).length)
            }).catch((err) => {
                setNotification({
                    ...notification, message: "please check you network", type: "error", visible: true
                })
            })
        }
        else if (cookie.W_L) {
            axios.get(url + "/Knawat/getProductBySku.php?sku=" + cookie.W_L).then((res) => {
                setIsLoading(false)
                if (res.data.sku) {
                    setProducts(() => [...products, res.data])
                    setNumber(1)
                }
            }).catch((err) => {
                setNotification({
                    ...notification, message: "please check you network", type: "error", visible: true
                })
            })
        }
    }, [])

    const roundPrice = (price) => {
        price = price + ""
        if (price.indexOf(".") != -1) {
            price = price.slice(0, price.indexOf(".") + 3)
        }
        return price
    }
    const deleteWish = (e, sku) => {
        setNumber(number - 1)
        setProducts(() => products.filter((element) => element.sku != sku))
        setCookie("W_L", cookie.W_L ? cookie.W_L.filter((element) => element != sku) : [], { maxAge: 14 * 24 * 60 * 60 })
        setNotification({
            ...notification,
            visible: true,
            message: "Product remove from WishList successfully",
            type: "success"
        })
    }
    if (products.length) return (
        <div className="wishlist_area mt-60">
            <div className="container">
                <form action="#">
                    <div className="row">
                        <div className="col-12">
                            <div className="table_desc wishlist">
                                <div className="cart_page table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="product_thumb">Image</th>
                                                <th className="product_name">Product</th>
                                                <th className="product-price">Price</th>
                                                <th className="product_quantity">Stock Status</th>
                                                <th className="product_total">Operation</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {products.map((element) => {
                                                return (
                                                    <tr>
                                                        <td className="product_thumb"><img
                                                            src={element.images[0]} className="t-h-32 t-w-full" alt="" /></td>
                                                        <td className="product_name"><Link to={'/product/' + element.sku}>{element.name.en}</Link></td>
                                                        <td className="product-price">{"$" + roundPrice(element.variations[0].sale_price_scy)}</td>
                                                        <td className="product_quantity">{element.variations.map((element) => { if (element.quantity) return element.quantity }) ? "in stock" : "sold out"}</td>
                                                        <td className="product_total">

                                                            <div onClick={(e) => { deleteWish(e, element.sku) }} className='t-px-2 t-text-white t-w-8/12 t-mx-auto t-bg-red-600 t-rounded-sm t-py-1.5 t-cursor-pointer hover:t-bg-red-700'>Remove</div>
                                                        </td>
                                                    </tr>)
                                            })}

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>

                </form>

            </div >
        </div >
    )
    else if (isLoading) return (<Loader className="t-mx-auto t-mt-32" height="80px" size="50px" border="5px" color="#60a5fa" />)
    else return <div className='t-text-2xl t-w-full t-text-center t-mt-40'>No products</div>
}

export default WishList