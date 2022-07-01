import React, { useRef, useState, useContext } from 'react'
import { Link } from "react-router-dom"
import { UseDynamicInput } from '../../hooks/UseDyInp'
import { UseTrueEmail, UseTrueString } from "../../hooks/strings"
import axios from 'axios'
import Loader from '../Loader/Loader'
import "./ForgetPassword.scss"
import { context } from "../../index"

const ForgetPassword = () => {
    /*cookie */
    const [isLoading, setIsLoading] = useState(false)
    const { url } = useContext(context)
    const [success, setSuccess] = useState(false)

    const emailInput = useRef(null)

    const error = () => {
        var err = []
        if (!UseTrueEmail(emailInput.current.value)) {
            err.push("Invalid email address")
        }
        return err
    }
    const filter = (value) => {
        return UseTrueString(value)
    }

    const [email, emailErrors] = UseDynamicInput(emailInput, error, filter)



    const handleSubmit = (e) => {
        e.preventDefault()
        if (!emailErrors.length) {
            setIsLoading(true)
            axios.get(url + "/forgetPassword.php?email=" + encodeURIComponent(email)).then((res) => {
                if (res.data.success) {
                    setSuccess(true)
                }
                else {
                    setSuccess(false)
                    setIsLoading(false)
                }
            }).catch((err) => {
                console.log("error  :" + err)
            })
        }
    }

    return (
        <div className='t-min-h-screen t-flex t-items-center t-justify-center t-font-body'>
            <div className='t-w-full lg:t-fixed lg:t-inset-0 t-min-h-full t-flex t-items-center t-justify-center'>
                <div className='t-min-h-screen lg:t-flex t-hidden t-w-7/12 t-bg-neutral-900 selection:t-bg-white selection:t-text-blue-300'>
                    <div className='t-mx-auto t-relative t-right-10 t-flex t-flex-col t-items-center t-justify-center'>
                        <img className='t-h-[450px] t-mb-3 t-w-[450px]' src="/assets/images/finalImage.png" alt="" />
                        <p className='t-text-lg t-text-white t-w-7/12 t-text-center t-mx-auto'>Hey, Customers Welcome to our awesome Store where we provides you the latest and the top branded jewelery. don't be stingy to Log-in with your account and navigate into our world.</p>
                    </div>
                </div>
                <div className='selection:t-bg-blue-300 selection:t-text-white t-py-8 lg:t-w-5/12 t-w-full t-shadow-lg t-shadow-black/20 lg:t-relative t-bottom-5 t-rounded-lg t-right-24 t-bg-white  t-min-h-screen lg:t-min-h-min t-flex t-flex-col t-items-center t-justify-center'>
                    <Link to="/login" className='lg:t-relative t-absolute t-top-7 t-left-2 t-flex t-items-center t-self-start lg:t-left-2 lg:-t-top-3 t-space-x-2'>
                        <img src="/assets/icons/left-arrow.png" className='t-h-5 w-5' />
                        <p className='t-font-bold t-tracking-wider t-text-lg hover:t-underline t-underline-offset-1 t-decoration-neutral-700 t-text-neutral-700'>Back to Log in</p>
                    </Link>
                    <div className='t-z-10 t-my-4 w-full t-flex t-space-y-5 t-flex-col t-items-center t-justify-center'>
                        <h2 className='t-text-blue-400 t-font-bold lg:t-text-4xl t-text-3xl t-text-center'>Reset Your Password</h2>
                        <p className='t-text-sm t-text-stone-500 lg:t-w-8/12 t-w-11/12 t-text-center t-flex t-flex-col'><span>Write Your Email Account to change password </span><span>We will send a message in few minutes</span></p>
                    </div>
                    <div style={{ display: success ? "none" : "" }} className='t-z-10 lg:t-w-6/12 t-w-10/12 md:t-w-8/12'>
                        <div className='t-flex t-space-y-1 t-flex-col t-w-full'>
                            <label onClick={() => { emailInput.current.focus() }} className='t-relative t-h-0 t-duration-150  t-left-2 t-cursor-text t-select-none t-text-stone-700 t-translate-y-[21px] t-text-sm'>email</label>
                            <input type="text" ref={emailInput} className="t-bg-white t-duration-150 t-rounded-md t-outline-none t-h-10 t-px-2 t-py-[25px] t-border-2 t-border-stone-200  before:t-z-50 before:t-left-0" />
                        </div>
                        <div className='lg:t-w-6/12 t-w-10/12 md:t-w-8/12 t-flex t-flex-col t-mb-2 t-mt-1'>
                            {emailErrors.map((element, index) => {
                                return (
                                    <p key={index} className="t-text-red-400 t-ml-1 t-text-[12px] t-font-semibold">
                                        {element}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                    <div className='t-z-10 lg:t-w-6/12 t-w-10/12 md:t-w-8/12 t-mt-5'>
                        {!success && ((!isLoading) && (<button onClick={handleSubmit} disabled={emailErrors.length != 0 || !email.length ? true : false} className={`t-will-change-auto ${emailErrors.length === 0 && email.length ? "hover:t-text-blue-400 hover:t-bg-white hover:t-shadow-none" : "t-opacity-30 t-cursor-not-allowed"} t-border-blue-400 t-border-2 t-duration-200 t-delay-75 t-h-12 t-w-full t-text-white t-bg-blue-400 t-text-lg t-rounded-md t-shadow-lg t-shadow-blue-300`}>Send Email</button>)
                            || (<Loader className="lg:t-mx-0 t-mx-auto" height="40px" size="35px" border="6px" color="#60a5fa" />))}
                        {success && <div className='t-w-full t-h-14 t-rounded-md t-flex t-items-center t-space-x-3 t-bg-green-200'>
                            <img src="/assets/icons/checked.png" className='h-7 w-7 ml-3' />
                            <p className='t-text-green-600 t-text-[13px]'>An email has been sent to you successfully</p>
                        </div>}
                    </div>
                    <div className='-t-z-10 t-hidden lg:t-flex t-h-full t-w-full t-bg-blue-200 -t-right-11 t-absolute t-mt-16 t-rounded-lg t-mr-2'></div>
                </div>
            </div>
        </div >
    )
}

export default ForgetPassword