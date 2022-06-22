import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UseTrueString } from "../../hooks/strings"
import { useCookies } from 'react-cookie'
import axios from "axios"
import Loader from "../Loader/Loader"
import { UseLogged } from "../../hooks/UseLogged"
import { context } from "../../index"
const Verify = () => {

    const [cookie, setCookie] = useCookies()
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state

    useEffect(() => {
        if (!data) {
            navigate("/sign")
        }
    }, [])

    /* check if user connected*/
    UseLogged("/");


    /*backend url*/
    const { url } = useContext(context)


    const codeInput = useRef("")
    const [code, setCode] = useState("")
    const [error, setError] = useState(false)
    /*loading state */
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (data.code === code) {
            setError(false)
            var finalData = new FormData()
            finalData.append("firstName", data.firstName)
            finalData.append("lastName", data.lastName)
            finalData.append("tel", data.tel)
            finalData.append("password", data.password)
            finalData.append("email", data.email)
            axios.post(url + "/signUp.php", finalData).then((res) => {
                setCookie("clid", res.id, { maxAge: 7 * 24 * 60 * 60 * 60 })
                navigate("/")
            }).catch((err) => {
                console.log("error : " + err)
            })
        }
        else {
            setIsLoading(false)
            setError(true)
        }
    }


    return (
        <div className='t-min-h-screen t-w-full t-justify-center t-flex t-items-center t-font-body t-bg-blue-50'>
            <Link to="/sign" className='t-absolute t-left-4 t-top-5 t-flex t-items-center t-self-start t-space-x-2'>
                <img src="/assets/icons/left-arrow.png" className='t-h-5 t-w-5' />
                <p className='t-font-bold t-tracking-wider t-text-lg hover:t-underline t-underline-offset-1 t-decoration-neutral-600 t-text-neutral-600'>Back to Sign up</p>
            </Link>
            <form className="t-mx-auto t-rounded-md t-shadow-lg lg:t-py-16 t-py-7 t-min-h-screen lg:t-min-h-0 t-bg-white t-my-0 lg:t-my-16 t-flex t-flex-col t-items-center lg:t-w-6/12 t-w-full t-font-body">
                <div className='t-mt-10 md:t-mt-0'>
                    <img className="t-h-60 t-w-[32rem]" src="/assets/images/nice.png" alt="email illustration" />
                </div>
                <div className="t-space-y-3 t-mb-16">
                    <h2 className="t-text-2xl t-font-bold t-text-center t-tracking-widest t-text-neutral-600">Verify Your Email</h2>
                    <p className="t-text-sm lg:t-text-xs t-text-stone-400 t-tracking-wider t-w-11/12 t-mx-auto text-center">We have sent a verification code to your email</p>
                </div>
                <div className="t-w-10/12 lg:t-w-8/12 t-mb-16">
                    <input ref={codeInput} onInput={() => { setCode(() => UseTrueString(codeInput.current.value)) }} className="t-border-b-2 t-inputCode focus:t-bg-stone-50 t-rounded-t-md t-text-lg t-font-semibold t-text-neutral-800 t-tracking-widest lg:t-h-12 h-14 t-border-blue-400 t-w-full t-pl-1 t-outline-none"
                        type="text" placeholder="6 characters code" />
                </div>
                {error && (<div className='t-h-14 t-p-3 t-w-10/12 lg:t-w-auto t-space-x-2 t-bg-red-300 t-rounded-md t-items-center t-flex'>
                    <img src="/assets/icons/cross.png" className='t-h-5 t-w-5' />
                    <p className='t-text-sm t-text-red-500 t-tracking-widest t-font-semibold '>Invalid verification code</p>
                </div>)}
                {!isLoading && (<button onClick={handleSubmit} className="t-text-white t-shadow-lg hover:t-bg-white t-border-2 t-border-blue-400 hover:t-shadow-none hover:t-text-blue-400 t-duration-150 t-delay-100  t-bg-blue-400 t-rounded-sm t-w-10/12 lg:t-w-40 t-py-2">Send</button>)
                    || (<Loader className="lg:t-mx-0 t-mx-auto" height="40px" size="35px" border="6px" color="#60a5fa" />)}
            </form>
        </div>
    )
}

export default Verify