import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { UseDynamicInput } from '../../hooks/UseDyInp'
import { UseTrueEmail, UseTrueString } from "../../hooks/strings"
import { context } from "../../index"
import axios from 'axios'
import { useCookies } from "react-cookie"
import Loader from '../Loader/Loader'
import { UseLogged } from "../../hooks/UseLogged"
const Login = () => {

    const navigate = useNavigate()
    const [cookie, setCookie] = useCookies()
    const isLogged = cookie.clid != undefined
    useEffect(() => {   
        if (isLogged) {/*must change to !isLogged*/
            navigate("/")
        }
    }, [])


    /*cookie */
    const [cookies, setCookies] = useCookies()
    const [isLoading, setIsLoading] = useState(false)
    const { url } = useContext(context)

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
            axios.post(url + "/login.php", data).then((res) => {
                if (res.data.success) {
                    setCookies("clid", res.data.id, { maxAge: 7 * 24 * 60 * 60 * 60 })
                    navigate("/")
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
        <div className='t-min-h-screen t-flex t-items-center t-justify-center t-font-body'>
            <div className='t-w-full lg:t-fixed t-lg:inset-0 t-min-h-full t-flex t-items-center t-justify-center'>
                <div className='t-min-h-screen lg:t-flex t-hidden t-w-7/12 t-bg-neutral-900 selection:t-bg-white selection:t-text-blue-300'>
                    <div className='t-mx-auto t-relative t-right-10 t-flex t-flex-col t-items-center t-justify-center'>
                        <img className='t-h-[450px] t-mb-3 t-w-[450px]' src="/assets/images/finalImage.png" alt="" />
                        <h1 className='t-text-lg t-text-white t-w-7/12 t-text-center t-mx-auto'>Hey, Customers Welcome to our awesome Store where we provides you the latest and the top branded jewelery. don't be stingy to Log-in with your account and navigate into our world.</h1>
                    </div>
                </div>
                <Link to="/" className='lg:t-text-white t-flex t-items-center t-justify-center t-space-x-2 t-text-black t-absolute lg:t-top-10 t-z-50 lg:t-left-10 t-left-1 t-top-2 hover:t-text-underline lg:t-decoration-white t-decoration-black t-underline-offset-1 t-text-xl t-cursor-pointer'>
                    <img src="/assets/icons/left-arrow.png" className='t-h-5 t-w-5 lg:t-hidden' />
                    <p className='t-font-bold t-tracking-wider t-text-lg hover:t-underline t-underline-offset-1 t-decoration-neutral-600 t-text-neutral-800 lg:t-text-white lg:t-decoration-white'>Home</p>
                </Link>
                <div className='selection:t-bg-blue-300 selection:t-text-white t-py-14 lg:t-py-8 lg:t-w-5/12 t-w-full t-shadow-lg t-shadow-black/20 lg:t-relative t-bottom-5 t-rounded-lg t-right-24 t-bg-white  t-min-h-screen lg:t-min-h-min t-flex t-flex-col t-items-center t-justify-center'>
                    <h2 className='t-text-neutral-600 t-text-md t-mb-5 t-font-semibold'>Don't Have An Account ?<Link to="/sign" className="t-text-blue-500 hover:t-underline t-decoration-blue-500"> Sign Up</Link> </h2>
                    <div className='lg:t-w-6/12 t-w-9/12 t-flex t-items-center t-space-x-6 t-justify-center'>
                        <div className='t-h-1 t-bg-neutral-700 t-w-1/3'></div>
                        <p>OR</p>
                        <div className='t-h-1 t-bg-neutral-700 t-w-1/3'></div>
                    </div>
                    <div className='t-z-10 t-my-10 t-w-full t-flex t-space-y-5 t-flex-col t-items-center t-justify-center'>
                        <h2 className='t-text-blue-400 t-font-bold t-text-5xl lg:t-text-4xl'>Log in</h2>
                        <p className='lg:t-text-sm t-text-md t-text-stone-500 lg:t-w-6/12 t-w-10/12 t-text-center '>Please fill up this Formuler  with your personal informations.</p>
                    </div>
                    <div className='t-z-10 lg:t-w-6/12 t-w-10/12 md:t-w-8/12'>
                        <div className='t-flex t-space-y-1 t-flex-col t-w-full'>
                            <label onClick={() => { emailInput.current.focus() }} className='t-relative t-h-0 t-duration-150  t-left-2 t-cursor-text t-select-none t-text-stone-700 t-translate-y-[21px] t-text-sm'>email</label>
                            <input type="text" ref={emailInput} className="t-bg-white t-duration-150 t-rounded-md t-outline-none t-h-10 t-px-2 t-py-[25px] t-border-2 t-border-stone-200  before:t-z-50 before:t-left-0" />
                        </div>
                        <div className='lg:t-w-6/12 t-w-10/12 md:t-w-8/12 t-flex t-flex-col t-mb-7 lg:t-mb-2 t-mt-1'>
                            {emailErrors.map((element, index) => {
                                return (
                                    <p key={index} className="t-text-red-400 t-ml-1 t-text-[12px] t-font-semibold">
                                        {element}
                                    </p>
                                )
                            })}
                        </div>
                        <div className='t-flex t-space-y-1 t-flex-col t-w-full'>
                            <label onClick={() => { passwordInput.current.focus() }} className='t-relative t-h-0 t-duration-150 t-left-2 t-cursor-text t-select-none t-text-stone-700 t-translate-y-[21px] t-text-sm'>password</label>
                            <input type="password" ref={passwordInput} className="t-bg-white t-duration-150 t-rounded-md t-outline-none t-h-10 t-px-2 t-py-[25px] t-border-2 t-border-stone-200  before:t-z-50 before:t-left-0" />
                        </div>
                    </div>
                    <div className='t-mt-4 lg:t-w-6/12 t-w-10/12 md:t-w-8/12'>
                        <Link to="ForgetPassword" className='t-underline t-underline-offset-1  t-decoration-blue-500 t-text-blue-500 hover:t-text-blue-700 t-text-sm ' >Forget Password ?</Link>
                    </div>
                    {fetchError && (<p className='t-text-red-400 t-text-sm t-font-semibold t-mt-5'>Invalid Email or Password</p>)}
                    <div className='t-z-10 lg:t-w-6/12 t-w-10/12 md:t-w-8/12 t-mt-10'>
                        {!isLoading && (<button onClick={handleSubmit} disabled={emailErrors.length != 0 || !email.length ? true : false} className={`t-will-change-auto ${emailErrors.length === 0 && email.length ? "hover:t-text-blue-400 hover:t-bg-white hover:t-shadow-none" : "t-opacity-30 t-cursor-not-allowed"} t-border-blue-400 t-border-2 t-duration-200 t-delay-75 t-h-12 lg:t-w-28 t-w-full t-text-white t-bg-blue-400 t-text-lg t-rounded-md t-shadow-lg t-shadow-blue-300`}>Log In</button>)
                            || (<Loader className="lg:t-mx-0 t-mx-auto" height="40px" size="35px" border="6px" color="#60a5fa" />)}
                    </div>
                    <div className='-t-z-10 t-hidden lg:t-flex t-h-full t-w-full t-bg-blue-200 -t-right-11 t-absolute t-mt-16 t-rounded-lg t-mr-2'></div>
                </div>
            </div>
        </div>
    )
}

export default Login