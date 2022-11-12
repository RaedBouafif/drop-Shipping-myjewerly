import React, { useState, useEffect, useContext } from 'react'
import NavBonde from '../navBonde/NavBonde'
import Band from './Band'
import ScrollPhoto from './ScrollPhoto'
import "./home.scss"
import Product from '../Shop/Product/Product'
import axios from 'axios'
import { context } from '../../index'
const Home = () => {
    const [productsW, setProductsW] = useState([])
    const [productsJ, setProductsJ] = useState([])
    const roundPrice = (price) => {
        price = price + ""
        if (price.indexOf(".") != -1) {
            price = price.slice(0, price.indexOf(".") + 3)
        }
        return price
    }
    const { url } = useContext(context)
    useEffect(() => {
        const jewerly = ["GUGUM-LR2230019", "GUGUM-LR1480017", "LBLLBKDNKLY8682712005072-12872"]
        const Watches = ["T2BS3360", "GEV220045569V13G-6129", "T2BS3346"]

        const j = jewerly.map((element) => axios.get(`${url}/Knawat/getProductBySku.php?sku=${encodeURIComponent(element)}`))
        axios.all(j).then((res) => {
            setProductsJ(() => res.map((res) => res.data))
        }).catch((err) => {
        })
        const w = Watches.map((element) => axios.get(`${url}/Knawat/getProductBySku.php?sku=${encodeURIComponent(element)}`))
        axios.all(w).then((res) => {
            setProductsW(() => res.map((res) => res.data))
        }).catch((err) => {
        })
    }, [])

    return (
        <div>
            <NavBonde paths={[]} />
            <ScrollPhoto />
            <Band />
            <h1 className='t-justify-center t-text-[25px] t-font-[500] lg:t-ml-16 t-ml-0 t-w-full lg:t-w-auto text-center t-mt-20 t-mb-5'>Best Jewerly</h1>
            <div className='t-flex t-justify-around t-flex-wrap t-space-y-14 md:t-space-y-0 t-mb-16 lg:t-w-8/12 t-mx-auto'>
                {productsJ.map((element, index) => { return <Product key={index} variations={element.variations} sku={element.sku} price={"$" + roundPrice(element.variations[0].sale_price)} title={element.name.en} image1={element.images[0]} image2={element.images[1] ? element.images[1] : element.images[0]}></Product> })}
            </div>
            <h1 className='t-justify-center t-text-[25px] t-font-[500] lg:t-ml-16 t-ml-0 t-w-full lg:t-w-auto text-center t-mt-20 t-mb-5'>Best Watches</h1>
            <div className='t-flex t-justify-around t-flex-wrap t-space-y-14 md:t-space-y-0 t-mb-16 lg:t-w-8/12 t-mx-auto'>
                {productsW.map((element, index) => { return <Product key={index} variations={element.variations} sku={element.sku} price={"$" + roundPrice(element.variations[0].sale_price)} title={element.name.en} image1={element.images[0]} image2={element.images[1] ? element.images[1] : element.images[0]}></Product> })}
            </div>
        </div>
    )
}

export default Home