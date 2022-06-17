import { useRef, useState } from 'react'

const Image = ({ src, alt, className, radius }) => {
    const img = useRef(null)
    const [loading, setLoading] = useState(true)
    return (
        <div className={className}>
            <img onLoad={() => { setLoading(false) }} ref={img} className={`w-full h-full ${!loading ? '' : 'hidden'}`} src={src} alt={alt} style={{ borderRadius: radius }} />
            <div className={`h-full w-full bg-gray-300/80 animate-pulse ${loading ? '' : 'hidden'}`}></div>
        </div>
    )
}

export default Image    