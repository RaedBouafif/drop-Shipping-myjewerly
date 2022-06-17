import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { UseDynamicInput } from '../../hooks/UseDyInp'
import { UseTrueEmail, UseTrueString } from "../../hooks/strings"
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../Loader/Loader'
import Image from "../../customElement/Image"
import Options from "./Options"
import "./Sign.scss"
import { UseLogged } from "../../hooks/UseLogged"
const Sign = () => {
    /* check if user connected*/
    UseLogged("/");

    const tel = useRef("")
    const firstName = useRef("")
    const lastName = useRef("")
    const password = useRef("")
    const email = useRef("")
    const indexTel = useRef("")
    const [emailExist, setEmailExist] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    /*Backend url*/
    const url = useSelector(element => element.url)
    /* navigate instance*/
    const navigate = useNavigate()

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
                if (res.emailExist) {
                    setEmailExist(true)
                }
                else {
                    data.code = res.code
                    setEmailExist(false)
                    navigate("/verifyEmail", { state: data })
                }
            }).catch((err) => {
                console.log("error : " + err)
            })
        }
    }
    return (
        <div className='w-full min-h-screen flex items-center font-body'>
            <div className='w-6/12 h-screen order-2 lg:flex hidden fixed top-0 right-0 items-center justify-end'>
                <Image src="/assets/images/littleGril.jpg" className="h-full w-full" alt="image for sign up" />
                <div className='absolute mr-5'>
                    <h1 className='text-pink-500 text-[27px] font-bold'>Why <span className='text-[35px] text-neutral-700 tracking-widest font-title'>MyJewerly</span></h1>
                    <ul className='pr-2 mt-5 space-y-2 text-neutral-600 text-[18px]'>
                        <li>
                            <p className=' font-bold w-60 text-right'>Express delivery</p>
                        </li>
                        <li>
                            <p className=' font-bold w-60 text-right'>Top Branded Jewerly & Watches</p>
                        </li>
                        <li>
                            <p className=' font-bold w-60 text-right'>Cheapest prices</p>
                        </li>
                        <li>
                            <p className='font-bold w-60 text-right'>Security</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='order-1 selection:bg-blue-300 selection:text-white py-8 lg:py-12 lg:w-6/12 w-full shadow-lg shadow-black/20 rounded-lg bg-white  min-h-screen flex flex-col items-center justify-center'>
                <h2 className='text-neutral-600 text-md mb-5 font-semibold'>You Have An Account ?<Link to="/login" className="text-blue-500 hover:underline decoration-blue-500"> Log in</Link> </h2>
                <div className='lg:w-6/12 w-9/12 flex items-center space-x-6 justify-center'>
                    <div className='h-1 bg-neutral-700 w-1/3'></div>
                    <p>OR</p>
                    <div className='h-1 bg-neutral-700 w-1/3'></div>
                </div>
                <div className='z-10 my-10 w-full flex space-y-5 flex-col items-center justify-center'>
                    <h2 className='text-blue-400 font-bold text-5xl lg:text-4xl'>Sign Up</h2>
                    <p className='lg:text-sm text-md text-stone-500 lg:w-6/12 w-10/12 text-center '>Please fill up this Formuler  with your personal informations.</p>
                </div>
                <div className='z-10 lg:w-7/12 w-10/12 md:w-8/12'>
                    <div className='flex lg:flex-row flex-col w-full mb-2'>
                        <div className='flex space-y-1 flex-col lg:w-[49%] w-full mb-2 lg:mb-0'>
                            <label onClick={() => { firstName.current.focus() }} className='relative h-0 duration-150  left-2 cursor-text select-none text-stone-700 translate-y-[21px] text-sm'>First name</label>
                            <input ref={firstName} type="text" className="bg-white duration-150 rounded-md outline-none h-10 px-2 py-[25px] border-2 border-stone-200  before:z-50 before:left-0" />
                        </div>
                        <div className='mb-5 lg:hidden'>
                            {firstNameErros.map((element, index) => {
                                return (
                                    <p key={index} className='text-red-500 text-sm'>{element}</p>
                                )
                            })}
                        </div>
                        <div className='flex space-y-1 mb-2 lg:ml-[2%] flex-col lg:w-[49%] w-full'>
                            <label onClick={() => { lastName.current.focus() }} className='relative h-0 duration-150  left-2 cursor-text select-none text-stone-700 translate-y-[21px] text-sm'>Last name</label>
                            <input ref={lastName} type="text" className="bg-white duration-150 rounded-md outline-none h-10 px-2 py-[25px] border-2 border-stone-200  before:z-50 before:left-0" />
                        </div>
                        <div className='mb-5 lg:hidden'>
                            {lastNameErrors.map((element, index) => {
                                return (
                                    <p key={index} className='text-red-500 text-sm'>{element}</p>
                                )
                            })}
                        </div>
                    </div>
                    <div className='mb-5 hidden lg:flex flex-col'>
                        {[...firstNameErros, ...lastNameErrors].map((element, index) => {
                            return (
                                <p key={index} className='text-red-500 text-sm'>{element}</p>
                            )
                        })}
                    </div>
                    <div className='flex space-y-1 flex-col w-full mb-2'>
                        <label onClick={() => { email.current.focus() }} className='relative h-0 duration-150  left-2 cursor-text select-none text-stone-700 translate-y-[21px] text-sm'>email</label>
                        <input ref={email} type="text" className="bg-white duration-150 rounded-md outline-none h-10 px-2 py-[25px] border-2 border-stone-200  before:z-50 before:left-0" />
                    </div>
                    <div className='flex flex-col mb-5'>
                        {emailErrors.map((element, index) => {
                            return (
                                <p key={index} className='text-red-500 text-sm'>{element}</p>
                            )
                        })}
                    </div>
                    <div className='mb-2 flex items-center justify-end'>
                        <div className='flex space-y-1 flex-col w-full'>
                            <label onClick={() => { tel.current.focus() }} className='relative h-0 duration-150 left-2 cursor-text select-none text-stone-700 translate-y-[21px] text-sm'>number</label>
                            <input ref={tel} type="tel" className="bg-white duration-150 rounded-md outline-none h-10 px-2 py-[25px] border-2 border-stone-200  before:z-50 before:left-0" />
                        </div>
                        <select id="test" ref={indexTel} className='signSelect absolute h-[52px] text-[9px] cursor-pointer rounded-sm mt-1 mr-[1px] text-center outline-none w-[90px]  text-white border-2 bg-blue-400 border-transparent'>
                            <Options />
                        </select>
                    </div>
                    <div className='flex flex-col mb-5'>
                        {telErros.map((element, index) => {
                            return (
                                <p key={index} className='text-red-500 text-sm'>{element}</p>
                            )
                        })}
                    </div>
                    <div className='flex space-y-1 flex-col w-full mb-2'>
                        <label onClick={() => { password.current.focus() }} className='relative h-0 duration-150  left-2 cursor-text select-none text-stone-700 translate-y-[21px] text-sm'>password</label>
                        <input ref={password} type="password" className="bg-white duration-150 rounded-md outline-none h-10 px-2 py-[25px] border-2 border-stone-200  before:z-50 before:left-0" />
                    </div>
                    <div className='flex flex-col mb-5'>
                        {passwordErrors.map((element, index) => {
                            return (
                                <p key={index} className='text-red-500 text-sm'>{element}</p>
                            )
                        })}
                    </div>
                </div>
                {emailExist && (<div className='lg:w-7/12 w-10/12 md:w-8/12 flex items-center space-x-2'>
                    <img src="/assets/icons/cross.png" className='h-5 w-5' />
                    <p className='text-red-500 text-sm font-semi font-semibold'>Email exist</p>
                </div>)}
                <div className='z-10 lg:w-7/12 w-10/12 md:w-8/12 mt-10'>
                    {!isLoading && (<button disabled={submit} onClick={handleSubmit} className={`will-change-auto ${!submit ? "hover:text-blue-400 shadow-lg bg-blue-400 hover:bg-white hover:shadow-none border-blue-400" : "bg-blue-400/30 cursor-not-allowed border-none shadow-none"}   border-2 duration-200 delay-75 h-12 lg:w-40 w-full text-white text-lg rounded-md shadow-lg shadow-blue-300`}>Create Account</button>)
                        || (<Loader className="mx-auto lg:mx-0" height="55px" size="50px" border="5px" color="#60a5fa" />)}
                </div>
            </div >
        </div >
    )
}

export default Sign