import React from 'react'
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
const CotrolledLinks = ({ to, classes, children }) => {
    const [cookie, setCookie] = useCookies()
    return (
        <Link to={cookie.clid ? to : "/login"} className={classes} >{children}</Link>
    )
}

export default CotrolledLinks