import axios from 'axios'
import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link } from "react-router-dom"
import { context } from '../..'
const ScrollPhoto = () => {
    const [products, setProducts] = useState([])
    const ids = [["Men's Aqua Zircon Gemmed 925 Carat Silver Ring", "TEBT36934"],
    ["Men's Infinity Metal Accessory Brown Leather Bracelet",
        "T2EB2536-KS"],
    ["Women's Silver Steel Cartier Bracelet", "T2BB3569"],]
    useEffect(() => {

        const j = ids.map((element) => axios.get(`${url}/Knawat/getProductBySku.php?sku=${encodeURIComponent(element[1])}`))
        axios.all(j).then((res) => {
            setProducts(() => res.map((res) => res.data))
        }).catch((err) => {
        })
    }, [])
    const container = useRef()
    const { url } = useContext(context)
    const moveLeft = () => {
        container.current.scrollLeft -= container.current.clientWidth
    }
    const moveRight = () => {
        container.current.scrollLeft += container.current.clientWidth
    }
    return (
        <div className='t-w-full t-my-20 md:t-h-[550px] t-h-[60vh] t-flex t-items-center'>
            <div onClick={moveLeft} className='t-absolute t-left-2 t-cursor-pointer lg:t-flex t-hidden t-items-center t-flex-none t-justify-center t-p-2 t-bg-neutral-400 hover:t-bg-neutral-200 t-rounded-full'>
                <img src="/assets/icons/left-arrow.png" className='t-h-11 t-w-11 t-relative t-right-[2px]' alt='' />
            </div>
            <div ref={container} className='t-scroll-smooth t-flex scrollerImage t-overflow-x-scroll t-snap-x t-items-center t-h-full t-w-full'>
                {products.map((element, index) => <div key={index} className='t-snap-center t-flex t-items-center t-flex-none t-h-full t-w-full'>
                    <div className={`t-h-full t-hidden lg:t-flex t-w-full lg:t-w-1/2 ${index == 0 ? "t-bg-neutral-200/50" : "t-bg-neutral-50"} t-flex-col t-items-center t-justify-center`}>
                        <h1 className='t-font-[600] t-text-[24px] t-mb-14 t-w-7/12 t-text-center t-leading-6'>{ids[index][0]}</h1>
                        <Link to={"/shop"} className='t-px-7 t-py-2.5 t-border-blue-600 t-border-2 hover:t-bg-white t-bg-blue-600 t-text-white t-rounded-sm'>Shop now</Link>
                    </div>
                    <img src={element.images[0]} className='lg:t-h-[550px] t-h-[60vh] t-w-full lg:t-w-1/2' />
                </div>)}
            </div>
            <div onClick={moveRight} className='lg:t-flex t-hidden t-absolute t-right-2 t-items-center t-cursor-pointer hover:t-bg-neutral-200 t-flex-none t-justify-center t-p-2 t-bg-neutral-400 t-rounded-full'>
                <img src="/assets/icons/right-arrow.png" className='t-h-11 t-w-11 t-relative t-left-[2px]' alt='' />
            </div>
        </div>
    )
}

export default ScrollPhoto