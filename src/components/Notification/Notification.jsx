import React, { useEffect, useState } from 'react'
import { NotificationAtom } from "../SharedState/NotificationAtom"
import { useRecoilState } from 'recoil'
import { Outlet } from 'react-router-dom'
const Notification = () => {
    const [notification, setNotification] = useRecoilState(NotificationAtom)
    const [state, setState] = useState({})
    useEffect(() => {
        if (notification.type === "success") {
            setState({
                image: "/assets/icons/checked.png",
                color: "t-bg-green-400/80",
            })
        }
        else if (notification.type === "warning") {
            setState({
                image: "/assets/icons/warning.png",
                color: "t-bg-yellow-300/90"
            })
        }
        else if (notification.type === "error") {
            setState({
                image: "/assets/icons/error.png",
                color: "t-bg-red-400"
            })
        }
        var time = setTimeout(() => {
            setNotification({ ...notification, visible: false })
        }, 3500)
        return () => {
            clearTimeout(time)
        }
    }, [notification.visible])

    const hideNotification = () => {
        setNotification({ ...notification, visible: false })
    }
    return (
        <>
            <div style={{ zIndex: 60000000 }} className={`t-fixed lg:t-bottom-5 t-bottom-1 ${notification.visible ? "lg:t-right-5 t-right-[4.1%] md:t-right-[16.66%] t-opacity-1" : "t-opacity-0 lg:t-right-[-400px] t-right-[-92%] md:t-right-[-66.66%]"} t-duration-700 t-h-24 lg:t-w-[400px] t-w-11/12 md:t-w-8/12 t-mx-auto t-shadow-md t-shadow-neutral-300 t-rounded-lg t-bg-white t-flex t-items-center t-justify-center`}>
                <div className={'t-w-2/6  t-h-full t-rounded-l-md t-flex t-justify-center t-items-center ' + state.color}>
                    <img src={state.image} className="t-h-16 t-w-16" />
                </div>
                <div className='t-w-4/6 t-flex t-flex-col t-items-center t-justify-center'>
                    <img onClick={hideNotification} src="/assets/icons/lettre-x.png" className='t-relative t-bottom-3 t-h-4 t-w-4 t-cursor-pointer t-mr-1 t-ml-auto t-justify-self-start' />
                    <p className='t-text-center t-relative t-bottom-1 t-text-[15px] t-text-neutral-700 t-font-[500]'>{notification.message}</p>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Notification