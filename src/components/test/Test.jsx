import React, { useEffect, useRef, useState } from 'react'
import Panier from "./Panier"
const Test = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const handleShowChilds = (e) => {
        const thchild = e.target.parentNode.childNodes[2]
        if (!e.target.classList.contains("rotate-90")) {
            e.target.classList.add("rotate-90")
        } else {
            e.target.classList.remove("rotate-90")
        }
        if (thchild.style.display == "flex") {
            thchild.style.display = "none"
        }
        else {
            thchild.style.display = "flex"
        }
    }
    return (
        <div>
            <div class="header_middle">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-md-6">
                            <div class="logo">
                                <a href="index.html"><img src="/temp/assets/img/logo/logo.png" alt="" /></a>
                            </div>
                        </div>
                        <div class="col-lg-9 col-md-6">
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
                                <div class="middel_right_info">
                                    <Panier />
                                    <div style={{ marginLeft: "40px" }}>name</div>
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
                            <div class="categories_menu select-none">
                                <div onClick={() => { setToggleMenu(!toggleMenu) }} class="categories_title">
                                    <h2 class="">ALL CATEGORIES</h2>
                                </div>
                                <div className={` ${toggleMenu ? "py-3 h-auto" : "max-h-0 overflow-y-hidden"} w-full space-y-3 px-8 bg-white absolute border border-stone-200 text-neutral-900 `}>
                                    <div className='flex w-full flex-wrap items-center'>
                                        <div className='cursor-pointer hover:text-blue-500 hover:scale-105 hover:text-blue' >Video Games</div>
                                        <p onClick={handleShowChilds} className='  cursor-pointer select-none ml-auto text-xl'>{">"}</p>
                                        <div className='hidden flex-col ml-10 mt-1 space-y-2 flex-none w-full'>
                                            <div className='flex hover:text-blue-500 cursor-pointer w-full items-center'>
                                                <div className='hover:scale-105'>Video Games</div>
                                            </div>
                                            <div className='flex hover:text-blue-500 cursor-pointer w-full items-center'>
                                                <div className='hover:scale-105'>Video Games</div>
                                            </div>
                                            <div className='flex hover:text-blue-500 cursor-pointer w-full items-center'>
                                                <div className='hover:scale-105'>Video Games</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex w-full flex-wrap items-center'>
                                        <div className='cursor-pointer hover:text-blue-500 hover:scale-105 hover:text-blue' >Video Games</div>
                                        <p onClick={handleShowChilds} className='  cursor-pointer select-none ml-auto text-xl'>{">"}</p>
                                        <div className='hidden flex-col ml-10 mt-1 space-y-2 flex-none w-full'>
                                            <div className='flex hover:text-blue-500 cursor-pointer w-full items-center'>
                                                <div className='hover:scale-105'>Video Games</div>
                                            </div>
                                            <div className='flex hover:text-blue-500 cursor-pointer w-full items-center'>
                                                <div className='hover:scale-105'>Video Games</div>
                                            </div>
                                            <div className='flex hover:text-blue-500 cursor-pointer w-full items-center'>
                                                <div className='hover:scale-105'>Video Games</div>
                                            </div>
                                        </div>
                                    </div><div className='flex w-full flex-wrap items-center'>
                                        <div className='cursor-pointer hover:text-blue-500 hover:scale-105 hover:text-blue' >Video Games</div>
                                        <p onClick={handleShowChilds} className='  cursor-pointer select-none ml-auto text-xl'>{">"}</p>
                                        <div className='hidden flex-col ml-10 mt-1 space-y-2 flex-none w-full'>
                                            <div className='flex hover:text-blue-500 cursor-pointer w-full items-center'>
                                                <div className='hover:scale-105'>Video Games</div>
                                            </div>
                                            <div className='flex hover:text-blue-500 cursor-pointer w-full items-center'>
                                                <div className='hover:scale-105'>Video Games</div>
                                            </div>
                                            <div className='flex hover:text-blue-500 cursor-pointer w-full items-center'>
                                                <div className='hover:scale-105'>Video Games</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-9 col-md-12">
                            <div class="main_menu menu_position">
                                <nav>
                                    <ul>
                                        <li><a class="active" href="index.html">home<i class="fa"></i></a>
                                        </li>
                                        <li class="mega_items"><a href="shop.html">shop</a>
                                        </li>
                                        <li><a href="about.html">about Us</a></li>
                                        <li><a href="contact.html"> Contact Us</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Test