import React from 'react'
import { Link } from 'react-router-dom'


const NavBonde = ({ paths }) => {
    return (
        <div style={{ zIndex: 0 }} className="t-z-0 breadcrumbs_area t-mt-5 lg:t-mt-0">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="breadcrumb_content t-z-0">
                            <ul>
                                <li><Link to="/">home</Link></li>
                                {paths.map((path, index) => {
                                    return <li key={index}><Link to={"/" + path}>{path}</Link></li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NavBonde
