import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom"
import { UseDynamicInput } from '../../hooks/UseDyInp'
import { UseTrueEmail, UseTrueString } from "../../hooks/strings"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { loginReducer } from '../../reducer/loginReducer'
import { useCookies } from "react-cookie"
import Loader from '../Loader/Loader'
const Sign = () => {
    const tel = useRef("")
    const firstName = useRef("")
    const lastName = useRef("")
    const password = useRef("")
    const email = useRef("")
    const indexTel = useRef("france")


    /*Backend url*/
    const url = useSelector(element => element.url)
    console.log(url);

    const [telValue] = UseDynamicInput(tel)
    const [firstNameValue] = UseDynamicInput(firstName)
    const [lastNameValue] = UseDynamicInput(lastName)
    const [emailValue] = UseDynamicInput(email)
    const [passwordValue] = UseDynamicInput(password)



    return (
        <div className='w-full min-h-screen flex items-center'>
            <div className='w-6/12 h-screen order-2 hidden lg:flex fixed top-0 right-0'>
                <img src='/assets/images/littleGril.jpg' className='h-full w-full' />
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
                    <div className='flex lg:flex-row flex-col w-full mb-7'>
                        <div className='flex space-y-1 flex-col lg:w-[49%] w-full mb-7 lg:mb-0'>
                            <label onClick={() => { firstName.current.focus() }} className='relative h-0 duration-150  left-2 cursor-text select-none text-stone-700 translate-y-[21px] text-sm'>First name</label>
                            <input ref={firstName} type="text" className="bg-white duration-150 rounded-md outline-none h-10 px-2 py-[25px] border-2 border-stone-200  before:z-50 before:left-0" />
                        </div>
                        <div className='flex space-y-1 lg:ml-[2%] flex-col lg:w-[49%] w-full'>
                            <label onClick={() => { lastName.current.focus() }} className='relative h-0 duration-150  left-2 cursor-text select-none text-stone-700 translate-y-[21px] text-sm'>Last name</label>
                            <input ref={lastName} type="text" className="bg-white duration-150 rounded-md outline-none h-10 px-2 py-[25px] border-2 border-stone-200  before:z-50 before:left-0" />
                        </div>
                    </div>
                    <div className='flex space-y-1 flex-col w-full mb-7'>
                        <label onClick={() => { email.current.focus() }} className='relative h-0 duration-150  left-2 cursor-text select-none text-stone-700 translate-y-[21px] text-sm'>email</label>
                        <input ref={email} type="text" className="bg-white duration-150 rounded-md outline-none h-10 px-2 py-[25px] border-2 border-stone-200  before:z-50 before:left-0" />
                    </div>
                    <div className='mb-7 flex items-center justify-end'>
                        <div className='flex space-y-1 flex-col w-full'>
                            <label onClick={() => { tel.current.focus() }} className='relative h-0 duration-150 left-2 cursor-text select-none text-stone-700 translate-y-[21px] text-sm'>number</label>
                            <input ref={tel} type="tel" className="bg-white duration-150 rounded-md outline-none h-10 px-2 py-[25px] border-2 border-stone-200  before:z-50 before:left-0" />
                        </div>
                        <select ref={indexTel} className='absolute h-[52px] text-[9px] cursor-pointer rounded-sm mt-1 mr-[1px] text-center outline-none w-[90px]  text-white border-2 bg-blue-400 border-transparent'>
                            <option value="tunisia">(+216) Tunisia</option>
                            <option value="france">(+300) France</option>
                        </select>
                    </div>
                    <div className='flex space-y-1 flex-col w-full mb-7'>
                        <label onClick={() => { password.current.focus() }} className='relative h-0 duration-150  left-2 cursor-text select-none text-stone-700 translate-y-[21px] text-sm'>password</label>
                        <input ref={password} type="password" className="bg-white duration-150 rounded-md outline-none h-10 px-2 py-[25px] border-2 border-stone-200  before:z-50 before:left-0" />
                    </div>
                </div>
                <div className='z-10 lg:w-7/12 w-10/12 md:w-8/12 mt-10'>
                    <button className={`will-change-auto hover:text-blue-400 hover:bg-white hover:shadow-none border-blue-400 border-2 duration-200 delay-75 h-12 lg:w-40 w-full text-white bg-blue-400 text-lg rounded-md shadow-lg shadow-blue-300`}>Create Account</button>
                </div>
            </div >
        </div >
    )
}

export default Sign