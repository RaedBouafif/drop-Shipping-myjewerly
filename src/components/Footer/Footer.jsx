import React from 'react'
import { Cookies } from 'react-cookie'
import { Link } from "react-router-dom"
import ControlledLinks from "../../customElement/CotrolledLinks"
import { useCookies } from 'react-cookie'
const Footer = () => {
    const [cookie, setCookie] = useCookies()
    return (
        <footer className="footer_widgets t-mt-40">
            <div className="footer_top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="widgets_container contact_us">
                                <div className="footer_logo">
                                    <Link to="/" className='t-text-[38px] t-mr-auto t-font-bold t-font-body t-tracking-wide t-text-blue-600'>MyJewery</Link>
                                </div>
                                <div className="footer_contact">
                                    <p><span>Mobile: </span><a
                                        href="tel:+962798898997">+962798898997</a> </p>
                                    <p><span>Support: </span><a href="mailto:hazemalmasri@hotmail.com">support@myjewery.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-6">
                            <div className="widgets_container widget_menu">
                                <h3>Information</h3>
                                <div className="footer_menu">
                                    <ul>
                                        <li><Link to="/about" >About Us</Link></li>
                                        <li><Link to="/Delivery_information" >Delivery Information</Link></li>
                                        <li><Link to="/Privacy_Policy">Privacy Policy</Link></li>
                                        <li><Link to="/Terms_Conditions">Terms & Conditions</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-6">
                            <div className="widgets_container widget_menu">
                                <h3>My Account</h3>
                                <div className="footer_menu">
                                    <ul>
                                        <li><ControlledLinks to={"/account/" + cookie.clid} >My Account</ControlledLinks></li>
                                        <li><ControlledLinks to={"/account/" + cookie.clid + "/Order_History"}>Order History</ControlledLinks></li>
                                        <li><Link to="/wishlist">Wish List</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="widgets_container newsletter">
                                <h3>Follow Us</h3>
                                <div className="footer_social_link">
                                    <ul>
                                        <li><a className="facebook" href="#" title="Facebook"><i className="fa fa-facebook"></i></a>
                                        </li>
                                        <li><a className="twitter" href="#" title="Twitter"><i className="fa fa-twitter"></i></a>
                                        </li>
                                        <li><a className="instagram" href="#" title="instagram"><i
                                            className="fa fa-instagram"></i></a></li>
                                        <li><a className="linkedin" href="#" title="linkedin"><i className="fa fa-linkedin"></i></a></li>
                                    </ul>
                                </div>
                                <div className="subscribe_form">
                                    <div className="mailchimp-alerts text-centre">
                                        <div className="mailchimp-submitting"></div>
                                        <div className="mailchimp-success"></div>
                                        <div className="mailchimp-error"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_bottom t-flex t-items-center t-justify-center" style={{ height: "50px", padding: "0" }}>
                <div className="t-w-full">
                    <p className="t-text-center">&copy; 2022  <Link to="/" className='t-text-[14px] t-mr-auto t-font-bold t-font-body t-text-blue-600'>MyJewery </Link><i
                        className="fa fa-heart text-danger"></i> , All rights reserved.</p>
                </div>
            </div>
        </footer >
    )
}

export default Footer