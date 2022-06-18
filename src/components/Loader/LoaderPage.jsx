import React from 'react'
import Loader from "./Loader"
const LoaderPage = () => {
    return (
        <div className='t-h-screen t-z-50 t-bg-white t-w-full t-flex t-items-center t-justify-center t-fixed t-top-0 t-left-0'>
            <Loader border="5px" height="60px" size="55px" color="#60a5fa" />
        </div>
    )
}

export default LoaderPage