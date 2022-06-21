import { useRef, useState } from 'react'

const Image = ({ src, alt, className, radius, click }) => {
    const img = useRef(null)
    const [loading, setLoading] = useState(true)
    return (
        <div onClick={click} className={className}>
            <img onLoad={() => { setLoading(false) }} ref={img} className={`t-w-full t-h-full ${!loading ? '' : 't-hidden'}`} src={src} alt={alt} style={{ borderRadius: radius }} />
            <div className={`t-h-full t-w-full t-bg-gray-300/80 t-animate-pulse ${loading ? '' : 't-hidden'}`}></div>
        </div>
    )
}

export default Image    