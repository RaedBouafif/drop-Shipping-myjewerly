import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./ProductDetails.scss"
import Image from "../../customElement/Image"
const ProductDetails = () => {
    const scrollContainer = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const handleScrollLeft = () => {
        scrollContainer.current.scrollLeft -= 144
    }
    const handleScrollRight = () => {
        scrollContainer.current.scrollLeft += 144
    }

    useEffect(() => {
        setSelectedImage(images[0])
    }, [])
    const images = ["/temp/assets/img/product/productbig5.jpg", "/assets/images/darius.jpg", "/assets/images/nice.png", "/assets/images/watch.png"]
    return (
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
                            {images.length > 1 && <div className='t-select-none t-flex t-items-center t-justify-center'>
                                <div onClick={handleScrollLeft} className='t-flex-none t-relative t-top-2.5 t-left-4  t-rounded-full t-border-0 t-p-1.5 t-box-content t-z-50 t-bg-stone-300/70 hover:t-bg-stone-300 t-cursor-pointer'>
                                    <img src="/assets/icons/left-arrow.png" className='t-h-8 t-relative t-right-0.5 t-w-9' />
                                </div>
                                <div ref={scrollContainer} className="photos_details t-scroll-smooth t-snap-x t-mt-5 t-flex t-items-center t-space-x-5 t-overflow-x-scroll">
                                    {images.map((element, index) => {
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
                                <h1>Nonstick Dishwasher PFOA</h1>

                                <div className="price_box">
                                    <span className="current_price">$70.00</span>
                                    <span className="old_price">$80.00</span>

                                </div>
                                <div className="product_desc">
                                    <p>eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus
                                        eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non
                                        neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et
                                        placerat vestibulum, metus nisi posuere nisl, in </p>
                                </div>
                                <div className="product_variant color">
                                    <h3>Available Options</h3>
                                    <label>color</label>
                                    <ul>
                                        <li className="color1"><Link to="#"></Link></li>
                                        <li className="color2"><Link to="#"></Link></li>
                                        <li className="color3"><Link to="#"></Link></li>
                                        <li className="color4"><Link to="#"></Link></li>
                                    </ul>
                                </div>
                                <div className="product_variant quantity">
                                    <label>quantity</label>
                                    <input min="1" max="100" value="1" type="number" />
                                    <button className="button" type="submit">add to cart</button>
                                </div>
                                <div className=" product_d_action">
                                    <ul>
                                        <li><div className='t-cursor-pointer t-delay-75 t-duration-150 hover:t-text-blue-500' title="Add to wishlist">+ Add to Wishlist</div></li>
                                    </ul>
                                </div>
                                <div className="product_meta">
                                    <span>Category: <Link to="#">Clothing</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}


export default ProductDetails
