import React, { useContext, useEffect, useState } from 'react'
import Product from './Product/Product'
import NavBonde from "../navBonde/NavBonde"
import { context } from "../../index"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from "../Loader/Loader"


const Shop = () => {
    const [categories, setCategories] = useState({})
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


    const handleChangeSelectFilter = (value) => {
        if (value == "hl") {
            setProducts(() => {
                const table = products.slice()
                return table.sort((b, a) => a.variations[0].sale_price - b.variations[0].sale_price)
            })
        }
        else if (value == "lh") {
            setProducts(() => {
                const table = products.slice()
                return table.sort((a, b) => a.variations[0].sale_price - b.variations[0].sale_price)
            })
        }
        else if (value == "az") {
            setProducts(() => {
                const table = products.slice()
                return table.sort((b, a) => {
                    if (a.name.en[0] > b.name.en[0]) return -1
                    else if (a.name.en[0] < b.name.en[0]) return 1
                    else return 0
                })
            })
        }
        else {
            setProducts(() => {
                const table = products.slice()
                return table.sort((a, b) => {
                    if (a.name.en[0] > b.name.en[0]) return -1
                    else if (a.name.en[0] < b.name.en[0]) return 1
                    else return 0
                })
            })
        }
    }

    const { url } = useContext(context)
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get(url + "/Knawat/getCategories.php").then((res) => {
            var result = {};
            if (Array.isArray(res.data)) {
                res.data.forEach((element) => {
                    if (element[1]) {
                        if (!result[element[0]]) result[element[0]] = Array.of(element[1])
                        else result[element[0]] = [...result[element[0]], element[1]]
                    }
                    else {
                        result[element[0]] = []
                    }
                })
                setCategories(() => result)
            }
        }).catch((err) => { console.log(err) })
    }, [])
    useEffect(() => {
        axios.get(url + "/Knawat/getProducts.php").then((res) => {
            if (Array.isArray(res.data)) setProducts(() => {
                return res.data.sort((a, b) => a.variations[0].sale_price - b.variations[0].sale_price)
            })
        }).catch((err) => { console.log(err) })
    }, [])


    const roundPrice = (price) => {
        price = price + ""
        if (price.indexOf(".") != -1) {
            price = price.slice(0, price.indexOf(".") + 3)
        }
        return price
    }

    return (
        <>
            <NavBonde paths={["Shop"]}></NavBonde>
            {(products.length > 0 && categories.length != {}) && (<div className='t-flex t-items-start'>
                <aside class="sidebar_widget t-static lg:t-flex t-hidden t-ml-14 t-mt-14">
                    <div class="widget_inner">
                        <div class="widget_list widget_categories t-w-72">
                            <h2>Product categories</h2>
                            <ul>
                                {Object.keys(categories).map((element, index) => {
                                    return <div key={index} className='t-flex t-w-full t-border-b py-2 t-flex-wrap t-items-center'>
                                        <Link to={"/shop/" + element} className='t-cursor-pointer hover:t-text-blue-500 hover:t-scale-105 hover:t-text-blue t-font-semibold' >{element}</Link>
                                        <p onClick={handleShowChilds} className='t-cursor-pointer t-duration-150 t-select-none t-ml-auto t-text-xl'>{">"}</p>
                                        <div className='t-hidden t-flex-col t-ml-2 t-mt-1 t-space-y-2 t-flex-none t-w-full'>
                                            {categories[element].map((element2, index2) => {
                                                return <Link to={`/shop/${element}/${element2}`} key={index2} className='t-flex hover:t-text-blue-500 t-cursor-pointer t-w-full t-items-center'>
                                                    <div className='hover:t-scale-105'>{element2}</div>
                                                </Link>
                                            })}
                                        </div>
                                    </div>
                                })}
                            </ul>
                        </div>
                    </div >
                </aside >
                <div className='t-z-0 t-relative t-top-14 t-mx-auto t-w-11/12 lg:t-w-7/12'>
                    <div style={{ zIndex: 0 }} class="shop_toolbar_wrapper">
                        <div class="shop_toolbar_btn">


                        </div>
                        <div class="niceselect_option">
                            <form class="t-border t-p-2 t-rounded-md">
                                <select onChange={(e) => { handleChangeSelectFilter(e.target.value) }}>
                                    <option value="lh">Sort by price: low to high</option>
                                    <option value="hl">Sort by price: high to low</option>
                                    <option value="az">Product Name: A-Z</option>
                                    <option value="za">Product Name: Z-A</option>
                                </select>
                            </form>
                        </div>
                        <div class="page_amount">
                            <p>Showing 1–9 of {products.length} results</p>
                        </div>
                    </div>


                    <div className='t-flex t-justify-around t-flex-wrap t-space-y-14 md:t-space-y-0 t-mb-16 t-w-full'>
                        {products.map((element, index) => { return <Product key={index} sku={element.sku} price={"$" + roundPrice(element.variations[0].sale_price)} title={element.name.en} image1={element.images[0]} image2={element.images[1] ? element.images[1] : element.images[0]}></Product> })}

                    </div>
                </div>
            </div>) || (<Loader className="t-mx-auto t-mt-32" height="80px" size="50px" border="5px" color="#60a5fa" />)}
        </>
    )
}

export default Shop