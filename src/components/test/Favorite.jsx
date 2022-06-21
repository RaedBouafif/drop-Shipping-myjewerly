import React from 'react'
import { Link } from "react-router-dom"
const Favorite = () => {
    return (
        <Link to="/account/favorite" className="header_wishlist">
            <a href="#"><i className="fa fa-heart-o" aria-hidden="true"></i></a>
            <span className="wishlist_quantity">3</span>
        </Link>
    )
}

export default Favorite