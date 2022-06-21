import React from 'react'
import "./Product.scss"
import Image from "../../../customElement/Image"
import { Link, useNavigate } from "react-router-dom"
const Product = ({ image1, image2, title, price, id }) => {
    const navigateTo = useNavigate()
    const navigate = () => {
        navigateTo("/product/" + id)
    }
    return (
        <div className='firstContainer t-px-2 t-pt-2 t-box-content t-pb-3 md:t-w-5/12 lg:t-w-60 t-font-body t-rounded-sm t-min-h-[370px] t-border-2 hover:t-border-stone-200 t-border-transparent t-flex t-flex-col'>

            <div className='secondContainer t-flex t-items-start t-justify-center'>
                <div class="action_links t-z-20 t-justify-self-start lg:t-mr-52 t-mr-60 md:t-mr-72">
                    <ul>
                        <li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><i
                            class="fa fa-heart-o" aria-hidden="true"></i></a></li>
                    </ul>
                </div>
                <Image click={navigate} src={image1} className="img1 t-mb-0 lg:t-h-48 lg:t-w-60 t-w-72 t-h-56" />
                <Image click={navigate} src={`${image2 != undefined ? image2 : image1}`} className="img2 t-absolute t-mb-0 lg:t-h-48 lg:t-w-60 t-w-72 t-h-56" />
                <button className='butt t-space-x-1 t-flex t-items-center t-justify-center t-opacity-0 t-mt-44 t-absolute t-px-4 t-py-3 t-bg-blue-600 t-text-white t-font-bold hover:t-bg-blue-700 t-rounded-md'>
                    <p>Add To Cart</p>
                    <img src="/assets/icons/shopping-cart.png" className='t-h-5 t-w-5' />
                </button>
            </div>
            <Link to={"/product/" + id} className='t-max-w-full t-overflow-hidden t-break-words'>
                <p className='t-text-blue-600 t-font-bold t-text-xl t-text-center t-mt-10'>{price}</p>
                <p className='t-text-md t-neutral-700 t-tracking-wider t-break-words t-overflow-x-hidden hover:t-text-blue-500 t-delay-75 t-duration-100 t-mt-5 t-text-center t-w-full'>{title}</p>
            </Link>
        </div>
    )
}

export default Product