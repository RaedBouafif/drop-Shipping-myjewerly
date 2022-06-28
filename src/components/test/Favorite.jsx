import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import { wishNumberState } from "../SharedState/wishListAtom"
import { useCookies } from 'react-cookie'
const Favorite = () => {
    const [cookie, setCookie] = useCookies()
    const [number, setNumber] = useRecoilState(wishNumberState)
    useEffect(() => {
        setNumber(cookie.W_L?.length || 0)
    }, [])

    return (
        <Link to="/wishlist" className="header_wishlist lg:t-relative lg:t-mt-0.5 lg:t-mr-10 t-absolute t-mr-28 t-mt-1">
            <a href="#"><i className="fa fa-heart-o" aria-hidden="true"></i></a>
            <span className="wishlist_quantity">{number}</span>
        </Link>
    )
}

export default Favorite