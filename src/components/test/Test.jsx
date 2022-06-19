import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom"
import Panier from "./Panier"
const Test = () => {
    useEffect(() => {
        if (window.innerWidth > 991) {
            document.querySelector(".Offcanvas_menu_wrapper").style.display = "none"
        }
        else {
            document.querySelector(".Offcanvas_menu_wrapper").style.display = ""
        }
    })
    const [toggleMenu, setToggleMenu] = useState(false)
    const [scroll, setScroll] = useState(false)
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
    const toHide = useRef()
    const handleScroll = () => {
        if (window.innerWidth > 991) {
            if (window.scrollY > toHide.current.clientHeight) {
                toHide.current.style.display = "none"
                setScroll(true)
            }
            else {
                toHide.current.style.display = "flex"
                setScroll(false)
            }
        }
        else {

        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })
    const [showMobileNav, setShowMobileNav] = useState(false)
    return (
        <>
            <div className={`${window.innerWidth > 991 ? "t-sticky t-top-0 t-left-0" : ""} t-z-50`}>
                <div ref={toHide} class="header_middle t-bg-white">
                    <div class="container">
                        <div class="row t-flex t-items-center">
                            <div class="col-lg-1 col-md-6">
                                <div class="">
                                    <Link to="/" className='t-text-[35px] t-font-bold t-font-body t-text-blue-600'>MyJewelry</Link>
                                </div>
                            </div>
                            <div class="col-lg-11 col-md-6 t-ml-auto">
                                <div class="middel_right">
                                    <div class="search_container">
                                        <form action="#">
                                            <div class="hover_category">
                                                <select class="select_option" name="select" id="categori1">
                                                    <option selected value="1">All Categories</option>
                                                    <option value="2">Accessories</option>
                                                    <option value="3">Accessories & More</option>
                                                    <option value="4">Butters & Eggs</option>
                                                    <option value="5">Camera & Video </option>
                                                    <option value="6">Mornitors</option>
                                                    <option value="7">Tablets</option>
                                                    <option value="8">Laptops</option>
                                                    <option value="9">Handbags</option>
                                                    <option value="10">Headphone & Speaker</option>
                                                    <option value="11">Herbs & botanicals</option>
                                                    <option value="12">Vegetables</option>
                                                    <option value="13">Shop</option>
                                                    <option value="14">Laptops & Desktops</option>
                                                    <option value="15">Watchs</option>
                                                    <option value="16">Electronic</option>
                                                </select>
                                            </div>
                                            <div class="search_box">
                                                <input placeholder="Search product..." type="text" />
                                                <button type="submit">Search</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="middel_right_info t-font-body mt-0">
                                        <Panier />
                                        <Link to="/login" className='t-ml-8 t-mr-8 t-text-[17px] hover:t-underline t-decoration-blue-600 t-underline-offset-1 t-font-semibold t-text-blue-600'>Login</Link>
                                        <Link to="/sign" className='mr t-text-[17px] t-px-3 t-py-2 t-bg-blue-600 t-border-2 t-border-blue-600 t-duration-200 t-delay-75 hover:t-bg-white hover:t-text-blue-600 t-rounded-sm t-text-white t-font-semibold'>Sign Up</Link>
                                        {/*  */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*categorie*/}
                <div class="main_menu_area">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-lg-3 col-md-12">
                                {scroll && <p className='col-lg-1 t-text-white t-text-2xl t-font-bold' >MyJewelry</p>}
                                {!scroll && <div class="categories_menu select-none">
                                    <div onClick={() => { setToggleMenu(!toggleMenu) }} class="categories_title">
                                        <h2 class="">ALL CATEGORIES</h2>
                                    </div>
                                    <div className={` ${toggleMenu ? "t-py-3 t-h-auto" : "t-max-h-0 t-overflow-y-hidden"} t-w-full t-space-y-3 t-px-8 t-bg-white t-absolute t-border t-border-stone-200 t-text-neutral-900 `}>
                                        <div className='t-flex t-w-full flex-wrap items-center'>
                                            <div className='t-cursor-pointer hover:t-text-blue-500 hover:t-scale-105 hover:t-text-blue' >Video Games</div>
                                            <p onClick={handleShowChilds} className='t-cursor-pointer t-duration-150 t-select-none t-ml-auto t-text-xl'>{">"}</p>
                                            <div className='t-hidden t-flex-col t-ml-10 t-mt-1 t-space-y-2 t-flex-none t-w-full'>
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
                                    </div>
                                </div>}
                            </div>
                            <div class="col-lg-5 col-md-12">
                                <div class="main_menu menu_position">
                                    <nav>
                                        <ul>
                                            <li><Link class="active" to="/">home<i class="fa"></i></Link>
                                            </li>
                                            <li class="mega_items"><Link to="/shop">shop</Link>
                                            </li>
                                            <li><Link to="/about">about Us</Link></li>
                                            <li><Link to="/contact"> Contact Us</Link></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
            {/*mobile */}
            <div class="Offcanvas_menu_wrapper active">
                <div class="canvas_close" onClick={() => { document.querySelector(".Offcanvas_menu_wrapper").classList.replace("active", "notactive") }}>
                    <i class="ion-android-close"></i>
                </div>
                <div class="search_container">
                    <form action="#">
                        <div class="search_box">
                            <input placeholder="Search product..." type="text" />
                            <button type="submit">Search</button>
                        </div>
                    </form>
                </div>

                <div class="middel_right_info">
                    <div class="mini_cart_wrapper t-flex t-items-center t-flex-col" onClick={() => { setShowMobileNav(!showMobileNav) }}>
                        <div className='t-mb-2 t-w-full t-flex t-items-center t-justify-center'>
                            <span class="t-border-0 t-w-4 t-h-4 t-p-1 t-relative t-bottom-1.5 t-left-1 t-rounded-full t-text-white t-flex t-items-center t-justify-center t-bg-blue-700" >2</span>
                            <i class="fa fa-shopping-bag" aria-hidden="true"></i>$147.00 <i class="fa fa-angle-down"></i>
                        </div>
                        <div class="mini_cart" style={{ display: showMobileNav ? "block" : "none", position: "relative", right: 0 }}>
                            <div class="cart_item">
                                <div class="cart_img">
                                    <a href="#"><img src="temp/assets/img/s-product/product.jpg" alt="" /></a>
                                </div>
                                <div class="cart_info">
                                    <a href="#">Sit voluptatem rhoncus sem lectus</a>
                                    <p>Qty: 1 X <span> $60.00 </span></p>
                                </div>
                                <div class="cart_remove">
                                    <a href="#"><i class="ion-android-close"></i></a>
                                </div>
                            </div>
                            <div class="cart_item">
                                <div class="cart_img">
                                    <a href="#"><img src="/temp/assets/img/s-product/product2.jpg" alt="" /></a>
                                </div>
                                <div class="cart_info">
                                    <a href="#">Natus erro at congue massa commodo</a>
                                    <p>Qty: 1 X <span> $60.00 </span></p>
                                </div>
                                <div class="cart_remove">
                                    <a href="#"><i class="ion-android-close"></i></a>
                                </div>
                            </div>
                            <div class="mini_cart_table">
                                <div class="cart_total">
                                    <span>Sub total:</span>
                                    <span class="price">$138.00</span>
                                </div>
                                <div class="cart_total mt-10">
                                    <span>total:</span>
                                    <span class="price">$138.00</span>
                                </div>
                            </div>

                            <div class="mini_cart_footer">
                                <div class="cart_button">
                                    <a href="cart.html">View cart</a>
                                </div>
                                <div class="cart_button">
                                    <a href="checkout.html">Checkout</a>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
                <div id="menu" class="text-left ">
                    <ul class="offcanvas_main_menu">
                        <li class="menu-item-has-children active"><span class="menu-expand"></span>
                            <a href="#">Home</a>

                        </li>
                        <li class="menu-item-has-children"><span class="menu-expand"></span>
                            <a href="#">Shop</a>
                        </li>
                        <li class="menu-item-has-children">
                            <a href="my-account.html">my account</a>
                        </li>
                        <li class="menu-item-has-children">
                            <a href="about.html">about Us</a>
                        </li>
                        <li class="menu-item-has-children">
                            <a href="contact.html"> Contact Us</a>
                        </li>
                    </ul>
                </div>
                <div class="modal_social t-mt-20">
                    <h2>Share this product</h2>
                    <ul>
                        <li class="facebook"><a href="#"><i class="fa fa-facebook"></i></a></li>
                        <li class="twitter"><a href="#"><i class="fa fa-twitter"></i></a></li>
                        <li class="pinterest"><a href="#"><i class="fa fa-pinterest"></i></a></li>
                        <li class="google-plus"><a href="#"><i class="fa fa-google-plus"></i></a>
                        </li>
                        <li class="linkedin"><a href="#"><i class="fa fa-linkedin"></i></a></li>
                    </ul>
                </div>
            </div >
        </>
    )
}

export default Test