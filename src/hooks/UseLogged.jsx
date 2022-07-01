import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"

/*NAVIGATE INSTANCE */
export const UseLogged = (path) => {
    const navigate = useNavigate()
    const [cookie, setCookie] = useCookies()
    const isLogged = cookie.clid != undefined
    useEffect(() => {
        if (isLogged) {/*must change to !isLogged*/
            navigate(path)
        }
    }, [])

}