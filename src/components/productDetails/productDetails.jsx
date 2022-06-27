import React, { useRef, useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import "./ProductDetails.scss"
import Image from "../../customElement/Image"
import { context } from "../../index"
import axios from "axios"
import Loader from '../Loader/Loader'
import { NotificationAtom } from '../SharedState/NotificationAtom'
import { wishNumberState } from '../SharedState/wishListAtom'
import { useRecoilState } from 'recoil'
import { useCookies } from 'react-cookie'
const ProductDetails = () => {
    const [cookie, setCookie] = useCookies()
    const [isLoading, setIsLoading] = useState(true)
    const scrollContainer = useRef(null)
    const [productData, setProductData] = useState({})
    const [selectedImage, setSelectedImage] = useState(null)
    const [size, setSize] = useState(null)
    const [wish, setWish] = useState()
    const handleScrollLeft = () => {
        scrollContainer.current.scrollLeft -= 144
    }
    const handleScrollRight = () => {
        scrollContainer.current.scrollLeft += 144
    }

    const { url } = useContext(context)
    const { id } = useParams()
    const desc = useRef("")
    useEffect(() => {
        axios.get(`${url}/knawat/getProductBySku.php?sku=${encodeURIComponent(id)}`).then((res) => {
            console.log(res.data)
            if (res.data.images) {
                setProductData(() => res.data)
                setSelectedImage(res.data.images[0])
                desc.current.innerHTML = res.data.description.tr
                console.log(res.data)
            }
            else {
                setIsLoading(false)
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    const changeSize = (size) => {
        setSize(() => size)
    }


    useEffect(() => {
        if (Array.isArray(cookie.W_L) && cookie.W_L.indexOf(id) != -1) {
            setWish(false)
        }
        else {
            setWish(true)
        }
    }, [])

    const [number, setNumber] = useRecoilState(wishNumberState)
    const [notification, setNotification] = useRecoilState(NotificationAtom)
    const addToWishList = (e) => {
        setNotification({
            ...notification,
            visible: true,
            message: "Product Added to WishList successfully",
            type: "success"
        })
        setNumber(() => number + 1)
        e.preventDefault()
        setWish(false)
        if (Array.isArray(cookie.W_L)) {
            setCookie("W_L", [...cookie.W_L, id], { maxAge: 14 * 24 * 60 * 60 })
        }
        else {
            setCookie("W_L", Array.of(id), { maxAge: 14 * 24 * 60 * 60 })
        }
    }
    const deleteWish = () => {
        setNumber(() => number - 1)
        setWish(true)
        setNotification({
            ...notification,
            visible: true,
            message: "Product remove from WishList successfully",
            type: "success"
        })
        setCookie("W_L", cookie.W_L ? cookie.W_L.filter((element) => element != id) : [], { maxAge: 14 * 24 * 60 * 60 })
    }
    if (productData.images != undefined) return (
        <div className="product_details t-mt-16 t-pb-20" >
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="product-details-tab">
                            <div className="lg:t-h-[470px] t-h-[400px] lg:t-relative t-left-16 lg:t-w-[450px]  t-flex t-items-center t-justify-center">
                                <div className='t-h-full t-w-full t-flex t-items-center t-justify-center'>
                                    {selectedImage && <Image className='t-h-full t-w-full t-mx-auto' src={selectedImage} />}
                                </div>
                            </div>
                            {productData.images.length > 1 && <div className='t-select-none t-flex t-items-center t-justify-center'>
                                <div onClick={handleScrollLeft} className='t-flex-none t-relative t-top-2.5 t-left-4  t-rounded-full t-border-0 t-p-1.5 t-box-content t-z-50 t-bg-stone-300/70 hover:t-bg-stone-300 t-cursor-pointer'>
                                    <img src="/assets/icons/left-arrow.png" className='t-h-8 t-relative t-right-0.5 t-w-9' />
                                </div>
                                <div ref={scrollContainer} className="photos_details t-scroll-smooth t-snap-x t-mt-5 t-flex t-items-center t-space-x-5 t-overflow-x-scroll">
                                    {productData.images.map((element, index) => {
                                        return (
                                            <div onClick={() => { setSelectedImage(() => element) }}><Image key={index} src={element} className='lg:t-h-28 lg:t-w-36 t-w-32 t-h-24 t-flex-none t-snap-center t-cursor-pointer' /></div>)
                                    })}
                                </div>
                                <div onClick={handleScrollRight} className='t-flex-none t-relative t-top-2 t-right-4 t-rounded-full t-border-0 t-p-1.5 t-box-content t-z-50 t-bg-stone-300/70 hover:t-bg-stone-300 t-cursor-pointer'>
                                    <img src="/assets/icons/right-arrow.png" className='t-h-8 t-relative t-left-0.5 t-w-9' />
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="product_d_right">
                            <form action="#">
                                <h1>{productData.name.en}</h1>

                                <div className="price_box">
                                    <span className="current_price">{"$" + productData.variations[0].sale_price_scy}</span>
                                </div>
                                <div className="product_desc" ref={desc}>

                                </div>
                                <div className="product_variant color">
                                    <h3>Available Options</h3>


                                </div>
                                {[].length != 0 && (<h2 className='t-text-[15px] t-font-bold'>Sizes</h2>)}
                                <div className='t-flex t-items-center t-space-x-6 t-mb-8 t-select-none'>
                                    {[].map((element, index) => {
                                        if (!size && !index) {
                                            setSize(element)
                                        }
                                        return <div onClick={() => { changeSize(element) }} key={index} className={` ${(!size && !index) || element === size ? "t-border-2 t-border-neutral-700" : "t-border t-border-neutral-300"}   t-w-12  t-py-2 t-px-3 t-cursor-pointer t-rounded-sm t-items-center t-justify-center t-flex`}>
                                            <p className='t-text-neutral-800'>{element}</p>
                                        </div>
                                    })}
                                </div>
                                <div className="product_variant quantity">
                                    <label>quantity</label>
                                    <input min="1" max="10" defaultValue={1} type="number" />
                                    <button className="button" type="submit">add to cart</button>
                                </div>
                                <div className=" product_d_action">
                                    <ul>
                                        {wish && <li><div onClick={addToWishList} className='t-cursor-pointer t-text-green-500 t-delay-75 t-duration-150 hover:t-underline t-decoration-green-500' title="Add to wishlist">+ Add to Wishlist</div></li> ||
                                            <li><div onClick={deleteWish} className='t-cursor-pointer t-delay-75 t-text-red-500 t-duration-150 hover:t-underline t-decoration-red-500' title="Add to wishlist">- remove from Wishlist</div></li>}
                                    </ul>
                                </div>
                                <div className="product_meta t-flex t-items-center">
                                    <span>Category: <Link to={"/shop/" + productData.categories.filter((element) => element.treeNodeLevel === 2)[0].name.en}>{productData.categories.filter((element) => element.treeNodeLevel === 2)[0].name.en} </Link><span>  / </span>{productData.categories.filter((element) => element.treeNodeLevel === 3).length ? <Link to={"/shop/" + productData.categories.filter((element) => element.treeNodeLevel === 2)[0].name.en + "/" + productData.categories.filter((element) => element.treeNodeLevel === 3)[0].name.en}>{productData.categories.filter((element) => element.treeNodeLevel === 3)[0].name.en}</Link> : <></>}</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
    else if (isLoading) return (<Loader className="t-mx-auto t-mt-32" height="80px" size="50px" border="5px" color="#60a5fa" />)
    else return <div className='t-text-2xl t-w-full t-text-center t-mt-40'>product is not found</div>
}


export default ProductDetails
