import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { UseDynamicInput } from '../../hooks/UseDyInp'
import { UseTrueEmail, UseTrueString } from "../../hooks/strings"
import axios from 'axios'
import Loader from '../Loader/Loader'
import Options from "./Options"
import "./Sign.scss"
import { UseLogged } from "../../hooks/UseLogged"
import { context } from "../../index"
import { useCookies } from 'react-cookie'
const Sign = () => {
    /* check if user connected*/
    const navigate = useNavigate()
    const [cookie, setCookie] = useCookies()
    const isLogged = cookie.clid != undefined
    useEffect(() => {
        if (isLogged) {/*must change to !isLogged*/
            navigate("/")
        }
    }, [])

    const tel = useRef("")
    const firstName = useRef("")
    const lastName = useRef("")
    const password = useRef("")
    const email = useRef("")
    const indexTel = useRef("")
    const [emailExist, setEmailExist] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    /*Backend url*/
    const { url } = useContext(context)
    /* navigate instance*/
    /*errors function */
    const errorLastNameFunction = (value) => {
        var errors = []
        if (value.length > 25) {
            errors.push("last name is too long")
        }
        else if (value.length < 3) {
            errors.push("last name is too short")
        }
        return errors
    }
    const errorFirstNameFunction = (value) => {
        var errors = []
        if (value.length > 25) {
            errors.push("first name is too long")
        }
        else if (value.length < 3) {
            errors.push("first name is too short")
        }
        return errors
    }
    const errorTelFunction = (value) => {
        var errors = []
        if (value.length < 4 || value.length > 12 || isNaN(value)) {
            errors.push("Invalid telephone Number")
        }
        return errors
    }
    const errorEmailFunction = (value) => {
        var errors = []
        if (!UseTrueEmail(value)) {
            errors.push("Invalid Email")
        }
        return errors
    }
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
    const filter = (value) => {
        return UseTrueString(value)
    }

    const [telValue, telErros] = UseDynamicInput(tel, errorTelFunction, filter)
    const [firstNameValue, firstNameErros] = UseDynamicInput(firstName, errorFirstNameFunction, filter)
    const [lastNameValue, lastNameErrors] = UseDynamicInput(lastName, errorLastNameFunction, filter)
    const [emailValue, emailErrors] = UseDynamicInput(email, errorEmailFunction, filter)
    const [passwordValue, passwordErrors] = UseDynamicInput(password, errorPasswordFunction)


    const [submit, setSubmit] = useState(true)

    useEffect(() => {
        if (telErros.length) {
            setSubmit(true)
        }
        else if (firstNameErros.length) {
            setSubmit(true)
        }
        else if (emailErrors.length) {
            setSubmit(true)
        }
        else if (passwordErrors.length) {
            setSubmit(true)
        }
        else if (!tel.current.value.length || !firstName.current.value.length
            || !lastName.current.value.length || !password.current.value.length
            || !email.current.value.length) {
            setSubmit(true)
        }
        else {
            setSubmit(false)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!submit) {
            setIsLoading(isLoading)
            var data = {
                "firstName": firstNameValue,
                "lastName": lastNameValue,
                "tel": indexTel.current.value + " " + telValue,
                "email": emailValue,
                "password": passwordValue,
            }
            axios.get(url + `/verifyEmail.php?email=${encodeURIComponent(emailValue)}`).then((res) => {
                if (res.data.emailExist) {
                    setEmailExist(true)
                }
                else {
                    data.code = res.data.code
                    setEmailExist(false)
                    navigate("/", { state: data })
                }
            }).catch((err) => {
                console.log("error : " + err)
            })
        }
    }
    return (
        <div className='t-w-full t-min-h-screen t-flex t-items-center t-font-body'>
            <div className='t-w-6/12 t-min-h-screen t-bg-neutral-900 selection:t-bg-white selection:t-text-blue-300 lg:t-flex t-hidden t-fixed t-top-0 t-left-0 t-items-center t-justify-end'>
                <div className='t-mx-auto t-flex t-flex-col t-h-full t-items-center t-justify-center'>
                    <img className='t-h-[450px] t-mb-3 t-w-[450px]' src="/assets/images/finalImage.png" alt="" />
                    <h1 className='t-text-lg t-text-white t-w-7/12 t-text-center t-mx-auto'>Hey, Customers Welcome to our awesome Store where we provides you the latest and the top branded jewelery. don't be stingy to Log-in with your account and navigate into our world.</h1>
                </div>
            </div>
            <Link to="/" className='lg:t-text-white t-flex t-items-center t-justify-center t-space-x-2 t-text-black t-absolute lg:t-fixed lg:t-top-10 t-z-50 lg:t-left-10 t-left-1 t-top-4 hover:t-text-underline lg:t-decoration-white t-decoration-black t-underline-offset-1 t-text-xl t-cursor-pointer'>
                <img src="/assets/icons/left-arrow.png" className='t-h-5 t-w-5 lg:t-hidden' />
                <p className='t-font-bold t-tracking-wider t-text-lg hover:t-underline t-underline-offset-1 t-decoration-neutral-600 t-text-neutral-800 lg:t-text-white'>Home</p>
            </Link>
            <div className=' selection:t-bg-blue-300 selection:t-text-white t-py-14 lg:t-py-12 lg:t-w-6/12 t-ml-auto t-w-full t-shadow-lg t-shadow-black/20 t-rounded-lg t-bg-white t-min-h-screen t-flex t-flex-col t-items-center t-justify-center'>
                <h2 className='t-text-neutral-600 t-text-md t-mb-5 t-font-semibold'>You Have An Account ?<Link to="/login" className="t-text-blue-500 hover:t-underline decoration-blue-500"> Log in</Link> </h2>
                <div className='lg:t-w-6/12 t-w-9/12 t-flex t-items-center t-space-x-6 t-justify-center'>
                    <div className='t-h-1 t-bg-neutral-700 t-w-1/3'></div>
                    <p>OR</p>
                    <div className='t-h-1 t-bg-neutral-700 t-w-1/3'></div>
                </div>
                <div className='t-z-10 t-my-10 t-w-full t-flex t-space-y-5 t-flex-col t-items-center t-justify-center'>
                    <h2 className='t-text-blue-400 t-font-bold t-text-5xl lg:t-text-4xl'>Sign Up</h2>
                    <p className='lg:t-text-sm t-text-md t-text-stone-500 lg:t-w-6/12 t-w-10/12 t-text-center '>Please fill up this Formuler  with your personal informations.</p>
                </div>
                <div className='t-z-10 lg:t-w-7/12 t-w-10/12 md:t-w-8/12'>
                    <div className='t-flex lg:t-flex-row t-flex-col t-w-full t-mb-2'>
                        <div className='t-flex t-space-y-1 t-flex-col lg:t-w-[49%] t-w-full t-mb-2 lg:t-mb-0'>
                            <label onClick={() => { firstName.current.focus() }} className='t-relative t-h-0 t-duration-150 t-left-2 t-cursor-text t-select-none t-text-stone-700 t-translate-y-[21px] t-text-sm'>First name</label>
                            <input ref={firstName} type="text" className="t-bg-white t-duration-150 t-rounded-md t-outline-none t-h-10 t-px-2 t-py-[25px] t-border-2 t-border-stone-200  before:t-z-50 before:t-left-0" />
                        </div>
                        <div className='t-mb-5 lg:t-hidden'>
                            {firstNameErros.map((element, index) => {
                                return (
                                    <p key={index} className='t-text-red-500 t-text-sm'>{element}</p>
                                )
                            })}
                        </div>
                        <div className='t-flex t-space-y-1 t-mb-2 lg:t-ml-[2%] t-flex-col lg:t-w-[49%] t-w-full'>
                            <label onClick={() => { lastName.current.focus() }} className='t-relative t-h-0 t-duration-150  t-left-2 t-cursor-text t-select-none t-text-stone-700 t-translate-y-[21px] t-text-sm'>Last name</label>
                            <input ref={lastName} type="text" className="t-bg-white t-duration-150 t-rounded-md t-outline-none t-h-10 t-px-2 t-py-[25px] t-border-2 t-border-stone-200  before:t-z-50 before:t-left-0" />
                        </div>
                        <div className='t-mb-5 lg:t-hidden'>
                            {lastNameErrors.map((element, index) => {
                                return (
                                    <p key={index} className='t-text-red-500 t-text-sm'>{element}</p>
                                )
                            })}
                        </div>
                    </div>
                    <div className='t-mb-5 t-hidden lg:t-flex t-flex-col'>
                        {[...firstNameErros, ...lastNameErrors].map((element, index) => {
                            return (
                                <p key={index} className='t-text-red-500 t-text-sm'>{element}</p>
                            )
                        })}
                    </div>
                    <div className='t-flex t-space-y-1 t-flex-col t-w-full t-mb-2'>
                        <label onClick={() => { email.current.focus() }} className='t-relative t-h-0 t-duration-150 t-left-2 t-cursor-text t-select-none t-text-stone-700 t-translate-y-[21px] t-text-sm'>email</label>
                        <input ref={email} type="text" className="t-bg-white t-duration-150 t-rounded-md t-outline-none t-h-10 t-px-2 t-py-[25px] t-border-2 t-border-stone-200 before:t-z-50 before:t-left-0" />
                    </div>
                    <div className='t-flex t-flex-col t-mb-5'>
                        {emailErrors.map((element, index) => {
                            return (
                                <p key={index} className='t-text-red-500 t-text-sm'>{element}</p>
                            )
                        })}
                    </div>
                    <div className='t-mb-2 t-flex t-items-center t-justify-end'>
                        <div className='t-flex t-space-y-1 t-flex-col t-w-full'>
                            <label onClick={() => { tel.current.focus() }} className='t-relative t-h-0 t-duration-150 t-left-2 t-cursor-text t-select-none t-text-stone-700 t-translate-y-[21px] t-text-sm'>number</label>
                            <input ref={tel} type="tel" className="t-bg-white t-duration-150 t-rounded-md t-outline-none t-h-10 t-px-2 t-py-[25px] t-border-2 t-border-stone-200 before:t-z-50 before:t-left-0" />
                        </div>
                        <select id="test" ref={indexTel} className='signSelect t-absolute t-h-[52px] t-text-[9px] t-cursor-pointer t-rounded-sm t-mt-1 t-mr-[1px] t-text-center t-outline-none t-w-[90px] t-text-white t-border-2 t-bg-blue-400 t-border-transparent'>
                            <Options />
                        </select>
                    </div>
                    <div className='t-flex t-flex-col t-mb-5'>
                        {telErros.map((element, index) => {
                            return (
                                <p key={index} className='t-text-red-500 t-text-sm'>{element}</p>
                            )
                        })}
                    </div>
                    <div className='t-flex t-space-y-1 t-flex-col t-w-full t-mb-2'>
                        <label onClick={() => { password.current.focus() }} className='t-relative t-h-0 t-duration-150 t-left-2 t-cursor-text t-select-none t-text-stone-700 t-translate-y-[21px] t-text-sm'>password</label>
                        <input ref={password} type="password" className="t-bg-white t-duration-150 t-rounded-md t-outline-none t-h-10 t-px-2 t-py-[25px] t-border-2 t-border-stone-200  before:t-z-50 before:t-left-0" />
                    </div>
                    <div className='t-flex t-flex-col t-mb-5'>
                        {passwordErrors.map((element, index) => {
                            return (
                                <p key={index} className='t-text-red-500 t-text-sm'>{element}</p>
                            )
                        })}
                    </div>
                </div>
                {emailExist && (<div className='lg:t-w-7/12 t-w-10/12 md:t-w-8/12 t-flex t-items-center t-space-x-2'>
                    <img src="/assets/icons/cross.png" className='t-h-5 t-w-5' />
                    <p className='t-text-red-500 t-text-sm t-font-semibold'>Email exist</p>
                </div>)}
                <div className='t-z-10 lg:t-w-7/12 t-w-10/12 md:t-w-8/12 t-mt-10'>
                    {!isLoading && (<button disabled={submit} onClick={handleSubmit} className={`t-will-change-auto ${!submit ? "hover:t-text-blue-400 t-shadow-lg t-bg-blue-400 hover:t-bg-white hover:t-shadow-none t-border-blue-400" : "t-bg-blue-400/30 t-cursor-not-allowed t-border-none t-shadow-none"}   t-border-2 t-duration-200 t-delay-75 t-h-12 lg:t-w-40 t-w-full t-text-white t-text-lg t-rounded-md t-shadow-lg t-shadow-blue-300`}>Create Account</button>)
                        || (<Loader className="t-mx-auto lg:t-mx-0" height="55px" size="50px" border="5px" color="#60a5fa" />)}
                </div>
            </div >
        </div >
    )
}

export default Sign