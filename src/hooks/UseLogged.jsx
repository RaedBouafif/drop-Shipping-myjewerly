import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/*NAVIGATE INSTANCE */
export const UseLogged = (path) => {
    const navigate = useNavigate()
    const isLogged = useSelector(element => element.isLogged)
    useEffect(() => {
        if (isLogged) {
            navigate(path)
        }
    }, [])

}