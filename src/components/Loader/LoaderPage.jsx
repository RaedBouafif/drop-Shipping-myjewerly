import React from 'react'
import Loader from "./Loader"
const LoaderPage = () => {
    return (
        <div className='h-screen z-50 bg-white w-full flex items-center justify-center fixed top-0 left-0'>
            <Loader border="5px" height="60px" size="55px" color="#60a5fa" />
        </div>
    )
}

export default LoaderPage