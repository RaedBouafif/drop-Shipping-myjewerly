import React, { useRef } from 'react'
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import { wishNumberState } from "../SharedState/wishListAtom"
const Favorite = () => {
    const [number, setNumber] = useRecoilState(wishNumberState)
    return (
        <Link to="/wishlist" className="header_wishlist lg:t-relative lg:t-mt-0.5 lg:t-mr-10 t-absolute t-mr-28 t-mt-1">
            <a href="#"><i className="fa fa-heart-o" aria-hidden="true"></i></a>
            <span className="wishlist_quantity">{number}</span>
        </Link>
    )
}

export default Favorite