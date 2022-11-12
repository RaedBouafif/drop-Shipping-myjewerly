import React, { useRef, useState, useContext } from 'react'
import axios from 'axios'
import { UseTrueEmail, UseTrueString } from "../../hooks/strings"
import { context } from "../../index"
import { useRecoilState } from 'recoil'
import { NotificationAtom } from '../SharedState/NotificationAtom'
import Loader from "../Loader/Loader"
const Contact = () => {
    const email = useRef()
    const message = useRef()
    const { url } = useContext(context)
    const [isLoading, setLoading] = useState(false)
    const [notification, setNotification] = useRecoilState(NotificationAtom)
    const handleSubmit = (e) => {
        e.preventDefault()
        var submit = true
        if (!UseTrueEmail(email.current.value)) {
            submit = false
            email.current.style.borderColor = "red"
            setNotification({
                ...notification, message: "Invalid email", type: "error", visible: true
            })
        } else {
            submit = true
            email.current.style.borderColor = ""
        }
        if (message.current.value.length < 1) {
            submit = false
            message.current.style.borderColor = "red"
            setNotification({
                ...notification, message: "Invalid message", type: "error", visible: true
            })
        } else {
            submit = true
            message.current.style.borderColor = ""
        }
        if (submit) {
            var data = new FormData()
            setLoading(true)
            data.append("email", UseTrueString(email.current.value))
            data.append("message", UseTrueString(message.current.value))
            axios.post(url + "/contact.php", data).then((res) => {
                email.current.value = ""
                message.current.value = ""
                setLoading(false)
                setNotification({
                    ...notification, message: "Message is sent successfully", type: "success", visible: true
                })
            }).catch((res) => {
                setNotification({
                    ...notification, message: "please check your network", type: "error", visible: true
                })
            })
        }
    }
    return (
        <div className="contact_area t-py-20">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="contact_message content">
                            <h3>contact us</h3>
                            <ul>
                                <li><i className="fa fa-envelope-o"> </i> Email: <a
                                    href="mailto:raed.bouaafif@gmail.com">raed.bouaafif@gmail.com</a>
                                </li>
                                <li><i className="fa fa-phone"></i> Phone:<a href="tel:+21696576964"> +21696576964 </a> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="contact_message form">
                            <h3>Feel Free to get touch</h3>
                            <div id="contact-form">
                                <p>
                                    <label> Your Email (required)</label>
                                    <input ref={email} placeholder="Email *" type="email" />
                                </p>
                                <div className="contact_textarea">
                                    <label> Your Message</label>
                                    <textarea ref={message} placeholder="Message *" className="form-control2"></textarea>
                                </div>
                                {!isLoading && <button type="button" onClick={handleSubmit}>Send</button> || <Loader className="lg:t-mx-0 t-mx-auto" height="40px" size="35px" border="6px" color="#60a5fa" />}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact