import React, { useRef, useContext } from 'react'
import axios from 'axios'
import { UseTrueEmail, UseTrueString } from "../../hooks/strings"
import { context } from "../../index"
import { useRecoilState } from 'recoil'
import { NotificationAtom } from '../SharedState/NotificationAtom'
const Contact = () => {
    const email = useRef()
    const message = useRef()
    const { url } = useContext(context)
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
            data.append("email", UseTrueString(email.current.value))
            axios.post(url + "/contact.php", UseTrueString(message.current.value)).then((res) => {
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
                                    href="mailto:hazemalmasri@hotmail.com">hazemalmasri@hotmail.com</a>
                                </li>
                                <li><i className="fa fa-phone"></i> Phone:<a href="tel:+962798898997"> +962798898997 </a> </li>
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
                                <button type="button" onClick={handleSubmit}>Send</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact