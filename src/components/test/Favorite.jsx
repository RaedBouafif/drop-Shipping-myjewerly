import React from 'react'
import { Link } from "react-router-dom"
const Favorite = () => {
    return (
        <Link to="/account/favorite" className="header_wishlist lg:t-relative lg:t-mt-0.5 lg:t-mr-10 t-absolute t-mr-28 t-mt-1">
            <a href="#"><i className="fa fa-heart-o" aria-hidden="true"></i></a>
            <span className="wishlist_quantity">3</span>
        </Link>
    )
}

export default Favorite