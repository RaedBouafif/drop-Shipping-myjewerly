import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import "./ChangePassword.scss"
import Loader from "../Loader/Loader"
import axios from "axios"
import { UseDynamicInput } from '../../hooks/UseDyInp'
import { context } from "../../index"


const ChangePassword = () => {


    const [success, setSucess] = useState(false)


    const [isLoading, setIsLoading] = useState(false)

    const password = useRef(null)
    const confirme = useRef(null)

    const { accountName, operationId } = useParams()

    const navigate = useNavigate()
    const url = useContext(context)


    const checkValidOperation = () => {
        axios.get(url + "/checkOperation?operation=" + operationId).then((res) => {
            if (!res.success) {
                navigate("/error")
            }
        })
    }
    useEffect(() => {
        checkValidOperation()
    }, [])


    const errorPasswordFunction = (value) => {
        var errors = []
        if (value.length < 6) {
            errors.push("password is too short")
        }
        else if (value.length > 30) {
            errors.push("password is too long")
        }
        return errors
    }
    const [passwordValue, passwordErrors] = UseDynamicInput(password, errorPasswordFunction)
    const [confirmeValue] = UseDynamicInput(confirme)


    const [submit, setSubmit] = useState(true)
    const [confirmeError, setConfirmeError] = useState(false)
    useEffect(() => {
        const label = confirme.current.parentNode.children[0]
        if (passwordErrors.length) {
            setSubmit(true)
        } else if (password.current.value != confirme.current.value) {
            setSubmit(true)
            confirme.current.style.borderColor = "red"
            label.style.color = "red"
            setConfirmeError(true)
        }
        else if (!password.current.value.length) {
            setSubmit(true)
        }
        else {
            confirme.current.style.borderColor = ""
            label.style.color = ""
            setSubmit(false)
            setConfirmeError(false)
        }
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!submit) {
            setIsLoading(true)
            const data = new FormData()
            data.append("password", passwordValue)
            data.append("idOperation", operationId)
            axios.post(url + "/changePassword.php", data).then((res) => {
                setSucess(true)
            }).catch((err) => {
                console.log("err : " + err)
            })
        }
    }
    return (
        <div className='t-min-h-screen t-w-full t-justify-center t-flex t-items-center t-font-body t-bg-neutral-100'>
            <form className="t-mx-auto t-rounded-md t-pt-14 t-shadow-lg lg:t-py-10 t-py-7 t-min-h-screen lg:t-min-h-0 t-bg-white t-my-0 lg:t-my-16 t-flex t-flex-col t-justify-center t-space-y-12 t-items-center lg:t-w-6/12 t-w-full t-font-body">
                <div className="t-space-y-3">
                    <h2 className="t-text-2xl t-font-bold t-text-center t-tracking-widest t-text-neutral-600">Change Password</h2>
                    <p className="t-text-sm t-w-10/12 lg:t-w-8/12 t-break-words t-text-center t-mx-auto t-text-stone-400 t-tracking-wider"> Please fill up this Formuler with Your new Password</p>
                </div>
                <div style={{ display: success ? "none" : "" }} className='lg:t-w-7/12 t-w-10/12 md:t-w-8/12'>
                    <div className='t-flex t-space-y-1 t-flex-col t-w-full mb-2'>
                        <label onClick={() => { password.current.focus() }} className='t-relative t-h-0 t-duration-150  t-left-2 t-cursor-text t-select-none t-text-stone-700 t-translate-y-[21px] t-text-sm'>password</label>
                        <input ref={password} type="password" className="t-bg-white t-duration-150 t-rounded-md t-outline-none t-h-10 t-px-2 t-py-[25px] t-border-2 t-border-stone-200  before:t-z-50 before:t-left-0" />
                    </div>
                    <div className='t-flex t-flex-col t-mb-5'>
                        {passwordErrors.map((element, index) => {
                            return (
                                <p key={index} className='t-text-red-500 t-text-sm'>{element}</p>
                            )
                        })}
                    </div>
                    <div className='t-flex t-space-y-1 t-flex-col t-w-full t-mb-2'>
                        <label onClick={() => { confirme.current.focus() }} className='t-relative t-h-0 t-duration-150  t-left-2 t-cursor-text t-select-none t-text-stone-700 t-translate-y-[21px] t-text-sm'>confirm your password</label>
                        <input ref={confirme} type="password" className="t-bg-white t-duration-150 t-rounded-md t-outline-none t-h-10 t-px-2 t-py-[25px] t-border-2 t-border-stone-200  before:t-z-50 before:t-left-0" />
                    </div>
                    <div className='t-flex t-flex-col t-mb-5'>
                        {confirmeError && <p className='t-text-red-500 t-text-sm'>Please Confirm right your password</p>}
                    </div>
                </div>
                {!success && (<div className='t-z-10 lg:t-w-7/12 t-w-10/12 md:t-w-8/12 t-mt-10'>
                    {!isLoading && (<button disabled={submit} onClick={handleSubmit} className={`will-change-auto ${!submit ? "hover:t-text-blue-400 t-shadow-lg t-bg-blue-400 hover:t-bg-white hover:t-shadow-none t-border-blue-400" : "t-bg-blue-400/30 t-cursor-not-allowed t-border-none t-shadow-none"}   t-border-2 t-duration-200 t-delay-75 t-h-12 lg:t-w-40 t-w-full t-text-white t-text-lg t-rounded-md t-shadow-lg t-shadow-blue-300`}>Change</button>)
                        || (<Loader className="t-mx-auto lg:t-mx-0" height="55px" size="50px" border="5px" color="#60a5fa" />)}
                </div>)}
                {success && (<div className='t-z-10 lg:t-w-7/12 t-w-10/12 md:t-w-8/12 t-mt-10 t-flex t-items-center t-space-x-2 t-bg-green-300 t-rounded-md t-py-4 t-p-3'>
                    <img src="/assets/icons/checked.png" className='t-h-7 t-w-7' />
                    <p className='t-text-sm t-text-green-600 t-font-semibold t-tracking-wider'>Your password has been changed successfully</p>
                </div>)}

            </form>
        </div>
    )
}

export default ChangePassword