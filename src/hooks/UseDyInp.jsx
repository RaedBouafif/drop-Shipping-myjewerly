import { useEffect, useState } from "react"

export const UseDynamicInput = (input, errorFunction = (input) => { return [] }, filterFunction = (value) => { return value }) => {
    const [value, setValue] = useState("")
    const [errors, setErrors] = useState([])
    const handleFocus = () => {
        if (input.current.value == "") {
            const label = input.current.parentNode.children[0]
            label.style.left = ""
            label.style.transform = "translateY(2px)"
            label.style.fontSize = "12px"
            input.current.classList.replace("border-stone-200", "border-blue-400")
            label.classList.replace("text-stone-700", "text-blue-400")
        }
    }
    const handleBlur = () => {
        const label = input.current.parentNode.children[0]
        if (input.current.value == "") {
            label.style.left = ""
            label.style.transform = "translateY(21px)"
            label.style.fontSize = ""
            input.current.classList.replace("border-blue-400", "border-stone-200")
            label.classList.replace("text-blue-400", "text-stone-700")
        }
    }
    const handleErrors = () => {
        setValue(() => input.current.value)
        setErrors(() => errorFunction(input.current.value))
        const label = input.current.parentNode.children[0]
        if (errorFunction(input.current.value).length) {
            input.current.classList.replace("border-blue-400", "border-red-500")
            label.classList.replace("text-blue-400", "text-red-500")
        }
        else {
            input.current.classList.replace("border-red-500", "border-blue-400")
            label.classList.replace("text-red-500", "text-blue-400")
        }
    }
    useEffect(() => {
        /*events*/
        input.current.addEventListener("focus", handleFocus)
        input.current.addEventListener("blur", handleBlur)
        input.current.addEventListener("input", handleErrors)
        return () => {
            if (input.current) {
                input.current.removeEventListener("focus", handleFocus)
                input.current.removeEventListener("blur", handleBlur)
                input.current.removeEventListener("input", handleErrors)
            }
        }
    }, [])
    return [filterFunction(value), errors]
}