import React from 'react'
import "./ErrorPage.scss"
import { Link } from 'react-router-dom'
const ErrorPage = () => {

    return (
        <div className="ErrorPage font-body py-10">
            <p className="oops">Oops</p>
            <p className="error404">404-Page Not Found</p>
            <p className="errorP w-11/12">The page you are looking for might have been removed its changed or temporarly unavailable</p>
            <Link to="/" className="errorButtonContainer flex items-center justify-center">
                <button className="buttonError px-7 py-3 rounded-md shadow-lg hover:bg-blue-500 bg-blue-400 text-white">Home</button>
            </Link>
        </div >
    )
}

export default ErrorPage
