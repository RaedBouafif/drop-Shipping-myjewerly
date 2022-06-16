import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom"
import { UseDynamicInput } from '../../hooks/UseDyInp'
import { UseTrueEmail, UseTrueString } from "../../hooks/strings"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { loginReducer } from '../../reducer/loginReducer'
import { useCookies } from "react-cookie"
import Loader from '../Loader/Loader'
const Login = () => {
    /*cookie */
    const [cookies, setCookies] = useCookies()
    const [isLoading, setIsLoading] = useState(false)

    const dispatcher = useDispatch()
    const url = useSelector(element => element.url)
    const emailInput = useRef(null)
    const passwordInput = useRef(null)
    const [fetchError, setFetchError] = useState(false)

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
    const [password] = UseDynamicInput(passwordInput)



    const handleSubmit = (e) => {
        e.preventDefault()
        if (!emailErrors.length) {
            setIsLoading(true)
            var data = new FormData()
            data.append("email", email)
            data.append("password", password)
            axios.post(url + "/login.php").then((res) => {
                if (res.success) {
                    dispatcher(loginReducer(res.id))
                    setCookies("clid", res.id, { maxAge: 7 * 24 * 60 * 60 * 60 })
                }
                else {
                    setFetchError(true)
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
                        <img className='h-[450px] w-[600px]' src="./assets/images/online-shopping.png" alt="" />
                        <h1 className='text-lg text-white w-7/12 text-center mx-auto'>Hey, Customers Welcome to our awesome Store where we provides you the latest and the top branded jewelery. don't be stingy to Log-in with your account and navigate into our world.</h1>
                    </div>
                </div>
                <div className='selection:bg-blue-300 selection:text-white py-8 lg:w-5/12 w-full shadow-lg shadow-black/20 lg:relative bottom-5 rounded-lg right-24 bg-white  min-h-screen lg:min-h-min flex flex-col items-center justify-center'>
                    <h2 className='text-neutral-600 text-md mb-5 font-semibold'>Don't Have An Account ?<Link to="/sign" className="text-blue-500 hover:underline decoration-blue-500"> Sign Up</Link> </h2>
                    <div className='lg:w-6/12 w-9/12 flex items-center space-x-6 justify-center'>
                        <div className='h-1 bg-neutral-700 w-1/3'></div>
                        <p>OR</p>
                        <div className='h-1 bg-neutral-700 w-1/3'></div>
                    </div>
                    <div className='z-10 my-10 w-full flex space-y-5 flex-col items-center justify-center'>
                        <h2 className='text-blue-400 font-bold text-5xl lg:text-4xl'>Log in</h2>
                        <p className='lg:text-sm text-md text-stone-500 lg:w-6/12 w-10/12 text-center '>Please fill up this Formuler  with your personal informations.</p>
                    </div>
                    <div className='z-10 lg:w-6/12 w-10/12 md:w-8/12'>
                        <div className='flex space-y-1 flex-col w-full'>
                            <label onClick={() => { emailInput.current.focus() }} className='relative h-0 duration-150  left-2 cursor-text select-none text-stone-700 translate-y-[21px] text-sm'>email</label>
                            <input type="text" ref={emailInput} className="bg-white duration-150 rounded-md outline-none h-10 px-2 py-[25px] border-2 border-stone-200  before:z-50 before:left-0" />
                        </div>
                        <div className='lg:w-6/12 w-10/12 md:w-8/12 flex flex-col mb-7 lg:mb-2 mt-1'>
                            {emailErrors.map((element, index) => {
                                return (
                                    <p key={index} className="text-red-400 ml-1 text-[12px] font-semibold">
                                        {element}
                                    </p>
                                )
                            })}
                        </div>
                        <div className='flex space-y-1 flex-col w-full'>
                            <label onClick={() => { passwordInput.current.focus() }} className='relative h-0 duration-150  left-2 cursor-text select-none text-stone-700 translate-y-[21px] text-sm'>password</label>
                            <input type="password" ref={passwordInput} className="bg-white duration-150 rounded-md outline-none h-10 px-2 py-[25px] border-2 border-stone-200  before:z-50 before:left-0" />
                        </div>
                    </div>
                    <div className='mt-4 lg:w-6/12 w-10/12 md:w-8/12'>
                        <Link to="ForgetPassword" className='underline underline-offset-1  decoration-blue-500 text-blue-500 hover:text-blue-700 text-sm ' >Forget Password ?</Link>
                    </div>
                    {fetchError && (<p className='text-red-400 text-sm font-semibold mt-5'>Invalid Email or Password</p>)}
                    <div className='z-10 lg:w-6/12 w-10/12 md:w-8/12 mt-10'>
                        {!isLoading && (<button onClick={handleSubmit} disabled={emailErrors.length != 0 || !email.length ? true : false} className={`will-change-auto ${emailErrors.length === 0 && email.length ? "hover:text-blue-400 hover:bg-white hover:shadow-none" : "opacity-30 cursor-not-allowed"} border-blue-400 border-2 duration-200 delay-75 h-12 lg:w-28 w-full text-white bg-blue-400 text-lg rounded-md shadow-lg shadow-blue-300`}>Log In</button>)
                            || (<Loader className="lg:mx-0 mx-auto" height="40px" size="35px" border="6px" color="#60a5fa" />)}
                    </div>
                    <div className='-z-10 hidden lg:flex h-full w-full bg-blue-200 -right-11 absolute mt-16 rounded-lg mr-2'></div>
                </div>
            </div>
        </div>
    )
}

export default Login