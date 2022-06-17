import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import "./ChangePassword.scss"
import Loader from "../Loader/Loader"
import axios from "axios"
import { UseDynamicInput } from '../../hooks/UseDyInp'
import { useSelector } from 'react-redux'


const ChangePassword = () => {


    const [success, setSucess] = useState(false)


    const [isLoading, setIsLoading] = useState(false)

    const password = useRef(null)
    const confirme = useRef(null)

    const { accountName, operationId } = useParams()

    const navigate = useNavigate()
    const url = useSelector(element => element.url)


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
        <div className='min-h-screen w-full justify-center flex items-center font-body bg-neutral-100'>
            <form className="mx-auto rounded-md pt-14 shadow-lg lg:py-10 py-7 min-h-screen lg:min-h-0 bg-white my-0 lg:my-16 flex flex-col justify-center space-y-12 items-center lg:w-6/12 w-full font-body">
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-center tracking-widest text-neutral-600">Change Password</h2>
                    <p className="text-sm w-10/12 lg:w-8/12 break-words text-center mx-auto text-stone-400 tracking-wider"> Please fill up this Formuler with Your new Password</p>
                </div>
                <div style={{ display: success ? "none" : "" }} className='lg:w-7/12 w-10/12 md:w-8/12'>
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
                    <div className='flex space-y-1 flex-col w-full mb-2'>
                        <label onClick={() => { confirme.current.focus() }} className='relative h-0 duration-150  left-2 cursor-text select-none text-stone-700 translate-y-[21px] text-sm'>confirm your password</label>
                        <input ref={confirme} type="password" className="bg-white duration-150 rounded-md outline-none h-10 px-2 py-[25px] border-2 border-stone-200  before:z-50 before:left-0" />
                    </div>
                    <div className='flex flex-col mb-5'>
                        {confirmeError && <p className='text-red-500 text-sm'>Please Confirm right your password</p>}
                    </div>
                </div>
                {!success && (<div className='z-10 lg:w-7/12 w-10/12 md:w-8/12 mt-10'>
                    {!isLoading && (<button disabled={submit} onClick={handleSubmit} className={`will-change-auto ${!submit ? "hover:text-blue-400 shadow-lg bg-blue-400 hover:bg-white hover:shadow-none border-blue-400" : "bg-blue-400/30 cursor-not-allowed border-none shadow-none"}   border-2 duration-200 delay-75 h-12 lg:w-40 w-full text-white text-lg rounded-md shadow-lg shadow-blue-300`}>Change</button>)
                        || (<Loader className="mx-auto lg:mx-0" height="55px" size="50px" border="5px" color="#60a5fa" />)}
                </div>)}
                {success && (<div className='z-10 lg:w-7/12 w-10/12 md:w-8/12 mt-10 flex items-center space-x-2 bg-green-300 rounded-md py-4 p-3'>
                    <img src="/assets/icons/checked.png" className='h-7 w-7' />
                    <p className='text-sm text-green-600 font-semibold tracking-wider'>Your password has been changed successfully</p>
                </div>)}

            </form>
        </div>
    )
}

export default ChangePassword