import React, { useRef, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UseTrueString } from "../../hooks/strings"
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { loginReducer } from "../../reducer/loginReducer"
import axios from "axios"
import Loader from "../Loader/Loader"
import { UseLogged } from "../../hooks/UseLogged"
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
    const url = useSelector(element => element.url)


    const dispatcher = useDispatch()

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
                dispatcher(loginReducer(res.id))
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
        <div className='min-h-screen w-full justify-center flex items-center font-body bg-blue-50'>
            <Link to="/sign" className='absolute left-4 top-5 flex items-center self-start space-x-2'>
                <img src="/assets/icons/left-arrow.png" className='h-5 w-5' />
                <p className='font-bold tracking-wider text-lg hover:underline underline-offset-1 decoration-neutral-600 text-neutral-600'>Back to Sign up</p>
            </Link>
            <form className="mx-auto rounded-md shadow-lg lg:py-16 py-7 min-h-screen lg:min-h-0 bg-white my-0 lg:my-16 flex flex-col justify-center space-y-12 items-center lg:w-6/12 w-full font-body">
                <div className='mt-10 md:mt-0'>
                    <img className="h-56 w-96" src="/assets/images/subscribe.png" alt="email illustration" />
                </div>
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-center tracking-widest text-neutral-600">Verify Your Email</h2>
                    <p className="text-sm lg:text-xs text-stone-400 tracking-wider">We have sent a verification code to your email</p>
                </div>
                <div className="w-10/12 lg:w-8/12">
                    <input ref={codeInput} onInput={() => { setCode(() => UseTrueString(codeInput.current.value)) }} className="border-b-2 inputCode focus:bg-stone-50 rounded-t-md text-lg font-semibold text-neutral-800 tracking-widest lg:h-12 h-14 border-blue-400 w-full pl-1 outline-none"
                        type="text" placeholder="6 characters code" />
                </div>
                {error && (<div className='h-14 p-3 w-10/12 lg:w-auto space-x-2 bg-red-300 rounded-md items-center flex'>
                    <img src="/assets/icons/cross.png" className='h-5 w-5' />
                    <p className='text-sm text-red-500 tracking-widest font-semibold '>Invalid verification code</p>
                </div>)}
                {!isLoading && (<button onClick={handleSubmit} className="text-white shadow-lg hover:bg-white border-2 border-blue-400 hover:shadow-none hover:text-blue-400 duration-150 delay-100  bg-blue-400 rounded-sm w-10/12 lg:w-40 py-2">Send</button>)
                    || (<Loader className="lg:mx-0 mx-auto" height="40px" size="35px" border="6px" color="#60a5fa" />)}
            </form>
        </div>
    )
}

export default Verify