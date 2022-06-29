import React, { useEffect, useRef, useState, useContext } from 'react'
import { Link, Outlet, useNavigate } from "react-router-dom"
import Panier from "./Panier"
import "./Nav.scss"
import Favorite from './Favorite'
import { useCookies } from 'react-cookie'
import axios from "axios"
import { context } from '../../index'
import { useRecoilState } from "recoil"
import { NotificationAtom } from '../SharedState/NotificationAtom'
const Test = () => {
    const [notification, setNotification] = useRecoilState(NotificationAtom)
    const [cookie, setCookies] = useCookies()
    const [categories, setCategories] = useState({})
    const [search, setSearch] = useState("")
    const isLogged = cookie.clid != undefined
    const clid = cookie.clid != undefined ? cookie.clid : null
    const [selectedCategorieSearch, setSelectedCategorieSearch] = useState("all")

    const { url } = useContext(context)
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
            if (window.scrollY > toHide.current.clientHeight) {
                setScroll(true)
            }
            else {
                setScroll(false)
            }
        }
    }
    const [count, setCount] = useState(true)
    const handleResize = () => {
        setCount(!count)
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("scroll", handleScroll)
        }
    })
    const logout = () => {
        setCookies("clid", "", { maxAge: 0 })
        window.location.reload()
    }

    useEffect(() => {
        axios.get(url + "/Knawat/getCategories.php").then((res) => {
            var result = {};
            if (Array.isArray(res.data)) {
                res.data.forEach((element) => {
                    if (element[1]) {
                        if (!result[element[0].name.en]) result[element[0].name.en] = { id: element[0].id, childs: [element[1]] }
                        else result[element[0].name.en]["childs"] = [...result[element[0].name.en]["childs"], element[1]]
                    }
                    else {
                        result[element[0].name.en] = { id: element[0].id, childs: [] }
                    }
                })
                setCategories(() => result)
            }
            else {
                setNotification({
                    ...notification, message: "please check you network", type: "error", visible: true
                })
            }
        }).catch((err) => {
            setNotification({
                ...notification, message: "please check you network", type: "error", visible: true
            })
        })
    }, [])
    const navigate = useNavigate()
    const handleSubmitSearch = (e) => {
        e.preventDefault()
        navigate(`/shop/${selectedCategorieSearch}/search/${search}`)
    }
    return (
        <div id="top">
            <div style={{ zIndex: 5000000 }} className={`${window.innerWidth > 991 ? "t-sticky t-top-0 t-left-0" : ""} t-z-50`}>
                <div ref={toHide} className="header_middle t-bg-white">
                    <div className="container">
                        <div className="row t-flex t-items-center">
                            <div className="col-lg-1 t-z-50">
                                <div className="t-flex t-items-center t-w-full ">
                                    <Link to="/" className='t-text-[35px] t-mr-auto t-font-bold t-font-body t-text-blue-600'>MyJewery</Link>
                                    <div onClick={(e) => { document.querySelector(".Offcanvas_menu_wrapper").classList.replace("notactive", "active"); document.querySelector("#burger").style.display = "none" }} className="t-z-40" id="burger"><div className="burger t-h-12 t-w-12 t-flex t-flex-col t-justify-center lg:t-hidden t-items-center"></div></div>
                                </div>
                            </div>
                            <div className="col-lg-11 col-md-6 t-ml-auto">
                                <div className="middel_right">
                                    <div className="search_container">
                                        <div>
                                            <div className="hover_category">

                                                <select className="select_option t-w-40" onChange={(e) => setSelectedCategorieSearch(e.target.value)} name="select" id="categori1">
                                                    <option value="all">All Categories</option>
                                                    {Object.keys(categories).map((element, index) => {
                                                        return <option key={index} value={element}>{element}</option>
                                                    })}
                                                </select>

                                            </div>
                                            <div className="search_box">
                                                <input onInput={(e) => { setSearch(() => e.target.value); }} placeholder="Search product..." type="text" />
                                                <button onClick={handleSubmitSearch} type="button">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="middel_right_info t-font-body t-mt-0">
                                        <Favorite />
                                        <Panier />
                                        {!isLogged && (<><Link to="/login" className='t-mr-4 t-ml-4 t-text-[17px] hover:t-underline t-decoration-blue-600 t-underline-offset-1 t-font-semibold t-text-blue-600'>Login</Link>
                                            <Link to="/sign" className='t-text-[17px] t-px-3 t-py-2 t-bg-blue-600 t-border-2 t-border-blue-600 t-duration-200 t-delay-75 hover:t-bg-white hover:t-text-blue-600 t-rounded-sm t-text-white t-font-semibold'>Sign Up</Link></>)
                                            ||
                                            (<><Link to={"/Account/" + clid} className='lg:t-text-sm t-ml-4 t-mr-4 t-text-[17px] hover:t-underline t-decoration-blue-600 t-underline-offset-1 t-text-blue-600'>My Account</Link><div className='lg:t-text-sm t-text-[17px] hover:t-underline t-decoration-blue-600 t-underline-offset-1 t-font-semibold lg:t-font-normal t-text-blue-600 t-cursor-pointer' onClick={logout}>Log Out</div> </>)}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*categorie*/}
                <div className="main_menu_area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-12 t-z-50">
                                {scroll && <p className='col-lg-1 t-text-white t-text-2xl t-font-bold' >MyJewelry</p>}
                                {!scroll && <div className="categories_menu t-select-none t-bg-white">
                                    <div onClick={() => { setToggleMenu(!toggleMenu) }} className="categories_title">
                                        <h2 className="">ALL CATEGORIES</h2>
                                    </div>
                                    <div className={` ${toggleMenu ? "t-py-3 t-h-auto" : "t-max-h-0 t-overflow-y-hidden"} t-w-full t-px-8 t-bg-white t-absolute t-border t-border-stone-200 t-text-neutral-900 `}>
                                        {Object.keys(categories).map((element, index) => {
                                            return <div key={index} className='t-flex t-w-full t-border-b py-2 t-flex-wrap t-items-center'>
                                                <Link to={"/shop/" + element} className='t-cursor-pointer hover:t-text-blue-500 hover:t-scale-105 hover:t-text-blue t-font-semibold t-text-[12px]' >{element}</Link>
                                                <p onClick={handleShowChilds} className='t-cursor-pointer t-duration-150 t-select-none t-ml-auto t-text-xl'>{">"}</p>
                                                <div className='t-hidden t-flex-col t-ml-2 t-mt-1 t-space-y-2 t-flex-none t-text-[12px] t-w-full'>
                                                    {categories[element].childs.map((element2, index2) => {
                                                        return <Link to={`/shop/${element}/${element2.name.en}`} key={index2} className='t-flex hover:t-text-blue-500 t-cursor-pointer t-w-full t-items-center'>
                                                            <div className='hover:t-scale-105'>{element2.name.en}</div>
                                                        </Link>
                                                    })}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>}
                            </div>
                            <div className="col-lg-5 col-md-12">
                                <div className="main_menu menu_position">
                                    <nav>
                                        <ul>
                                            <li><Link to="/">home<i className="fa"></i></Link>
                                            </li>
                                            <li className="mega_items"><Link to="/shop">shop</Link>
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
            < div className="Offcanvas_menu_wrapper notactive" >
                <div className="canvas_close" onClick={() => { document.querySelector(".Offcanvas_menu_wrapper").classList.replace("active", "notactive"); document.querySelector("#burger").style.display = "" }}>
                    <i className="ion-android-close"></i>
                </div>
                <div className="search_container">
                    <div>
                        <div className="search_box">
                            <input onInput={(e) => { setSearch(() => e.target.value); }} placeholder="Search product..." type="text" />
                            <button onClick={handleSubmitSearch} type="button">Search</button>
                        </div>
                    </div>
                </div>
                <div className="middel_right_info t-flex t-items-start ">
                    <Panier />
                    <Favorite />
                </div>
                <div id="menu" className="text-left ">
                    <ul className="offcanvas_main_menu">
                        <li className="menu-item-has-children"><span className="menu-expand"></span>
                            <Link to="/">Home</Link>
                        </li>
                        <li className="menu-item-has-children"><span className="menu-expand"></span>
                            <Link to="/shop">Shop</Link>
                        </li>
                        {isLogged && (<li className="menu-item-has-children">
                            <Link to={"/account/" + clid}>my account</Link>{/*id account here*/}
                        </li>)}
                        <li className="menu-item-has-children">
                            <Link to="/about">about Us</Link>
                        </li>
                        <li className="menu-item-has-children">
                            <Link to="/contact"> Contact Us</Link>
                        </li>
                    </ul>
                </div>
                {
                    !isLogged && (<div className='t-flex t-items-center t-justify-center t-space-x-7 t-mt-7 t-w-full'>
                        <Link to="/login" className=' t-text-[17px] hover:t-underline t-decoration-blue-600 t-underline-offset-1 t-font-semibold t-text-blue-700'>Login</Link>
                        <Link to="/sign" className='t-text-[17px] t-px-3 t-py-2 t-bg-blue-700 t-border-2 t-border-blue-700 t-duration-200 t-delay-75 hover:t-bg-white hover:t-text-blue-700 t-rounded-sm t-text-white t-font-semibold'>Sign Up</Link>
                    </div>) ||
                    (<div className='t-text-[17px] hover:t-underline t-decoration-blue-600 t-underline-offset-1 t-font-semibold t-text-blue-700' onClick={logout}>Log Out</div>)
                }
                <div className="modal_social t-mt-20">
                    <h2>Share this product</h2>
                    <ul>
                        <li className="facebook"><Link to="#"><i className="fa fa-facebook"></i></Link></li>
                        <li className="twitter"><Link to="#"><i className="fa fa-twitter"></i></Link></li>
                        <li className="pinterest"><Link to="#"><i className="fa fa-pinterest"></i></Link></li>
                        <li className="google-plus"><Link to="#"><i className="fa fa-google-plus"></i></Link>
                        </li>
                        <li className="linkedin"><Link to="#"><i className="fa fa-linkedin"></i></Link></li>
                    </ul>
                </div>
            </div >
            {scroll && <a href='#top' className='t-fixed t-z-50 t-bottom-7 t-right-5 t-cursor-pointer hover:t-bg-blue-600 t-rounded-full t-p-2.5 border-0 t-bg-blue-500 t-items-center t-justify-center t-flex'>
                <img src="/assets/icons/top-arrow.png" className='t-relative t-bottom-px t-h-8 t-w-8' />
            </a>}
            <Outlet />
        </div >
    )
}

export default Test