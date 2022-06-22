import React, { useContext, useEffect } from 'react'
import Product from './Product/Product'
import NavBonde from "../navBonde/NavBonde"
import { context } from "../../index"
import axios from 'axios'
const Shop = () => {
    const handleShowChilds = (e) => {
        const thchild = e.target.parentNode.childNodes[2]
        if (!e.target.classList.contains("t-rotate-90")) {
            e.target.classList.add("t-rotate-90")
        } else {
            e.target.classList.remove("t-rotate-90")
        }
        if (thchild.style.display == "flex") {
            thchild.style.display = "none"
        }
        else {
            thchild.style.display = "flex"
        }
    }
    const { url } = useContext(context)
    useEffect(() => {
        axios.get(url + "/myjewery/backend/Knawat/getCategories.php").then((res) => {
            console.log(res.data)
        })
    })


    return (
        <>
            <NavBonde paths={["Shop"]}></NavBonde>
            <div className='t-flex t-items-start'>
                <aside class="sidebar_widget t-static lg:t-flex t-hidden t-ml-14 t-mt-14">
                    <div class="widget_inner">
                        <div class="widget_list widget_categories t-w-72">
                            <h2>Product categories</h2>
                            <ul>
                                <div className='t-flex t-w-full t-border-b py-2 t-flex-wrap t-items-center'>
                                    <div className='t-cursor-pointer hover:t-text-blue-500 hover:t-scale-105 hover:t-text-blue' >Video Games</div>
                                    <p onClick={handleShowChilds} className='t-cursor-pointer t-duration-150 t-select-none t-ml-auto t-text-xl'>{">"}</p>
                                    <div className='t-hidden t-flex-col t-ml-2 t-mt-1 t-space-y-2 t-flex-none t-w-full'>
                                        <div className='t-flex hover:t-text-blue-500 t-cursor-pointer t-w-full t-items-center'>
                                            <div className='hover:t-scale-105'>Video Games</div>
                                        </div>
                                        <div className='t-flex hover:t-text-blue-500 t-cursor-pointer t-w-full t-items-center'>
                                            <div className='hover:t-scale-105'>Video Games</div>
                                        </div>
                                        <div className='t-flex hover:t-text-blue-500 t-cursor-pointer t-w-full t-items-center'>
                                            <div className='hover:t-scale-105'>Video Games</div>
                                        </div>
                                    </div>
                                </div>

                            </ul>
                        </div>
                    </div >
                </aside >
                <div className='t-z-0 t-relative t-top-14 t-mx-auto t-w-11/12 lg:t-w-7/12'>
                    <div style={{ zIndex: 0 }} class="shop_toolbar_wrapper">
                        <div class="shop_toolbar_btn">


                        </div>
                        <div class=" niceselect_option">
                            <form class="t-border t-p-2 t-rounded-md" action="#">
                                <select name="orderby" id="short">
                                    <option value="4">Sort by price: low to high</option>
                                    <option value="5">Sort by price: high to low</option>
                                    <option value="6">Product Name: A-Z</option>
                                </select>
                            </form>
                        </div>
                        <div class="page_amount">
                            <p>Showing 1–9 of 21 results</p>
                        </div>
                    </div>


                    <div className='t-flex t-justify-around t-flex-wrap t-space-y-14 lg:t-space-y-0 t-mb-16 t-w-full'>
                        <Product price="$50" title="baligh smartphone is amazing" image1="/assets/images/darius.jpg" image2="/assets/images/subscribe.png" description="nice proudm really is amazing with this qsqs qdsqsd qsdqsd qsqdqs sdqsd qqsdqs dqsdqs dqsddqsdqs qsdq sqsdsdqsdsq"></Product>
                        <Product price="$50" title="baligh smartphone is amazing" image1="/assets/images/darius.jpg" image2="/assets/images/subscribe.png" description="nice proudm really is amazing with this qsqs qdsqsd qsdqsd qsqdqs sdqsd qqsdqs dqsdqs dqsddqsdqs qsdq sqsdsdqsdsq"></Product>
                        <Product price="$50" title="baligh smartphone is amazing" image1="/assets/images/darius.jpg" image2="/assets/images/subscribe.png" description="nice proudm really is amazing with this qsqs qdsqsd qsdqsd qsqdqs sdqsd qqsdqs dqsdqs dqsddqsdqs qsdq sqsdsdqsdsq"></Product>
                        <Product price="$50" title="baligh smartphone is amazing" image1="/assets/images/darius.jpg" image2="/assets/images/subscribe.png" description="nice proudm really is amazing with this qsqs qdsqsd qsdqsd qsqdqs sdqsd qqsdqs dqsdqs dqsddqsdqs qsdq sqsdsdqsdsq"></Product>
                        <Product price="$50" title="baligh smartphone is amazing" image1="/assets/images/darius.jpg" image2="/assets/images/subscribe.png" description="nice proudm really is amazing with this qsqs qdsqsd qsdqsd qsqdqs sdqsd qqsdqs dqsdqs dqsddqsdqs qsdq sqsdsdqsdsq"></Product>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shop