import React from 'react'
import "./ErrorPage.scss"
import { Link } from 'react-router-dom'
const ErrorPage = () => {

    return (
        <div className="ErrorPage t-font-body t-py-10">
            <p className="oops">Oops</p>
            <p className="error404">404-Page Not Found</p>
            <p className="t-errorP t-w-11/12">The page you are looking for might have been removed its changed or temporarly unavailable</p>
            <Link to="/" className="t-errorButtonContainer t-flex t-items-center t-justify-center">
                <button className="t-buttonError t-px-7 t-py-3 t-rounded-md t-shadow-lg hover:t-bg-blue-500 t-bg-blue-400 t-text-white">Home</button>
            </Link>
        </div >
    )
}

export default ErrorPage
