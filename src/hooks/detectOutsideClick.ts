import React, { useEffect, useRef, useState } from 'react'

const detectOutsideClick = () => {
  const [isOutside, setIsOutside] = useState(false)
  const ref = useRef<any>(null)

  const handleClickOutside = (e: any) => {
    if (!ref || !ref.current) return
    if (!ref.current.contains(e.target)) {
      setIsOutside(true)
    } else {
      setIsOutside(false)
    }
  }

  useEffect(() => {
    if (!ref || !ref.current) return
    document.addEventListener('mousedown', handleClickOutside, true)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  }, [ref.current])

  return { isOutside, ref }
}

export default detectOutsideClick
