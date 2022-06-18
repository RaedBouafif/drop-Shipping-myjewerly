import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom"
import Panier from "./Panier"
const Test = () => {
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
    return (
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
    )
}

export default Test