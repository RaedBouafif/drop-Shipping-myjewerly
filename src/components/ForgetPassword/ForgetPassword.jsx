import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom"
import { UseDynamicInput } from '../../hooks/UseDyInp'
import { UseTrueEmail, UseTrueString } from "../../hooks/strings"
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../Loader/Loader'
import "./ForgetPassword.scss"

const ForgetPassword = () => {
    /*cookie */
    const [isLoading, setIsLoading] = useState(false)
    const url = useSelector(element => element.url)
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
            var data = new FormData()
            data.append("email", email)
            axios.post(url + "/resetPassword.php").then((res) => {
                if (res.success) {
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
        <div className='min-h-screen flex items-center justify-center font-body'>
            <div className='w-full lg:fixed lg:inset-0 min-h-full flex items-center justify-center'>
                <div className='min-h-screen lg:flex hidden w-7/12 bg-neutral-900 selection:bg-white selection:text-blue-300'>
                    <div className='mx-auto relative right-10 flex flex-col items-center justify-center'>
                        <img className='h-[450px] w-[600px]' src="/assets/images/online-shopping.png" alt="" />
                        <p className='text-lg text-white w-7/12 text-center mx-auto'>Hey, Customers Welcome to our awesome Store where we provides you the latest and the top branded jewelery. don't be stingy to Log-in with your account and navigate into our world.</p>
                    </div>
                </div>
                <div className='selection:bg-blue-300 selection:text-white py-8 lg:w-5/12 w-full shadow-lg shadow-black/20 lg:relative bottom-5 rounded-lg right-24 bg-white  min-h-screen lg:min-h-min flex flex-col items-center justify-center'>
                    <Link to="/login" className='lg:relative absolute top-7 left-2 flex items-center self-start lg:left-2 lg:-top-3 space-x-2'>
                        <img src="/assets/icons/left-arrow.png" className='h-5 w-5' />
                        <p className='font-bold tracking-wider text-lg hover:underline underline-offset-1 decoration-neutral-700 text-neutral-700'>Back to Login</p>
                    </Link>
                    <div className='z-10 my-4 w-full flex space-y-5 flex-col items-center justify-center'>
                        <h2 className='text-blue-400 font-bold lg:text-4xl text-3xl text-center'>Reset Your Password</h2>
                        <p className='text-sm text-stone-500 lg:w-8/12 w-11/12 text-center flex flex-col'><span>Write Your Email Account to change password </span><span>We will send a message in few minutes</span></p>
                    </div>
                    <div style={{ display: success ? "none" : "" }} className='z-10 lg:w-6/12 w-10/12 md:w-8/12'>
                        <div className='flex space-y-1 flex-col w-full'>
                            <label onClick={() => { emailInput.current.focus() }} className='relative h-0 duration-150  left-2 cursor-text select-none text-stone-700 translate-y-[21px] text-sm'>email</label>
                            <input type="text" ref={emailInput} className="bg-white duration-150 rounded-md outline-none h-10 px-2 py-[25px] border-2 border-stone-200  before:z-50 before:left-0" />
                        </div>
                        <div className='lg:w-6/12 w-10/12 md:w-8/12 flex flex-col mb-2 mt-1'>
                            {emailErrors.map((element, index) => {
                                return (
                                    <p key={index} className="text-red-400 ml-1 text-[12px] font-semibold">
                                        {element}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                    <div className='z-10 lg:w-6/12 w-10/12 md:w-8/12 mt-5'>
                        {!success && ((!isLoading) && (<button onClick={handleSubmit} disabled={emailErrors.length != 0 || !email.length ? true : false} className={`will-change-auto ${emailErrors.length === 0 && email.length ? "hover:text-blue-400 hover:bg-white hover:shadow-none" : "opacity-30 cursor-not-allowed"} border-blue-400 border-2 duration-200 delay-75 h-12 w-full text-white bg-blue-400 text-lg rounded-md shadow-lg shadow-blue-300`}>Send Email</button>)
                            || (<Loader className="lg:mx-0 mx-auto" height="40px" size="35px" border="6px" color="#60a5fa" />))}
                        {success && <div className='w-full h-14 rounded-md flex items-center space-x-3 bg-green-200'>
                            <img src="/assets/icons/checked.png" className='h-7 w-7 ml-3' />
                            <p className='text-green-600 text-[13px]'>An email has been sent to you successfully</p>
                        </div>}
                    </div>
                    <div className='-z-10 hidden lg:flex h-full w-full bg-blue-200 -right-11 absolute mt-16 rounded-lg mr-2'></div>
                </div>
            </div>
        </div >
    )
}

export default ForgetPassword