import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { useCookies } from 'react-cookie'
import { context } from '../../index'
const WishList = () => {
    const [cookie, setCookie] = useCookies()
    const [products, setProducts] = useState([])
    const { url } = useContext(context)


    useEffect(() => {
        console.log(cookie.W_L);
        if (Array.isArray(cookie.W_L)) {
            cookie.W_L.forEach(element => {
                axios.get(url + "/Knawat/getProductBySku.php?sku=" + element).then((res) => {
                    console.log(res.data)
                    if (res.data.sku) {
                        setProducts(() => [...products, res.data])
                    }
                }).catch((err) => {
                    console.log(err)
                })
            });
        }
        else if (cookie.W_L) {
            axios.get(url + "/Knawat/getProductBySku.php?sku=" + cookie.W_L).then((res) => {
                if (Array.isArray(res.data)) {
                    setProducts(() => [...products, res.data])
                }
            }).catch((err) => {
                console.log(err)
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
                                                return (<tr>
                                                    <td className="product_thumb"><img
                                                        src={element.images[0]} alt="" /></td>
                                                    <td className="product_name"><a href='/' onClick={(e) => { e.preventDefault() }}>Handbags justo</a></td>
                                                    <td className="product-price">{"$" + roundPrice(element.variations[0].sale_price_scy)}</td>
                                                    <td className="product_quantity">In Stock</td>
                                                    <td className="product_total">
                                                        <div className='t-px-2 t-text-white t-mb-2 t-w-8/12 t-mx-auto  t-bg-blue-600 t-rounded-sm t-py-1.5 t-cursor-pointer hover:t-bg-blue-700 t-text-[12px] lg:t-text-sm'>Add To Cart</div>
                                                        <div className='t-px-2 t-text-white t-w-8/12 t-mx-auto t-bg-red-600 t-rounded-sm t-py-1.5 t-cursor-pointer hover:t-bg-red-700'>Remove</div>
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
    else return <div className='t-text-2xl t-w-full t-text-center t-mt-40'>No products</div>
}

export default WishList